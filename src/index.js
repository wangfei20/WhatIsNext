import { createRoot } from 'react-dom/client';
import React,{useState,useEffect,useMemo, useRef} from 'react';
import App from "./app.jsx"
import "../styles/globals.css"
import PagesRouter from "./pagesRouter.js"

createRoot(document.getElementById('root')).render(
  <PagesRouter App={App}/>
)    

// render(
//   <PagesRouter App={App}/>,
//   document.getElementById('root')
// );    
