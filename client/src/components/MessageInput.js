import React from 'react';

const MessageInput = ({ onSend }) => {
	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			onSend(e.target.value);
			e.target.value = '';
		}
	};

	return (
		<div className='box'>
			<div className='control'>
				<input
					className='input'
					type='text'
					placeholder='Say something...'
					onKeyDown={handleKeyDown}
				/>
			</div>
		</div>
	);
};

export default MessageInput;
