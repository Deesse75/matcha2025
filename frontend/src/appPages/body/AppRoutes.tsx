import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useUserInfos } from '../../appUtils/context/user.context';
import { appRedirect } from '../../appUtils/variables/routeDef';
import LoadingMatcha from './disconnected/LoadingMatcha';
import Signin from './disconnected/Signin';
import ErrorNotFound from './disconnected/error/ErrorNotFound';
import Signup from './disconnected/Signup';
import Forgot from './disconnected/Forgot';
import Resend from './disconnected/Resend';
import ErrorLoadingMatcha from './disconnected/error/ErrorLoadingMatcha';
import ErrorInterne from './disconnected/error/ErrorInterne';
import ContactUsOff from './disconnected/ContactUsOff';

type Props = {};

const AppRoutes: FC<Props> = ({}) => {
  const me = useUserInfos();

  return (
    <>
      <Routes>
        {me?.userData ? (
          <></>
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
            <Route
              path={appRedirect.contactus}
              element={<ContactUsOff />}
            />
            <Route
              path={appRedirect.errorLoading}
              element={<ErrorLoadingMatcha message='' />}
            />
            <Route path={appRedirect.errorInterne} element={<ErrorInterne />} />
            <Route path={'/*'} element={<ErrorNotFound />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRoutes;
