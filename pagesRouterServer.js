import fs from "fs/promises"
import path from "path"

const DEFAULT = 1
const INDEX = 2
const DYNAMIC = 3
const NESTED_DYNAMIC = 4

const routes = []
const rootFolder = "./src/pages/"
const out = "dist"

async function createRoutes(directory){
    
    const files = await fs.readdir(`${rootFolder}${directory}`)

    return Promise.all( files.map(async(file)=>{

      const fullPath = path.join(rootFolder,directory, file);
      //posts/[slug].js actual component file path
      const relativePath = path.join(directory, file);

      const stats = await fs.stat(fullPath);
      if (stats.isDirectory()) {
        await createRoutes(`${relativePath}/`);
      } else if(/\.(mjs|js|jsx)$/.test(file)){

        let type = /\[\.\.\..*\].js/.test(file) ? NESTED_DYNAMIC :
                        /\[.*\].js/.test(file) ? DYNAMIC : /index\.js/img.test(file) ? INDEX : 
                        directory == "" ? DEFAULT : null
        //posts/[slug] the route
        let routePath = relativePath.substring(0,relativePath.lastIndexOf("."))

        routePath = routePath.replaceAll('\\','/')

        let regex = routePath

        let query = []
        
        if(!type && directory == "") {
            type = DEFAULT
        }  else if(type > INDEX){
            //Dynamic path
            let match
            let r = /\[([^\[\]]+)\]/g
            while((match = r.exec(routePath)) !== null){
                query.push(match[1])
            }
            regex = routePath.replace(/\[(\w+)\]/g, '([^/]+)')

            // routePath should be sans [slug].js
            routePath = path.dirname(routePath)
        }

        let route = {
            component:relativePath.replace("\\","/"),
            path:routePath,
            type,
            regex,
            query
        }

        const module = await import(`./src/pages/${directory}${file}`)

        async function getProps(pagePath,context,route){
            let {props} = module.getStaticProps(context || {});
            if(context)
                route.props[context.params.slug] = props
            else route.props = props
            
            let dir = `${out}/${path.dirname(pagePath)}`;
            await fs.mkdir(dir, { recursive: true });

            let file = `${out}/${pagePath}.json`;
            await fs.writeFile(file,JSON.stringify(props))
        }

        if(module.getStaticPaths){
            const {paths} = module.getStaticPaths()
            route.subPaths = paths
            route.props = {}
            paths.map(async (context)=>{
                if (module.getStaticProps)
                    getProps(path.join(directory,context.params.slug),
                            context,
                            route)
            })
        } else if (module.getStaticProps){
            getProps(route.path,null,route)
        }

        routes.push(route);
      }

    }))
}

function render(template){
    template = "return `" + template + "`"
    return (props)=>{
        const render = new Function(Object.keys(props).join(', '),template)
        return render.apply(null, Object.values(props))
    }
}

const pagesRouter = async function(){
    const template = await fs.readFile("./_document.html","utf8")
    const renderHTML = render(template)

    createRoutes("").then(async ()=>{
        console.log("done",routes);
        routes.map(async (route)=>{
    
            if(route.subPaths){
                route.subPaths.map(async (context)=>{
                    const slug = context.params.slug
                    let html = renderHTML({
                        page:slug,
                        props:JSON.stringify(route.props[slug]),
                        routes:JSON.stringify(routes)
                    })
                    let dir = path.join(out,route.path)
                    await fs.mkdir(dir, { recursive: true });
                    let file = `${path.join(out,route.path,slug)}.html`;
                    await fs.writeFile(file,html)
                })  
            } else {
                let html = renderHTML({
                    page:route.path,
                    props:JSON.stringify(route.props),
                    routes:JSON.stringify(routes)
                })
                let dir = path.join(out,path.dirname(route.path))
                await fs.mkdir(dir, { recursive: true });
                let file = `${path.join(out,route.path)}.html`;
                await fs.writeFile(file,html)
            }
        }
        )
    })
}

export default pagesRouter

