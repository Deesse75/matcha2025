import { Dispatch, FC, SetStateAction } from 'react';

type Props = {
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};

const ProfileData: FC<Props> = ({}) => {
  return <div>ProfileData</div>;
};

export default ProfileData;
