import { Context, createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type NotifContextType = {
  socketNotif: string | null;
  serverNotif: string | null;
  setSocketNotif: Dispatch<SetStateAction<string | null>>;
  setServerNotif: Dispatch<SetStateAction<string | null>>;
};

export const NotifContext = createContext<NotifContextType>({
  socketNotif: null,
  serverNotif: null,
  setSocketNotif: () => {},
  setServerNotif: () => {},
}) as Context<NotifContextType>;

const NotifProvider = ({ children }: { children: ReactNode }) => {
  const [socketNotif, setSocketNotif] = useState<string | null>(null);
  const [serverNotif, setServerNotif] = useState<string | null>(null);

  return (
    <NotifContext.Provider
      value={{
        socketNotif,
        serverNotif,
        setSocketNotif,
        setServerNotif,
      }}
    >
      {children}
    </NotifContext.Provider>
  );
};

export default NotifProvider;
export const useNotification = () => useContext(NotifContext);
