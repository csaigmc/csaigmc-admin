import React from 'react'
import {useRoutes, useRedirect} from 'hookrouter'
import {clubroutes} from 'utils/clubsroutes'
import { NotFoundPage } from 'components/NotFoundPage'

const Clubs = () => {

    const clubroutesResults = useRoutes(clubroutes)
    return (
        <div className="container-fluid p-0">
            {clubroutesResults || <NotFoundPage />}
        </div>
    )
}

export default Clubs