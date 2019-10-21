import React, {Suspense, Fragment} from 'react';
import './App.css';
import { useRoutes, useRedirect } from 'hookrouter'
import { routes } from './utils/routes';
import { NotFoundPage } from 'components/NotFoundPage';
import { Navigation } from 'components/Navigation';
import { withAdminAuth } from 'utils/withAdminAuth';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks'
import { BASE_URL } from 'cconfig';
import { useLoginContext } from 'utils/context';

import CssBaseline from '@material-ui/core/CssBaseline' 
import Container from '@material-ui/core/Container'

function _App() {

  useRedirect('/', '/students')
  const routerResult = useRoutes(routes)
  const {user} = useLoginContext()

  const token = user.auth_token

  const client = new ApolloClient({
    uri: [BASE_URL, 'graphql'].join('/'),
    headers: {
      Authorization:  `Bearer ${token}`
    } 
  })

  return (
    <Fragment>
      <Navigation />
      <ApolloProvider client={client}>
        <Container>
          <CssBaseline />
          <Suspense fallback={<div>Loading...</div>}>
            {routerResult || <NotFoundPage />}
          </Suspense>
        </Container>
      </ApolloProvider>
    </Fragment>
  );
}

const App = withAdminAuth(_App)

export default App;
