import { useId } from "react"
import React from 'react'

const Input = React.forwardRef(function Input({label, type = "text", className = "", ... props}, ref) {
    const id = useId()

    return (
        <div className="text-left">
            {label && <label htmlFor={id} className="w-full font-medium px-2">{label}</label>}
            <input
             type={type}
             className={
                `mt-2 px-3 py-2 rounded-lg bg-white text-black outline-none
                 focus:bg-gray-50 duration-200 border border-gray-200
                 w-full ${className}`}
                 ref={ref}
                 {...props}
                 id={id}
            />
        </div>
    )
})

export default Input
