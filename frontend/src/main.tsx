import { createRoot } from 'react-dom/client';
import './appStyles/index.scss';
import App from './App.tsx';
import UserProvider from './appUtils/context/user.context.tsx';

createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <App />
  </UserProvider>,
);
