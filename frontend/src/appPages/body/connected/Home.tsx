import { FC, useEffect, useState } from 'react';
import SocketManager from '../socket/SocketManager';
import ChatMenu from './menu/ChatMenu';
import ProfileMenu from './menu/ProfileMenu';
import SearchMenu from './menu/SearchMenu';
import SelectionMatchaMenu from './menu/SelectionMatchaMenu';
import DashboardDisplay from './dashboard/DashboardDisplay';
import DashboardHistory from './dashboard/DashboardHistory';

type Props = {};

const Home: FC<Props> = ({}) => {
  const [selectedMenu, setSelectedMenu] = useState<string>('selection');

  useEffect(() => {
  }, [selectedMenu]);

  return (
    <>
      <div className='home_container'>
        <div className='home_display'>
          <div className='home_display_menu'>
            <SelectionMatchaMenu
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
            <SearchMenu
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
            <ChatMenu
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
            <ProfileMenu
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          </div>
          <div className='home_display_dashboard'>
            <DashboardDisplay
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
            {/* <DashboardHistory /> */}
          </div>
        </div>
        <div className='home_notif'>
          {/* <SocketManager /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
