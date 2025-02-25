import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRoute, appRedirect } from '../../../utils/variables/routeDef';
import InputPassword from '../pagesUtils/InputPassword';
import InputUsername from '../pagesUtils/InputUsername';

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
        <InputUsername
          setUsername={setUsername}
          setUsernameIsValid={setUsernameIsValid}
        />
        <InputPassword
          setPassword={setPassword}
          setPasswordIsValid={setPasswordIsValid}
        />
        {errorMessage && (
          <>
            <div className='signin_module_error'>{errorMessage}</div>
          </>
        )}
        <button
          className='signin_submit'
          name='signinSubmit'
          id='signinSubmit'
          disabled={!usernameIsValid || !passwordIsValid}
          onClick={() => setActionConnecting(true)}
        >
          Se connecter
        </button>
      </div>
    </>
  );
};

export default SigninModule;
