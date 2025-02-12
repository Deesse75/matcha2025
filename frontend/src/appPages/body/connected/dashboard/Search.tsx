import { Dispatch, FC, SetStateAction } from 'react';
import SearchLogin from './utils/SearchLogin';
import SearchData from './utils/SearchData';

type Props = {
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};

const Search: FC<Props> = ({ setSelectedMenu }) => {
  return (
    <>
      <div className='search_container'>
        <div className='search_login'>
          <SearchLogin setSelectedMenu={setSelectedMenu} />
        </div>
        <div className='search_data'>
          <SearchData setSelectedMenu={setSelectedMenu} />
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