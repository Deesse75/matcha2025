import { FC, useEffect, useState } from 'react';
import { sortingList } from '../../../appUtils/functions/sortList.functions';
import { useList } from '../../../appUtils/context/listing.context';

type Props = {};

const SortList: FC<Props> = ({}) => {
  const [selectedCheck, setSelectedCheck] = useState<string | null>(null);
  const [changeCheck, setChangeCheck] = useState<string | null>(null);
  const list = useList();
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
    if (changeCheck && list.list) {
      const newList = sortingList(list.list, changeCheck);
      list.setList(newList);
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
          />
        </div>
      </div>
    </>
  );
};

export default SortList;
