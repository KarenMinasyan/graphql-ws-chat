import { useAddMessage, useMessages } from 'apollo/hooks';
import MessageInput from 'components/MessageInput';
import MessageList from 'components/MessageList';

const Chat = ({ user }) => {
	const { messages } = useMessages();
	const { addMessage } = useAddMessage();

	const handleSend = async (text) => {
		const message = await addMessage(text);
		console.log('Message added:', message);
	};

	return (
		<section className='section'>
			<div className='container'>
				<h1 className='title is-4'>{`Chatting as ${user}`}</h1>
				<MessageList user={user} messages={messages} />
				<MessageInput onSend={handleSend} />
			</div>
		</section>
	);
};

export default Chat;
