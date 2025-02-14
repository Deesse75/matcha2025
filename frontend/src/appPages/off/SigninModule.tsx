import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRoute, appRedirect } from '../../appUtils/variables/routeDef';
import InputPassword from '../components/InputPassword';
import InputUsername from '../components/InputUsername';

type Props = {};

const SigninModule: FC<Props> = ({}) => {
  const nav = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [usernameIsValid, setUsernameIsValid] = useState<boolean>(false);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [actionConnecting, setActionConnecting] = useState<boolean>(false);

  useEffect(() => {
    if (!actionConnecting) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(authRoute.signin, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const data = await response.json();
        if (!data.status) {
          // gerer les erreurs
          setErrorMessage(data.message);
          return;
        }

        sessionStorage.setItem('token', data.token);
        setActionConnecting(false);
        nav(appRedirect.getMe);
      } catch (error) {
        //redirect
      }
    };
    callBackEnd();
  }, [actionConnecting]);

  return (
    <>
      <div className='signin_module_container'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setActionConnecting(true);
          }}
        >
          <InputUsername
            setUsername={setUsername}
            setUsernameIsValid={setUsernameIsValid}
          />
          <InputPassword
            setPassword={setPassword}
            setPasswordIsValid={setPasswordIsValid}
          />
          <div className='signin_module_submit'>
            {errorMessage && (
              <>
                <div className='signin_module_error'>{errorMessage}</div>
              </>
            )}
            <input
              className='signin_submit'
              type='submit'
              name='signinSubmit'
              id='signinSubmit'
              disabled={!usernameIsValid || !passwordIsValid}
              value='Se connecter'
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SigninModule;
