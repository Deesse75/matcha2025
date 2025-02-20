import { FC, useState, useEffect } from 'react';
import { authRoute } from '../../appUtils/variables/routeDef';
import InputEmail from '../components/InputEmail';

type Props = {};

const ForgotModule: FC<Props> = ({}) => {
  const [email, setEmail] = useState<string | null>(null);
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validMessage, setValidMessage] = useState<string | null>(null);
  const [actionConnecting, setActionConnecting] = useState<boolean>(false);

  useEffect(() => {
    if (!actionConnecting) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(authRoute.forgot, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (data.status !== 'ok') {
          setErrorMessage(data?.message || response.statusText);
          setEmailIsValid(false);
          return;
        }

        //nettoyer
        setActionConnecting(false);
        setValidMessage(data.message);
      } catch (error) {}
    };
    callBackEnd();
  }, [actionConnecting]);

  return (
    <>
      <div className='forgot_module_container'>
        {validMessage ? (
          <>
            <div className='forgot_module_validate'>{validMessage}</div>
          </>
        ) : (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setActionConnecting(true);
              }}
            >
              <InputEmail
                setEmail={setEmail}
                setEmailIsValid={setEmailIsValid}
              />
              <div className='forgot_module_submit'>
                {errorMessage && (
                  <>
                    <div className='forgot_module_error'>{errorMessage}</div>
                  </>
                )}
                <input
                  type='submit'
                  name='forgotSubmit'
                  id='forgotSubmit'
                  className='forgot_submit'
                  disabled={!emailIsValid}
                  value='Recevoir un lien'
                />
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default ForgotModule;
