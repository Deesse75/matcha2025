import { FC, useState, useEffect } from "react";
import { authRoute } from "../../../utils/variables/routeDef";
import InputEmail from "../pagesUtils/InputEmail";

type Props = {};

const ResendModule: FC<Props> = ({}) => {
  const [email, setEmail] = useState<string | null>(null);
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validMessage, setValidMessage] = useState<string | null>(null);
  const [actionConnecting, setActionConnecting] = useState<boolean>(false);

  useEffect(() => {
    if (!actionConnecting) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(authRoute.resend, {
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
      <div className='resend_module_container'>
        {validMessage ? (
          <>
            <div className='resend_module_validate'>{validMessage}</div>
          </>
        ) : (
          <>
            <InputEmail setEmail={setEmail} setEmailIsValid={setEmailIsValid} />
            {errorMessage && (
              <>
                <div className='resend_module_error'>{errorMessage}</div>
              </>
            )}
            <button
              className='resend_submit'
              name='resendSubmit'
              id='resendSubmit'
              disabled={!emailIsValid}
              onClick={() => setActionConnecting(true)}
            >
              Recevoir un lien
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ResendModule;
