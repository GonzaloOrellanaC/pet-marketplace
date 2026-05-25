import React from 'react';
import { 
  IonMenu, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList, 
  IonItem, 
  IonIcon, 
  IonLabel,
  IonMenuToggle,
  IonFooter,
  IonNote
} from '@ionic/react';
import { 
  gridOutline, 
  cubeOutline, 
  personOutline, 
  logOutOutline,
  informationCircleOutline
} from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';

const SellerMenu: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/login');
  };

  const menuItems = [
    { title: 'Dashboard', path: '/seller', icon: gridOutline },
    { title: 'Inventario', path: '/seller/inventory', icon: cubeOutline },
    { title: 'Mi Perfil', path: '/seller/profile', icon: personOutline },
  ];

  return (
    <IonMenu contentId="seller-main-content" type="overlay">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>PetMarket Pro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList id="inbox-list">
          {menuItems.map((item, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem 
                className={location.pathname === item.path ? 'selected' : ''} 
                routerLink={item.path} 
                routerDirection="none" 
                lines="none" 
                detail={false}
                style={{ '--border-radius': '12px', margin: '8px' }}
              >
                <IonIcon slot="start" icon={item.icon} />
                <IonLabel>{item.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}

          <IonItem 
            button 
            onClick={handleLogout} 
            lines="none" 
            detail={false}
            style={{ '--border-radius': '12px', margin: '8px', color: 'var(--ion-color-danger)' }}
          >
            <IonIcon slot="start" icon={logOutOutline} />
            <IonLabel>Cerrar Sesión</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter className="ion-padding ion-text-center">
        <IonNote style={{ fontSize: '12px' }}>
          <IonIcon icon={informationCircleOutline} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
          Versión v1.0.4-MVP
        </IonNote>
      </IonFooter>
    </IonMenu>
  );
};

export default SellerMenu;
