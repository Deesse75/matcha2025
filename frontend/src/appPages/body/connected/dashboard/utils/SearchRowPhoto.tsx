import {
  Dispatch,
  SetStateAction,
  FC,
  useState,
  useEffect,
} from 'react';
import { Criteres } from '../../../../../appInterfaces/search.interfaces';

type Props = {
  criteres: Criteres | null;
  setCriteres: Dispatch<SetStateAction<Criteres | null>>;
};

const SearchRowPhoto: FC<Props> = ({ criteres, setCriteres }) => {
  const [withFoto, setWithFoto] = useState<boolean>(false);

  useEffect(() => {
    criteres
      ? setCriteres({
          ...criteres,
          photo: withFoto,
        })
      : setCriteres({
          ageMin: null,
          ageMax: null,
          fameMin: null,
          location: null,
          tags: null,
          photo: withFoto,
        });
  }, [withFoto]);

  return (
    <>
      <div className='search_row_photo_container'>
        <label htmlFor='searchFoto' className='search_row_photo_label'>
          Uniquement les profils avec photo(s) :
        </label>
        <div className='search_row_photo_value'>
          <input
            type='checked'
            name='searchFoto'
            id='searchFoto'
            onChange={() => setWithFoto(!withFoto)}
            checked={withFoto ? true : false}
          />
        </div>
      </div>
    </>
  );
};

export default SearchRowPhoto;
