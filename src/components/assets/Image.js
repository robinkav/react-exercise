import React from 'react'

const Image = ({dateCreated, description, nasaId, title, href}) => {
    return (
        <img
        key={nasaId}
        src={href}
        alt={title}
        title={title}
      />
    )
}

export default Image;