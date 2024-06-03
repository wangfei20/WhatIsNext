import React,{useState,useEffect} from "react"

export function RouterComponent(props){
    const router = useRouter()
    let route= router.pathname.replace(/^\//img,"")
    let component = props[route]
    
    return component ? React.createElement(component) : <div/>
  }

export function Route({path,children}){
    const router = useRouter()
    let route= router.pathname.replace(/^\//img,"")

    return route == path ? children : null 
}


export function Link({href, children,className}){
    return <span className={className} onClick={function(){
        _Router.push(href)
    }}>{children}</span>
}
class Router extends EventTarget {
    constructor(){
        super()
        this.pathname = typeof window !== "undefined" ? window.location.pathname : ""
    }

    push(url){
        window.history.pushState({},"",url)
        this.dispatchEvent(new Event("popstate"));
    }
    
    replace(url){
        window.history.replaceState({},"",url)
    }

}

const _Router = new Router()


export const useRouter = function(){
    const [router,setRouter] = useState(_Router)
    function update(event) {
        setRouter({..._Router, pathname : window.location.pathname})
    }
    useEffect(()=>{
        window.addEventListener('popstate', update);
        _Router.addEventListener('popstate', update);
        return ()=>{
            window.removeEventListener('popstate', update);
            _Router.removeEventListener('popstate', update);
        }
    },[])
    return router
}

