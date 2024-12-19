import React, {useEffect, useState} from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components'
import { set } from 'react-hook-form'


export default function Home(props) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)                                
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <Container>
               <div className='flex flex-wrap'>
                    <div className='p-2 w-full'>
                        <h1 className='text-3xl font-bold'>No Posts Yet</h1>
                    </div>
               </div>
            </Container>
         )
        
    }

    return (
        <div className='w-full py-8 bg-[#f5f3ef] h-screen'>
            <Container>
                <div className='flex flex-wrap w-full'>
                    {posts.map((post) => (
                       <div key={post.$id} className='p-2'>                            
                            <PostCard {...post} />
                       </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
