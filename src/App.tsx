import React, { useEffect, useState } from 'react';
import './App.scss';
import { LoaderBigScreen } from './components/loaders';
import RouterConfig from './navigation/routerNavigation';
import AuthService from './services/auth';
import { callbackFinishLoad } from './services/utils';
import AuthProvider from './providers/authProvider';

function App() {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    callbackFinishLoad().then(() => setIsLoading(false));
    AuthService.validateSession();
  }, []);

  return (
    <AuthProvider>
      <LoaderBigScreen loading={isLoading} />
      <RouterConfig />
    </AuthProvider>
  );
}

export default App;
