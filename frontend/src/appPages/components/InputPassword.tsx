import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { GiCheckMark } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';

type Props = {
  setPassword: Dispatch<SetStateAction<string | null>>;
  setPasswordIsValid: Dispatch<SetStateAction<boolean>>;
};

const InputPassword: FC<Props> = ({ setPassword, setPasswordIsValid }) => {
  const refPassword = useRef<HTMLInputElement>(null);
  const [openRules, setOpenRules] = useState<boolean>(false);
  const [rule1, setRule1] = useState<boolean>(false);
  const [rule2, setRule2] = useState<boolean>(false);
  const [rule3, setRule3] = useState<boolean>(false);
  const [rule4, setRule4] = useState<boolean>(false);
  const [rule5, setRule5] = useState<boolean>(false);

  const handleChange = () => {
    if (!refPassword.current || !refPassword.current?.value) {
      setRule1(false);
      setRule2(false);
      setRule3(false);
      setRule4(false);
      setRule5(false);
      setPassword(null);
      return;
    }

    const password = refPassword.current.value;

    password.length >= 8 && password.length <= 30
      ? setRule1(true)
      : setRule1(false);
    password.match(/[A-Z]/) ? setRule2(true) : setRule2(false);
    password.match(/[a-z]/) ? setRule3(true) : setRule3(false);
    password.match(/[0-9]/) ? setRule4(true) : setRule4(false);
    password.match(/[?!@#$%&]/) ? setRule5(true) : setRule5(false);
    setPassword(password);
  };

  useEffect(() => {
    if (!rule1 || !rule2 || !rule3 || !rule4 || !rule5)
      setPasswordIsValid(false);
    else setPasswordIsValid(true);
  }, [rule1, rule2, rule3, rule4, rule5]);

  return (
    <>
      <div className='input_password_container'>
        <div className='input_password'>
          <div className='input_password_title'>Mot de passe :</div>
          <input
            className='input_password_value'
            type='password'
            name='password'
            id='password'
            placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;'
            ref={refPassword}
            onFocus={() => setOpenRules(true)}
            onBlur={() => setOpenRules(false)}
            onChange={handleChange}
            autoComplete='off'
            minLength={8}
            maxLength={30}
          />
        </div>
        {openRules && (
          <>
            <div className='rules_container'>
              <div className='rules_section'>
                <div className='rules_check'>
                  {rule1 ? (
                    <GiCheckMark size={15} style={{ color: 'green' }} />
                  ) : (
                    <RxCross2 size={15} style={{ color: 'red' }} />
                  )}
                </div>
                <div className='rules_text'>
                  Le mot de passe doit contenir entre 8 et 30 caractères
                </div>
              </div>
              <div className='rules_section'>
                <div className='rules_check'>
                  {rule2 ? (
                    <GiCheckMark size={15} style={{ color: 'green' }} />
                  ) : (
                    <RxCross2 size={15} style={{ color: 'red' }} />
                  )}
                </div>
                <div className='rules_text'>
                  Le doit contenir au moins une lettre majuscule
                </div>
              </div>
              <div className='rules_section'>
                <div className='rules_check'>
                  {rule3 ? (
                    <GiCheckMark size={15} style={{ color: 'green' }} />
                  ) : (
                    <RxCross2 size={15} style={{ color: 'red' }} />
                  )}
                </div>
                <div className='rules_text'>
                  Le doit contenir au moins une lettre miniscule
                </div>
              </div>
              <div className='rules_section'>
                <div className='rules_check'>
                  {rule4 ? (
                    <GiCheckMark size={15} style={{ color: 'green' }} />
                  ) : (
                    <RxCross2 size={15} style={{ color: 'red' }} />
                  )}
                </div>
                <div className='rules_text'>
                  Le doit contenir au moins un chiffre
                </div>
              </div>
              <div className='rules_section'>
                <div className='rules_check'>
                  {rule5 ? (
                    <GiCheckMark size={15} style={{ color: 'green' }} />
                  ) : (
                    <RxCross2 size={15} style={{ color: 'red' }} />
                  )}
                </div>
                <div className='rules_text'>
                  Le doit contenir au moins un caractère spécial parmi ?!@#$%&
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default InputPassword;
