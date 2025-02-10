import { FC, useState } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import SocketNotifOne from './SocketNotifOne';

type Props = {};

const SocketManager: FC<Props> = ({}) => {
  const [openNotif, setOpenNotif] = useState<boolean>(false);
  const [notifText, setNotifText] = useState<string | null>(null);
  const [notifDate, setNotifDate] = useState<string | null>(null);

  return (
    <>
      <div className='socket_notification_container'>
        {notifText && (
          <SocketNotifOne
            notifDate={notifDate}
            notifText={notifText}
            setNotifText={setNotifText}
          />
        )}
        {openNotif && <SocketNotifAll />}
        <div className='socket_notification_title'>
          <div className='socket_notification_title_text'>Notifications</div>
          <div
            className='socket_notification_title_icons'
            onClick={() => setOpenNotif(!openNotif)}
          >
            {openNotif ? (
              <MdArrowDropDown size={20} />
            ) : (
              <MdArrowDropUp size={20} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SocketManager;
