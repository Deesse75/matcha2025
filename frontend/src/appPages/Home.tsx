import { FC, useState, useEffect } from 'react';
import DashboardDisplay from './home/DashboardDisplay';
import Menu from './Menu';

type Props = {};

const Home: FC<Props> = ({}) => {
  const [selectedMenu, setSelectedMenu] = useState<string>('listing');

  useEffect(() => {}, [selectedMenu]);

  return (
    <>
      <div className='home_container'>
        <div className='home_display'>
          <div className='home_display_menu'>
            <Menu
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
        <div className='home_notif'>{/* <SocketManager /> */}</div>
      </div>
    </>
  );
};

export default Home;
