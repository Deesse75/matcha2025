import { Dispatch, SetStateAction, FC, useState, useRef, useEffect } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../../../appUtils/context/notif.context";
import { searchRoute, appRedirect } from "../../../../../appUtils/variables/routeDef";

type Props = {
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};

const SearchLocation: FC<Props> = ({ setSelectedMenu }) => {
  const nav = useNavigate();
  const notif = useNotification();
  const [openInput, setOpenInput] = useState<boolean>(false);
  const refLocation = useRef<HTMLSelectElement>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [validateLocation, setValidateLocation] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClick = () => {
    const location: string | null = refLocation?.current?.value || null;
    if (location) {
      setLocation(location);
      setErrorMessage(null);
    } else {
      setErrorMessage('Une erreur est survenue, veuillez recommencer.');
      setValidateLocation(false);
      if (refLocation?.current && refLocation.current.value)
        refLocation.current.value = 'default';
    }
  };

  useEffect(() => {
    if (!location) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(`${searchRoute.searchLocation}/${location}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const errorData = await response.json();
          notif.setServerNotif(errorData.message || response.statusText);
          nav(appRedirect.errorInterne);
          return;
        }

        const data = await response.json();
        if (data.status !== 'ok') {
          setErrorMessage(data.message || response.statusText);
          setValidateLocation(false);
          setLocation(null);
          return;
        }

        //context listing***********************************************************
        setSelectedMenu('display');
      } catch (error) {}
    };
    callBackEnd();
  }, [location]);

  return (
    <>
      <div className='search_location_container'>
        <div className='search_location_title'>
          <div className='search_location_title_text'>
            Rechercher les profils proche de votre localisation
          </div>
          <div
            className='search_location_title_icon'
            onClick={() => setOpenInput(!openInput)}
          >
            {openInput ? (
              <MdArrowDropDown size={20} />
            ) : (
              <MdArrowDropUp size={20} />
            )}
          </div>
        </div>
        <div className='search_location_section'>
        <select
          name='zone'
          id='zone'
          ref={refLocation}
          className='search_location_section_select'
        >
          <option defaultValue='default'>Selectionner la zone de recherche</option>
          <option value='town'>Ville</option>
          <option value='county'>Département</option>
          <option value='region'>Région</option>
        </select>
          {errorMessage && (
            <>
              <div className='search_location_section_error'>{errorMessage}</div>
            </>
          )}
          <button
            className='search_location_section_button'
            disabled={!validateLocation}
            onClick={handleClick}
          >
            Rechercher
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchLocation;
