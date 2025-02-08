import { FC, useEffect, useState } from "react";

type Props = {
  nameImg: string | null;
};

const DisconnectedBodyImg: FC<Props> = ({nameImg}) => {
  const [src, setSrc] = useState<string>('');

  useEffect(() => {
    if (!nameImg) return;

    switch (nameImg) {
      case 'signin':
        setSrc('/images/disconnected/signin.jpg');
        break;
      case 'signup':
        setSrc('/images/disconnected/signup.jpg');
        break;
      case 'forgot':
        setSrc('/images/disconnected/forgot.jpg');
        break;
      case 'resend':
        setSrc('/images/disconnected/resend.jpg');
        break;
      default:
        setSrc('/images/disconnected/error.jpg');
        break;
    }
  }, [nameImg]);
  return (
    <>
    <div className="body_img">
      <img src={src} alt="background" />
    </div>
    </>
  )
}

export default DisconnectedBodyImg