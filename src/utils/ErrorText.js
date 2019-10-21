import React from 'react'

export const ErrorText = ({errorText}) => {
    return (
        <div className="col-12 text-center">
            <div className="display-inline-block">
                <h2 className="bg-danger p-2 rounded-sm text-light text-center">
                    {errorText}
                </h2>
            </div>
        </div>
    )
} 