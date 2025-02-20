import AppRoutes from "./AppRoutes";
import Footer from "./Footer";
import Header from "./Header";

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

// mandatory instructions :
// We will consider that a “micro-framework” includes a router and possibly templat-
// ing, but does not include an ORM, validators, or a User Account Manager.1. As
// long as you respect these constraints you are free to use what you like.

// You are free to choose the web server that best suits your needs, whether it is
// Apache, Nginx or a built-in web server