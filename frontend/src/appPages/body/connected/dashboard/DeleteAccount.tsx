import { Dispatch, FC, SetStateAction } from 'react';

type Props = {
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};

const DeleteAccount: FC<Props> = ({}) => {
  return <div>DeleteAccount</div>;
};

export default DeleteAccount;
