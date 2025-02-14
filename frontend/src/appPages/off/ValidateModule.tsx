import { FC, useEffect, useState } from 'react';
import ReinitModule from './ReinitModule';
import ValidateEmailModule from './ValidateEmailModule';

type Props = {};

const ValidateModule: FC<Props> = ({}) => {
  const [action, setAction] = useState<string | null>('wait');
  const [token, setToken] = useState<string | null>(null);
  const url = new URL(window.location.href);

  useEffect(() => {
    if (!url) return;
    setAction(url.searchParams.get('action'));
    setToken(url.searchParams.get('token'));
  }, [url])

  return (
    <>
      <div className='validate_module_container'>
        {action === 'password' && (
          <>
            <ReinitModule token={token} />
          </>
        )}
        {action === 'email' && (
          <>
            <ValidateEmailModule token={token} />
          </>
        )}
        {!action ||
          (!['email', 'password', 'wait'].includes(action) && (
            <>
              <div className='validate_module_text'>
                La page que vous tentez d'afficher n'existe pas.
              </div>
            </>
          ))}
        {action === 'wait' && (
          <>
            <div className='validate_module_text'>
              Page en cours de chargement...
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ValidateModule;
