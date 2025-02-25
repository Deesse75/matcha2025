import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRedirect } from '../../../utils/variables/routeDef';

type Props = {
  activePage: string;
};

const RedirectAuthPages: FC<Props> = ({ activePage }) => {
  const nav = useNavigate();

  return (
    <>
      <div className='redirect_container'>
        {activePage !== 'signin' && (
          <>
            <div className='redirect_link'>
              <button
                onClick={() => {
                  nav(appRedirect.signin);
                }}
              >
                Vous avez déjà un compte, connectez-vous
              </button>
            </div>
          </>
        )}
        {activePage !== 'signup' && (
          <>
            <div className='redirect_link'>
              <button
                onClick={() => {
                  nav(appRedirect.signup);
                }}
              >
                Vous n'avez pas encore de compte, inscrivez-vous
              </button>
            </div>
          </>
        )}
        {activePage !== 'forgot' && (
          <>
            <div className='redirect_link'>
              <button
                onClick={() => {
                  nav(appRedirect.forgot);
                }}
              >
                Vous avez oublié votre mot de passe
              </button>
            </div>
          </>
        )}
        {activePage !== 'resend' && (
          <>
            <div className='redirect_link'>
              <button
                onClick={() => {
                  nav(appRedirect.resend);
                }}
              >
                Recevoir un lien de confirmation d'email
              </button>
            </div>
          </>
        )}
        {activePage !== 'contact' && (
          <>
            <div className='redirect_link'>
              <button
                onClick={() => {
                  nav(appRedirect.contactus);
                }}
              >
                Nous contacter
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RedirectAuthPages;
