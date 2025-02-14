import { useNavigate } from 'react-router-dom';
import { appRedirect, authRoute } from '../../appUtils/variables/routeDef';
import { FC, useState, useEffect } from 'react';
import InputPassword from '../components/InputPassword';

type Props = {
  token: string | null;
};

const ReinitdModule: FC<Props> = ({token}) => {
  const nav = useNavigate();
  const [password, setPassword] = useState<string | null>(null);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [actionConnecting, setActionConnecting] = useState<boolean>(false);

  useEffect(() => {
    if (!actionConnecting) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(authRoute.reinit, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, password }),
        });

        const data = await response.json();
        if (data.status !== 'ok') {
          setMessage(data?.message || response.statusText);
          setPasswordIsValid(false);
          return;
        }

        //nettoyer
        setActionConnecting(false);
        setMessage(data.message);
      } catch (error) {}
    };
    callBackEnd();
  }, [actionConnecting]);

  return (
    <>
      <div className='reinit_module_container'>
        {message ? (
          <>
            <div className='reinit_module_validate'>{message}</div>
            <div className='reinit_module_validate'>
              Vous pouvez fermer cette page
            </div>
            <div
              className='reinit_module_button'
              onClick={() => nav(appRedirect.loading)}
            >
              Aller à la page d'accueil
            </div>
          </>
        ) : (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setActionConnecting(true);
              }}
            >
              <InputPassword
                setPassword={setPassword}
                setPasswordIsValid={setPasswordIsValid}
              />
              <div className='reinit_module_submit'>
                <input
                  className='reinit_submit'
                  type='submit'
                  name='reinitSubmit'
                  id='reinitSubmit'
                  disabled={!passwordIsValid}
                  value='Mettre à jour'
                />
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default ReinitdModule;
