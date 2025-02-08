import { FC } from 'react';
import { appRedirect } from '../../../../appUtils/variables/routeDef';
import { useNavigate } from 'react-router-dom';

type Props = {
  activePage: string;
};

const DisconnectedRedirection: FC<Props> = ({ activePage }) => {
  const nav = useNavigate();

  return (
    <>
      <div className='disconnect_redirect'>
        {activePage !== 'signin' && (
          <>
            <div className='disconnect_redirect_link'>
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
            <div className='disconnect_redirect_link'>
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
            <div className='disconnect_redirect_link'>
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
            <div className='disconnect_redirect_link'>
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
            <div className='disconnect_redirect_link'>
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

export default DisconnectedRedirection;
