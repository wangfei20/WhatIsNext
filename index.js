import express from "express"
import pagesRouter from "./out/pagesRouterServer.js"
import path from "path"

pagesRouter()

const app = express()
app.use((req,res,next)=>{
    if(req.url == "/")
        req.url += "index.html"
    else if(!path.extname(req.url)){
        req.url += ".html"
    }
    next()
})
const serveStatic = express.static("dist")

app.use(serveStatic)
app.use((req,res,next)=>{
    if(!path.extname(req.originalUrl)){
        req.url = path.join(req.originalUrl,"index.html")
        serveStatic(req,res,next)
    }
})
app.listen(3000,()=>{
    console.log("listening 3000");
})
