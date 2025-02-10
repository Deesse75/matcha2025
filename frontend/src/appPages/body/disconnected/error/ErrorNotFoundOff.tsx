import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedirect } from '../../../../appUtils/variables/routeDef';

type Props = {};

const ErrorNotFoundOff: FC<Props> = ({}) => {
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
      <div className='error_not_found_container'>
        <div className='error_not_found_title'>Page introuvable</div>
        <div className='error_not_found_message'>
          La page que vous tentez d'afficher n'existe pas ou est indisponible.
        </div>
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
    </>
  );
};

export default ErrorNotFoundOff;
