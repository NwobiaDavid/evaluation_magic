import { useEffect } from 'react';
import Home from './pages/Home';
import Mixpanel from 'mixpanel-browser';



function App() {
  
  Mixpanel.init(import.meta.env.VITE_APP_TOKEN);

  useEffect(() => {
    Mixpanel.track('Page View');
  }, []);
  
  return (
    <div className=" w-screen h-screen  ">
      <Home />
    </div>
  );
}

export default App;
