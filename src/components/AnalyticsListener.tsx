import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

export function AnalyticsListener() {
  const location = useLocation();

  useEffect(() => {
    // Only send pageview if ReactGA is initialized
    try {
      ReactGA.send({
        hitType: 'pageview',
        page: location.pathname + location.search,
        title: document.title
      });
    } catch (error) {
      console.warn('ReactGA send failed:', error);
    }
  }, [location]);

  return null;
}
