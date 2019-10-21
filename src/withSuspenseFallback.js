import React, {Suspense} from 'react'

export const withSuspenseFallback = (LazyLoadComponent) => {
    return (props) => {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <LazyLoadComponent {...props}/>
            </Suspense>
        )
    }
} 