import { render } from 'react-dom';
import React from 'react';
//import React,{render} from '../freact'
import App from "./app.jsx"
//import 'tailwindcss/tailwind.css'
import '@/styles/globals.css';
import "./app.css"

// let p = "./test.jsx"
// const child = await import(p)
// render(
//   <App Component={child}/>,
//   document.getElementById('root')
// );


import(
  './countdown.jsx'
)
  .then((module) => {
    console.log(module);
    render(
      <App Component={module.default} />,
      document.getElementById('root')
    );
  })
  .catch((err) => {
    console.error('Error occurred while importing component', err);
  });

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