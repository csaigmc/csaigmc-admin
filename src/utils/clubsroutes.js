import React, {lazy} from 'react'
const PoetsAndWriters  = lazy(() => import('components/Clubs/PoetsAndWriters/PoetsAndWriters'))
const EnigmaGamingClub  = lazy(() => import('components/Clubs/EnigmaGamingClub/EnigmaGamingClub'))
const MemersClub  = lazy(() => import('components/Clubs/MemersClub/MemersClub'))
const Arts  = lazy(() => import('components/Clubs/Arts/Arts'))

export const clubroutes = {
    '/isis': () => <PoetsAndWriters />,
    '/enigma': () => <EnigmaGamingClub />,
    '/memersclub': () => <MemersClub />,
    '/arts': () => <Arts />
}