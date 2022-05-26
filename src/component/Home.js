import React from 'react';
import Feed from './feed.js'

export default function Home(props)
{
    return(
        <div className='Home'>
            {
                props.post.length?(
                <Feed posts={props.post}/>
                )
                :(
                    <p style={{marginTop: '2rem'}}>
                        No posts to display
                    </p>
                )
            }
        </div>
    )
}