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
  setBirthdate: Dispatch<SetStateAction<string | null>>;
  setBirthdateIsValid: Dispatch<SetStateAction<boolean>>;
};

const InputBirthdate: FC<Props> = ({ setBirthdate, setBirthdateIsValid }) => {
  const refBirthdate = useRef<HTMLInputElement>(null);
  const [openRules, setOpenRules] = useState<boolean>(false);
  const [rule1, setRule1] = useState<boolean>(false);

  const handleChange = () => {
    if (
      !refBirthdate.current ||
      !refBirthdate.current.value ||
      !refBirthdate.current.value.trim()
    ) {
      setRule1(false);
      setBirthdate(null);
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
    if (!rule1) setBirthdateIsValid(false);
    else setBirthdateIsValid(true);
  }, [rule1]);

  return (
    <>
      <div className='input_birthdate_container'>
        <div className='input_birthdate'>
          <div className='input_birthdate_title'>Date de naissance :</div>
          <input
            className='input_birthdate_value'
            type='date'
            name='birthdate'
            id='birthdate'
            ref={refBirthdate}
            onFocus={() => setOpenRules(true)}
            onBlur={() => setOpenRules(false)}
            onChange={handleChange}
            autoComplete='off'
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
                  Vous devez avoir au moins 18 ans
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default InputBirthdate;
