import {
	ApolloClient,
	ApolloLink,
	concat,
	createHttpLink,
	InMemoryCache,
	split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { Kind, OperationTypeNode } from 'graphql/index';
import { createClient as createWsClient } from 'graphql-ws';
import {getAccessToken} from 'utils/auth';

const authLink = new ApolloLink((operation, forward) => {
	const accessToken = getAccessToken();
	if (accessToken) {
		operation.setContext({
			headers: { Authorization: `Bearer ${accessToken}` },
		});
	}
	return forward(operation);
});

const httpLink = concat(authLink, createHttpLink({ uri: process.env.REACT_APP_GRAPHQL_URL }));

const wsLink = new GraphQLWsLink(
	createWsClient({
		url: process.env.REACT_APP_GRAPHQL_WS_URL,
		connectionParams: () => ({ accessToken: getAccessToken() }),
	})
);

const isSubscription = (operation) => {
	const definition = getMainDefinition(operation.query);
	return (
		definition.kind === Kind.OPERATION_DEFINITION &&
		definition.operation === OperationTypeNode.SUBSCRIPTION
	);
};

export const apolloClient = new ApolloClient({
	link: split(isSubscription, wsLink, httpLink),
	cache: new InMemoryCache(),
});
