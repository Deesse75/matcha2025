import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authRoute, appRedirect } from "../../appUtils/variables/routeDef";

type Props = {
  token: string | null;
};

const ValidateEmailModule: FC<Props> = ({token}) => {
  const nav = useNavigate();
  const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {

      const callBackEnd = async () => {
        try {
          const response = await fetch(authRoute.validate, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({token}),
          });

          const data = await response.json();
          setMessage(data?.message || response.statusText);
        } catch (error) {}
      };
      callBackEnd();
    }, []);

  return (
    <>
      <div className='page_container'>
        {message ? (
          <>
            <div className='loading_error'>{message}</div>
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
            <div className='page_chargement'>
              Nous vérifions vos informations.
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ValidateEmailModule