import React from 'react';
import { AuthProvider } from './hooks/useAuth';
import AppRoutes from './routes/AppRoutes';
import ReactToastContainer from './pages/Common/ReactToastContainer';

const App = () => {
  return (
    <>
      <ReactToastContainer />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  );
};

export default App;
