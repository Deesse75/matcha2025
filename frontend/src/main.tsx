import { createRoot } from 'react-dom/client';
import './appStyles/index.scss';
import App from './pages/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import ListProvider from './utils/context/listing.context.tsx';
import UserProvider from './utils/context/user.context.tsx';

createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <ListProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ListProvider>
  </UserProvider>,
);
