import { FC, useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';
import { useNotification } from '../../appUtils/context/notif.context';

type Props = {
};

const ServerNotif: FC<Props> = ({ }) => {
  const notif = useNotification();

  useEffect(() => {
    if (!notif.serverNotif) return;

    const count = setTimeout(() => {
      notif.setServerNotif(null);
    }, 5000);
    clearTimeout(count);
  }, [notif.serverNotif]);

  return (
    <>
      {notif && (
        <div className='notif_container'>
          <div className='notif_mess'>{notif.serverNotif}</div>
          <div className='notif_close'>
            <IoIosClose size={24} />
          </div>
        </div>
      )}
    </>
  );
};

export default ServerNotif;
