import AppRoutes from './body/AppRoutes';
import Footer from './footer/Footer';
import Header from './header/Header';

function App() {
  return (
    <>
      <div className='app_container'>
        <div className='app_header'>
          <Header />
        </div>
        <div className='app_routes'>
          <AppRoutes />
        </div>
        <div className='app_footer'>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
