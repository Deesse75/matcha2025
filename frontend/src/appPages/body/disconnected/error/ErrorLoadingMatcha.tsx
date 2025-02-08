import { FC } from 'react';

type Props = {
  message: string | null;
};

const ErrorLoadingMatcha: FC<Props> = ({ message }) => {

  return (
    <>
      <div className='error_loading_container'>
        <div className='error_loading_title'>Erreur</div>
        <div className='error_loading_message'>{message}</div>
        <div className='error_loading_message'>
          Veuillez réessayer plus tard.
        </div>
      </div>
      <div className='error_loading_message'>L'équipe Matcha.</div>
    </>
  );
};

export default ErrorLoadingMatcha;
