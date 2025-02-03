import { useState } from 'react';
import Notif from './appComponents/notifications/Notif';
import { useUserInfos } from './appUtils/context/user.context';
import NavPageOffProvider from './appUtils/context/navPageOff.context';
import DisconnectedBody from './appComponents/body/disconnected/DisconnectedBody';
import ConnectedBody from './appComponents/body/connected/ConnectedBody';

function App() {
  const [notif, setNotif] = useState<string | null>(null);
  const me = useUserInfos();

  return (
    <>
      <div className='app'>
        <div className='app_header'></div>
        <div className='app_body'>
          <Notif notif={notif} setNotif={setNotif} />
          {me.userData ? (
            <>
              <ConnectedBody />
            </>
          ) : (
            <>
              <NavPageOffProvider>
                <DisconnectedBody />
              </NavPageOffProvider>
            </>
          )}
        </div>
        <div className='app_footer'></div>
      </div>
    </>
  );
}

export default App;
