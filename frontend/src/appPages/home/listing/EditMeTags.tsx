import { Dispatch, SetStateAction, FC, useEffect } from "react";
import { useUserInfos } from "../../../appUtils/context/user.context";

type Props = {
  selectedTags: string[] | null;
  setSelectedTags: Dispatch<SetStateAction<string[] | null>>;
};

const EditMeTags: FC<Props> = ({
  selectedTags,
  setSelectedTags,
}) => {
  const me = useUserInfos();

  useEffect(() => {}, [me.userData?.tags])

  return (
    <>
      <div className='filter_tags_container'>
        <div className='filter_tags_display'>
          {/* {me.userData && me.userData.tags &&
            me.userData.tags.map((tag, key) => (
              <EditOneTag
                key={key as number}
                tag={tag}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            ))} */}
        </div>
      </div>
    </>
  );
};

export default EditMeTags;
