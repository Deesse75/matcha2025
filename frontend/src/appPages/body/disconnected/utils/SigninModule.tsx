import { FC, useEffect, useState } from 'react';
import {
  appRedirect,
  authRoute,
} from '../../../../appUtils/variables/routeDef';
import { UserDataSave } from '../../../../appUtils/class/userDataSave';
import { fetchResponse } from '../../../../appUtils/variables/fetchResponse';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../../../appUtils/context/notif.context';
import InputLogin from './InputLogin';
import InputPassword from './InputPassword';

type Props = {};

const SigninModule: FC<Props> = ({}) => {
  const nav = useNavigate();
  const notif = useNotification();
  const [message, setMessage] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validateLogin, setValidateLogin] = useState<boolean>(false);
  const [validatePassword, setValidatePassword] = useState<boolean>(false);
  const [tryToConnecting, setTryToConnecting] = useState<boolean>(false);

  useEffect(() => {
    if (!tryToConnecting) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(authRoute.signin, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ login, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          notif.setServerNotif(errorData.message || response.statusText);
          nav(appRedirect.errorInterne);
          return;
        }

        const data = await response.json();
        if (data?.status !== 'ok') {
          setMessage(data.message || response.statusText);
          setValidateLogin(false);
          setValidatePassword(false);
          return;
        }

        if (!data.id || !data.login || !data.token) {
          setMessage(fetchResponse.errorDataSignin);
          setValidateLogin(false);
          setValidatePassword(false);
          return;
        }

        sessionStorage.setItem('token', data.token);

        const user = new UserDataSave(
          data.id,
          data.login,
          data.photo || '',
          data.lastConnection,
        );
        user.setUser();
      } catch (error) {
        notif.setServerNotif((error as Error).message);
        nav(appRedirect.errorInterne);
      }
    };
    callBackEnd();
  }, [tryToConnecting]);

  return (
    <>
      <div className='signin_module_container'>
        <div className='signin_module_error'>{message}</div>
        <InputLogin setLogin={setLogin} setValidateLogin={setValidateLogin} />
        <InputPassword
          setPassword={setPassword}
          setValidatePassword={setValidatePassword}
        />
        <div className='signin_module_submit'>
          <button
            className='signin_submit'
            disabled={!validateLogin || !validatePassword}
            onClick={() => setTryToConnecting(true)}
          >
            Se connecter
          </button>
        </div>
      </div>
    </>
  );
};

export default SigninModule;
