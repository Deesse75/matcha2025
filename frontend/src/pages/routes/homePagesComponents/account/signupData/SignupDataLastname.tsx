import { FC, useState, useEffect } from 'react';
import { userRoute } from '../../../../../utils/variables/routeDef';
import InputLastname from '../../../pagesUtils/InputLastname';

type Props = {};

const SignupDataLastname: FC<Props> = ({}) => {
  const [newData, setNewData] = useState<boolean>(false);
  const [messageLastname, setMesssageLastname] = useState<string | null>(null);
  const [lastname, setLastname] = useState<string | null>(null);
  const [lastnameIsValid, setLastnameIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (!newData) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(userRoute.lastname, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          body: JSON.stringify({ lastname }),
        });

        const data = await response.json();
        if (!data.status) {
          // gerer les erreurs
          setMesssageLastname(data.message);
          return;
        }
      } catch (error) {}
    };
    callBackEnd();
  }, [newData]);
  return (
    <>
      <div className='signup_data_lastname_container'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setNewData(true);
          }}
        >
          <InputLastname
            setLastname={setLastname}
            setLastnameIsValid={setLastnameIsValid}
          />
          {messageLastname && (
            <>
              <div className='signup_data_lastname_message'>
                {messageLastname}
              </div>
            </>
          )}
          <input
            type='submit'
            name='submitLastname'
            id='submitLastname'
            value='Modifier'
            disabled={!lastnameIsValid}
          />
        </form>
      </div>
    </>
  );
};

export default SignupDataLastname;
