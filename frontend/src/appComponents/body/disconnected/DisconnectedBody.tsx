import { FC, useEffect, useState } from 'react';
import { useNavPageOff } from '../../../appUtils/context/navPageOff.context';
import WaitChargement from '../../../appUtils/componentsState/WaitChargement';
import ErrorNotFound from './error/ErrorNotFound';
import Forgot from './forgot/Forgot';
import Resend from './resend/Resend';
import Signin from './signin/Signin';
import Signup from './signup/Signup';

type Props = {};

const DisconnectedBody: FC<Props> = ({}) => {
  const pageOff = useNavPageOff();
  const [ctrl, setCtrl] = useState<boolean>(false);
  const [activePageOff, setActivePageOff] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (!pageOff.selectedPage) {
      setActivePageOff(<Signin />);
      setCtrl(true);
      return;
    }

    switch (pageOff.selectedPage) {
      case 'signin':
        setActivePageOff(<Signin />);
        break;
      case 'signup':
        setActivePageOff(<Signup />);
        break;
      case 'forgot':
        setActivePageOff(<Forgot />);
        break;
      case 'resend':
        setActivePageOff(<Resend />);
        break;
      default:
        setActivePageOff(<ErrorNotFound />);
        break;
    }
    setCtrl(true);
  }, [pageOff.selectedPage]);

  return (
    <>
      {ctrl ? (
        <>{activePageOff}</>
      ) : (
        <>
          <WaitChargement />
        </>
      )}
    </>
  );
};

export default DisconnectedBody;
