import { FC } from 'react';
import DisconnectedBodyImg from './utils/DisconnectedBodyImg';
import DisconnectedRedirection from './utils/DisconnectedRedirection';
import ResendModule from './utils/ResendModule';

type Props = {};

const Resend: FC<Props> = ({}) => {
  return (
    <>
      <div className='DisconnectedBody_container'>
        <div className='resend_container'>
          <ResendModule />
          <DisconnectedRedirection activePage='resend' />
        </div>
        <div className='disconnected_body_img'>
          {/* <DisconnectedBodyImg nameImg='resend' /> */}
        </div>
      </div>
    </>
  );
};

export default Resend;
