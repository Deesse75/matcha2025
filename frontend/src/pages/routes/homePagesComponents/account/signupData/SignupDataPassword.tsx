import { FC, useEffect, useState } from 'react';
import { userRoute } from '../../../../../utils/variables/routeDef';

type Props = {};

const SignupDataPassword: FC<Props> = ({}) => {
  const [newData, setNewData] = useState<boolean>(false);
  const [messagePassword, setMessagePassword] = useState<string | null>(null);

  useEffect(() => {
    if (!newData) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(userRoute.password, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });

        const data = await response.json();
        if (!data.status) {
          // gerer les erreurs
          setMessagePassword(data.message);
          return;
        }
      } catch (error) {}
    };
    callBackEnd();
  }, [newData]);
  return (
    <>
      <div className='signup_data_password_container'>
        {messagePassword && (
          <>
            <div className='signup_data_password_message'>
              {messagePassword}
            </div>
          </>
        )}
        <button onClick={() => setNewData(true)}>Recevoir un lien</button>
      </div>
    </>
  );
};

export default SignupDataPassword;
