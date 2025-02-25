import { FC, useState, useEffect } from "react";
import { authRoute } from "../../../utils/variables/routeDef";

type Props = {};

const ValidateEmailModule: FC<Props> = ({}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const url = new URL(window.location.href);

  useEffect(() => {
    if (!url) return;
    const tokenURL = url.searchParams.get('token');
    if (!tokenURL) setMessage("Le lien que vous tentez d'ouvrir est erronné.");
    else setToken(tokenURL);
  }, [url]);

  useEffect(() => {
    if (!token) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(authRoute.validateEmail, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        setMessage(data?.message || response.statusText);
      } catch (error) {}
    };
    callBackEnd();
  }, [token]);

  return (
    <>
      <div className='page_container'>
        {message ? (
          <>
            <div className='validate_email_message'>{message}</div>
            <div className='validate_email_text'>
              Vous pouvez fermer cette page
            </div>
          </>
        ) : (
          <>
            <div className='validate_email_text'>
              Nous vérifions vos informations.
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ValidateEmailModule;
