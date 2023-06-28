import { useEffect, useRef } from 'react';
import MessageRow from 'components/MessageRow';

const MessageList = ({ user, messages }) => {
	const containerRef = useRef();

	useEffect(() => {
		const container = containerRef.current;
		if (container) {
			// scroll to bottom to make the last message visible
			container.scrollTo(0, container.scrollHeight);
		}
	}, [messages]);

	return (
		<div ref={containerRef} className='box' style={{ height: '50vh', overflowY: 'scroll' }}>
			<table>
				<tbody>
					{messages.map((message) => (
						<MessageRow key={message.id} user={user} message={message} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MessageList;
