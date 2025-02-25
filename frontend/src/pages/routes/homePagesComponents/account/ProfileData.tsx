import { Dispatch, FC, SetStateAction, useState } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

type Props = {
  setReload: Dispatch<SetStateAction<boolean>>;
};

const ProfileData: FC<Props> = ({}) => {
  const [openRow, setOpenRow] = useState<string | null>(null);

  return (
    <>
      <div className='profile_data_container'>
        <div className='profile_data_title'>Modifier votre profil</div>
        <div className='profile_data_row'>
          <div
            className='profile_data_row_title'
            onClick={() => setOpenRow('photos')}
          >
            <div className='profile_data_row_title_text'>Photos : </div>
            <div className='profile_data_row_title_icon'>
              {openRow === 'photos' ? (
                <MdArrowDropDown size={20} />
              ) : (
                <MdArrowDropUp size={20} />
              )}
            </div>
          </div>
          {openRow === 'photos' && <ProfilePhotos />}
        </div>
        <div className='profile_data_row'>
          <div
            className='profile_data_row_title'
            onClick={() => setOpenRow('gender')}
          >
            <div className='profile_data_row_title_text'>Genre : </div>
            <div className='profile_data_row_title_icon'>
              {openRow === 'gender' ? (
                <MdArrowDropDown size={20} />
              ) : (
                <MdArrowDropUp size={20} />
              )}
            </div>
          </div>
          {openRow === 'gender' && <ProfileGender />}
        </div>
        <div className='profile_data_row'>
          <div
            className='profile_data_row_title'
            onClick={() => setOpenRow('orientation')}
          >
            <div className='profile_data_row_title_text'>Orientation sexuelle : </div>
            <div className='profile_data_row_title_icon'>
              {openRow === 'orientation' ? (
                <MdArrowDropDown size={20} />
              ) : (
                <MdArrowDropUp size={20} />
              )}
            </div>
          </div>
          {openRow === 'orientation' && <ProfileOrientation />}
        </div>
        <div className='profile_data_row'>
          <div
            className='profile_data_row_title'
            onClick={() => setOpenRow('tall')}
          >
            <div className='profile_data_row_title_text'>Taille : </div>
            <div className='profile_data_row_title_icon'>
              {openRow === 'tall' ? (
                <MdArrowDropDown size={20} />
              ) : (
                <MdArrowDropUp size={20} />
              )}
            </div>
          </div>
          {openRow === 'tall' && <ProfileTall />}
        </div>
        <div className='profile_data_row'>
          <div
            className='profile_data_row_title'
            onClick={() => setOpenRow('tags')}
          >
            <div className='profile_data_row_title_text'>Centre d'intêret : </div>
            <div className='profile_data_title_icon'>
              {openRow === 'tags' ? (
                <MdArrowDropDown size={20} />
              ) : (
                <MdArrowDropUp size={20} />
              )}
            </div>
          </div>
          {openRow === 'tags' && <ProfileTags />}
        </div>
        <div className='profile_data_row'>
          <div
            className='profile_data_row_title'
            onClick={() => setOpenRow('biography')}
          >
            <div className='profile_data_title_text'>Présentation : </div>
            <div className='profile_data_title_icon'>
              {openRow === 'biography' ? (
                <MdArrowDropDown size={20} />
              ) : (
                <MdArrowDropUp size={20} />
              )}
            </div>
          </div>
          {openRow === 'biography' && <ProfileBiography />}
        </div>
      </div>
    </>
  );
};

export default ProfileData;
