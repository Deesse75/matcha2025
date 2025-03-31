import { FC } from 'react';

const fakeMessages = [
  {
    id: 1,
    sender: 'Tot',
    message: 'Ceci est le message 1',
    read: true,
  },
  {
    id: 2,
    sender: 'Tutu',
    message: 'Ceci est le message 2',
    read: true,
  },
  {
    id: 3,
    sender: 'Toto',
    message: 'Ceci est le message 3',
    read: true,
  },
  {
    id: 4,
    sender: 'Toto',
    message: 'Ceci est le message 4',
    read: false,
  },
];

type Props = {};

const ChatMessages: FC<Props> = ({}) => {
  return (
    <>
      <div className='chat_messages_containre'>
        {fakeMessages &&
          fakeMessages.map((msg, key) => (
            <ChatDisplayMessage key={key as number} mgs={msg} />
          ))}
        <div className='chat_messages_text'></div>
      </div>
    </>
  );
};

export default ChatMessages;
