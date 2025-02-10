import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

type Props = {
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};

const ChatMenu: FC<Props> = ({ selectedMenu, setSelectedMenu }) => {
  const [color, setColor] = useState<string>('white');

  useEffect(() => {
    if (selectedMenu === 'chat') setColor('red');
    else setColor('white');
  }, [selectedMenu]);

  return (
    <>
      <div
        className='chat_container'
        onClick={() => setSelectedMenu('chat')}
      >
        <div
          className='chat_bulle'
          style={{ backgroundColor: color }}
        ></div>
        <div className='chat_title'>Chat</div>
      </div>
    </>
  );
};

export default ChatMenu;
