import { Dispatch, FC, SetStateAction } from 'react';
import EditOneTag from './EditOneTag';
import { Tags } from '../../../appInterfaces/search.interfaces';

type Props = {
  serieOfTags: number;
  setSerieOfTags: Dispatch<SetStateAction<number>>;
  existingTagsList: Tags[] | null;
  selectedTags: string[] | null;
  setSelectedTags: Dispatch<SetStateAction<string[] | null>>;
};

const EditTags: FC<Props> = ({
  serieOfTags,
  setSerieOfTags,
  existingTagsList,
  selectedTags,
  setSelectedTags,
}) => {
  return (
    <>
      <div className='search_edit_tags_container'>
        <div className='search_edit_tags_display'>
          {existingTagsList &&
            existingTagsList.map((tag, key) => (
              <EditOneTag
                key={key as number}
                tag={tag}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            ))}
        </div>
        <div className='search_edit_tags_button'>
          <button onClick={() => setSerieOfTags(serieOfTags + 1)}>
            Voir d'autres centres d'intêret
          </button>
        </div>
      </div>
    </>
  );
};

export default EditTags;
