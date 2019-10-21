import React, {lazy} from 'react'
const PoetsAndWriters  = lazy(() => import('components/Clubs/PoetsAndWriters/PoetsAndWriters'))
const EnigmaGamingClub  = lazy(() => import('components/Clubs/EnigmaGamingClub/EnigmaGamingClub'))
const MembersClub  = lazy(() => import('components/Clubs/MembersClub/MembersClub'))
const Arts  = lazy(() => import('components/Clubs/Arts/Arts'))

export const clubroutes = {
    '/isis': () => <PoetsAndWriters />,
    '/enigma': () => <EnigmaGamingClub />,
    '/membersclub': () => <MembersClub />,
    '/arts': () => <Arts />
}