import React from 'react'

export const isNotEmpty = (str) => {
    return (str !== 'undefined' && str !== null && str !== "" && typeof(str) === 'string')
}

export const Divider = () => {
    return (
        <div style={{width: '100%', height: "2px"}}></div>
    )
}
