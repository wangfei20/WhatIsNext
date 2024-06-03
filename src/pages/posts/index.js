import React from 'react';
import { Link } from '../../../components/router';
export default function Posts({posts}) {
    return <div>
        <h2>All Posts</h2>
        <div>
            {
                posts.map((post)=> <div key={post.slug}>
                    <Link href={`posts/${post.slug}`}>
                        {post.slug}
                    </Link>
                </div>)
            }
        </div>
    </div>
}

export function getStaticProps(){
    const posts = [
        {slug:"fiona"},
        {slug:"jimmy"},
        {slug:"susan"}
    ]
    return {
        props:{posts}
    }
}