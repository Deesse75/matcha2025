import { FC, useEffect, useState } from "react";
import SignupData from "./SignupData";
import ProfileData from "./ProfileData";
import { userRoute } from "../../../../utils/variables/routeDef";
import { useUserInfos } from "../../../../utils/context/user.context";
import DeleteAccount from "./DeleteAccount";

type Props = {};

const Account: FC<Props> = ({}) => {
  const me = useUserInfos();
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    if (!reload) return;
    const callBackEnd = async () => {
      try {
        const response = await fetch(userRoute.getMe, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (!data.status) {
          // gerer les erreurs
          return;
        }
        setReload(false);
        me.setUserData(data.userData);
      } catch (error) {}
    };
    callBackEnd();
  }, [reload]);

  return (
    <>
    <div className="account_container">
      <div className="account_top">

      <div className="account_left"><SignupData setReload={setReload} /></div>
      <div className="account_right"><ProfileData setReload={setReload} /></div>
      </div>
      <div className="account_bottom"><DeleteAccount /></div>
    </div>
    </>
  )
}

export default Account