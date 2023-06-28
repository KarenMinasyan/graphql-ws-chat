import { gql } from '@apollo/client';

export const MESSAGE_COMMON_FIELDS = gql`
	fragment MessageFragment on Message {
		id
		user
		text
	}
`;

export const ALL_MESSAGES = gql`
	${MESSAGE_COMMON_FIELDS}
	query MessagesQuery {
		messages {
			...MessageFragment
		}
	}
`;

export const ADD_MESSAGE = gql`
	${MESSAGE_COMMON_FIELDS}
	mutation AddMessageMutation($text: String!) {
		message: addMessage(text: $text) {
			...MessageFragment
		}
	}
`;

export const ADDED_MESSAGE = gql`
	${MESSAGE_COMMON_FIELDS}
	subscription MessageAddedSubscription {
		message: messageAdded {
			...MessageFragment
		}
	}
`;
