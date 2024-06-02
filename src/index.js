import { render } from 'react-dom';
import React,{useState,useEffect,useMemo} from 'react';
import App from "./app.jsx"
import 'tailwindcss/tailwind.css'
import '../styles/globals.css';
import "./app.css"
import { useRouter } from "../components/router.js"

function PagesRouter(){
  const [module,setModule] = useState()
  const [pageProps,setPageProps] = useState()
  const router = useRouter()
  const routes = useMemo(()=>{
    let routeData = document.getElementById("__ROUTE_DATA__")
    return JSON.parse(routeData.textContent)
  },[router])
  
  useEffect(()=>{
    async function fetchData(){
      console.log(router,routes);
      let url = router.pathname == "/" ? "index" : router.pathname
      let match
      let route = routes.find(r=>{
        match = url.match(new RegExp(r.regex,"i"))
        if(match){
          return true
        }
      })

      if(!match)
        return 
        
      let query = route.query.reduce((agg,curr,i)=>{
        agg.push({
          [curr] : match[i+1]
        })
        return agg
      },[])

      router.query = query
      window.query = query
      window.route=route

      console.log(route,query,match);
      let props
      if(route.props){
        let JSONpath = `/${route.path}${query?.length > 0 ? "/" + query[0][route.query[0]] : ""}`
        console.log("JSON",JSONpath);
        let res = await fetch(`${JSONpath}.json`)
        props = await res.json()
        //const propsScript = document.getElementById("__PROPS__")
        //let props = JSON.parse(propsScript.textContent)
      }
      setPageProps(props)

      route.component = route.component.replace("\\","/")
      
      try {
        let mod = await import(`./pages/${route.component}`)
        setModule(mod)
      } catch (error) {
        
      }
    }
      
    fetchData()
  },[routes,router.pathname])

  if(module){
      return <App Component={module.default} pageProps={pageProps} />
  } else 
    return <div>Loading...</div>
}

render(
  <PagesRouter/>,
  document.getElementById('root')
);    


//const container = document.getElementById('root');
//const vNode = <App/>
//render(vNode, container);

// const hotRrender = async (Component) => {
//   let p = "./countdown.jsx"
//   const child = await import(p)
//     render(
//       <Component Component={child}/>,
//       document.getElementById('root')
//     );
//   };
// hotRrender(App)
// if(window)
//     window.vtree = vNode

// if (module.hot) {
//     module.hot.accept('./app', () => {
//       const NextApp = require('./app.jsx').default;
//       hotRrender(NextApp);
//     });
//   }