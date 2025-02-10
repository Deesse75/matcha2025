import { Dispatch, FC, SetStateAction } from "react";

type Props = {
  notifDate: string | null;
  notifText: string | null;
  setNotifText: Dispatch<SetStateAction<string | null>>
};

const SocketNotifOne: FC<Props> = ({notifDate, notifText, setNotifText}) => {
  return (
    <div>SocketNotifOne</div>
  )
}

export default SocketNotifOne