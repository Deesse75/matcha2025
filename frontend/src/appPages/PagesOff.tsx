import { FC, ReactElement, useState, useEffect } from 'react';
import BackgroundPagesOff from './off/BackgroundPagesOff';
import ForgotModule from './off/ForgotModule';
import RedirectPagesOff from './off/RedirectPagesOff';
import ResendModule from './off/ResendModule';
import SigninModule from './off/SigninModule';
import SignupModule from './off/SignupModule';
import ContactOff from './off/ContactOff';
import ValidateModule from './off/ValidateModule';

type Props = {
  activePage: string;
};

const PagesOff: FC<Props> = ({ activePage }) => {
  const pagesName: string[] = [
    'signin',
    'signup',
    'resend',
    'forgot',
    'validate',
    'contact',
  ];
  const pagesRoute: ReactElement[] = [
    <SigninModule />,
    <SignupModule />,
    <ResendModule />,
    <ForgotModule />,
    <ValidateModule />,
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
              <RedirectPagesOff activePage={activePage} />
            </div>
            <div className='background_pages_off_container'>
              <BackgroundPagesOff bgName={activePage} />
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

export default PagesOff;
