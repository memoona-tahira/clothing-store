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
          navigate('/?error=auth_failed');
          return;
        }

        if (success === 'true') {
          console.log('✅ Auth successful, checking user status...');
          
          // Wait for session to be established
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Trigger auth check
          const user = await handleAuthCallback();
          
          if (user) {
            console.log('✅ User authenticated successfully:', user.email);
            navigate('/', { replace: true });
          } else {
            console.error('❌ User not found after auth');
            navigate('/?error=user_not_found');
          }
        } else {
          console.error('❌ Auth callback without success');
          navigate('/?error=auth_failed');
        }
      } catch (error) {
        console.error('❌ Auth callback processing error:', error);
        navigate('/?error=server_error');
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
        <div style={{ marginTop: '20px' }}>
          <p>If you're not redirected automatically, <a href="/">click here</a></p>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;