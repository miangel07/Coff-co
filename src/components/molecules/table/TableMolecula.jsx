import React from 'react'

const TableMolecula = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full justify-between divide-y table ">
        {children}
      </table>
    </div>
  )
}

export default TableMolecula
