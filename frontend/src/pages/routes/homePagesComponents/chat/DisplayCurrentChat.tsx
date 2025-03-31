import { FC } from "react"
import ChatHeader from "./ChatHeader";

type Props = {};

const DisplayCurrentChat: FC<Props> = ({}) => {
  return (
    <>
    <div className="current_chat_container">
      <div className="current_chat">
        <div className="current_chat_header"><ChatHeader /></div>
        <div className="current_chat_message"><ChatMessages /></div>
        <div className="current_chat_send">
          <input type="text" name="chatSendText" id="chatSendText" />
          <button>Envoyer</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default DisplayCurrentChat