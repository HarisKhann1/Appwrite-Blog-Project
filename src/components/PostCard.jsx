import React from 'react'
import { Link } from 'react-router-dom'
import service from '../appwrite/config'

export default function PostCard({$id, title, featuredImage}) {
    
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full text-black rounded-xl p-4 shadow-lg'>
                <div className='w-full justify-center mb-4'>
                    <img className='w-48 h-48' src={service.filePreview(featuredImage)} alt={title} />
                </div>
                <h2 className='text-xl font-bold text-black'>{ title }</h2>
            </div>
        </Link>
    )
}
