import { FC, useState, useEffect } from "react";
import { authRoute } from "../../../utils/variables/routeDef";
import InputBirthdate from "../pagesUtils/InputBirthdate";
import InputEmail from "../pagesUtils/InputEmail";
import InputFirstname from "../pagesUtils/InputFirstname";
import InputLastname from "../pagesUtils/InputLastname";
import InputPassword from "../pagesUtils/InputPassword";
import InputUsername from "../pagesUtils/InputUsername";

type Props = {};

const SignupModule: FC<Props> = ({}) => {
  const [firstname, setFirstname] = useState<string | null>(null);
  const [lastname, setLastname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [birthdate, setBirthdate] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validMessage, setValidMessage] = useState<string | null>(null);
  const [firstnameIsValid, setFirstnameIsValid] = useState<boolean>(false);
  const [lastnameIsValid, setLastnameIsValid] = useState<boolean>(false);
  const [usernameIsValid, setUsernameIsValid] = useState<boolean>(false);
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [birthdateIsValid, setBirthdateIsValid] = useState<boolean>(false);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
  const [actionConnecting, setActionConnecting] = useState<boolean>(false);

  useEffect(() => {
    if (!actionConnecting) return;

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
            username,
            email,
            birthdate,
            password,
          }),
        });

        const data = await response.json();
        if (data.status !== 'ok') {
          setErrorMessage(data?.message || response.statusText);
          setFirstnameIsValid(false);
          setLastnameIsValid(false);
          setUsernameIsValid(false);
          setEmailIsValid(false);
          setBirthdateIsValid(false);
          setPasswordIsValid(false);
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
      <div className='signup_module_container'>
        {validMessage ? (
          <>
            <div className='signup_module_validate'>{validMessage}</div>
          </>
        ) : (
          <>
            <InputFirstname
              setFirstname={setFirstname}
              setFirstnameIsValid={setFirstnameIsValid}
            />
            <InputLastname
              setLastname={setLastname}
              setLastnameIsValid={setLastnameIsValid}
            />
            <InputUsername
              setUsername={setUsername}
              setUsernameIsValid={setUsernameIsValid}
            />
            <InputEmail setEmail={setEmail} setEmailIsValid={setEmailIsValid} />
            <InputBirthdate
              setBirthdate={setBirthdate}
              setBirthdateIsValid={setBirthdateIsValid}
            />
            <InputPassword
              setPassword={setPassword}
              setPasswordIsValid={setPasswordIsValid}
            />
            {errorMessage && (
              <>
                <div className='signup_module_error'>{errorMessage}</div>
              </>
            )}
            <button
              name='signupSubmit'
              id='signupSubmit'
              className='signup_submit'
              disabled={
                !firstnameIsValid ||
                !lastnameIsValid ||
                !usernameIsValid ||
                !emailIsValid ||
                !birthdateIsValid ||
                !passwordIsValid
              }
              onClick={() => setActionConnecting(true)}
            >
              S'enregistrer
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default SignupModule;
