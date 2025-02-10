import { FC, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { appRedirect } from '../../appUtils/variables/routeDef';
import LoadingMatcha from './disconnected/LoadingMatcha';
import Signin from './disconnected/Signin';
import Signup from './disconnected/Signup';
import Forgot from './disconnected/Forgot';
import Resend from './disconnected/Resend';
import ErrorLoadingMatcha from './disconnected/error/ErrorLoadingMatcha';
import ContactUsOff from './disconnected/ContactUsOff';
import GetMe from './connected/GetMe';
import Home from './connected/Home';
import ErrorInterneOff from './disconnected/error/ErrorInterneOff';
import ErrorNotFoundOff from './disconnected/error/ErrorNotFoundOff';
import ErrorGetMe from './connected/error/ErrorGetMe';
import ErrorInterneOn from './connected/error/ErrorInterneOn';
import ErrorNotFoundOn from './connected/error/ErrorNotFoundOn';
import ContactUsOn from './connected/ContactUsOn';

type Props = {};

const AppRoutes: FC<Props> = ({}) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const routePage = useLocation();

  useEffect(() => {
    const session: string | null = sessionStorage.getItem('token');
    session ? setIsLogged(true) : setIsLogged(false);
  }, [routePage]);

  return (
    <>
      <Routes>
        {isLogged ? (
          <>
            <Route path={appRedirect.getMe} element={<GetMe />} />
            <Route path={appRedirect.home} element={<Home />} />
            <Route path={appRedirect.contactus} element={<ContactUsOn />} />
            <Route
              path={appRedirect.errorLoading}
              element={<ErrorGetMe message='' />}
            />
            <Route path={appRedirect.errorInterne} element={<ErrorInterneOn />} />
            <Route path={'/*'} element={<ErrorNotFoundOn />} />
          </>
        ) : (
          <>
            <Route
              path={appRedirect.loadingMatcha}
              element={<LoadingMatcha />}
            />
            <Route path={appRedirect.signin} element={<Signin />} />
            <Route path={appRedirect.signup} element={<Signup />} />
            <Route path={appRedirect.forgot} element={<Forgot />} />
            <Route path={appRedirect.resend} element={<Resend />} />
            <Route path={appRedirect.contactus} element={<ContactUsOff />} />
            <Route
              path={appRedirect.errorLoading}
              element={<ErrorLoadingMatcha message='' />}
            />
            <Route path={appRedirect.errorInterne} element={<ErrorInterneOff />} />
            <Route path={'/*'} element={<ErrorNotFoundOff />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRoutes;
