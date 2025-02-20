import { FC, ReactElement, useState, useEffect } from "react";
import ContactOff from "./auth/ContactOff";
import ForgotModule from "./auth/ForgotModule";
import ResendModule from "./auth/ResendModule";
import SigninModule from "./auth/SigninModule";
import SignupModule from "./auth/SignupModule";
import ValidateEmailModule from "./auth/ValidateEmailModule";
import ReinitdModule from "./auth/ReinitModule";
import BackgroundAuthPage from "./auth/BackgroundAuthPage";
import RedirectAuthPage from "./auth/RedirectAuthPage";

type Props = {
  activePage: string;
};

const AuthPage: FC<Props> = ({ activePage }) => {
  const pagesName: string[] = [
    'signin',
    'signup',
    'resend',
    'forgot',
    'validateEmail',
    'reinit',
    'contact',
  ];
  const pagesRoute: ReactElement[] = [
    <SigninModule />,
    <SignupModule />,
    <ResendModule />,
    <ForgotModule />,
    <ValidateEmailModule />,
    <ReinitdModule />,
    <ContactOff />,
  ];
  const [openPage, setOpenPage] = useState<ReactElement | null>(null);

  useEffect(() => {
    const index = pagesName.findIndex((page) => page === activePage);
    if (index > -1) {
      setOpenPage(pagesRoute[index]);
    }
  }, [activePage]);

  return (
    <>
      <div className='page_container'>
        {openPage ? (
          <>
            <div className='pages_off_container'>
              {openPage}
              <RedirectAuthPage activePage={activePage} />
            </div>
            <div className='background_pages_off_container'>
              {/* <BackgroundAuthPage bgName={activePage} /> */}
            </div>
          </>
        ) : (
          <>
            <div className='page_chargement'>
              Page en cours de chargement...
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AuthPage;
