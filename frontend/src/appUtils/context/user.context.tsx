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

export const userTest = {
  id: 10,
  firstname: 'sandra',
  lastname: 'toto',
  username: 'deesse',
  birthdate: '25/08/1975',
  age: 49,
  gender: 'femme',
  orientation: 'hetero',
  region: 'idf',
  county: 'paris',
  town: 'paris',
  tall: 170,
  biography: 'bala gsdgljhbdfkj dlkfjhgbdklfjhb lxcvjhbgd',
  fame: 1200,
  photo1: '',
  photo2: '',
  photo3: '',
  photo4: '',
  photo5: '',
  tags: ['premier', 'deuxieme', 'troisieme'],
  connected: true,
  lastConnection: '13/02/2025',
  createdAt: '10/01/2020',
  updatedAt: '10/01/2020',
};

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
  const [userData, setUserData] = useState<UserDataType | null>(userTest);
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
