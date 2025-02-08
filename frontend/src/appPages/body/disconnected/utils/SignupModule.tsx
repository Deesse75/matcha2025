import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../../../appUtils/context/notif.context';
import {
  authRoute,
  appRedirect,
} from '../../../../appUtils/variables/routeDef';
import InputEmail from './InputEmail';
import InputLogin from './InputLogin';
import InputPassword from './InputPassword';
import InputFirstname from './InputFirstname';
import InputLastname from './InputLastname';
import InputBirthdate from './InputBirthdate';

type Props = {};

const SignupModule: FC<Props> = ({}) => {
  const nav = useNavigate();
  const notif = useNotification();
  const [message, setMessage] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validateFirstname, setValidateFirstname] = useState<boolean>(false);
  const [validateLastname, setValidateLastname] = useState<boolean>(false);
  const [validateLogin, setValidateLogin] = useState<boolean>(false);
  const [validateEmail, setValidateEmail] = useState<boolean>(false);
  const [validateBirthdate, setValidateBirthdate] = useState<boolean>(false);
  const [validatePassword, setValidatePassword] = useState<boolean>(false);
  const [validateEmailMessage, setValidateEmailMessage] = useState<
    string | null
  >(null);
  const [tryToRecording, setTryToRecording] = useState<boolean>(false);

  useEffect(() => {
    if (!tryToRecording) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(authRoute.signup, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname,
            lastname,
            login,
            email,
            birthdate,
            password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          notif.setServerNotif(errorData.message || response.statusText);
          nav(appRedirect.errorInterne);
          return;
        }

        const data = await response.json();
        if (data.status !== 'ok') {
          setMessage(data?.message || response.statusText);
          setValidateFirstname(false);
          setValidateLastname(false);
          setValidateLogin(false);
          setValidateEmail(false);
          setValidateBirthdate(false);
          setValidatePassword(false);
          return;
        }

        setValidateEmailMessage(data?.message);
      } catch (error) {
        notif.setServerNotif((error as Error).message);
        nav(appRedirect.errorInterne);
      }
    };
    callBackEnd();
  }, [tryToRecording]);

  return (
    <>
      <div className='signup_module_container'>
        {validateEmailMessage ? (
          <>
            <div className='signup_module_email_sent'>
              {validateEmailMessage} toto
            </div>
          </>
        ) : (
          <>
            <div className='signup_module_error'>{message}</div>
            <InputFirstname
              setFirstname={setFirstname}
              setValidateFirstname={setValidateFirstname}
            />
            <InputLastname
              setLastname={setLastname}
              setValidateLastname={setValidateLastname}
            />
            <InputLogin
              setLogin={setLogin}
              setValidateLogin={setValidateLogin}
            />
            <InputEmail
              setEmail={setEmail}
              setValidateEmail={setValidateEmail}
            />
            <InputBirthdate
              setBirthdate={setBirthdate}
              setValidateBirthdate={setValidateBirthdate}
            />
            <InputPassword
              setPassword={setPassword}
              setValidatePassword={setValidatePassword}
            />
            <div className='signup_module_submit'>
              <button
                className='signup_submit'
                disabled={
                  !validateFirstname ||
                  !validateLastname ||
                  !validateLogin ||
                  !validateEmail ||
                  !validateBirthdate ||
                  !validatePassword
                }
                onClick={() => setTryToRecording(true)}
              >
                S'inscrire
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SignupModule;
