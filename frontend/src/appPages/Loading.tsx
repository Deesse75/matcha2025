import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRoute, appRedirect } from '../appUtils/variables/routeDef';

type Props = {};

const LoadingMatcha: FC<Props> = ({}) => {
  const nav = useNavigate();
  const [timeOutLoading, setTimeOutLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!timeOutLoading) return;

    const delay = setTimeout(() => {
      if (timeOutLoading) {
        setErrorMessage('Pending.');
        setTimeOutLoading(false);
      }
    }, 20000);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    const callBackEnd = async () => {
      try {
        // const response = await fetch(authRoute.loading, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });

        // const data = await response.json();
        // if (data.response !== 'ok') {
        //   setErrorMessage(data.message || response.statusText);
        //   setTimeOutLoading(false);
        //   return;
        // }

        setTimeOutLoading(false);
        nav(appRedirect.signin);
      } catch (error) {
        setErrorMessage((error as Error).message);
        setTimeOutLoading(false);
      }
    };

    callBackEnd();
  }, [nav]);

  return (
    <>
      <div className='page_container'>
        {errorMessage ? (
          <>
            <div className='loading_error'>{errorMessage}</div>
          </>
        ) : (
          <>
            <div className='page_chargement'>
              Page en cours de chargement...
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LoadingMatcha;
