import { FC, useEffect, useState } from 'react';
import { UserDataType } from '../../../../interfaces/user.interfaces';
import ConnectedIcon from '../../pagesUtils/ConnectedIcon';

type Props = {
  key: number;
  profile: UserDataType;
};

const DisplayMiniProfile: FC<Props> = ({ profile }) => {
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    profile?.region && profile?.county && profile?.town
      ? setLocation(`${profile?.region}, ${profile?.county}, ${profile?.town}`)
      : setLocation('Erreur localisation');
  }, [profile]);

  return (
    <>
      <div className='listing_display_mini_profile_container'>
        <div className='listing_display_mini_profile_photo'>
          <img src={profile?.photo1 || ''} alt='' />
        </div>
        <div className='listing_display_mini_profile_user'>
          <div className='listing_display_mini_profile_username'>
            {profile.username}
          </div>
          <div className='listing_display_mini_profile_connection'>
            <ConnectedIcon lastCo={profile.lastConnection} />
          </div>
        </div>
        <div className='listing_display_mini_profile_user_'>
          <div className='listing_display_mini_profile_info'>{location}</div>
          <div className='listing_display_mini_profile_tags'>
            {profile.tags &&
              profile.tags.map((tag, key) => {
                return (
                  <div className='display_mini_profile_tag'>{`#${tag}`}</div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayMiniProfile;
