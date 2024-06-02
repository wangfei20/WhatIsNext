import React from 'react';

export default function About(props){
    console.log("about",props);
    return <div>Hello, this is {props.data}</div>
}

export function getStaticProps(){
    return {
        props:{
            data:"about"
        }
    }
}