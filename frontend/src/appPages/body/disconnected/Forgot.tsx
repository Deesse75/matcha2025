import { FC } from 'react';
import DisconnectedBodyImg from './utils/DisconnectedBodyImg';
import DisconnectedRedirection from './utils/DisconnectedRedirection';
import ForgotModule from './utils/ForgotModule';

type Props = {};

const Forgot: FC<Props> = ({}) => {
  return (
    <>
      <div className='DisconnectedBody_container'>
        <div className='forgot_container'>
          <ForgotModule />
          <DisconnectedRedirection activePage='forgot' />
        </div>
        <div className='disconnected_body_img'>
          {/* <DisconnectedBodyImg nameImg='forgot' /> */}
        </div>
      </div>
    </>
  );
};

export default Forgot;
