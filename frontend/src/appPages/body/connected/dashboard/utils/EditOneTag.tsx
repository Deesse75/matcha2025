import { Dispatch, FC, SetStateAction } from 'react';
import { Tags } from './SearchRowTags';

type Props = {
  key: number;
  tag: Tags;
  selectedTags: string[] | null;
  setSelectedTags: Dispatch<SetStateAction<string[] | null>>;
};

const EditOneTag: FC<Props> = ({ tag, selectedTags, setSelectedTags }) => {
  const handleAddTag = () => {
    if (selectedTags) setSelectedTags([...selectedTags, tag.name]);
    else setSelectedTags([tag.name]);
  };

  return (
    <>
      <div className='edit_one_tag' key={tag.id} onClick={handleAddTag}>
        `#${tag.name}`
      </div>
    </>
  );
};

export default EditOneTag;
