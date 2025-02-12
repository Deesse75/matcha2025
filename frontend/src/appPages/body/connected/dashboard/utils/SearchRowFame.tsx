import { Dispatch, SetStateAction, FC, useRef, useState, useEffect } from "react";
import { Criteres } from "../../../../../appInterfaces/search.interfaces";

type Props = {
  criteres: Criteres | null;
  setCriteres: Dispatch<SetStateAction<Criteres | null>>;
  setValidateFame: Dispatch<SetStateAction<boolean>>;
};

const SearchRowFame: FC<Props> = ({
  criteres,
  setCriteres,
  setValidateFame,
}) => {
  const refFameMin = useRef<HTMLInputElement>(null);
  const [fameMin, setfameMin] = useState<number | null>(null);
  const [validateFameMin, setValidateFameMin] = useState<boolean>(true);
  const [errorFameMin, setErrorFameMin] = useState<string | null>(null);

  const handleFame = () => {
    if (refFameMin.current) {
      const fame = refFameMin.current.value;
      fame === ''
        ? (setValidateFameMin(true), setErrorFameMin(null), setfameMin(null))
        : isNaN(parseInt(fame, 10)) || parseInt(fame, 10) < 0
          ? (setErrorFameMin('La note minimale doit est un nombre positif.'),
            setValidateFameMin(false))
          : (setValidateFameMin(true),
            setErrorFameMin(null),
            setfameMin(parseInt(fame, 10)));
    }
  };

  useEffect(() => {
    if (validateFameMin) {
      setValidateFame(true);
      criteres
        ? setCriteres({
            ...criteres,
            fameMin: fameMin,
          })
        : setCriteres({
            ageMin: null,
            ageMax: null,
            fameMin: fameMin,
            location: null,
            tags: null,
            photo: null,
          });
    } else setValidateFame(false);
  }, [validateFameMin]);

  return (
    <>
      <div className='search_row_fame_container'>
        <div className='search_row_fame_title'>Note :</div>
        <div className='search_row_fame_value'>
          <input
          className="search_row_fame_input"
            type='number'
            name='fameMin'
            id='fameMin'
            min={0}
            autoComplete='off'
            ref={refFameMin}
            onBlur={handleFame}
          />
        </div>
        {errorFameMin && (
          <>
            <div className='search_row_fame_error'>{errorFameMin}</div>
          </>
        )}
      </div>
    </>
  );
};

export default SearchRowFame;
