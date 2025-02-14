import { FC, useState, useEffect } from "react";
import { authRoute } from "../../appUtils/variables/routeDef";
import InputBirthdate from "../components/InputBirthdate";
import InputEmail from "../components/InputEmail";
import InputFirstname from "../components/InputFirstname";
import InputLastname from "../components/InputLastname";
import InputPassword from "../components/InputPassword";
import InputUsername from "../components/InputUsername";

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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setActionConnecting(true);
              }}
            >
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
              <InputEmail
                setEmail={setEmail}
                setEmailIsValid={setEmailIsValid}
              />
              <InputBirthdate
                setBirthdate={setBirthdate}
                setBirthdateIsValid={setBirthdateIsValid}
              />
              <InputPassword
                setPassword={setPassword}
                setPasswordIsValid={setPasswordIsValid}
              />
              <div className='signup_module_submit'>
                {errorMessage && (
                  <>
                    <div className='signup_module_error'>{errorMessage}</div>
                  </>
                )}
                <input
                  type='submit'
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
                  value="S'enregistrer"
                />
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default SignupModule;
