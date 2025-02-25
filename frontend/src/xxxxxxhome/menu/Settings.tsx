import { Dispatch, FC, SetStateAction } from 'react';

type Props = {
  setSelectedMenu: Dispatch<SetStateAction<string>>;
  setOpenProfileMenu: Dispatch<SetStateAction<boolean>>;
};

const Settings: FC<Props> = ({
  setSelectedMenu,
  setOpenProfileMenu,
}) => {
  return (
    <>
      <div className='settings_container'>
        <div
          className='settings_line'
          onClick={() => {
            setSelectedMenu('signupData');
            setOpenProfileMenu(false);
          }}
        >
          Données personnelles
        </div>
        <div
          className='settings_line'
          onClick={() => {
            setSelectedMenu('profileData');
            setOpenProfileMenu(false);
          }}
        >
          Données profil
        </div>
        <div
          className='settings_line'
          onClick={() => {
            setSelectedMenu('searchData');
            setOpenProfileMenu(false);
          }}
        >
          Modifier ma recherche
        </div>
        <div
          className='settings_line'
          onClick={() => {
            setSelectedMenu('deleteAccount');
            setOpenProfileMenu(false);
          }}
        >
          Supprimer le compte
        </div>
      </div>
    </>
  );
};

export default Settings;
