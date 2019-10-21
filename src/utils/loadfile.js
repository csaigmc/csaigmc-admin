import React, {lazy} from 'react'

export const loadfile = (filepath) => {
    console.log(filepath)
    return lazy(() => {
        return import(filepath).then(imp => {
            return imp
        })
    })
}