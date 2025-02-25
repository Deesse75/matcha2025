import { FC, useEffect, useState } from "react";
import { UserDataType } from "../../../../interfaces/user.interfaces";
import Listing from "../listing/Listing";
import HistoryButtons from "./HistoryButtons";
import { listRoute } from "../../../../utils/variables/routeDef";

type Props = {};

const SelectionMatcha: FC<Props> = ({}) => {
  const [listing, setListing] = useState<UserDataType[] | null>(null);
  const [selectedList, setSelectedList] = useState<string>('selection');

  useEffect(() => {
    const callBackEnd = async () => {
      try {
        const response = await fetch (`${listRoute.getListing}/${selectedList}` , {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (!data.status) {
          // gerer les erreurs
          return;
        }
        setListing(data.listing);
      } catch (error) {}
    };
    callBackEnd();
  }, [selectedList]);

  return (
    <>
      <div className='selection_container'>
        <div className='selection_left'>
          <Listing
            listing={listing}
            setListing={setListing}
            criteres={null}
            listType={selectedList}
          />
        </div>
        <div className='selection_right'>
          <HistoryButtons
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        </div>
      </div>
    </>
  );
};

export default SelectionMatcha;
