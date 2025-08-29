import React from 'react';
import { AuthProvider } from './hooks/useAuth';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  );
};

export default App;
