import { FC } from "react";
import { UserDataType } from "../../../../interfaces/user.interfaces";
import DisplayMiniProfile from "./DisplayMiniProfile";

type Props = {
  listing: UserDataType[] | null;
};

const DisplayList: FC<Props> = ({ listing }) => {

  return (
    <>
      <div className='display_list_container'>
        <div className='display_list'>
          {listing ? (
            <>
              {listing.map((profile, key) => (
                <div className='display_list_mini'>
                  <DisplayMiniProfile key={key as number} profile={profile} />
                </div>
              ))}
            </>
          ) : (
            <>
              <div className='display_list_empty'>
                Aucun profil à afficher
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayList;
