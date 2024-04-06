import React from 'react'

const meeting = ({params}: {params: {id: number}}) => {
  return (
    <div>Meeting Number # {params.id}</div>
  )
}

export default meeting