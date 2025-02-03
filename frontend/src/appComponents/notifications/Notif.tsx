import { FC, useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';

type Props = {
  notif: string | null;
  setNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const Notif: FC<Props> = ({ notif, setNotif }) => {

  useEffect(() => {
    if (!notif) return;

    const count = setTimeout(() => {
      setNotif(null);
    }, 5000);
    clearTimeout(count);
  }, [notif]);

  return (
    <>
      {notif && (
        <div className='notif_container'>
          <div className='notif_mess'>{notif}</div>
          <div className='notif_close'>
            <IoIosClose size={24} />
          </div>
        </div>
      )}
    </>
  );
};

export default Notif;
