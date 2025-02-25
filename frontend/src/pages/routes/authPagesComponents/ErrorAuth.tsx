import { FC, useEffect, useState } from 'react';
import { useNotification } from '../../../utils/context/notif.context';

type Props = {};

const ErrorAuth: FC<Props> = ({}) => {
  const notif = useNotification();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!notif.errorAuthMessage) return;
    setMessage(notif.errorAuthMessage);
    notif.setErrorAuthMessage(null);
  }, [notif.errorAuthMessage])

  return (
    <>
      <div className='error_auth_container'>
        {message && (
          <div className='error_auth_message'>{message}</div>
        )}
      </div>
    </>
  );
};

export default ErrorAuth;
