import React, { createContext,useState, useContext, useEffect } from 'react';
import {Link} from "../components/router"

function Layout({children}){
    return <div>
        <div className='nav'>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/posts">Posts</Link>
        </div>
        {children}
    </div>
}

export default function App({ Component, pageProps }) {
   return <Layout>
    <Component {...pageProps}/>
    </Layout>
}