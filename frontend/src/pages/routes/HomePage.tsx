import { FC, ReactElement, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { appRedirect } from "../../utils/variables/routeDef";
import Menu from "./homePagesComponents/Menu";
import Search from "./homePagesComponents/search/Search";
import SelectionMatcha from "./homePagesComponents/selection/SelectionMatcha";
import Chat from "./homePagesComponents/chat/Chat";
import SocketManager from "../../xxxxxxhome/socket/SocketManager";
import Account from "./homePagesComponents/account/Account";

type Props = {
  activePage: string;
};

const HomePage: FC<Props> = ({ activePage }) => {
  const nav = useNavigate();
  const pagesName: string[] = [
    'selection',
    'search',
    'chat',
    'account',
    'signout',
  ];
  const pagesRoute: ReactElement[] = [
    <SelectionMatcha />,
    <Search />,
    <Chat />,
    <Account />,
    <Signout />,
  ];
  const [openPage, setOpenPage] = useState<ReactElement | null>(null);

  useEffect(() => {
    const index = pagesName.findIndex((page) => page === activePage);
    if (index > -1) {
      setOpenPage(pagesRoute[index]);
    } else nav(appRedirect.errorInternal);
  }, [activePage]);

  return (
    <>
      <div className='routes_home_container'>
        <Menu />
        <div className='routes_home_body'>{openPage}</div>
        <SocketManager />
      </div>
    </>
  );
};

export default HomePage;
