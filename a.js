
import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url";
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


// import fs from "fs/promises"
// import path from "path"

// async function importJSX(dir){
//     let files = await fs.readdir(dir)
//     for (let i = 0; i < files.length; i++) {
//         const file = files[i];
//         let fullPath = "./src/pages/posts"+file
//         console.log(fullPath);
//         import(fullPath).then((module)=>{
//             console.log(module.getStaticPaths());
//         })

//     }

// }

//importJSX("./src/pages/posts")

// const esbuild = require('esbuild');
//   console.log("started!");
//   esbuild.build({
//     entryPoints: ["./src/index"],
//     entryNames: '[dir]/[name]-[hash]',
//     outbase: 'src',
//     bundle: true,
//     outdir: 'out',
//   }).then(()=>{
//     console.log("good!");
//   })
