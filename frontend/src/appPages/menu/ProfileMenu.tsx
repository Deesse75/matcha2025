import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { IoMenuOutline } from 'react-icons/io5';
import Settings from './Settings';

type Props = {
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};

const ProfileMenu: FC<Props> = ({ selectedMenu, setSelectedMenu }) => {
  const [openProfileMenu, setOpenProfileMenu] = useState<boolean>(false);

  useEffect(() => {
    if (selectedMenu === 'profile') setOpenProfileMenu(true);
    else setOpenProfileMenu(false);
  }, [selectedMenu]);

  return (
    <>
      <div
        className='profile_container'
        onClick={() => setSelectedMenu('profile')}
      >
        <div className='profile_icon'>
          <IoMenuOutline />
        </div>
        {openProfileMenu && (
          <Settings
            setSelectedMenu={setSelectedMenu}
            setOpenProfileMenu={setOpenProfileMenu}
          />
        )}
      </div>
    </>
  );
};

export default ProfileMenu;
