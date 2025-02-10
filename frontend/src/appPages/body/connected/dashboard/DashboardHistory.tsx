import { FC, useState } from 'react';

type Props = {};

const DashboardHistory: FC<Props> = ({}) => {
  const [reloadHistory, setReloadHistory] = useState<string>('match');

  return (
    <>
      <div className='dashboard_history_container'>
        <div className='dashboard_history'>
          <div
            className='dashboard_history_match'
            onClick={() => setReloadHistory('match')}
          >
            <HistoryMatch reloadHistory={reloadHistory} />
          </div>
          <div
            className='dashboard_history_views'
            onClick={() => setReloadHistory('views')}
          >
            <HistoryViews reloadHistory={reloadHistory} />
          </div>
          <div
            className='dashboard_history_like'
            onClick={() => setReloadHistory('like')}
          >
            <HistoryLike reloadHistory={reloadHistory} />
          </div>
          <div
            className='dashboard_history_visited'
            onClick={() => setReloadHistory('visited')}
          >
            <HistoryVisited reloadHistory={reloadHistory} />
          </div>
          <div
            className='dashboard_history_liked'
            onClick={() => setReloadHistory('liked')}
          >
            <HistoryLiked reloadHistory={reloadHistory} />
          </div>
          <div
            className='dashboard_history_mute'
            onClick={() => setReloadHistory('mute')}
          >
            <HistoryMute reloadHistory={reloadHistory} />
          </div>
          <div
            className='dashboard_history_ban'
            onClick={() => setReloadHistory('ban')}
          >
            <HistoryBan reloadHistory={reloadHistory} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHistory;
