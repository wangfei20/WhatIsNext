import React, { createContext,useState, useContext, useEffect } from 'react';
//import {useRouter} from '../freact/router'
//import {useState,useEffect,useRef} from '../freact'
//import Countdown from './countdown';
//import Layout from "./test1"
import {Link} from "../components/router"

function Layout({children}){
    return <div>
        <div>
            <Link className="px-3 cursor-pointer" href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/posts/jimmy">Jimmy</Link>
        </div>
        {children}
    </div>
}

export default function App({ Component, pageProps }) {
   return <Layout>
    <Component {...pageProps}/>
    </Layout>
}