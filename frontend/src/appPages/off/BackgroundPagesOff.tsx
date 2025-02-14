import { FC, useEffect, useState } from 'react';

type Props = {
  bgName: string;
};

const BackgroundPagesOff: FC<Props> = ({ bgName }) => {
  const [src, setSrc] = useState<string>('');

  useEffect(() => {
    if (!bgName) return;

    switch (bgName) {
      case 'signin':
        setSrc('/images/background/signin.jpg');
        break;
      case 'signup':
        setSrc('/images/background/signup.jpg');
        break;
      case 'forgot':
        setSrc('/images/background/forgot.jpg');
        break;
      case 'resend':
        setSrc('/images/background/resend.jpg');
        break;
      case 'contact':
        setSrc('/images/background/contactOff.jpg');
        break;
      default:
        setSrc('/images/background/default.jpg');
        break;
    }
  }, [bgName]);
  return (
    <>
      <img src={src} alt='background' className='background_pages_off_img' />
    </>
  );
};

export default BackgroundPagesOff;
