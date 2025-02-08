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
  setBirthdate: Dispatch<SetStateAction<string>>;
  setValidateBirthdate: Dispatch<SetStateAction<boolean>>;
};

const InputBirthdate: FC<Props> = ({ setBirthdate, setValidateBirthdate }) => {
  const refBirthdate = useRef<HTMLInputElement>(null);
  const [openRules, setOpenRules] = useState<boolean>(false);
  const [rule1, setRule1] = useState<boolean>(false);

  const handleFocus = () => {
    setOpenRules(true);
  };

  const handleBlur = () => {
    setOpenRules(false);
  };

  const handleChange = () => {
    if (!refBirthdate.current || !refBirthdate.current.value) {
      setRule1(false);
      setBirthdate('');
      return;
    }
    Math.floor(
      (new Date().getTime() - new Date(refBirthdate.current.value).getTime()) /
        (1000 * 60 * 60 * 24 * 365.25),
    ) >= 18
      ? setRule1(true)
      : setRule1(false);
    setBirthdate(refBirthdate.current.value.toString);
  };

  useEffect(() => {
    if (!rule1) setValidateBirthdate(false);
    else setValidateBirthdate(true);
  }, [rule1]);

  return (
    <>
      <div className='input_container'>
        <div className='input_section'>
          <div className='input_title'>Date de naissance :</div>
          <input
            type='date'
            name='birthdate'
            id='birthdate'
            ref={refBirthdate}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            autoComplete='off'
          />
          {openRules && (
            <>
              <div className='birthdate_rules_container'>
                <div className='birthdate_rules_section'>
                  <div className='birthdate_rules_check'>
                    {rule1 ? (
                      <GiCheckMark size={15} style={{ color: 'green' }} />
                    ) : (
                      <RxCross2 size={15} style={{ color: 'red' }} />
                    )}
                  </div>
                  <div className='birthdate_rules_text'>
                    Vous devez avoir au moins 18 ans
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

export default InputBirthdate;
