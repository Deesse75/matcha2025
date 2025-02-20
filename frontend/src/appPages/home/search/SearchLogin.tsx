import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { GiCheckMark } from 'react-icons/gi';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { searchRoute } from '../../../appUtils/variables/routeDef';

type Props = {
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};

const SearchLogin: FC<Props> = ({ setSelectedMenu }) => {
  const [openInput, setOpenInput] = useState<boolean>(false);
  const [openRules, setOpenRules] = useState<boolean>(false);
  const [rule1, setRule1] = useState<boolean>(false);
  const [rule2, setRule2] = useState<boolean>(false);
  const refLogin = useRef<HTMLInputElement>(null);
  const [login, setLogin] = useState<string | null>(null);
  const [validateLogin, setValidateLogin] = useState<boolean>(false);
  const [searchLogin, setSearchLogin] = useState<boolean>(false);
  const [errorLogin, setErrorLogin] = useState<string | null>(null);

  const handleChange = () => {
    if (!refLogin.current || !refLogin.current.value) {
      setRule1(false);
      setRule2(false);
      setLogin(null);
      return;
    }
    refLogin.current.value[0].match(/[a-zA-Z]/)
      ? setRule1(true)
      : setRule1(false);
    refLogin.current.value.length >= 3 && refLogin.current.value.length <= 20
      ? setRule2(true)
      : setRule2(false);
    rule1 && rule2 ? setLogin(refLogin.current.value) : setLogin(null);
  };

  const handleSubmit = () => {
    if (!login || !validateLogin) {
      setLogin(null);
      setRule1(false);
      setRule2(false);
      setValidateLogin(false);
      refLogin.current ? (refLogin.current.value = '') : null;
      setErrorLogin("Une erreur s'est produite, veuillez réessayer");
      return;
    }
    setErrorLogin(null);
    setSearchLogin(true);
  };

  useEffect(() => {
    if (!rule1 || !rule2) setValidateLogin(false);
    else setValidateLogin(true);
  }, [rule1, rule2]);

  useEffect(() => {
    if (!searchLogin) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(`${searchRoute.searchLogin}/${login}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });

        const data = await response.json();
        if (data.status !== 'ok') {
          setErrorLogin(data.message || response.statusText);
          setValidateLogin(false);
          setLogin(null);
          return;
        }

        //context listing***********************************************************
        setSelectedMenu('listing');
      } catch (error) {}
    };
    callBackEnd();
  }, [searchLogin]);

  return (
    <>
      <div className='search_login_container'>
        <div
          className='search_login_title'
          onClick={() => setOpenInput(!openInput)}
        >
          <div className='search_login_title_text'>
            Rechercher un utilisateur via son pseudo
          </div>
          <div className='search_login_title_icon'>
            {openInput ? (
              <MdArrowDropDown size={20} />
            ) : (
              <MdArrowDropUp size={20} />
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='search_login_section'>
            <input
              className='search_login_section_input'
              type='text'
              name='searchLogin'
              id='searchLogin'
              ref={refLogin}
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
          <div className='search_login_submit'>
            {errorLogin && (
              <>
                <div className='search_login_submit_error'>{errorLogin}</div>
              </>
            )}
            <input
              className='search_login_submit_button'
              type='submit'
              name='loginSubmit'
              id='loginSubmit'
              value='Rechercher'
              disabled={!validateLogin}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchLogin;
