import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../utils/context/notif.context";
import { appRedirect, authRoute } from "../../../utils/variables/routeDef";

type Props = {};

const AppLoading: FC<Props> = ({}) => {
  const nav = useNavigate();
  const notif = useNotification();
  const [timeOutLoading, setTimeOutLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!timeOutLoading) return;

    const delay = setTimeout(() => {
      if (timeOutLoading) {
        notif.setErrorAuthMessage('Pending.');
        setTimeOutLoading(false);
        nav(appRedirect.errorAuth);
      }
    }, 30000);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    const callBackEnd = async () => {
      try {
        const response = await fetch(authRoute.loading, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (data.response !== 'ok') {
          setTimeOutLoading(false);
          return;
        }

        setTimeOutLoading(false);
        nav(appRedirect.signin);
      } catch (error) {
        setTimeOutLoading(false);
      }
    };

    callBackEnd();
  }, [nav]);

  return (
    <>
      <div className='loading_container'>En cours de chargement...</div>
    </>
  );
};

export default AppLoading;
