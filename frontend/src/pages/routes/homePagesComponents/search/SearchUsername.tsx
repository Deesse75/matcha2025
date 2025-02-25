import {
  Dispatch,
  SetStateAction,
  FC,
  useState,
  useRef,
  useEffect,
} from 'react';
import { GiCheckMark } from 'react-icons/gi';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { searchRoute } from '../../../../utils/variables/routeDef';
import { UserDataType } from '../../../../interfaces/user.interfaces';

type Props = {
  setListing: Dispatch<SetStateAction<UserDataType[] | null>>;
};

const SearchUsername: FC<Props> = ({ setListing }) => {
  const [openInput, setOpenInput] = useState<boolean>(false);
  const [openRules, setOpenRules] = useState<boolean>(false);
  const [rule1, setRule1] = useState<boolean>(false);
  const [rule2, setRule2] = useState<boolean>(false);
  const refUsername = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [validateUsername, setValidateUsername] = useState<boolean>(false);
  const [searchUsername, setSearchUsername] = useState<boolean>(false);
  const [errorUsername, setErrorUsername] = useState<string | null>(null);

  const handleChange = () => {
    if (!refUsername.current || !refUsername.current.value) {
      setRule1(false);
      setRule2(false);
      setUsername(null);
      return;
    }
    refUsername.current.value[0].match(/[a-zA-Z]/)
      ? setRule1(true)
      : setRule1(false);
    refUsername.current.value.length >= 3 &&
    refUsername.current.value.length <= 20
      ? setRule2(true)
      : setRule2(false);
    rule1 && rule2 ? setUsername(refUsername.current.value) : setUsername(null);
  };

  const handleSubmit = () => {
    if (!username || !validateUsername) {
      setUsername(null);
      setRule1(false);
      setRule2(false);
      setValidateUsername(false);
      refUsername.current ? (refUsername.current.value = '') : null;
      setErrorUsername("Une erreur s'est produite, veuillez réessayer");
      return;
    }
    setErrorUsername(null);
    setSearchUsername(true);
  };

  useEffect(() => {
    if (!rule1 || !rule2) setValidateUsername(false);
    else setValidateUsername(true);
  }, [rule1, rule2]);

  useEffect(() => {
    if (!searchUsername) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(
          `${searchRoute.searchUsername}/${username}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          },
        );

        const data = await response.json();
        if (data.status !== 'ok') {
          setErrorUsername(data.message || response.statusText);
          setValidateUsername(false);
          setUsername(null);
          return;
        }

        setListing(data.listing);
      } catch (error) {}
    };
    callBackEnd();
  }, [searchUsername]);

  return (
    <>
      <div className='search_username_container'>
        <div
          className='search_username_title'
          onClick={() => setOpenInput(!openInput)}
        >
          <div className='search_username_title_text'>
            Rechercher un utilisateur via son pseudo
          </div>
          <div className='search_username_title_icon'>
            {openInput ? (
              <MdArrowDropDown size={20} />
            ) : (
              <MdArrowDropUp size={20} />
            )}
          </div>
        </div>
        <div className='search_username_row'>
          <input
            className='search_username_row_input'
            type='text'
            name='searchUsername'
            id='searchUsername'
            ref={refUsername}
            onFocus={() => setOpenRules(true)}
            onBlur={() => setOpenRules(false)}
            onChange={handleChange}
            autoComplete='username'
            minLength={3}
            maxLength={20}
          />
        </div>
        {openRules && (
          <>
            <div className='search_username_rules_container'>
              <div className='search_username_rules_row'>
                <div className='search_username_rules_check'>
                  {rule1 ? (
                    <GiCheckMark size={15} style={{ color: 'green' }} />
                  ) : (
                    <RxCross2 size={15} style={{ color: 'red' }} />
                  )}
                </div>
                <div className='search_username_rules_text'>
                  Le pseudo doit commencer par une lettre
                </div>
              </div>
              <div className='search_username_rules_row'>
                <div className='search_username_rules_check'>
                  {rule2 ? (
                    <GiCheckMark size={15} style={{ color: 'green' }} />
                  ) : (
                    <RxCross2 size={15} style={{ color: 'red' }} />
                  )}
                </div>
                <div className='search_username_rules_text'>
                  Entrez entre 3 et 20 caractères
                </div>
              </div>
            </div>
          </>
        )}
        {errorUsername && (
          <>
            <div className='search_username_submit_error'>{errorUsername}</div>
          </>
        )}
        <button
          className='search_username_submit'
          name='usernameSubmit'
          id='usernameSubmit'
          disabled={!validateUsername}
          onClick={handleSubmit}
        >
          Rechercher
        </button>
      </div>
    </>
  );
};

export default SearchUsername;
