import { Dispatch, FC, SetStateAction } from 'react';

type Props = {
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};

const Chat: FC<Props> = ({}) => {
  return <div>Chat</div>;
};

export default Chat;
