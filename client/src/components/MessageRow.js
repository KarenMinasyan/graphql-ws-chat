import React from 'react';

const MessageRow = ({ user, message }) => (
  <tr>
    <td className='py-1'>
      <span className={message.user === user ? 'tag is-primary' : 'tag'}>{message.user}</span>
    </td>
    <td className='pl-4 py-1'>{message.text}</td>
  </tr>
);

export default MessageRow;
