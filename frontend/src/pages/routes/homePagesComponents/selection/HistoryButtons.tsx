import { Dispatch, SetStateAction, FC } from 'react';
import { RxDoubleArrowRight } from 'react-icons/rx';

type Props = {
  selectedList: string;
  setSelectedList: Dispatch<SetStateAction<string>>;
};

const HistoryButtons: FC<Props> = ({ selectedList, setSelectedList }) => {
  return (
    <>
      <div className='history_container'>
        <div className='history_title'>
          <div
            className={
              selectedList === 'selection'
                ? 'history_title_selected'
                : 'history_title_unselected'
            }
            onClick={() => setSelectedList('selection')}
          >
            <div className='history_title_text'>
              Sélection de profils compatibles
            </div>
            <div className='history_title_icon'>
              <RxDoubleArrowRight />
            </div>
          </div>
          <div
            className={
              selectedList === 'match'
                ? 'history_title_selected'
                : 'history_title_unselected'
            }
            onClick={() => setSelectedList('match')}
          >
            <div className='history_title_text'>Matchs</div>
            <div className='history_title_icon'>
              <RxDoubleArrowRight />
            </div>
          </div>
          <div
            className={
              selectedList === 'like'
                ? 'history_title_selected'
                : 'history_title_unselected'
            }
            onClick={() => setSelectedList('like')}
          >
            <div className='history_title_text'>Likes reçus</div>
            <div className='history_title_icon'>
              <RxDoubleArrowRight />
            </div>
          </div>
          <div
            className={
              selectedList === 'views'
                ? 'history_title_selected'
                : 'history_title_unselected'
            }
            onClick={() => setSelectedList('views')}
          >
            <div className='history_title_text'>Visites reçues</div>
            <div className='history_title_icon'>
              <RxDoubleArrowRight />
            </div>
          </div>
          <div
            className={
              selectedList === 'liked'
                ? 'history_title_selected'
                : 'history_title_unselected'
            }
            onClick={() => setSelectedList('liked')}
          >
            <div className='history_title_text'>Profils likés</div>
            <div className='history_title_icon'>
              <RxDoubleArrowRight />
            </div>
          </div>
          <div
            className={
              selectedList === 'visited'
                ? 'history_title_selected'
                : 'history_title_unselected'
            }
            onClick={() => setSelectedList('visited')}
          >
            <div className='history_title_text'>Profils visités</div>
            <div className='history_title_icon'>
              <RxDoubleArrowRight />
            </div>
          </div>
          <div
            className={
              selectedList === 'mute'
                ? 'history_title_selected'
                : 'history_title_unselected'
            }
            onClick={() => setSelectedList('mute')}
          >
            <div className='history_title_text'>Profils silencieux</div>
            <div className='history_title_icon'>
              <RxDoubleArrowRight />
            </div>
          </div>
          <div
            className={
              selectedList === 'ban'
                ? 'history_title_selected'
                : 'history_title_unselected'
            }
            onClick={() => setSelectedList('ban')}
          >
            <div className='history_title_text'>Profils bloqués</div>
            <div className='history_title_icon'>
              <RxDoubleArrowRight />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryButtons;
