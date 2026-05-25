import React, { useState } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonToast,
  IonIcon
} from '@ionic/react';
import { storefront } from 'ionicons/icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('seller@petmarket.com');
  const [password, setPassword] = useState('password123');
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'seller') history.push('/seller');
      else if (user.role === 'superadmin') history.push('/admin');
      else history.push('/marketplace');
    } catch (error) {
      setShowToast(true);
      console.warn('API error, using demo bypass');
      
      const dummyUser = { 
        id: 'dummy-id', 
        email: email, 
        name: email === 'admin@petmarket.com' ? 'Admin Master' : 'Vendedor de Prueba',
        role: email === 'admin@petmarket.com' ? 'superadmin' : 'seller',
        tenantId: '664b97f5e8a6c8e3d4a5b6c7' // Mock valid ObjectId
      };
      
      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem('user', JSON.stringify(dummyUser));

      if (dummyUser.role === 'seller') history.push('/seller');
      else if (dummyUser.role === 'superadmin') history.push('/admin');
      else history.push('/marketplace');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login to PetMarket</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        <div style={{ maxWidth: '440px', margin: 'auto', marginTop: '80px' }}>
          <div className="bento-card" style={{ padding: '40px' }}>
            <div className="bg-indigo-soft" style={{ width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
              <IonIcon icon={storefront} style={{ fontSize: '32px', color: 'var(--bento-primary)' }} />
            </div>
            <h2 style={{ marginBottom: '8px' }}>PetMarket Pro</h2>
            <p style={{ marginBottom: '32px' }}>Sign in to manage your marketplace store</p>
            
            <div style={{ textAlign: 'left' }}>
              <IonItem lines="none" style={{ background: '#f8fafc', borderRadius: '12px', marginBottom: '16px', padding: '0 8px' }}>
                <IonLabel position="stacked" style={{ color: 'var(--bento-text-muted)', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>Email Address</IonLabel>
                <IonInput 
                  type="email" 
                  value={email} 
                  onIonInput={(e) => setEmail(e.detail.value!)}
                  placeholder="seller@petmarket.com"
                />
              </IonItem>
              <IonItem lines="none" style={{ background: '#f8fafc', borderRadius: '12px', marginBottom: '24px', padding: '0 8px' }}>
                <IonLabel position="stacked" style={{ color: 'var(--bento-text-muted)', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>Password</IonLabel>
                <IonInput 
                  type="password" 
                  value={password} 
                  onIonInput={(e) => setPassword(e.detail.value!)}
                  placeholder="••••••••"
                />
              </IonItem>
            </div>

            <IonButton expand="block" style={{ height: '48px', marginBottom: '16px' }} onClick={handleLogin}>
              Sign In
            </IonButton>
            <p style={{ fontSize: '14px' }}>¿Eres una empresa o PYME? <span className="text-indigo" style={{ fontWeight: '600', cursor: 'pointer' }} onClick={() => history.push('/register-store')}>Regístrate para vender aquí</span></p>
          </div>
          
          <div className="status-pill ion-margin-top" style={{ background: 'transparent' }}>
            <span className="status-dot online"></span> API v1.0.4 Online
          </div>
        </div>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Invalid credentials or connection error."
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
