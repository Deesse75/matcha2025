import { FC } from 'react';

const fakeUser = {
  username: 'Toto',
  firstMessage: '10/02/2024',
  signup: '10/02/2021',
};

type Props = {};

const ChatHeader: FC<Props> = ({}) => {
  return (
    <>
      <div className='chat_header_container'>
        <div className='chat_header_row'>
          <div className='chat_header_username'>{`Pseudo : ${fakeUser.username}`}</div>
          <div className='chat_header_first_message'>{`Premier message le : ${fakeUser.firstMessage}`}</div>
        </div>
        <div className='chat_header_row'>
          <div className='chat_header_status'>connecté</div>
          <div className='chat_header_signup'>{`Inscrit depuis le : ${fakeUser.signup}`}</div>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
