import { FC } from 'react';

type Props = {};

const Header: FC<Props> = ({}) => {
  return <>
  <div className="header_container">
    <div className="header_design"></div>
    <div className="header_logo">
      <div className="header_logo_text">Matcha</div>
    </div>
    <div className="header_user">
      <div className="header_user_photo"></div>
      <div className="header_user_name"></div>
      <div className="header_user_location"></div>
      <div className="header_user_lastco"></div>
    </div>
    <div className="header_signout"></div>
  </div>
  </>;
};

export default Header;
