import { FC, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cleanUserInput } from '../routes/components/contact.functions';
import { mailRoute, appRedirect } from '../../utils/variables/routeDef';
import InputEmail from '../routes/components/InputEmail';
import InputUsername from '../routes/components/InputUsername';

type Props = {};

const ContactUsOff: FC<Props> = ({}) => {
  const nav = useNavigate();
  const refSubject = useRef<HTMLInputElement>(null);
  const refText = useRef<HTMLTextAreaElement>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedMessage, setConfirmedMessage] = useState<string | null>(null);
  const [usernameIsValid, setUsernameIsValid] = useState<boolean>(false);
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [sendEmail, setSendEmail] = useState<boolean>(false);
  const [count, setCount] = useState<number>(6);

  const handleSubmit = () => {
    if (refSubject.current && refText.current) {
      if (
        !refSubject.current.value ||
        refSubject.current.value.length < 2 ||
        refSubject.current.value.length > 80
      ) {
        setErrorMessage(
          "L'objet de votre message doit contenir entre 2 et 80 caractères.",
        );
        return;
      }

      if (
        !refText.current.value ||
        refText.current.value.length < 1 ||
        refText.current.value.length > 900
      ) {
        setErrorMessage(
          'Le texte de votre message doit contenir entre 1 et 900 caractères.',
        );
        return;
      }

      const subject = cleanUserInput(refSubject.current.value.trim());
      if (!subject) {
        setErrorMessage(
          "L'objet de votre message doit contenir entre 2 et 80 caractères.",
        );
        return;
      }

      const text = cleanUserInput(refText.current.value.trim());
      if (!text) {
        setErrorMessage(
          'Le texte de votre message doit contenir entre 1 et 900 caractères.',
        );
        return;
      }

      setSubject(subject);
      setText(text);
      setSendEmail(true);
    }
  };

  useEffect(() => {
    if (!sendEmail) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(mailRoute.contactOff, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, subject, text }),
        });

        const data = await response.json();
        if (data.status !== 'ok') {
          setErrorMessage(data.message || response.statusText);
          setUsernameIsValid(false);
          setEmailIsValid(false);
          setSendEmail(false);
          return;
        }

        setConfirmedMessage(data.message);
        setErrorMessage(null);
        setUsernameIsValid(false);
        setEmailIsValid(false);
        setUsername(null);
        setEmail(null);
        setSubject(null);
        setText(null);
        setSendEmail(false);
      } catch (error) {}
    };
    callBackEnd();
  }, [sendEmail]);

  useEffect(() => {
    if (!confirmedMessage) return;
    const interval = setInterval(() => {
      setCount((prev) => {
        const newCount = prev - 1;
        if (newCount === 0) clearInterval(interval);
        return newCount;
      });
    }, 1000);
    if (!count) nav(appRedirect.loading);
  }, [confirmedMessage]);

  return (
    <>
      <div className='contact_container'>
        <form onSubmit={handleSubmit}>
          <div className='contact_info'>
            <InputUsername
              setUsername={setUsername}
              setUsernameIsValid={setUsernameIsValid}
            />
            <InputEmail setEmail={setEmail} setEmailIsValid={setEmailIsValid} />
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
              name='text'
              id='text'
              ref={refText}
              minLength={1}
              maxLength={900}
              placeholder='Entrez votre message'
            ></textarea>
          </div>
          <div className='contact_submit_container'>
            {errorMessage && (
              <div className='contact_submit_error'>{errorMessage}</div>
            )}
            <input
              className='contact_submit_button'
              type='submit'
              name='contactSubmit'
              id='contactSubmit'
              value='Envoyer'
              disabled={!usernameIsValid || !emailIsValid}
            />
          </div>
        </form>
        {confirmedMessage && (
          <>
            <div className='contact_confirmed'>
              Votre message a bien été envoyé.
            </div>
            <div className='contact_confirmed'>
              L'équipe Matcha vous remercie.
            </div>
            <div className='contact_confirmed'>
              Vous allez être redirigé(e).
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ContactUsOff;
