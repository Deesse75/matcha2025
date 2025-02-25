import { Context, createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type NotifContextType = {
  errorAuthMessage: string | null;
  socketNotif: string | null;
  serverNotif: string | null;
  setErrorAuthMessage: Dispatch<SetStateAction<string | null>>;
  setSocketNotif: Dispatch<SetStateAction<string | null>>;
  setServerNotif: Dispatch<SetStateAction<string | null>>;
};

export const NotifContext = createContext<NotifContextType>({
  errorAuthMessage: null,
  socketNotif: null,
  serverNotif: null,
  setErrorAuthMessage: () => {},
  setSocketNotif: () => {},
  setServerNotif: () => {},
}) as Context<NotifContextType>;

const NotifProvider = ({ children }: { children: ReactNode }) => {
  const [errorAuthMessage, setErrorAuthMessage] = useState<string | null>(null);
  const [socketNotif, setSocketNotif] = useState<string | null>(null);
  const [serverNotif, setServerNotif] = useState<string | null>(null);

  return (
    <NotifContext.Provider
      value={{
        errorAuthMessage,
        socketNotif,
        serverNotif,
        setErrorAuthMessage,
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
