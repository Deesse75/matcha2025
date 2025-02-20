import { createRoot } from 'react-dom/client';
import './appStyles/index.scss';
import App from './appPages/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import ListProvider from './appUtils/context/listing.context.tsx';
import UserProvider from './appUtils/context/user.context.tsx';

createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <ListProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ListProvider>
  </UserProvider>,
);
