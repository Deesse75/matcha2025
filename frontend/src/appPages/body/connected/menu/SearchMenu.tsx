import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

type Props = {
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};

const SearchMenu: FC<Props> = ({ selectedMenu, setSelectedMenu }) => {
  const [color, setColor] = useState<string>('white');

  useEffect(() => {
    if (selectedMenu === 'search') setColor('red');
    else setColor('white');
  }, [selectedMenu]);

  return (
    <>
      <div
        className='search_container'
        onClick={() => setSelectedMenu('search')}
      >
        <div
          className='search_bulle'
          style={{ backgroundColor: color }}
        ></div>
        <div className='search_title'>Rechercher</div>
      </div>
    </>
  );
};

export default SearchMenu;
