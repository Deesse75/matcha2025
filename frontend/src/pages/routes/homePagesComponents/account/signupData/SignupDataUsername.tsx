import { FC, useState, useEffect } from 'react';
import { userRoute } from '../../../../../utils/variables/routeDef';
import InputUsername from '../../../pagesUtils/InputUsername';

type Props = {};

const SignupDataUsername: FC<Props> = ({}) => {
  const [newData, setNewData] = useState<boolean>(false);
  const [messageUsername, setMesssageUsername] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [usernameIsValid, setUsernameIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (!newData) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(userRoute.username, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          body: JSON.stringify({ username }),
        });

        const data = await response.json();
        if (!data.status) {
          // gerer les erreurs
          setMesssageUsername(data.message);
          return;
        }
      } catch (error) {}
    };
    callBackEnd();
  }, [newData]);
  return (
    <>
      <div className='signup_data_username_container'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setNewData(true);
          }}
        >
          <InputUsername
            setUsername={setUsername}
            setUsernameIsValid={setUsernameIsValid}
          />
          {messageUsername && (
            <>
              <div className='signup_data_username_message'>
                {messageUsername}
              </div>
            </>
          )}
          <input
            type='submit'
            name='submitUsername'
            id='submitUsername'
            value='Modifier'
            disabled={!usernameIsValid}
          />
        </form>
      </div>
    </>
  );
};

export default SignupDataUsername;
