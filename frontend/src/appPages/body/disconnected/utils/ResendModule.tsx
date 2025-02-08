import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../../appUtils/context/notif.context";
import { authRoute, appRedirect } from "../../../../appUtils/variables/routeDef";
import InputEmail from "./InputEmail";

type Props = {};

const ResendModule: FC<Props> = ({}) => {
  const nav = useNavigate();
  const notif = useNotification();
  const [message, setMessage] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [validateEmail, setValidateEmail] = useState<boolean>(false);
  const [validateEmailMessage, setValidateEmailMessage] = useState<
    string | null
  >(null);
  const [tryToSending, setTryToSending] = useState<boolean>(false);

  useEffect(() => {
    if (!tryToSending) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(authRoute.resend, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
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
          setValidateEmail(false);
          return;
        }

        setValidateEmailMessage(data?.message);
      } catch (error) {
        notif.setServerNotif((error as Error).message);
        nav(appRedirect.errorInterne);
      }
    };
    callBackEnd();
  }, [tryToSending]);

  return (
    <>
      <div className='resend_module_container'>
        {validateEmailMessage ? (
          <>
            <div className='resend_module_email_sent'>
              {validateEmailMessage} toto
            </div>
          </>
        ) : (
          <>
            <div className='resend_module_error'>{message}</div>
            <InputEmail
              setEmail={setEmail}
              setValidateEmail={setValidateEmail}
            />
            <div className='resend_module_submit'>
              <button
                className='resend_submit'
                disabled={!validateEmail}
                onClick={() => setTryToSending(true)}
              >
                Recevoir un lien
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ResendModule;
