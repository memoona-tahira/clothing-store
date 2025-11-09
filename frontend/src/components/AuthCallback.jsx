import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = () => {
      console.log('🔄 Processing legacy auth callback...');
      // This is a fallback for old callback URLs
      // The main logic is now in App.jsx AuthHandler
      navigate('/', { replace: true });
    };

    handleCallback();
  }, [navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '50vh' 
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Redirecting...</h2>
        <p>Please wait while we complete authentication.</p>
      </div>
    </div>
  );
};

export default AuthCallback;