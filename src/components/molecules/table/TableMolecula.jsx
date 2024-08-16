import React from 'react'

const TableMolecula = ({children}) => {
  return (
    <div>
       <table className="min-w-full justify-between  divide-y  table cursor-pointer">
                {children}
            </table>
    </div>
  )
}

export default TableMolecula
