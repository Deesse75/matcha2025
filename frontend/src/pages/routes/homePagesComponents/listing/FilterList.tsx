import { Dispatch, FC, useRef, useState, useEffect } from 'react';
import { UserDataType } from '../../../../interfaces/user.interfaces';
import { useUserInfos } from '../../../../utils/context/user.context';
import { listRoute, searchRoute } from '../../../../utils/variables/routeDef';
import { Criteres } from '../../../../interfaces/search.interfaces';

type Props = {
  listing: UserDataType[] | null;
  setListing: Dispatch<UserDataType[] | null>;
  searchCriteres: Criteres | null;
  listType: string;
};

const FilterList: FC<Props> = ({
  listing,
  setListing,
  searchCriteres,
  listType,
}) => {
  const [filterCriteres, setFilterCriteres] = useState<Criteres | null>(null);
  const refAgeMin = useRef<HTMLInputElement>(null);
  const refAgeMax = useRef<HTMLInputElement>(null);
  const refFame = useRef<HTMLInputElement>(null);
  const me = useUserInfos();
  const [url, setUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filtering, setFiltering] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedLocationChange, setSelectedLocationChange] = useState<
    string | null
  >(null);
  const locationZone = ['region', 'county', 'town'];

  const handleSubmit = () => {
    if (
      !refAgeMax &&
      !refAgeMin &&
      !refFame &&
      !selectedLocation &&
      !selectedTags
    ) {
      setErrorMessage('Sélectionner les données à filtrer.');
    }
    //validation
    // setFilterCriteres({
    //   ageMin: refAgeMin.current?.value,
    //   ageMax: refAgeMax.current?.value,
    //   fame: refFame.current?.value,
    //   location: selectedLocation,
    //   tags: selectedTags,
    // });
    setFiltering(true);
  };

  useEffect(() => {
    listType === 'search'
      ? setUrl(searchRoute.searchFilter)
      : setUrl(listRoute.listingFilter);
  }, [listType]);

  useEffect(() => {
    if (!filtering) return;
    const callBackEnd = async () => {
      try {
        const response = await fetch(`${url}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          body: JSON.stringify({filterCriteres, searchCriteres, listType}),
        });

        const data = await response.json();
        if (data.status !== 'ok') {
          return;
        }
        setListing(data.listing);
      } catch (error) {}
    };
    callBackEnd();
  }, [filtering]);

  const handleLocationChange = (name: string) => {
    if (locationZone.includes(name)) {
      selectedLocationChange === name
        ? setSelectedLocationChange(null)
        : setSelectedLocationChange(name);
    } else setSelectedLocationChange(null);
  };

  useEffect(() => {
    setSelectedLocation(selectedLocationChange);
  }, [selectedLocationChange]);

  return (
    <>
      <div className='listing_filter_container'>
        <div className='listing_filter_title'>Filtrer par</div>
        <div className='listing_filter_row'>
          <div className='listing_filter_row_title'>Age</div>
          <div className='listing_filter_row_value'>
            <label htmlFor='ageMin' className='listing_filter_row_label'>
              minimum :
            </label>
            <input
              className='listing_filter_row_input'
              type='number'
              name='ageMin'
              id='ageMin'
              autoComplete='off'
              min={18}
              max={99}
              ref={refAgeMin}
              disabled={!listing}
            />
            <label htmlFor='ageMax' className='listing_filter_row_label'>
              maximum :
            </label>
            <input
              className='listing_filter_row_input'
              type='number'
              name='ageMax'
              id='ageMax'
              min={18}
              max={99}
              autoComplete='off'
              ref={refAgeMax}
              disabled={!listing}
            />
          </div>
        </div>
        <div className='listing_filter_row'>
          <div className='listing_filter_row_title'>Localisation</div>
          <div className='listing_filter_row_value'>
            <label htmlFor='regionfilter'>Région</label>
            <input
              type='checkbox'
              name='regionfilter'
              id='regionfilter'
              onChange={() => handleLocationChange('region')}
              checked={selectedLocation === 'region' ? true : false}
              disabled={!listing}
            />
            <label htmlFor='countyFilter'>Département</label>
            <input
              type='checkbox'
              name='countyFilter'
              id='countyFilter'
              onChange={() => handleLocationChange('county')}
              checked={selectedLocation === 'county' ? true : false}
              disabled={!listing}
            />
            <label htmlFor='townFiter'>Ville</label>
            <input
              type='checkbox'
              name='townFiter'
              id='townFiter'
              onChange={() => handleLocationChange('town')}
              checked={selectedLocation === 'town' ? true : false}
              disabled={!listing}
            />
          </div>
        </div>
        <div className='listing_filter_row'>
          <div className='listing_filter_row_title'>Note</div>
          <div className='listing_filter_row_value'>
            <div className='listing_filter_row_value_text'>
              Afficher les profils ayant au moins
            </div>
            <input
              className='listing_filter_row_value_input'
              type='number'
              name='fameFilter'
              id='fameFilter'
              autoComplete='off'
              ref={refFame}
              min={0}
              disabled={!listing}
            />
            <div className='listing_filter_row_value_text'>points</div>
          </div>
        </div>
        <div className='listing_filter_row'>
          <div className='listing_filter_row_title'>Centres d'intêrets</div>
          <div className='listing_filter_row_value'>
            <label htmlFor='tagFilter'>
              Profils ayant des centres d'intêret communs
            </label>
            <input
              type='checkbox'
              name='tagFilter'
              id='tagFilter'
              disabled={!listing || me.userData?.tags ? true : false}
              onChange={() => setSelectedTags(!selectedTags)}
              checked={selectedTags}
            />
            {me.userData && me.userData.tags ? (
              <>
                {me.userData.tags.map((tag, key) => (
                  <div
                    className='listing_filter_tag'
                    key={key as number}
                  >{`#${tag}`}</div>
                ))}
              </>
            ) : (
              <>
                <div className='listing_filter_row_value_empty'>
                  Vous n'avez pas enregistré vos centres d'intêret
                </div>
              </>
            )}
          </div>
        </div>
        <div className='listing_filter_submit'>
          <div className='listing_filter_submit_error'>{errorMessage}</div>
          <button
            className='listing_filter_submit_input'
            name='submitFilter'
            id='submitFilter'
            disabled={
              !refAgeMin &&
              !refAgeMax &&
              !refFame &&
              !selectedLocation &&
              !selectedTags
                ? true
                : false
            }
            onClick={handleSubmit}
          >
            Filtrer
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterList;
