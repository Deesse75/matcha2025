import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedirect } from '../../../../appUtils/variables/routeDef';
import ServerNotif from '../../../notifications/ServerNotif';

type Props = {};

const ErrorInterne: FC<Props> = ({}) => {
  const nav = useNavigate();
  const [countRedir, setCountRedir] = useState<number>(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountRedir((prev) => {
        const newCount = prev - 1;
        if (newCount === 0) {
          nav(appRedirect.loadingMatcha);
          clearInterval(interval);
        }
        return newCount;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='error_loading_container'>
        <ServerNotif />
        <div className='error_loading_title'>
          Une erreur interne est survenue.
        </div>
        <div className='error_loading_message'>
          Veuillez nous excuser pour la gène occasionnée.
        </div>
        <div className='error_not_found_message'>
          Vous aller être automatiquement redirigé(e) dans {countRedir} sec.
        </div>
        <div className='error_not_found_message'>
          <button
            onClick={() => {
              nav(appRedirect.loadingMatcha);
            }}
          >
            Retour
          </button>
        </div>
      </div>
      <div className='error_loading_message'>L'équipe Matcha.</div>
    </>
  );
};

export default ErrorInterne;
