import { createRoot } from 'react-dom/client';
import './appStyles/index.scss';
import App from './appPages/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import NotifProvider from './appUtils/context/notif.context.tsx';

createRoot(document.getElementById('root')!).render(
  <NotifProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </NotifProvider>,
);
