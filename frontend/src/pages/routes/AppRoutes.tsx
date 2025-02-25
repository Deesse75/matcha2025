import { FC, useState, useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { appRedirect } from "../../utils/variables/routeDef";
import AuthPages from "./AuthPages";
import ErrorInternal from "./error/ErrorInternal";
import ErrorNotFound from "./error/ErrorNotFound";
import GetMe from "./homePagesComponents/AppGetMe";
import HomePage from "./HomePage";

type Props = {};

const AppRoutes: FC<Props> = ({}) => {
  const [isLogged, setIsLogged] = useState<boolean>(true);
  const routePage = useLocation();

  useEffect(() => {
    const session: string | null = sessionStorage.getItem('token');
    // session ? setIsLogged(true) : setIsLogged(false); //a garder
    session ? setIsLogged(false) : setIsLogged(true); //test a supprimer
  }, [routePage]);

  return (
    <>
      <Routes>
        {isLogged ? (
          <>
            <Route path={appRedirect.getMe} element={<GetMe />} />
            <Route
              path={appRedirect.dashboard}
              element={<HomePage activePage='dashboard' />}
            />
            <Route
              path={appRedirect.display}
              element={<HomePage activePage='account' />}
            />
            <Route
              path={appRedirect.search}
              element={<HomePage activePage='search' />}
            />
            <Route
              path={appRedirect.chat}
              element={<HomePage activePage='chat' />}
            />
            <Route
              path={appRedirect.profile}
              element={<HomePage activePage='profile' />}
            />
            <Route
              path={appRedirect.account}
              element={<HomePage activePage='account' />}
            />
            <Route
              path={appRedirect.signout}
              element={<HomePage activePage='signout' />}
            />
            <Route
              path={appRedirect.contactus}
              element={<HomePage activePage='contactus' />}
            />
            <Route
              path={appRedirect.delete}
              element={<HomePage activePage='delete' />}
            />
          </>
        ) : (
          <>
            <Route
              path={appRedirect.signin}
              element={<AuthPages activePage='loading' />}
            />
            <Route
              path={appRedirect.signin}
              element={<AuthPages activePage='signin' />}
            />
            <Route
              path={appRedirect.signup}
              element={<AuthPages activePage='signup' />}
            />
            <Route
              path={appRedirect.forgot}
              element={<AuthPages activePage='forgot' />}
            />
            <Route
              path={appRedirect.resend}
              element={<AuthPages activePage='resend' />}
            />
            <Route
              path={appRedirect.contactus}
              element={<AuthPages activePage='contact' />}
            />
            <Route
              path={appRedirect.validateEmail}
              element={<AuthPages activePage='validate' />}
            />
            <Route
              path={appRedirect.reinit}
              element={<AuthPages activePage='reinit' />}
            />
            <Route
              path={appRedirect.errorAuth}
              element={<AuthPages activePage='errorAuth' />}
            />
          </>
        )}
        <Route path={appRedirect.errorInternal} element={<ErrorInternal />} />
        <Route path={'/*'} element={<ErrorNotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
