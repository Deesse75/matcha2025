import { Context, createContext, ReactNode, useContext, useState } from 'react';

type NavPageOffContexteType = {
  selectedPage: string | null;
  setSelectedPage: React.Dispatch<React.SetStateAction<string | null>>;

  closeAllPages: () => void;
};

export const NavPageOffContext = createContext<NavPageOffContexteType>({
  selectedPage: null,
  setSelectedPage: () => {},
  closeAllPages: () => {},
}) as Context<NavPageOffContexteType>;

const NavPageOffProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const closeAllPages = () => {
    setSelectedPage(null);
  };

  return (
    <NavPageOffContext.Provider
      value={{ selectedPage, setSelectedPage, closeAllPages }}
    >
      {children}
    </NavPageOffContext.Provider>
  );
};

export default NavPageOffProvider;
export const useNavPageOff = () => useContext(NavPageOffContext);
