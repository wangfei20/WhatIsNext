// const express = require("express" )
// const fs = require("fs").promises
// const path = require("path")

// import fs from "fs/promises"
// import path from "path"
// import http from "http"

// const DEFAULT = 1
// const INDEX = 2
// const DYNAMIC = 3
// const NESTED_DYNAMIC = 4

// const routes = []
// const rootFolder = "./src/pages/"
// const out = "dist"

// async function createRoutes(directory){
//     const files = await fs.readdir(`${rootFolder}${directory}`)
//     return Promise.all(files.map(async(file)=>{

//       const fullPath = path.join(rootFolder,directory, file);
//       //posts/[slug].js actual component file path
//       const relativePath = path.join(directory, file);

//       const stats = await fs.stat(fullPath);
//       if (stats.isDirectory()) {
//         await createRoutes(`${relativePath}/`);
//       } else if(/\.(mjs|js|jsx)$/.test(file)){

//         let type = /\[\.\.\..*\].js/.test(file) ? NESTED_DYNAMIC :
//                         /\[.*\].js/.test(file) ? DYNAMIC : /index\.js/img.test(file) ? INDEX : 
//                         directory == "" ? DEFAULT : null
//         //posts/[slug] the route
//         let routePath = relativePath.substring(0,relativePath.lastIndexOf("."))

//         routePath = routePath.replaceAll('\\','/')

//         let regex = routePath

//         if(!type && directory == "") {
//             type = DEFAULT
//         }

//         let query = []

//         if(type > INDEX){
//             //Dynamic path
//             let match
//             let r = /\[([^\[\]]+)\]/g
//             while((match = r.exec(routePath)) !== null){
//                 query.push(match[1])
//             }
//             regex = routePath.replace(/\[(\w+)\]/g, '([^/]+)')

//             // routePath should be sans [slug].js
//             routePath = path.dirname(routePath)
//             //console.log(regex.exec(url));
//         }

//         let route = {
//             component:relativePath,
//             path:routePath,
//             type,
//             regex,
//             query
//         }

//         console.log(`./src/pages/${directory}${file}`);
//         const module = await import(`./src/pages/${directory}${file}`)//.then(async (module) => {
//         console.log(module);

//         async function getProps(pagePath,context){
//             let data = module.getStaticProps(context || {});
//             route.props = data.props;
//             let dir = `${out}/${directory}`;
//             await fs.mkdir(dir, { recursive: true });

//             let file = `${out}/${pagePath}.json`;
//             await fs.writeFile(file,JSON.stringify(data.props))
//         }

//         if(module.getStaticPaths){
//             const {paths} = module.getStaticPaths()
//             route.subPaths = paths
//             route.routePath = 
//             paths.map(async (context)=>{
//                 if (module.getStaticProps)
//                     getProps(path.join(directory,context.params.slug),context)
//             })
//         } else if (module.getStaticProps){
//             getProps(route.path)
//         }

//         routes.push(route);
//       }
//     })
// )

//     return routes
// }

// function render(props,template){
//     template = "return `" + template + "`"
//     const render = new Function(Object.keys(props).join(', '),template)
//     return render.apply(null, Object.values(props))
// }


// createRoutes("").then(async ()=>{
//     console.log("done",routes);
//     routes.map(async (route)=>{

//         let template = await fs.readFile("./document.html","utf8")
//         let html = render({
//             page:route.path,
//             props:JSON.stringify(route.props),
//             routes:JSON.stringify(routes)
//         },template)

//         if(route.subPaths){
//             route.subPaths.map(async (context)=>{
//                 let dir = path.join(out,route.path)
//                 await fs.mkdir(dir, { recursive: true });
//                 let file = `${path.join(out,route.path,context.params.slug)}.html`;
//                 await fs.writeFile(file,html)
//             })
//         } else {
//             let dir = path.join(out,path.dirname(route.path))
//             await fs.mkdir(dir, { recursive: true });
//             let file = `${path.join(out,route.path)}.html`;
//             await fs.writeFile(file,html)
//         }
//     }
//     )
// })

// http.createServer((req,res)=>{
//     if(!(/\.[^\/]+$/.test(req.url))){
//         req.url += ".html"
//     }
    
// }).listen(3000)

import express from "express"
import {pagesRouter} from "./out/pageRoutes.js"

pagesRouter()

const app = express()
app.use((req,res,next)=>{
    if(req.url == "/")
        req.url += "index.html"
    else if(!(/\.[^\/]+$/.test(req.url))){
        req.url += ".html"
    }
    next()
})
app.use((req,res,next)=>{
    console.log(req.url);
    next()
})
app.use(express.static("dist"))
app.listen(3000,()=>{
    console.log("listening 3000");
})
// app.use(express.static("public"))

// // app.get("/",async function(req,res){
// //     try {
// //         const content = await fs.readFile(__dirname + "/document.html","utf-8")
// //         res.setHeader("content-type","text/html")
// //         res.send(content)
// //     } catch (error) {
// //         res.status("401").send(error)
// //     }
// // })

