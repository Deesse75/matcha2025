import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { UserDataType } from '../../interfaces/user.interfaces';

type ListContextType = {
  list: UserDataType[] | null;
  setList: Dispatch<SetStateAction<UserDataType[] | null>>;
};

export const ListContext = createContext<ListContextType>({
  list: null,
  setList: () => {},
});

const ListProvider = ({ children }: { children: React.ReactNode }) => {
  const [list, setList] = useState<UserDataType[] | null>(null);

  return (
    <ListContext.Provider
      value={{
        list,
        setList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export default ListProvider;
export const useList = () => useContext(ListContext);
