import React from 'react'
import { withSuspenseFallback } from 'withSuspenseFallback'

export const NotFoundPage = withSuspenseFallback(() => {
    return (
        <div className="row">
            <div className="col-12 text-center">
                404 <br />
                Page Not Found!
            </div>
        </div>
    )
})