import React,{useState,useEffect,useMemo} from 'react';
import { useRouter } from "../components/router.js"

export default function PagesRouter({App}){
    const [module,setModule] = useState()
    const router = useRouter()
    const routes = useMemo(()=>{
      let routeData = document.getElementById("__ROUTE_DATA__")
      return JSON.parse(routeData.textContent)
    },[router])
    
    useEffect(()=>{
      async function fetchData(){
        let url = router.pathname == "/" ? "index" : router.pathname.substring(1)
        let match
        let route = routes.find(r=>{
          match = url.match(new RegExp(`^${r.regex}$`,"i"))
          if(match && match.length > 0){
            return true
          }
        })
  
        if(!route){
          url = (url+"/index").replace("//","/")
          route = routes.find(r=>{
            match = url.match(new RegExp(`^${r.regex}$`,"i"))
            if(match && match.length > 0){
              return true
            }
          })
          if(!match)
            return
        }
          
        let query = route.query.reduce((agg,curr,i)=>{
          agg.push({
            [curr] : match[i+1]
          })
          return agg
        },[])
  
        router.query = query
        window.query = query
        window.route=route
  
        let props
        if(route.props){
          let JSONpath = `/${route.path}${query?.length > 0 ? "/" + query[0][route.query[0]] : ""}`
          let res = await fetch(`${JSONpath}.json`)
          props = await res.json()
          //const propsScript = document.getElementById("__PROPS__")
          //let props = JSON.parse(propsScript.textContent)
        }
  
        route.component = route.component.replace("\\","/")
        
        console.log(route,query,match);
        try {
          let mod = await import(`./pages/${route.component}`)
          setModule({
            component:mod.default,
            pageProps:props
          })
        } catch (error) {
          console.log(error);
        }
      }
        
      fetchData()
    },[routes,router.pathname])
  
    if(module){
        return <App Component={module.component} pageProps={module.pageProps} />
    } else 
      return <div>Loading...</div>
  }