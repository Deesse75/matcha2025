import { FC, useState } from 'react';
import { UserDataType } from '../../../../interfaces/user.interfaces';
import Listing from '../listing/Listing';
import SearchData from './SearchData';
import SearchUsername from './SearchUsername';
import { Criteres } from '../../../../interfaces/search.interfaces';

type Props = {};

const Search: FC<Props> = ({}) => {
  const [listing, setListing] = useState<UserDataType[] | null>(null);
  const [criteres, setCriteres] = useState<Criteres | null>(null);

  return (
    <>
      <div className='search_container'>
        <div className='search_left'>
          <Listing
            listing={listing}
            setListing={setListing}
            criteres={criteres}
            listType='search'
          />
        </div>
        <div className='search_right'>
          <SearchUsername setListing={setListing} />
          <SearchData
            setListing={setListing}
            criteres={criteres}
            setCriteres={setCriteres}
          />
        </div>
      </div>
    </>
  );
};

export default Search;

// The user must be able to conduct an advanced search by selecting one or more criteria,
// such as:
// • An age gap.
// • A “fame rating” gap.
// • A location.
// • One or multiple interest tags.
// For the suggested list, the resulting list must be sortable and filterable by age, location,
// “fame rating” and tags.
