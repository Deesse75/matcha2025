import { Dispatch, FC, SetStateAction } from 'react';

type Props = {
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};

const Listing: FC<Props> = ({}) => {
  return <div>Listing</div>;
};

export default Listing;
