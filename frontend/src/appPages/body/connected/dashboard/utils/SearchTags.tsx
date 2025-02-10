import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import {
  appRedirect,
  listRoute,
} from '../../../../../appUtils/variables/routeDef';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../../../../appUtils/context/notif.context';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import EditTags from './EditTags';

type Props = {
  setSelectedMenu: Dispatch<SetStateAction<string>>;
};

const SearchTags: FC<Props> = ({ setSelectedMenu }) => {
  const nav = useNavigate();
  const notif = useNotification();
  const [openInput, setOpenInput] = useState<boolean>(false);
  const [serieTags, setSerieTags] = useState<number>(0);
  const [tagsList, setTagsList] = useState<string[] | null>(null);
  const [searchTags, setSearchTags] = useState<string[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!serieTags) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(listRoute.tagsList, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const errorData = await response.json();
          notif.setServerNotif(errorData.message || response.statusText);
          nav(appRedirect.errorInterne);
          return;
        }

        const data = await response.json();
        if (data.status !== 'ok') {
          setErrorMessage(data.message || response.statusText);
          return;
        }

        setTagsList(data.tagsList);
      } catch (error) {}
    };
    callBackEnd();
  }, [serieTags]);

  return (
    <>
      <div className='search_tags_container'>
        <div className='search_tags_title'>
          <div className='search_login_title_text'>
            Rechercher par centre d'intêret
          </div>
          <div
            className='search_login_title_icon'
            onClick={() => {
              setOpenInput(!openInput);
              !serieTags ? setSerieTags(1) : null;
            }}
          >
            {openInput ? (
              <MdArrowDropDown size={20} />
            ) : (
              <MdArrowDropUp size={20} />
            )}
          </div>
        </div>
        <div className='search_tags_section'>
          <EditTags
            serieTags={serieTags}
            setSerieTags={setSerieTags}
            tagsList={tagsList}
          />
        </div>
      </div>
    </>
  );
};

export default SearchTags;
