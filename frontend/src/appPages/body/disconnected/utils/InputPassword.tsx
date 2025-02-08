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
  setPassword: Dispatch<SetStateAction<string>>;
  setValidatePassword: Dispatch<SetStateAction<boolean>>;
};

const InputPassword: FC<Props> = ({ setPassword, setValidatePassword }) => {
  const refPassword = useRef<HTMLInputElement>(null);
  const [openRules, setOpenRules] = useState<boolean>(false);
  const [rule1, setRule1] = useState<boolean>(false);
  const [rule2, setRule2] = useState<boolean>(false);
  const [rule3, setRule3] = useState<boolean>(false);
  const [rule4, setRule4] = useState<boolean>(false);
  const [rule5, setRule5] = useState<boolean>(false);

  const handleFocus = () => {
    setOpenRules(true);
  };

  const handleBlur = () => {
    setOpenRules(false);
  };

  const handleChange = () => {
    if (!refPassword.current || !refPassword.current?.value) {
      setRule1(false);
      setRule2(false);
      setRule3(false);
      setRule4(false);
      setRule5(false);
      setPassword('');
      return;
    }
    (refPassword.current.value.length >= 8 && refPassword.current.value.length <= 30) ? setRule1(true) : setRule1(false);
    refPassword.current.value.match(/[A-Z]/) ? setRule2(true) : setRule2(false);
    refPassword.current.value.match(/[a-z]/) ? setRule3(true) : setRule3(false);
    refPassword.current.value.match(/[0-9]/) ? setRule4(true) : setRule4(false);
    refPassword.current.value.match(/[?!@#$%&]/)
      ? setRule5(true)
      : setRule5(false);
    setPassword(refPassword.current.value);
  };

  useEffect(() => {
    if (!rule1 || !rule2 || !rule3 || !rule4 || !rule5)
      setValidatePassword(false);
    else setValidatePassword(true);
  }, [rule1, rule2, rule3, rule4, rule5]);

  return (
    <>
      <div className='input_container'>
        <div className='input_section'>
          <div className='input_title'>Mot de passe :</div>
          <input
            type='password'
            name='password'
            id='password'
            ref={refPassword}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            autoComplete='new-password'
            minLength={8}
            maxLength={30}
          />
          {openRules && (
            <>
              <div className='password_rules_container'>
                <div className='password_rules_section'>
                  <div className='password_rules_check'>
                    {rule1 ? (
                      <GiCheckMark size={15} style={{ color: 'green' }} />
                    ) : (<RxCross2 size={15} style={{ color: 'red' }} />)}
                  </div>
                  <div className='password_rules_text'>
                    Le mot de passe doit contenir entre 8 et 30 caractères
                  </div>
                </div>
                <div className='password_rules_section'>
                  <div className='password_rules_check'>
                    {rule2 ? (
                      <GiCheckMark size={15} style={{ color: 'green' }} />
                    ) : (<RxCross2 size={15} style={{ color: 'red' }} />)}
                  </div>
                  <div className='password_rules_text'>
                    Le doit contenir au moins une lettre majuscule
                  </div>
                </div>
                <div className='password_rules_section'>
                  <div className='password_rules_check'>
                    {rule3 ? (
                      <GiCheckMark size={15} style={{ color: 'green' }} />
                    ) : (<RxCross2 size={15} style={{ color: 'red' }} />)}
                  </div>
                  <div className='password_rules_text'>
                    Le doit contenir au moins une lettre miniscule
                  </div>
                </div>
                <div className='password_rules_section'>
                  <div className='password_rules_check'>
                    {rule4 ? (
                      <GiCheckMark size={15} style={{ color: 'green' }} />
                    ) : (<RxCross2 size={15} style={{ color: 'red' }} />)}
                  </div>
                  <div className='password_rules_text'>
                    Le doit contenir au moins un chiffre
                  </div>
                </div>
                <div className='password_rules_section'>
                  <div className='password_rules_check'>
                    {rule5 ? (
                      <GiCheckMark size={15} style={{ color: 'green' }} />
                    ) : (<RxCross2 size={15} style={{ color: 'red' }} />)}
                  </div>
                  <div className='password_rules_text'>
                    Le doit contenir au moins un caractère spécial parmi ?!@#$%&
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default InputPassword;
