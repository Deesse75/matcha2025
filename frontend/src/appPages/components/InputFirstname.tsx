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
  setFirstname: Dispatch<SetStateAction<string | null>>;
  setFirstnameIsValid: Dispatch<SetStateAction<boolean>>;
};

const InputFirstname: FC<Props> = ({ setFirstname, setFirstnameIsValid }) => {
  const refFirstname = useRef<HTMLInputElement>(null);
  const [openRules, setOpenRules] = useState<boolean>(false);
  const [rule1, setRule1] = useState<boolean>(false);
  const [rule2, setRule2] = useState<boolean>(false);
  const [rule3, setRule3] = useState<boolean>(false);

  const handleChange = () => {
    if (
      !refFirstname.current ||
      !refFirstname.current.value ||
      !refFirstname.current.value.trim()
    ) {
      setRule1(false);
      setRule2(false);
      setRule3(false);
      setFirstname(null);
      return;
    }

    const firstname = refFirstname.current.value.trim();

    firstname[0].match(/[a-zA-Z]/) ? setRule1(true) : setRule1(false);
    firstname.length >= 2 && firstname.length <= 20
      ? setRule2(true)
      : setRule2(false);
    setRule3(/^[a-zA-Z _']*$/.test(firstname));
    setFirstname(firstname);
  };

  useEffect(() => {
    if (!rule1 || !rule2 || rule3) setFirstnameIsValid(false);
    else setFirstnameIsValid(true);
  }, [rule1, rule2, rule3]);

  return (
    <>
      <div className='input_firstname_container'>
        <div className='input_firstname'>
          <div className='input_firstname_title'>Prénom :</div>
          <input
            className='input_firstname_value'
            type='text'
            name='firstname'
            id='firstname'
            ref={refFirstname}
            onFocus={() => setOpenRules(true)}
            onBlur={() => setOpenRules(false)}
            onChange={handleChange}
            autoComplete='given-name'
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
                  Le prénom doit commencer par une lettre
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
                  Le prénom doit contenir entre 2 et 20 caractères
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
                  Le prénom ne peut contenir que des caractères alphabétique,
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

export default InputFirstname;
