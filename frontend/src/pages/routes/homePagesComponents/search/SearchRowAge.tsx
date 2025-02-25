import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Criteres } from '../../../../interfaces/search.interfaces';

type Props = {
  criteres: Criteres | null;
  setCriteres: Dispatch<SetStateAction<Criteres | null>>;
  setValidateAge: Dispatch<SetStateAction<boolean>>;
};

const SearchRowAge: FC<Props> = ({ criteres, setCriteres, setValidateAge }) => {
  const refAgeMin = useRef<HTMLInputElement>(null);
  const refAgeMax = useRef<HTMLInputElement>(null);
  const [ageMin, setAgeMin] = useState<number | null>(null);
  const [ageMax, setAgeMax] = useState<number | null>(null);
  const [validateAgeMin, setValidateAgeMin] = useState<boolean>(true);
  const [validateAgeMax, setValidateAgeMax] = useState<boolean>(true);
  const [errorAgeMin, setErrorAgeMin] = useState<string | null>(null);
  const [errorAgeMax, setErrorAgeMax] = useState<string | null>(null);

  const handleAge = (selectedAge: string) => {
    const refAge = selectedAge === 'ageMin' ? refAgeMin : refAgeMax;
    const setAge = selectedAge === 'ageMin' ? setAgeMin : setAgeMax;
    const setValidateAge =
      selectedAge === 'ageMin' ? setValidateAgeMin : setValidateAgeMax;
    const setErrorAge =
      selectedAge === 'ageMin' ? setErrorAgeMin : setErrorAgeMax;

    if (refAge.current) {
      const age = refAge.current.value;
      age === ''
        ? (setValidateAge(true), setErrorAge(null), setAge(null))
        : isNaN(parseInt(age, 10))
          ? (setErrorAge("L'age minimum doit est un nombre positif."),
            setValidateAge(false))
          : parseInt(age, 10) < 18
            ? (setErrorAge("L'age minimum doit est au moins 18 ans."),
              setValidateAge(false))
            : parseInt(age, 10) > 99
              ? (setErrorAge("L'age minimum est limité à 99 ans."),
                setValidateAge(false))
              : ageMax && parseInt(age, 10) > ageMax
                ? (setErrorAge(
                    "L'age minimum ne peut pas être supérieur à l'age maximum.",
                  ),
                  setValidateAge(false))
                : (setValidateAge(true),
                  setErrorAge(null),
                  setAge(parseInt(age, 10)));
    }
  };

  useEffect(() => {
    if (validateAgeMin && validateAgeMax) {
      setValidateAge(true);
      criteres
        ? setCriteres({
            ...criteres,
            ageMin: ageMin,
            ageMax: ageMax,
          })
        : setCriteres({
            ageMin: ageMin,
            ageMax: ageMax,
            fameMin: null,
            location: null,
            tags: null,
            photo: null,
          });
    } else setValidateAge(false);
  }, [validateAgeMax, validateAgeMin]);

  return (
    <>
      <div className='search_row_age_container'>
        <div className='search_row_age_title'>Age :</div>
        <div className='search_row_age_value'>
          <label htmlFor='ageMin' className='search_row_age_label'>
            minimum :{' '}
          </label>
          <input
            className='search_row_age_input'
            type='number'
            name='ageMin'
            id='ageMin'
            autoComplete='off'
            min={18}
            max={99}
            ref={refAgeMin}
            onBlur={() => handleAge('ageMin')}
          />
          <label htmlFor='ageMax' className='search_row_age_label'>
            maximum :{' '}
          </label>

          <input
            className='search_row_age_input'
            type='number'
            name='ageMax'
            id='ageMax'
            min={18}
            max={99}
            autoComplete='off'
            ref={refAgeMax}
            onBlur={() => handleAge('ageMax')}
          />
        </div>
        {errorAgeMin && (
          <>
            <div className='search_row_age_error'>{errorAgeMin}</div>
          </>
        )}
        {errorAgeMax && (
          <>
            <div className='search_row_age_error'>{errorAgeMax}</div>
          </>
        )}
      </div>
    </>
  );
};

export default SearchRowAge;
