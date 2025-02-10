import { FC } from 'react';

type Props = {
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};

const DashboardDisplay: FC<Props> = ({ selectedMenu }) => {
  return (
    <>
      <div className='dashboard_display_container'>
        {selectedMenu === 'display' && (
          <>
            <Display selectedMenu={selectedMenu} />
          </>
        )}
        {selectedMenu === 'search' && (
          <>
            <Search setSelectedMenu={setSelectedMenu} />
          </>
        )}
        {selectedMenu === 'chat' && (
          <>
            <Chat selectedMenu={selectedMenu} />
          </>
        )}
        {selectedMenu === 'signupData' && (
          <>
            <SignupData selectedMenu={selectedMenu} />
          </>
        )}
        {selectedMenu === 'profileData' && (
          <>
            <ProfileData selectedMenu={selectedMenu} />
          </>
        )}
        {selectedMenu === 'searchData' && (
          <>
            <SearchData selectedMenu={selectedMenu} />
          </>
        )}
        {selectedMenu === 'deleteAccount' && (
          <>
            <DeleteAccount selectedMenu={selectedMenu} />
          </>
        )}
      </div>
    </>
  );
};

export default DashboardDisplay;
