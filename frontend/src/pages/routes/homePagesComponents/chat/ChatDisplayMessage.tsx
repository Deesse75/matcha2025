import { FC } from "react";

type Props = {
  key: number;
  mesg: string;
};

const ChatDisplayMessage: FC<Props> = ({}) => {
  return (
    <>
    <div className="chat_display_message_container">
      <div className="chat_dsiplay_message_username">
        {}
      </div>
    </div>
    </>
  )
}

export default ChatDisplayMessage