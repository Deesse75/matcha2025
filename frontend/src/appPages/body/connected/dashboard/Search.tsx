import { Dispatch, FC, SetStateAction, useState } from "react";
import SearchLogin from "./utils/SearchLogin";
import SearchLocation from "./utils/SearchLocation";

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
        <div className='search_Location'>
          <SearchLocation setSelectedMenu={setSelectedMenu} />
        </div>
        <div className='search_tags'>
          <SearchTags setSelectedMenu={setSelectedMenu} />
        </div>
        <div className='search_data'>
          <SearchData setSelectedMenu={setSelectedMenu} />
        </div>
        <div className='search_submit'></div>
      </div>
    </>
  );
};

export default Search