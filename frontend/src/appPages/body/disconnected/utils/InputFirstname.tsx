import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { GiCheckMark } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';

type Props = {
  setFirstname: Dispatch<SetStateAction<string>>;
  setValidateFirstname: Dispatch<SetStateAction<boolean>>;
};

const InputFirstname: FC<Props> = ({ setFirstname, setValidateFirstname }) => {
  const refFirstname = useRef<HTMLInputElement>(null);
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
    if (!refFirstname.current || !refFirstname.current.value) {
      setRule1(false);
      setRule2(false);
      setRule3(false);
      setFirstname('');
      return;
    }
    refFirstname.current.value[0].match(/[a-zA-Z]/)
      ? setRule1(true)
      : setRule1(false);
    refFirstname.current.value.length >= 3 && refFirstname.current.value.length <= 20
      ? setRule2(true)
      : setRule2(false);
    setRule3(/^[a-zA-Z _']*$/.test(refFirstname.current.value));
    setFirstname(refFirstname.current.value);
  };

  useEffect(() => {
    if (!rule1 || !rule2 || rule3) setValidateFirstname(false);
    else setValidateFirstname(true);
  }, [rule1, rule2, rule3]);

  return (
    <>
      <div className='input_container'>
        <div className='input_section'>
          <div className='input_title'>Prénom :</div>
          <input
            type='text'
            name='firstname'
            id='firstname'
            ref={refFirstname}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            autoComplete='given-name'
            minLength={3}
            maxLength={30}
          />
          {openRules && (
            <>
              <div className='firstname_rules_container'>
                <div className='firstname_rules_section'>
                  <div className='firstname_rules_check'>
                    {rule1 ? (
                      <GiCheckMark size={15} style={{ color: 'green' }} />
                    ) : (
                      <RxCross2 size={15} style={{ color: 'red' }} />
                    )}
                  </div>
                  <div className='firstname_rules_text'>
                    Le prénom doit commencer par une lettre
                  </div>
                </div>
                <div className='firstname_rules_section'>
                  <div className='firstname_rules_check'>
                    {rule2 ? (
                      <GiCheckMark size={15} style={{ color: 'green' }} />
                    ) : (
                      <RxCross2 size={15} style={{ color: 'red' }} />
                    )}
                  </div>
                  <div className='firstname_rules_text'>
                    Le prénom doit contenir entre 3 et 30 caractères
                  </div>
                </div>
                <div className='firstname_rules_section'>
                  <div className='firstname_rules_check'>
                    {rule3 ? (
                      <GiCheckMark size={15} style={{ color: 'green' }} />
                    ) : (
                      <RxCross2 size={15} style={{ color: 'red' }} />
                    )}
                  </div>
                  <div className='firstname_rules_text'>
                    Le prénom ne peut contenir que des caractères alphabétique, l'espace, le trait d'union ou l'apostrophe
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

export default InputFirstname;
