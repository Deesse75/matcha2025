import { Dispatch, FC, SetStateAction } from 'react';
import SortList from './SortList';
import FilterList from './FilterList';
import DisplayList from './DisplayList';

type Props = {
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};

const Listing: FC<Props> = ({}) => {
  return (
    <>
      <div className='listing_container'>
        <DisplayList />
        <SortList />
        <FilterList />
      </div>
    </>
  );
};

export default Listing;
