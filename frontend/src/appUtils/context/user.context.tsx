import {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { Socket } from 'socket.io-client';
import { UserDataType } from '../../appInterfaces/user.interfaces';

type UserContextType = {
  userData: UserDataType | null;
  setUserData: Dispatch<SetStateAction<UserDataType | null>>;

  userSocket: Socket | null;
  setUserSocket: Dispatch<SetStateAction<Socket | null>>;

  notification: string | null;
  setNotification: Dispatch<SetStateAction<string | null>>;

  deleteUserData: () => void;
};

export const UserContext = createContext<UserContextType>({
  userData: null,
  setUserData: () => {},

  userSocket: null,
  setUserSocket: () => {},

  notification: null,
  setNotification: () => {},

  deleteUserData: () => {},
}) as Context<UserContextType>;

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [userSocket, setUserSocket] = useState<Socket | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const deleteUserData = () => {
    if (userSocket) userSocket.disconnect();
    setUserData(null);
    setUserSocket(null);
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        userSocket,
        setUserSocket,
        notification,
        setNotification,
        deleteUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUserInfos = () => useContext(UserContext);
