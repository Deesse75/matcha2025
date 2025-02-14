import { Dispatch, FC, SetStateAction } from 'react';
import Search from './Search';
import SearchData from './utils/SearchData';
import Chat from './Chat';
import DeleteAccount from './DeleteAccount';
import Display from './Display';
import Listing from './Listing';
import ProfileData from './ProfileData';
import SignupData from './SignupData';

type Props = {
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};

const DashboardDisplay: FC<Props> = ({ selectedMenu, setSelectedMenu }) => {
  return (
    <>
      <div className='dashboard_display_container'>
        {selectedMenu === 'listing' && (
          <>
            <Listing setSelectedMenu={setSelectedMenu} />
          </>
        )}
        {selectedMenu === 'display' && (
          <>
            <Display setSelectedMenu={setSelectedMenu} />
          </>
        )}
        {selectedMenu === 'search' && (
          <>
            <Search setSelectedMenu={setSelectedMenu} />
          </>
        )}
        {selectedMenu === 'chat' && (
          <>
            <Chat setSelectedMenu={setSelectedMenu} />
          </>
        )}
        {selectedMenu === 'signupData' && (
          <>
            <SignupData setSelectedMenu={setSelectedMenu} />
          </>
        )}
        {selectedMenu === 'profileData' && (
          <>
            <ProfileData setSelectedMenu={setSelectedMenu} />
          </>
        )}
        {selectedMenu === 'searchData' && (
          <>
            <SearchData setSelectedMenu={setSelectedMenu} />
          </>
        )}
        {selectedMenu === 'deleteAccount' && (
          <>
            <DeleteAccount setSelectedMenu={setSelectedMenu} />
          </>
        )}
      </div>
    </>
  );
};

export default DashboardDisplay;
