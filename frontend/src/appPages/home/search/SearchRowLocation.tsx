import {
  Dispatch,
  SetStateAction,
  FC,
  useRef,
  useState,
  useEffect,
} from 'react';
import { Criteres } from '../../../appInterfaces/search.interfaces';

type Props = {
  criteres: Criteres | null;
  setCriteres: Dispatch<SetStateAction<Criteres | null>>;
  setValidateLocation: Dispatch<SetStateAction<boolean>>;
};

const SearchRowLocation: FC<Props> = ({
  criteres,
  setCriteres,
  setValidateLocation,
}) => {
  const refLocation = useRef<HTMLSelectElement>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [validateLoc, setValidateLoc] = useState<boolean>(false);
  const [errorLocation, setErrorLocation] = useState<string | null>(null);

  const handleChange = () => {
    if (refLocation.current) {
      const loc = refLocation.current.value;
      loc === 'default'
        ? (setValidateLoc(true), setErrorLocation(null), setLocation(null))
        : ['region', 'county', 'town'].includes(loc)
          ? (setValidateLoc(true), setErrorLocation(null), setLocation(loc))
          : (setErrorLocation('Une erreur est survenue, veuillez réessayer.'),
            setValidateLoc(false));
    }
  };

  useEffect(() => {
    if (validateLoc) {
      setValidateLocation(true);
      criteres
        ? setCriteres({
            ...criteres,
            location: location,
          })
        : setCriteres({
            ageMin: null,
            ageMax: null,
            fameMin: null,
            location: location,
            tags: null,
            photo: null,
          });
    } else setValidateLocation(false);
  }, [validateLoc]);

  return (
    <>
      <div className='search_row_location_container'>
        <div className='search_row_location_title'>Localisation :</div>
        <div className='search_row_location_value'>
          <select
            className='search_row_location_select'
            name='zone'
            id='zone'
            ref={refLocation}
            onChange={handleChange}
          >
            <option defaultValue='default'>
              Selectionner la zone de recherche
            </option>
            <option value='town'>Ville</option>
            <option value='county'>Département</option>
            <option value='region'>Région</option>
          </select>
        </div>
        {errorLocation && (
          <>
            <div className='search_row_location_error'>{errorLocation}</div>
          </>
        )}
      </div>
    </>
  );
};

export default SearchRowLocation;
