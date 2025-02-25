import { Dispatch, SetStateAction, FC, useState, useEffect } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { UserDataType } from '../../../../interfaces/user.interfaces';
import { searchRoute } from '../../../../utils/variables/routeDef';
import SearchRowAge from './SearchRowAge';
import SearchRowFame from './SearchRowFame';
import SearchRowLocation from './SearchRowLocation';
import SearchRowPhoto from './SearchRowPhoto';
import SearchRowTags from './SearchRowTags';
import { Criteres } from '../../../../interfaces/search.interfaces';

type Props = {
  setListing: Dispatch<SetStateAction<UserDataType[] | null>>;
  criteres: Criteres | null;
  setCriteres: Dispatch<SetStateAction<Criteres | null>>;
};

const SearchData: FC<Props> = ({ setListing, criteres, setCriteres }) => {
  const [openInput, setOpenInput] = useState<boolean>(false);
  const [searchAction, setSearchAction] = useState<boolean>(false);
  const [validateAge, setValidateAge] = useState<boolean>(false);
  const [validateFame, setValidateFame] = useState<boolean>(false);
  const [validateLocation, setValidateLocation] = useState<boolean>(false);
  const [errorSubmit, setErrorSubmit] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[] | null>(null);

  const handleSubmit = () => {
    if (!validateAge || !validateFame || !validateLocation) return;
    if (!criteres && !selectedTags) {
      setErrorSubmit('Veuillez sélectionner au moins une valeur à rechercher.');
      return;
    }
    criteres
      ? setCriteres({
          ...criteres,
          tags: selectedTags,
        })
      : setCriteres({
          ageMin: null,
          ageMax: null,
          fameMin: null,
          location: null,
          tags: selectedTags,
          photo: null,
        });
  };

  useEffect(() => {
    if (!searchAction) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(searchRoute.searchData, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          body: JSON.stringify(criteres),
        });

        const data = await response.json();
        if (data.status !== 'ok') {
          setErrorSubmit(data.message || response.statusText);
          return;
        }
        setListing(data.listing);
        setSearchAction(false);
      } catch (error) {}
    };
    callBackEnd();
  }, [searchAction]);

  return (
    <>
      <div className='search_data_container'>
        <div
          className='search_data_title'
          onClick={() => setOpenInput(!openInput)}
        >
          <div className='search_data_title_text'>Recherche avancée</div>
          <div className='search_data_title_icon'>
            {openInput ? (
              <MdArrowDropDown size={20} />
            ) : (
              <MdArrowDropUp size={20} />
            )}
          </div>
        </div>
        <div className='search_data_row'>
          <div className='search_data_row_row'>
            <SearchRowAge
              criteres={criteres}
              setCriteres={setCriteres}
              setValidateAge={setValidateAge}
            />
          </div>
          <div className='search_data_row_row'>
            <SearchRowFame
              criteres={criteres}
              setCriteres={setCriteres}
              setValidateFame={setValidateFame}
            />
          </div>
          <div className='search_data_row_row'>
            <SearchRowLocation
              criteres={criteres}
              setCriteres={setCriteres}
              setValidateLocation={setValidateLocation}
            />
          </div>
          <div className='search_data_row_row'>
            <SearchRowTags
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              openInput={openInput}
            />
          </div>
          <div className='search_data_row_row'>
            <SearchRowPhoto criteres={criteres} setCriteres={setCriteres} />
          </div>
        </div>
        {errorSubmit && (
          <>
            <div className='search_data_submit_error'>{errorSubmit}</div>
          </>
        )}
        <button
          className='search_data_submit_button'
          name='searchSubmit'
          id='searchSubmit'
          disabled={
            !validateAge ||
            !validateFame ||
            !validateLocation ||
            !criteres ||
            !selectedTags
          }
          onClick={handleSubmit}
        >
          Rechercher
        </button>
      </div>
    </>
  );
};

export default SearchData;
