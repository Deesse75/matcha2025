import { FC, useState, useEffect } from 'react';
import { userRoute } from '../../../../../utils/variables/routeDef';
import InputEmail from '../../../pagesUtils/InputEmail';

type Props = {};

const SignupDataEmail: FC<Props> = ({}) => {
  const [newData, setNewData] = useState<boolean>(false);
  const [messageEmail, setMesssageEmail] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (!newData) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(userRoute.email, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (!data.status) {
          // gerer les erreurs
          setMesssageEmail(data.message);
          return;
        }
      } catch (error) {}
    };
    callBackEnd();
  }, [newData]);
  return (
    <>
      <div className='signup_data_email_container'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setNewData(true);
          }}
        >
          <InputEmail setEmail={setEmail} setEmailIsValid={setEmailIsValid} />
          {messageEmail && (
            <>
              <div className='signup_data_email_message'>{messageEmail}</div>
            </>
          )}
          <input
            type='submit'
            name='submitEmail'
            id='submitEmail'
            value='Modifier'
            disabled={!emailIsValid}
          />
        </form>
      </div>
    </>
  );
};

export default SignupDataEmail;
