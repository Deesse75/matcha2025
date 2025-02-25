import { FC, useRef } from 'react';
import { useUserInfos } from '../../../../../utils/context/user.context';

type Props = {};

const ProfileBiography: FC<Props> = ({}) => {
  const me = useUserInfos();
  const refBio = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <div className='profile_bio_container'>
        <div className='profile_bio_text'>
          <textarea
            name='profileBio'
            id='profileBio'
            ref={refBio}
            placeholder='Décrivez-vous en quelques lignes.'
            defaultValue={me?.userData?.biography || ''}
          ></textarea>
        </div>
        <div className='profile_bio_button'>int</div>
      </div>
    </>
  );
};

export default ProfileBiography;
