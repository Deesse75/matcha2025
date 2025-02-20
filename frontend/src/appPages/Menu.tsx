import { Dispatch, FC, SetStateAction } from 'react';
import ChatMenu from './menu/ChatMenu';
import ProfileMenu from './menu/ProfileMenu';
import SearchMenu from './menu/SearchMenu';
import SelectionMatchaMenu from './menu/SelectionMatchaMenu';

type Props = {
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};

const Menu: FC<Props> = ({selectedMenu, setSelectedMenu}) => {
  return (
    <>
      <SelectionMatchaMenu
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <SearchMenu
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <ChatMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <ProfileMenu
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
    </>
  );
};

export default Menu;
