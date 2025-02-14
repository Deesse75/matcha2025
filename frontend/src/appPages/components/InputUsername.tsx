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
  setUsername: Dispatch<SetStateAction<string | null>>;
  setUsernameIsValid: Dispatch<SetStateAction<boolean>>;
};

const InputUsername: FC<Props> = ({ setUsername, setUsernameIsValid }) => {
  const refUsername = useRef<HTMLInputElement>(null);
  const [openRules, setOpenRules] = useState<boolean>(false);
  const [rule1, setRule1] = useState<boolean>(false);
  const [rule2, setRule2] = useState<boolean>(false);

  const handleChange = () => {
    if (
      !refUsername.current ||
      !refUsername.current.value ||
      !refUsername.current.value.trim()
    ) {
      setRule1(false);
      setRule2(false);
      setUsername(null);
      return;
    }

    const username = refUsername.current.value.trim();

    username[0].match(/[a-zA-Z]/)
      ? setRule1(true)
      : setRule1(false);
    username.length >= 5 && username.length <= 20
      ? setRule2(true)
      : setRule2(false);
    setUsername(username);
  };

  useEffect(() => {
    if (!rule1 || !rule2) setUsernameIsValid(false);
    else setUsernameIsValid(true);
  }, [rule1, rule2]);

  return (
    <>
      <div className='input_username_container'>
        <div className='input_username'>
          <div className='input_username_title'>Username :</div>
          <input
            className='input_username_value'
            type='text'
            name='username'
            id='username'
            ref={refUsername}
            onFocus={() => setOpenRules(true)}
            onBlur={() => setOpenRules(false)}
            onChange={handleChange}
            autoComplete='username'
            minLength={5}
            maxLength={20}
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
                  Le login doit commencer par une lettre
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
                  Le login doit contenir entre 5 et 20 caractères
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default InputUsername;
