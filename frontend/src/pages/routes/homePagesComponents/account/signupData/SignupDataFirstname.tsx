import { FC, useEffect, useState } from 'react';
import InputFirstname from '../../../pagesUtils/InputFirstname';
import { userRoute } from '../../../../../utils/variables/routeDef';

type Props = {};

const SignupDataFirstname: FC<Props> = ({}) => {
  const [newData, setNewData] = useState<boolean>(false);
  const [messageFirstname, setMesssageFirstname] = useState<string | null>(
    null,
  );
  const [firstname, setFirstname] = useState<string | null>(null);
  const [firstnameIsValid, setFirstnameIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (!newData) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(userRoute.firstname, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          body: JSON.stringify({ firstname }),
        });

        const data = await response.json();
        if (!data.status) {
          // gerer les erreurs
          setMesssageFirstname(data.message);
          return;
        }
      } catch (error) {}
    };
    callBackEnd();
  }, [newData]);
  return (
    <>
      <div className='signup_data_firstname_container'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setNewData(true);
          }}
        >
          <InputFirstname
            setFirstname={setFirstname}
            setFirstnameIsValid={setFirstnameIsValid}
          />
          {messageFirstname && (
            <>
              <div className='signup_data_firstname_message'>
                {messageFirstname}
              </div>
            </>
          )}
          <input
            type='submit'
            name='submitFirstname'
            id='submitFirstname'
            value='Modifier'
            disabled={!firstnameIsValid}
          />
        </form>
      </div>
    </>
  );
};

export default SignupDataFirstname;
