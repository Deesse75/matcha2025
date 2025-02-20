import { FC } from 'react';
import { useList } from '../../../appUtils/context/listing.context';
import DisplayMiniProfile from './DisplayMiniProfile';

type Props = {};

const DisplayList: FC<Props> = ({}) => {
  const list = useList();

  return (
    <>
      <div className='listing_display_container'>
        <div className='listing_display'>
          {list && list.list ? (
            <>
              {list.list.map((profile, key) => (
                <div className='listing_display_min_profile'>
                  <DisplayMiniProfile key={key as number} profile={profile} />
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="listing_displqy_empty">Aucun profil correspondant</div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayList;
