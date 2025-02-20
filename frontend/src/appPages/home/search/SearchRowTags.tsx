import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import EditTags from './EditTags';
import { Tags } from '../../../appInterfaces/search.interfaces';
import { listRoute } from '../../../appUtils/variables/routeDef';

type Props = {
  selectedTags: string[] | null;
  setSelectedTags: Dispatch<SetStateAction<string[] | null>>;
  openInput: boolean;
};

const SearchRowTags: FC<Props> = ({
  selectedTags,
  setSelectedTags,
  openInput,
}) => {
  const [serieOfTags, setSerieOfTags] = useState<number>(0);
  const [existingTagsList, setExistingTagsList] = useState<Tags[] | null>(null);
  const [errorTags, setErrorTags] = useState<string | null>(null);

  useEffect(() => {
    if (openInput && serieOfTags === 0) setSerieOfTags(1);
  }, [openInput]);

  useEffect(() => {
    if (!serieOfTags) return;

    const callBackEnd = async () => {
      try {
        const response = await fetch(
          `${listRoute.getExistingTagsList}/${serieOfTags}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          },
        );

        const data = await response.json();

        setExistingTagsList(data.existingTagsList);
      } catch (error) {}
    };
    callBackEnd();
  }, [serieOfTags]);

  return (
    <>
      <div className='search_row_tags_container'>
        <div className='search_row_tags_title'>
          <div className='search_login_title_text'>
            Sélectionnez des centres d'intêret
          </div>
        </div>
        <div className='search_row_tags_section'>
          {errorTags ? (
            <>
              <div className='search_row_tags_error'>{errorTags}</div>
              <button
                className='search_row_tags_error_button'
                onClick={() => setSerieOfTags(serieOfTags + 1)}
              >
                Réessayer
              </button>
            </>
          ) : (
            <>
              <EditTags
                serieOfTags={serieOfTags}
                setSerieOfTags={setSerieOfTags}
                existingTagsList={existingTagsList}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchRowTags;
