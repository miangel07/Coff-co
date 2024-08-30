import React from 'react'

const Thead = ({ children }) => {
    return (
        <thead className='bg-sena text-white'>
            <tr className='w-full'>
                {children}
            </tr>
        </thead>

    )
}

export default Thead
