import React, { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonGrid, 
  IonRow, 
  IonCol,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToggle
} from '@ionic/react';
import { person, lockClosed, mail, shieldCheckmark } from 'ionicons/icons';

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <IonPage id="seller-main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Mi Perfil de Comercio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeLg="6">
              <div className="bento-card">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                  <div className="bg-indigo-soft" style={{ width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '20px' }}>
                    <IonIcon icon={person} style={{ fontSize: '40px', color: 'var(--bento-primary)' }} />
                  </div>
                  <div>
                    <h2>{user?.name}</h2>
                    <p>Vendedor desde Mayo 2026</p>
                  </div>
                </div>

                <div style={{ marginTop: '24px' }}>
                  <IonItem lines="none" style={{ background: '#f8fafc', borderRadius: '12px', marginBottom: '12px' }}>
                    <IonIcon icon={mail} slot="start" color="medium" />
                    <IonLabel position="stacked">Email</IonLabel>
                    <IonInput value={user?.email} readonly />
                  </IonItem>
                  
                  <IonItem lines="none" style={{ background: '#f8fafc', borderRadius: '12px', marginBottom: '12px' }}>
                    <IonIcon icon={lockClosed} slot="start" color="medium" />
                    <IonLabel position="stacked">Contraseña</IonLabel>
                    <IonInput type="password" value="********" readonly />
                  </IonItem>
                </div>
              </div>
            </IonCol>

            <IonCol size="12" sizeLg="6">
              <div className="bento-card">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                  <IonIcon icon={shieldCheckmark} style={{ fontSize: '24px', color: 'var(--ion-color-success)', marginRight: '12px' }} />
                  <h3>Seguridad y 2FA</h3>
                </div>
                
                <p style={{ fontSize: '14px', marginBottom: '24px' }}>
                  Protege tu cuenta activando la autenticación de dos factores (2FA). Se requerirá un código de seguridad para iniciar sesión.
                </p>

                <IonItem lines="none" style={{ background: '#f8fafc', borderRadius: '12px', padding: '10px' }}>
                  <IonLabel>Activar 2FA (Recomendado)</IonLabel>
                  <IonToggle checked={false} disabled />
                </IonItem>

                <IonButton expand="block" color="primary" style={{ marginTop: '30px' }}>
                  Cambiar Contraseña
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
