import { Dispatch, FC, SetStateAction } from 'react';

type Props = {
  serieTags: number;
  setSerieTags: Dispatch<SetStateAction<number>>;
  tagsList: string[] | null;
};

const EditTags: FC<Props> = ({ serieTags, setSerieTags, tagsList }) => {

  return (
    <>
      <div className='search_edit_tags_container'>
        <div className='search_edit_tags_display'>
          {tagsList ? (<>
          
          </>) : (<>
          
          </>)}
        </div>
        <div className='search_edit_tags_button'>
          <button onClick={() => setSerieTags(serieTags + 1)}>
            Afficher plus de centre d'intêret
          </button>
        </div>
      </div>
    </>
  );
};

export default EditTags;
