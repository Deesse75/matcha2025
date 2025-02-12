import { FC } from 'react';
import DisconnectedBodyImg from './utils/DisconnectedBodyImg';
import DisconnectedRedirection from './utils/DisconnectedRedirection';
import SigninModule from './utils/SigninModule';

type Props = {};

const Signin: FC<Props> = ({}) => {

  return (
    <>
      <div className='DisconnectedBody_container'>
        <div className='signin_container'>
          <SigninModule />
          <DisconnectedRedirection activePage='signin' />
        </div>
        <div className='disconnected_body_img'>
          {/* <DisconnectedBodyImg nameImg='signin'/> */}
          </div>
      </div>
    </>
  );
};

export default Signin;
