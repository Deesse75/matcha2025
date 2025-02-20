import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authRoute, appRedirect } from "../../appUtils/variables/routeDef";
import InputPassword from "../components/InputPassword";

type Props = {};

const ReinitdModule: FC<Props> = ({}) => {
  const nav = useNavigate();
  const [password, setPassword] = useState<string | null>(null);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [actionConnecting, setActionConnecting] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const url = new URL(window.location.href);

  useEffect(() => {
    if (!url) return;
    const tokenURL = url.searchParams.get('token');
    if (!tokenURL) setErrorMessage("Le lien que vous tentez d'ouvrir est erronné.");
    else setToken(tokenURL);
  }, [url]);

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
      <div className='page_container'>
        <div className='reinit_module_container'>
          {token ? (
            <>
              {errorMessage ? (
                <>
                  <div className='reinit_module_error'>{errorMessage}</div>
                </>
              ) : (
                <>
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
                </>
              )}
            </>
          ) : (
            <>
              <div className='reinit_module_chargement'>
                Chargement de la page...
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ReinitdModule;
