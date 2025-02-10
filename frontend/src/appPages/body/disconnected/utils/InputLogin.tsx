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
  setLogin: Dispatch<SetStateAction<string>>;
  setValidateLogin: Dispatch<SetStateAction<boolean>>;
};

const InputLogin: FC<Props> = ({ setLogin, setValidateLogin }) => {
  const refLogin = useRef<HTMLInputElement>(null);
  const [openRules, setOpenRules] = useState<boolean>(false);
  const [rule1, setRule1] = useState<boolean>(false);
  const [rule2, setRule2] = useState<boolean>(false);

  const handleChange = () => {
    if (!refLogin.current || !refLogin.current.value) {
      setRule1(false);
      setRule2(false);
      setLogin('');
      return;
    }
    refLogin.current.value[0].match(/[a-zA-Z]/)
      ? setRule1(true)
      : setRule1(false);
    (refLogin.current.value.length >= 5 && refLogin.current.value.length <= 20) ? setRule2(true) : setRule2(false);
    setLogin(refLogin.current.value);
  };

  useEffect(() => {
    if (!rule1 || !rule2) setValidateLogin(false);
    else setValidateLogin(true);
  }, [rule1, rule2]);

  return (
    <>
      <div className='input_container'>
        <div className='input_section'>
          <div className='input_title'>Login :</div>
          <input
            type='text'
            name='login'
            id='login'
            ref={refLogin}
            onFocus={() => setOpenRules(true)}
            onBlur={() => setOpenRules(false)}
            onChange={handleChange}
            autoComplete='username'
            minLength={5}
            maxLength={20}
          />
          {openRules && (
            <>
              <div className='login_rules_container'>
                <div className='login_rules_section'>
                  <div className='login_rules_check'>
                    {rule1 ? (
                      <GiCheckMark size={15} style={{ color: 'green' }} />
                    ) : (
                      <RxCross2 size={15} style={{ color: 'red' }} />
                    )}
                  </div>
                  <div className='login_rules_text'>
                    Le login doit commencer par une lettre
                  </div>
                </div>
                <div className='login_rules_section'>
                  <div className='login_rules_check'>
                    {rule2 ? (
                      <GiCheckMark size={15} style={{ color: 'green' }} />
                    ) : (
                      <RxCross2 size={15} style={{ color: 'red' }} />
                    )}
                  </div>
                  <div className='login_rules_text'>
                    Le login doit contenir entre 5 et 20 caractères
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

export default InputLogin;
