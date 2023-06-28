import { useMutation, useQuery, useSubscription } from '@apollo/client';

import { ADD_MESSAGE, ADDED_MESSAGE, ALL_MESSAGES } from './message';

export const useAddMessage = () => {
	const [mutate] = useMutation(ADD_MESSAGE);

	const addMessage = async (text) => {
		const {
			data: { message },
		} = await mutate({
			variables: { text },
		});
		return message;
	};

	return { addMessage };
};

export const useMessages = () => {
	const { data } = useQuery(ALL_MESSAGES);
	useSubscription(ADDED_MESSAGE, {
		onData: ({ client, data }) => {
			const newMessage = data.data.message;
			client.cache.updateQuery({ query: ALL_MESSAGES }, ({ messages }) => {
				return { messages: [...messages, newMessage] };
			});
		},
	});
	return {
		messages: data?.messages ?? [],
	};
};
