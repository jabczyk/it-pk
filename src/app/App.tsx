import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../router';
import { AuthProvider } from '../context/AuthContext';
import Hotjar from '@hotjar/browser';
import ReactGA from 'react-ga4';

export function App() {
  useEffect(() => {
    // Initialize Google Analytics
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (gaId && typeof gaId === 'string' && !gaId.startsWith('placeholder-') && !gaId.startsWith('your-') && gaId !== 'G-XXXXXXXXXX') {
      try {
        ReactGA.initialize(gaId);
        console.log('Google Analytics initialized with ID:', gaId);
      } catch (err) {
        console.error('Failed to initialize Google Analytics:', err);
      }
    } else if (gaId === 'G-XXXXXXXXXX') {
      // Allow placeholder initialization for testing / demo purposes if explicitly set
      try {
        ReactGA.initialize(gaId);
        console.log('Google Analytics initialized with demo ID:', gaId);
      } catch (err) {
        console.error('Failed to initialize Google Analytics with demo ID:', err);
      }
    } else {
      console.warn('Google Analytics GA_MEASUREMENT_ID is not configured in .env');
    }

    // Initialize Hotjar
    const hotjarSiteIdStr = import.meta.env.VITE_HOTJAR_SITE_ID;
    const hotjarSiteId = parseInt(hotjarSiteIdStr || '', 10);
    const hotjarVersion = parseInt(import.meta.env.VITE_HOTJAR_VERSION || '6', 10);

    if (hotjarSiteId && !isNaN(hotjarSiteId) && hotjarSiteIdStr !== '123456') {
      try {
        Hotjar.init(hotjarSiteId, hotjarVersion);
        console.log('Hotjar initialized with Site ID:', hotjarSiteId);
      } catch (err) {
        console.error('Failed to initialize Hotjar:', err);
      }
    } else if (hotjarSiteIdStr === '123456') {
      // Allow placeholder initialization for testing / demo purposes if explicitly set
      try {
        Hotjar.init(123456, hotjarVersion);
        console.log('Hotjar initialized with demo Site ID: 123456');
      } catch (err) {
        console.error('Failed to initialize Hotjar with demo Site ID:', err);
      }
    } else {
      console.warn('Hotjar Site ID is not configured in .env or is not a valid number');
    }
  }, []);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

