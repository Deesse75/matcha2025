import { FC } from 'react';
import DisconnectedBodyImg from './utils/DisconnectedBodyImg';
import DisconnectedRedirection from './utils/DisconnectedRedirection';
import SignupModule from './utils/SignupModule';

type Props = {};

const Signup: FC<Props> = ({}) => {
  return (
    <>
      <div className='DisconnectedBody_container'>
        <div className='signup_container'>
          <SignupModule />
          <DisconnectedRedirection activePage='signup' />
        </div>
        <div className='disconnected_body_img'>
          {/* <DisconnectedBodyImg nameImg='signup' /> */}
        </div>
      </div>
    </>
  );
};

export default Signup;
