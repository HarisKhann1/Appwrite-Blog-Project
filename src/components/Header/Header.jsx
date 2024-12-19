import React from 'react'
import { Logo, LogoutBtn, Container } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Header(props) {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authStatus
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: authStatus
        },
    ]

    return (
        <header className='w-full text-black font-semibold bg-slate-100 shadow-lg'>
            <Container>
                <nav className='flex items-center h-20'>
                    <div className='mr-4 pl-4'>
                        <Logo width='70px'/>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item) => (
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                    onClick={() => navigate(item.slug)}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null )
                        )}
                        {/* if authStatus is true so only the logoutBtn will render */}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}
