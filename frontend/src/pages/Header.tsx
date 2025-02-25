import { FC } from "react";
import { useUserInfos } from "../utils/context/user.context";

type Props = {};

const Header: FC<Props> = ({}) => {
  const me = useUserInfos();

  return (
    <>
      <div className='header_container'>
        <div className='header_design'></div>
        <div className='header_logo'>
          <div className='header_logo_text'>Matcha</div>
        </div>
        <div className='header_user'>
          <div className='header_user_photo'>
            {me.userData && (
              <img src={me.userData?.photo1 || ''} alt='Photo de profil' />
            )}
          </div>
          {me.userData && (
            <div className='header_user_name'>{me.userData.username}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
