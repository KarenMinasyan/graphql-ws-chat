import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import { apolloClient } from './apollo/client';
import 'bulma/css/bulma.css';
import './style.css';

const root = createRoot(document.getElementById('root'));
root.render(
	<ApolloProvider client={apolloClient}>
		<App />
	</ApolloProvider>
);
