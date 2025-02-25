import { FC, useState, useEffect } from 'react';
import { userRoute } from '../../../../../utils/variables/routeDef';
import InputBirthdate from '../../../pagesUtils/InputBirthdate';

type Props = {};

const SignupDataBirthdate: FC<Props> = ({}) => {
  const [newData, setNewData] = useState<boolean>(false);
  const [messageBirthdate, setMesssageBirthdate] = useState<string | null>(
    null,
  );
  const [birthdate, setBirthdate] = useState<string | null>(null);
  const [birthdateIsValid, setBirthdateIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (!newData) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(userRoute.birthdate, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          body: JSON.stringify({ birthdate }),
        });

        const data = await response.json();
        if (!data.status) {
          // gerer les erreurs
          setMesssageBirthdate(data.message);
          return;
        }
      } catch (error) {}
    };
    callBackEnd();
  }, [newData]);
  return (
    <>
      <div className='signup_data_birthdate_container'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setNewData(true);
          }}
        >
          <InputBirthdate
            setBirthdate={setBirthdate}
            setBirthdateIsValid={setBirthdateIsValid}
          />
          {messageBirthdate && (
            <>
              <div className='signup_data_birthdate_message'>
                {messageBirthdate}
              </div>
            </>
          )}
          <input
            type='submit'
            name='submitBirthdate'
            id='submitBirthdate'
            value='Modifier'
            disabled={!birthdateIsValid}
          />
        </form>
      </div>
    </>
  );
};

export default SignupDataBirthdate;
