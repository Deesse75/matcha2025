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
  setEmail: Dispatch<SetStateAction<string | null>>;
  setEmailIsValid: Dispatch<SetStateAction<boolean>>;
};

const InputEmail: FC<Props> = ({ setEmail, setEmailIsValid }) => {
  const refEmail = useRef<HTMLInputElement>(null);
  const [openRules, setOpenRules] = useState<boolean>(false);
  const [rule1, setRule1] = useState<boolean>(false);
  const [rule2, setRule2] = useState<boolean>(false);

  const handleChange = () => {
    if (
      !refEmail.current ||
      !refEmail.current.value ||
      !refEmail.current.value.trim()
    ) {
      setRule1(false);
      setRule2(false);
      setEmail(null);
      return;
    }

    const email = refEmail.current.value.trim();

    email.match(
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
        )
      ? setRule1(true)
      : setRule1(false);
    const extensionEmail = email.split('@')[1];
    const domaineEmail = extensionEmail.split('.')[1];
    (domaineEmail && (domaineEmail === 'fr' || domaineEmail === 'com'))
      ? setRule2(true)
      : setRule2(false);
    setEmail(email);
  };

  useEffect(() => {
    if (!rule1 || !rule2) setEmailIsValid(false)
    else setEmailIsValid(true);
  }, [rule1, rule2])

  return (
    <>
      <div className='input_email_container'>
        <div className='input_email'>
          <div className='input_email_title'>Email :</div>
          <input
            className='input_email_value'
            type='email'
            name='email'
            id='email'
            ref={refEmail}
            onFocus={() => setOpenRules(true)}
            onBlur={() => setOpenRules(false)}
            onChange={handleChange}
            autoComplete='email'
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
                  Le format doit être conforme à une adresse email
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
                  Domaines de 1er niveau acceptés .fr ou .com
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default InputEmail;
