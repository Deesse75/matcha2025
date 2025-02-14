import { FC, useState, useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { appRedirect } from "../appUtils/variables/routeDef";
import ErrorInternal from "./ErrorInternal";
import ErrorNotFound from "./ErrorNotFound";
import Loading from "./off/Loading";
import PagesOff from "./PagesOff";
import GetMe from "./GetMe";
import Home from "./Home";

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
          </>
        ) : (
          <>
            <Route
              path={appRedirect.loading}
              element={<Loading />}
            />
            <Route
              path={appRedirect.signin}
              element={<PagesOff activePage='signin' />}
            />
            <Route
              path={appRedirect.signup}
              element={<PagesOff activePage='signup' />}
            />
            <Route
              path={appRedirect.forgot}
              element={<PagesOff activePage='forgot' />}
            />
            <Route
              path={appRedirect.resend}
              element={<PagesOff activePage='resend' />}
            />
            <Route
              path={appRedirect.contactus}
              element={<PagesOff activePage='contact' />}
            />
          </>
        )}
        <Route
          path={appRedirect.errorInternal}
          element={<ErrorInternal />}
        />
        <Route path={'/*'} element={<ErrorNotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
