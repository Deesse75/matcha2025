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
  setLastname: Dispatch<SetStateAction<string>>;
  setValidateLastname: Dispatch<SetStateAction<boolean>>;
};

const InputLastname: FC<Props> = ({ setLastname, setValidateLastname }) => {
  const refLastname = useRef<HTMLInputElement>(null);
  const [openRules, setOpenRules] = useState<boolean>(false);
  const [rule1, setRule1] = useState<boolean>(false);
  const [rule2, setRule2] = useState<boolean>(false);
  const [rule3, setRule3] = useState<boolean>(false);

  const handleFocus = () => {
    setOpenRules(true);
  };

  const handleBlur = () => {
    setOpenRules(false);
  };

  const handleChange = () => {
    if (!refLastname.current || !refLastname.current.value) {
      setRule1(false);
      setRule2(false);
      setRule3(false);
      setLastname('');
      return;
    }
    refLastname.current.value[0].match(/[a-zA-Z]/)
      ? setRule1(true)
      : setRule1(false);
    refLastname.current.value.length >= 2 &&
    refLastname.current.value.length <= 20
      ? setRule2(true)
      : setRule2(false);
    setRule3(/^[a-zA-Z _']*$/.test(refLastname.current.value));
    setLastname(refLastname.current.value);
  };

  useEffect(() => {
    if (!rule1 || !rule2 || rule3) setValidateLastname(false);
    else setValidateLastname(true);
  }, [rule1, rule2, rule3]);

  return (
    <>
      <div className='input_container'>
        <div className='input_section'>
          <div className='input_title'>Nom :</div>
          <input
            type='text'
            name='lastname'
            id='lastname'
            ref={refLastname}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            autoComplete='given-name'
            minLength={2}
            maxLength={30}
          />
          {openRules && (
            <>
              <div className='lastname_rules_container'>
                <div className='lastname_rules_section'>
                  <div className='lastname_rules_check'>
                    {rule1 ? (
                      <GiCheckMark size={15} style={{ color: 'green' }} />
                    ) : (
                      <RxCross2 size={15} style={{ color: 'red' }} />
                    )}
                  </div>
                  <div className='lastname_rules_text'>
                    Le nom doit commencer par une lettre
                  </div>
                </div>
                <div className='lastname_rules_section'>
                  <div className='lastname_rules_check'>
                    {rule2 ? (
                      <GiCheckMark size={15} style={{ color: 'green' }} />
                    ) : (
                      <RxCross2 size={15} style={{ color: 'red' }} />
                    )}
                  </div>
                  <div className='lastname_rules_text'>
                    Le nom doit contenir entre 2 et 30 caractères
                  </div>
                </div>
                <div className='lastname_rules_section'>
                  <div className='lastname_rules_check'>
                    {rule3 ? (
                      <GiCheckMark size={15} style={{ color: 'green' }} />
                    ) : (
                      <RxCross2 size={15} style={{ color: 'red' }} />
                    )}
                  </div>
                  <div className='lastname_rules_text'>
                    Le nom ne peut contenir que des caractères alphabétique,
                    l'espace, le trait d'union ou l'apostrophe
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

export default InputLastname;
