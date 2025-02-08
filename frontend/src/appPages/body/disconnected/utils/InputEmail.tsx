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
  setEmail: Dispatch<SetStateAction<string>>;
  setValidateEmail: Dispatch<SetStateAction<boolean>>;
};

const InputEmail: FC<Props> = ({ setEmail, setValidateEmail }) => {
  const refEmail = useRef<HTMLInputElement>(null);
  const [openRules, setOpenRules] = useState<boolean>(false);
  const [rule1, setRule1] = useState<boolean>(false);
  const [rule2, setRule2] = useState<boolean>(false);

  const handleFocus = () => {
    setOpenRules(true);
  };

  const handleBlur = () => {
    setOpenRules(false);
  };

  const handleChange = () => {
    if (!refEmail.current || !refEmail.current.value) {
      setRule1(false);
      setRule2(false);
      setEmail('');
      return;
    }
    refEmail.current.value.match(
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
        )
      ? setRule1(true)
      : setRule1(false);
    const extensionEmail = refEmail.current.value.split('@')[1];
    const domaineEmail = extensionEmail.split('.')[1];
    (domaineEmail && (domaineEmail === 'fr' || domaineEmail === 'com'))
      ? setRule2(true)
      : setRule2(false);
    setEmail(refEmail.current.value);
  };

  useEffect(() => {
    if (!rule1 || !rule2) setValidateEmail(false)
    else setValidateEmail(true);
  }, [rule1, rule2])

  return (
    <>
      <div className='input_container'>
        <div className='input_section'>
          <div className='input_title'>Email :</div>
          <input
            type='email'
            name='email'
            id='email'
            ref={refEmail}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            autoComplete='email'
          />
          {openRules && (
            <>
              <div className='email_rules_container'>
                <div className='email_rules_section'>
                  <div className='email_rules_check'>
                    {rule1 ? (
                      <GiCheckMark size={15} style={{ color: 'green' }} />
                    ) : (
                      <RxCross2 size={15} style={{ color: 'red' }} />
                    )}
                  </div>
                  <div className='email_rules_text'>
                    Le format doit être conforme à une adresse email
                  </div>
                </div>
                <div className='email_rules_section'>
                  <div className='email_rules_check'>
                    {rule2 ? (
                      <GiCheckMark size={15} style={{ color: 'green' }} />
                    ) : (
                      <RxCross2 size={15} style={{ color: 'red' }} />
                    )}
                  </div>
                  <div className='email_rules_text'>
                    Domaines de 1er niveau acceptés .fr ou .com
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

export default InputEmail;
