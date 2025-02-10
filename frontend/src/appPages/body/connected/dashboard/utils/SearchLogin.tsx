import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { GiCheckMark } from 'react-icons/gi';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import {
  appRedirect,
  searchRoute,
} from '../../../../../appUtils/variables/routeDef';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../../../../appUtils/context/notif.context';

type Props = {
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};

const SearchLogin: FC<Props> = ({ setSelectedMenu }) => {
  const nav = useNavigate();
  const notif = useNotification();
  const [openInput, setOpenInput] = useState<boolean>(false);
  const [openRules, setOpenRules] = useState<boolean>(false);
  const [rule1, setRule1] = useState<boolean>(false);
  const [rule2, setRule2] = useState<boolean>(false);
  const refLogin = useRef<HTMLInputElement>(null);
  const [login, setLogin] = useState<string | null>(null);
  const [validateLogin, setValidateLogin] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = () => {
    if (!refLogin.current || !refLogin.current.value) {
      setRule1(false);
      setRule2(false);
      return;
    }
    refLogin.current.value[0].match(/[a-zA-Z]/)
      ? setRule1(true)
      : setRule1(false);
    refLogin.current.value.length >= 3 && refLogin.current.value.length <= 20
      ? setRule2(true)
      : setRule2(false);
  };

  const handleClick = () => {
    const login: string | null = refLogin?.current?.value || null;
    if (login) {
      setLogin(login);
      setErrorMessage(null);
    } else {
      setErrorMessage('Une erreur est survenue, veuillez recommencer.');
      setValidateLogin(false);
      if (refLogin?.current && refLogin.current.value)
        refLogin.current.value = '';
    }
  };

  useEffect(() => {
    if (!rule1 || !rule2) setValidateLogin(false);
    else setValidateLogin(true);
  }, [rule1, rule2]);

  useEffect(() => {
    if (!login) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(`${searchRoute.searchLogin}/${login}`, {
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
          setValidateLogin(false);
          setLogin(null);
          return;
        }

        //context listing***********************************************************
        setSelectedMenu('display');
      } catch (error) {

      }
    };
    callBackEnd();
  }, [login]);

  return (
    <>
      <div className='search_login_container'>
        <div className='search_login_title'>
          <div className='search_login_title_text'>
            Rechercher un utilisateur via son pseudo
          </div>
          <div
            className='search_login_title_icon'
            onClick={() => setOpenInput(!openInput)}
          >
            {openInput ? (
              <MdArrowDropDown size={20} />
            ) : (
              <MdArrowDropUp size={20} />
            )}
          </div>
        </div>
        <div className='search_login_section'>
          <input
            type='text'
            name='searchLogin'
            id='searchLogin'
            className='search_login_section_input'
            ref={refLogin}
            onFocus={() => setOpenRules(true)}
            onBlur={() => setOpenRules(false)}
            onChange={handleChange}
            autoComplete='username'
            minLength={3}
            maxLength={20}
          />
          {errorMessage && (
            <>
              <div className='search_login_section_error'>{errorMessage}</div>
            </>
          )}
          <button
            className='search_login_section_button'
            disabled={!validateLogin}
            onClick={handleClick}
          >
            Rechercher
          </button>
          {openRules && (
            <>
              <div className='search_login_rules_container'>
                <div className='search_login_rules_section'>
                  <div className='search_login_rules_check'>
                    {rule1 ? (
                      <GiCheckMark size={15} style={{ color: 'green' }} />
                    ) : (
                      <RxCross2 size={15} style={{ color: 'red' }} />
                    )}
                  </div>
                  <div className='search_login_rules_text'>
                    Le pseudo doit commencer par une lettre
                  </div>
                </div>
                <div className='search_login_rules_section'>
                  <div className='search_login_rules_check'>
                    {rule2 ? (
                      <GiCheckMark size={15} style={{ color: 'green' }} />
                    ) : (
                      <RxCross2 size={15} style={{ color: 'red' }} />
                    )}
                  </div>
                  <div className='search_login_rules_text'>
                    Entrez entre 3 et 20 caractères
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

export default SearchLogin;
