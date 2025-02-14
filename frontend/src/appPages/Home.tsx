import { FC, useState, useEffect } from "react";
import DashboardDisplay from "./on/dashboard/DashboardDisplay";
import ChatMenu from "./on/menu/ChatMenu";
import ProfileMenu from "./on/menu/ProfileMenu";
import SearchMenu from "./on/menu/SearchMenu";
import SelectionMatchaMenu from "./on/menu/SelectionMatchaMenu";

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
