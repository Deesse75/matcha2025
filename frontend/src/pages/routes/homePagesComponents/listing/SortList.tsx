import { Dispatch, FC, useState, useEffect } from "react";
import { UserDataType } from "../../../../interfaces/user.interfaces";
import { sortingList } from "../../pagesUtils/sortList.functions";

type Props = {
  listing: UserDataType[] | null;
  setListing: Dispatch<UserDataType[] | null>;
};

const SortList: FC<Props> = ({ listing, setListing }) => {
  const [selectedCheck, setSelectedCheck] = useState<string | null>(null);
  const [changeCheck, setChangeCheck] = useState<string | null>(null);
  const sortNameList: string[] = [
    'age',
    'region',
    'county',
    'town',
    'fame',
    'tags',
  ];

  const handleCheck = (sortName: string) => {
    if (sortNameList.includes(sortName)) {
      changeCheck === sortName
        ? setChangeCheck(null)
        : setChangeCheck(sortName);
    } else setChangeCheck(null);
  };

  useEffect(() => {
    setSelectedCheck(changeCheck);
    if (changeCheck && listing) {
      const newList = sortingList(listing, changeCheck);//fonction sort a implementer
      setListing(newList);
    }
  }, [changeCheck]);

  return (
    <>
      <div className='listing_sort_container'>
        <div className='listing_sort_title'>Trier</div>
        <div className='listing_sort_row'>
          <label htmlFor='sortAge'>Age</label>
          <input
            type='checkbox'
            name='sortAge'
            id='sortAge'
            onChange={() => handleCheck('age')}
            checked={selectedCheck === 'age' ? true : false}
            disabled={!listing}
          />
        </div>
        <div className='listing_sort_row'>
          <label htmlFor='sortAge'>Region</label>
          <input
            type='checkbox'
            name='sortRegion'
            id='sortRegion'
            onChange={() => handleCheck('region')}
            checked={selectedCheck === 'region' ? true : false}
            disabled={!listing}
          />
        </div>
        <div className='listing_sort_row'>
          <label htmlFor='sortAge'>County</label>
          <input
            type='checkbox'
            name='sortCounty'
            id='sortCounty'
            onChange={() => handleCheck('county')}
            checked={selectedCheck === 'county' ? true : false}
            disabled={!listing}
          />
        </div>
        <div className='listing_sort_row'>
          <label htmlFor='sortAge'>Town</label>
          <input
            type='checkbox'
            name='sortTown'
            id='sortTown'
            onChange={() => handleCheck('town')}
            checked={selectedCheck === 'town' ? true : false}
            disabled={!listing}
          />
        </div>
        <div className='listing_sort_row'>
          <label htmlFor='sortAge'>Fame</label>
          <input
            type='checkbox'
            name='sortFame'
            id='sortFame'
            onChange={() => handleCheck('fame')}
            checked={selectedCheck === 'fame' ? true : false}
            disabled={!listing}
          />
        </div>
        <div className='listing_sort_row'>
          <label htmlFor='sortAge'>Tags</label>
          <input
            type='checkbox'
            name='sortTags'
            id='sortTags'
            onChange={() => handleCheck('tags')}
            checked={selectedCheck === 'tags' ? true : false}
            disabled={!listing}
          />
        </div>
      </div>
    </>
  );
};

export default SortList;
