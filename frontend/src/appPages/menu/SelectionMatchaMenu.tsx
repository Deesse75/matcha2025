import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

type Props = {
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};

const SelectionMatchaMenu: FC<Props> = ({ selectedMenu, setSelectedMenu }) => {
  const [color, setColor] = useState<string>('white');

  useEffect(() => {
    if (selectedMenu === 'display') setColor('red');
    else setColor('white');
  }, [selectedMenu]);

  return (
    <>
      <div
        className='selection_container'
        onClick={() => setSelectedMenu('display')}
      >
        <div
          className='selection_bulle'
          style={{ backgroundColor: color }}
        ></div>
        <div className='selection_title'>Selection</div>
      </div>
    </>
  );
};

export default SelectionMatchaMenu;
