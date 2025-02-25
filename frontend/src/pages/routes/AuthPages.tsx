import { FC, ReactElement, useState, useEffect } from 'react';
import AppLoading from './authPagesComponents/AppLoading';
import BackgroundAuthPages from './authPagesComponents/BackgroundAuthPages';
import ContactOff from './authPagesComponents/ContactOff';
import ForgotModule from './authPagesComponents/ForgotModule';
import RedirectAuthPages from './authPagesComponents/RedirectAuthPages';
import ReinitdModule from './authPagesComponents/ReinitModule';
import ResendModule from './authPagesComponents/ResendModule';
import SigninModule from './authPagesComponents/SigninModule';
import SignupModule from './authPagesComponents/SignupModule';
import ValidateEmailModule from './authPagesComponents/ValidateEmailModule';
import { appRedirect } from '../../utils/variables/routeDef';
import { useNavigate } from 'react-router-dom';
import ErrorAuth from './authPagesComponents/ErrorAuth';

type Props = {
  activePage: string;
};

const AuthPages: FC<Props> = ({ activePage }) => {
  const nav = useNavigate();
  const [displayed, setDisplayed] = useState<boolean>(false);
  const pagesName: string[] = [
    'loading',
    'signin',
    'signup',
    'resend',
    'forgot',
    'validate',
    'reinit',
    'contact',
    'errorAuth',
  ];
  const pagesRoute: ReactElement[] = [
    <AppLoading />,
    <SigninModule />,
    <SignupModule />,
    <ResendModule />,
    <ForgotModule />,
    <ValidateEmailModule />,
    <ReinitdModule />,
    <ContactOff />,
    <ErrorAuth />,
  ];
  const [openPage, setOpenPage] = useState<ReactElement | null>(null);

  useEffect(() => {
    const index = pagesName.findIndex((page) => page === activePage);
    if (index > -1) {
      setOpenPage(pagesRoute[index]);
    } else nav(appRedirect.errorInternal);
    if (['loading', 'errorAuth'].includes(activePage)) setDisplayed(false);
  }, [activePage]);

  return (
    <>
      <div className='routes_auth_container'>
        <div className='routes_auth_left'>
          <div className='routes_auth_left_top'>{openPage}</div>
          <div className='routes_auth_left_bottom'>
            {displayed && <RedirectAuthPages activePage={activePage} />}
          </div>
        </div>
        <div className='routes_auth_right'>
          <BackgroundAuthPages bgName={activePage} />
        </div>
      </div>
    </>
  );
};

export default AuthPages;
