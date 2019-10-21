import React from 'react'
import 'common/css/common.css'

export const LoadingBar = ({isShowing}) => {
    return (
        isShowing ? 
        <div className="cover">
            <div className="indeterminate bg-danger"></div>
        </div> :
        <div className="dummyload"></div>        
    )
}

export const LoadText = () => {
    return (
        <h1 className="bg-info text-center">
            Loading
        </h1>
    )
}
