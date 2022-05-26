import React from 'react';
import Post from './post'

export default function Feed(props)
{
    return(
        <>
            {props.posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </>
    )
}