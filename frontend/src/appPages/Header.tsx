import { FC, useEffect, useState } from 'react';
import { useUserInfos } from '../appUtils/context/user.context';
import { getLocation } from '../appUtils/functions/geolocation';

type Props = {};

const Header: FC<Props> = ({}) => {
  const me = useUserInfos();
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    if (
      !sessionStorage.getItem('region') ||
      !sessionStorage.getItem('county') ||
      !sessionStorage.getItem('town')
    )
      getLocation();
    if (
      sessionStorage.getItem('region') &&
      sessionStorage.getItem('county') &&
      sessionStorage.getItem('town')
    )
      setLocation(
        `${sessionStorage.getItem('region')}, ${sessionStorage.getItem('county')}, ${sessionStorage.getItem('town')}`,
      );
  }, []);

  return (
    <>
      <div className='header_container'>
        <div className='header_design'></div>
        <div className='header_logo'>
          <div className='header_logo_text'>Matcha</div>
        </div>
        <div className='header_user'>
          <div className='header_user_photo'>
            {me.userData && <img src={me.userData?.photo1 || ''} alt='Photo de profil' />}
          </div>
          {me.userData && <div className='header_user_name'>{me.userData?.username}</div>}
          <div className='header_user_location'>{location}</div>
          <div className='header_user_lastco'>
            {me.userData && `Dernière connexion : ${me.userData?.lastConnection}`}
            
          </div>
        </div>
        <div className='header_signout'></div>
      </div>
    </>
  );
};

export default Header;
