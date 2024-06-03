
import fs from "fs/promises"
import path from "path"
const rootFolder = "./src/pages/"

async function importJSX(dir){

    let files = await fs.readdir(path.join(rootFolder,dir))

    files.map(async (file)=>{

        const module = await import(`./src/pages/${dir}/${file}`)
        //await import(`./src/pages/posts/${file}`)
        console.log("output",module.getStaticPaths())
    })
}

importJSX("posts")

