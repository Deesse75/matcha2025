import { FC, useEffect, useRef, useState } from 'react';
import InputLogin from './utils/InputLogin';
import InputEmail from './utils/InputEmail';
import { useNotification } from '../../../appUtils/context/notif.context';
import { appRedirect, mailRoute } from '../../../appUtils/variables/routeDef';
import DisconnectedRedirection from './utils/DisconnectedRedirection';
import { useNavigate } from 'react-router-dom';

type Props = {};

const ContactUsOff: FC<Props> = ({}) => {
  const notif = useNotification();
  const nav = useNavigate();
  const refSubject = useRef<HTMLInputElement>(null);
  const refTextEmail = useRef<HTMLTextAreaElement>(null);
  const [confirmedMessage, setConfirmedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [login, setLogin] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [textEmail, setTextEmail] = useState<string>('');
  const [validateLogin, setValidateLogin] = useState<boolean>(false);
  const [validateEmail, setValidateEmail] = useState<boolean>(false);
  const [sendEmail, setSendEmail] = useState<boolean>(false);

  const handleClick = () => {
    if (
      !refSubject.current ||
      !refSubject.current.value ||
      refSubject.current.value.length < 2 ||
      refSubject.current.value.length > 80
    ) {
      setErrorMessage(
        "L'objet de votre message doit contenir entre 2 et 80 caractères.",
      );
      setSubject('');
      return;
    }
    if (
      !refTextEmail.current ||
      !refTextEmail.current.value ||
      refTextEmail.current.value.length < 1 ||
      refTextEmail.current.value.length > 900
    ) {
      setErrorMessage(
        "Le texte de votre message doit contenir entre 1 et 900 caractères.",
      );
      setTextEmail('');
      return;
    }
    setSubject(refSubject.current.value.trim());
    setTextEmail(refTextEmail.current.value.trim());
    setSendEmail(true);
  };

  const handleClear = () => {
    if (refTextEmail.current) refTextEmail.current.value = '';
  };

  useEffect(() => {
    if (!sendEmail) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(mailRoute.contact, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ login, email, subject, textEmail }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          notif.setServerNotif(errorData.message || response.statusText);
          nav(appRedirect.errorInterne);
          return;
        }

        const data = await response.json();
        if (data?.status !== 'ok') {
          setErrorMessage(data.message || response.statusText);
          setValidateLogin(false);
          setValidateEmail(false);
          return;
        }

        setConfirmedMessage(data.message);
      } catch (error) {
        notif.setServerNotif((error as Error).message);
        nav(appRedirect.errorInterne);
      }
    };
    callBackEnd();

  }, [sendEmail])

  return (
    <>
      <div className='contact_container'>
        <div className='contact_section'>
          <div className='contact_header'>
            <div className='contact_title'>Contactez nous</div>
            <div className='contact_date'>{new Date().toISOString()}</div>
          </div>
          {confirmedMessage ? (
            <>
              <div className='contact_message'>{confirmedMessage}</div>
            </>
          ) : (
            <>
              <div className='contact_info'>
                <InputLogin
                  setLogin={setLogin}
                  setValidateLogin={setValidateLogin}
                />
                <InputEmail
                  setEmail={setEmail}
                  setValidateEmail={setValidateEmail}
                />
              </div>
              <div className='contact_subject'>
                <input
                  type='text'
                  name='subject'
                  id='subject'
                  ref={refSubject}
                  placeholder="Entrer l'objet de votrte message"
                  autoComplete='off'
                  minLength={2}
                  maxLength={80}
                />
              </div>
              <div className='contact_body'>
                <textarea
                  name='textEmail'
                  id='textEmail'
                  ref={refTextEmail}
                  minLength={1}
                  maxLength={900}
                  placeholder='Entrez votre message'
                ></textarea>
              </div>
              {errorMessage && (
                <div className='contact_error'>{errorMessage}</div>
              )}
              <div className='contact_button_container'>
                <button
                  className='contact_button'
                  disabled={!validateEmail || !validateLogin}
                  onClick={handleClick}
                >
                  Envoyer
                </button>
                <button className='contact_button' onClick={handleClear}>
                  Effacer le texte
                </button>
              </div>
            </>
          )}
          <DisconnectedRedirection activePage='contact' />
        </div>
        <div className='contact_img'></div>
      </div>
    </>
  );
};

export default ContactUsOff;
