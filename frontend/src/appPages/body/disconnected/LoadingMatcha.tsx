import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WaitChargement from '../../../appUtils/componentsState/WaitChargement';
import { authRoute, appRedirect } from '../../../appUtils/variables/routeDef';
import { fetchResponse } from '../../../appUtils/variables/fetchResponse';
import ErrorLoadingMatcha from './error/ErrorLoadingMatcha';
import { useNotification } from '../../../appUtils/context/notif.context';

type Props = {};

const LoadingMatcha: FC<Props> = ({}) => {
  const notif = useNotification();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [timeOutLoading, setTimeOutLoading] = useState<boolean>(true);
  const [errorLoadingMatcha, setErrorLoadingMatcha] = useState<string | null>(
    null,
  );
  const nav = useNavigate();

  useEffect(() => {
    //pending
    if (!timeOutLoading) return;

    const delay = setTimeout(() => {
      if (timeOutLoading) {
        setErrorLoadingMatcha(fetchResponse.errorTimeOut);
        setIsLoading(false);
      }
    }, 20000);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    const callBackEnd = async () => {
      try {
        // const response = await fetch(authRoute.LoadingMatcha, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });

        // if (!response.ok) {
        //   const errorData = await response.json();
        //   notif.setServerNotif(errorData.message);
        //   nav(appRedirect.errorInterne);
        //   return;
        // }

        // if (response.status !== 200) {
        //   setErrorLoadingMatcha(response.statusText);
        //   setIsLoading(false);
        //   return;
        // }

        // const data = await response.json();
        // if (!data) {
        //   setErrorLoadingMatcha(fetchResponse.errorDataJson);
        //   setIsLoading(false);
        //   return;
        // }

        // setTimeOutLoading(false);
        nav(appRedirect.signin);
      } catch (error) {
        setErrorLoadingMatcha((error as Error).message);
        setIsLoading(false);
      }
    };

    callBackEnd();
  }, [nav]);

  return (
    <>
      {isLoading ? (
        <WaitChargement />
      ) : (
        <ErrorLoadingMatcha message={errorLoadingMatcha} />
      )}
    </>
  );
};

export default LoadingMatcha;
