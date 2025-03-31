import { FC } from 'react';

type Props = {};

const Chat: FC<Props> = ({}) => {
  return (
    <>
      <div className='chat_container'>
        <div className='chat_section'>
          <DisplayCurrentChat />
          </div>
        <div className='chat_section'>
          <DisplayListActiveChat />
        </div>
      </div>
    </>
  );
};

export default Chat;
