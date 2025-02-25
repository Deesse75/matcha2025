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
  setLastname: Dispatch<SetStateAction<string | null>>;
  setLastnameIsValid: Dispatch<SetStateAction<boolean>>;
};

const InputLastname: FC<Props> = ({ setLastname, setLastnameIsValid }) => {
  const refLastname = useRef<HTMLInputElement>(null);
  const [openRules, setOpenRules] = useState<boolean>(false);
  const [rule1, setRule1] = useState<boolean>(false);
  const [rule2, setRule2] = useState<boolean>(false);
  const [rule3, setRule3] = useState<boolean>(false);

  const handleChange = () => {
    if (
      !refLastname.current ||
      !refLastname.current.value ||
      !refLastname.current.value.trim()
    ) {
      setRule1(false);
      setRule2(false);
      setRule3(false);
      setLastname(null);
      return;
    }

    const lastname = refLastname.current.value.trim();

    lastname[0].match(/[a-zA-Z]/) ? setRule1(true) : setRule1(false);
    lastname.length >= 2 && lastname.length <= 20
      ? setRule2(true)
      : setRule2(false);
    setRule3(/^[a-zA-Z _']*$/.test(lastname));
    setLastname(lastname);
  };

  useEffect(() => {
    if (!rule1 || !rule2 || rule3) setLastnameIsValid(false);
    else setLastnameIsValid(true);
  }, [rule1, rule2, rule3]);

  return (
    <>
      <div className='input_lastname_container'>
        <div className='input_lastname'>
          <div className='input_lastname_title'>Nom :</div>
          <input
            className='input_lastname_value'
            type='text'
            name='lastname'
            id='lastname'
            ref={refLastname}
            onFocus={() => setOpenRules(true)}
            onBlur={() => setOpenRules(false)}
            onChange={handleChange}
            autoComplete='family-name'
            minLength={2}
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
                  Le nom doit commencer par une lettre
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
                  Le nom doit contenir entre 2 et 20 caractères
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
                  Le nom ne peut contenir que des caractères alphabétique,
                  l'espace, le trait d'union ou l'apostrophe
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default InputLastname;
