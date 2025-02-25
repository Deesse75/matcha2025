import { Dispatch, SetStateAction, FC } from 'react';
import Chat from './Chat';
import DeleteAccount from '../pages/routes/homePagesComponents/account/DeleteAccount';
import Display from './Display';
import Listing from '../pages/routes/homePagesComponents/listing/Listing';
import ProfileData from '../pages/routes/homePagesComponents/account/ProfileData';
import Search from '../pages/routes/homePagesComponents/search/Search';
import SignupData from './SignupData';
import SearchData from '../pages/routes/homePagesComponents/search/SearchData';

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
