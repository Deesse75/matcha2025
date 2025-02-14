import { Dispatch, FC, SetStateAction } from 'react';

type Props = {
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};

const Display: FC<Props> = ({}) => {
  return <div>Display</div>;
};

export default Display;
