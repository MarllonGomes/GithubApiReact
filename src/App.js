import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes';
import GlobalStyle from './styles/global';

function App() {

  toast.configure({
    position: "bottom-left",
    pauseOnHover: false
  });

  return (
    <>
      <Routes />
      <GlobalStyle />
    </>
  );
}

export default App;
