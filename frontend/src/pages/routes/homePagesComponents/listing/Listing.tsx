import { Dispatch, FC } from 'react';
import DisplayList from './DisplayList';
import FilterList from './FilterList';
import SortList from './SortList';
import { UserDataType } from '../../../../interfaces/user.interfaces';
import { Criteres } from '../../../../interfaces/search.interfaces';

type Props = {
  listing: UserDataType[] | null;
  setListing: Dispatch<UserDataType[] | null>;
  criteres: Criteres | null;
  listType: string;
};

const Listing: FC<Props> = ({ listing, setListing, criteres, listType }) => {
  return (
    <>
      <div className='listing_container'>
        <div className='listing_left'>
          <DisplayList listing={listing} />
        </div>
        <div className='listing_right'>
          <SortList listing={listing} setListing={setListing} />
          <FilterList
            listing={listing}
            setListing={setListing}
            searchCriteres={criteres}
            listType={listType}
          />
        </div>
      </div>
    </>
  );
};

export default Listing;
