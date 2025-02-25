import { useNavigate } from 'react-router-dom';
import { appRedirect } from '../../../utils/variables/routeDef';
import { FC, useState } from 'react';
import { BsChatHeart, BsSearch } from 'react-icons/bs';
import { RiAccountPinCircleLine } from 'react-icons/ri';
import { FaSignOutAlt } from 'react-icons/fa';

type Props = {};

const Menu: FC<Props> = ({}) => {
  const nav = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState<string>('selection');

  return (
    <>
      <div className='menu_container'>
        <div
          className={
            selectedMenu === 'selection' ? 'menu_selected' : 'menu_unselected'
          }
          onClick={() => {
            setSelectedMenu('selection');
            nav(appRedirect.selection);
          }}
        >
          Sélection de profils
        </div>
        <div
          className={
            selectedMenu === 'search' ? 'menu_selected' : 'menu_unselected'
          }
          onClick={() => {
            setSelectedMenu('search');
            nav(appRedirect.search);
          }}
        >
          <BsSearch />
        </div>
        <div
          className={
            selectedMenu === 'chat' ? 'menu_selected' : 'menu_unselected'
          }
          onClick={() => {
            setSelectedMenu('chat');
            nav(appRedirect.chat);
          }}
        >
          <BsChatHeart />
        </div>
        <div
          className={
            selectedMenu === 'account' ? 'menu_selected' : 'menu_unselected'
          }
          onClick={() => {
            setSelectedMenu('account');
            nav(appRedirect.account);
          }}
        >
          <RiAccountPinCircleLine />
        </div>
        <div
          className={
            selectedMenu === 'signout' ? 'menu_selected' : 'menu_unselected'
          }
          onClick={() => {
            setSelectedMenu('signout');
            nav(appRedirect.signout);
          }}
        >
          <FaSignOutAlt />
        </div>
      </div>
    </>
  );
};

export default Menu;
