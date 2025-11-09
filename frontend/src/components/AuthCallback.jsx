import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { handleAuthCallback } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('🔄 Processing auth callback...');
        
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const success = urlParams.get('success');
        const error = urlParams.get('error');
        
        console.log('🔍 Callback params - success:', success, 'error:', error);

        if (error) {
          console.error('❌ Auth callback error:', error);
          navigate(`/login?error=${error}`);
          return;
        }

        if (success === 'true') {
          console.log('✅ Auth successful, checking user status...');
          // Trigger auth check in context
          handleAuthCallback();
          
          // Wait a moment for the auth check to complete
          setTimeout(() => {
            navigate('/'); // Redirect to home page
          }, 1000);
        } else {
          console.error('❌ Auth callback without success');
          navigate('/login?error=auth_failed');
        }
      } catch (error) {
        console.error('❌ Auth callback processing error:', error);
        navigate('/login?error=server_error');
      }
    };

    handleCallback();
  }, [navigate, handleAuthCallback]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '50vh' 
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Completing login...</h2>
        <p>Please wait while we authenticate you.</p>
      </div>
    </div>
  );
};

export default AuthCallback;