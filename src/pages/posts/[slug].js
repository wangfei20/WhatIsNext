import React from 'react';
export default function Post(props) {
    console.log(props);
    return <div>work out! {props.slug}</div>
}

export function getStaticProps({params}){
    return {
        props:params
    }
}

export function getStaticPaths(){
    const paths = [
        {params:{slug:"fiona"}},
        {params:{slug:"jimmy"}},
        {params:{slug:"susan"}}
    ]
    return {
        paths,fallback:false
    }
}