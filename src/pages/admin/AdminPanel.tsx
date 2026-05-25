import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonGrid, 
  IonRow, 
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonButton,
  IonIcon,
  IonBadge
} from '@ionic/react';
import { storefront, people, statsChart, logOut } from 'ionicons/icons';

const tenants = [
  { id: '1', name: 'PawStore Chile', status: 'active', plan: 'pro', sales: '$5,240' },
  { id: '2', name: 'PetFood Express', status: 'active', plan: 'basic', sales: '$1,120' },
  { id: '3', name: 'Luxury Cats', status: 'suspended', plan: 'enterprise', sales: '$0 (Morosity)' },
];

const AdminPanel: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle>Super Admin Control</IonTitle>
          <IonButton slot="end" fill="clear" onClick={() => window.location.href = '/login'}>
            <IonIcon icon={logOut} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="4">
              <div className="bento-card">
                <div style={{ textAlign: 'center' }}>
                  <IonIcon icon={statsChart} style={{ fontSize: '32px', color: 'var(--ion-color-secondary)' }} />
                  <h2 style={{ fontSize: '2rem' }}>$12,450</h2>
                  <p style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Global Commissions (Month)</p>
                </div>
              </div>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <div className="bento-card">
                <div style={{ textAlign: 'center' }}>
                  <IonIcon icon={storefront} style={{ fontSize: '32px', color: 'var(--ion-color-primary)' }} />
                  <h2 style={{ fontSize: '2rem' }}>142</h2>
                  <p style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Active Tenants</p>
                </div>
              </div>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <div className="bento-card" style={{ backgroundColor: 'var(--bento-primary)', color: 'white' }}>
                <div style={{ textAlign: 'center' }}>
                  <IonIcon icon={people} style={{ fontSize: '32px', color: 'white' }} />
                  <h2 style={{ fontSize: '2rem', color: 'white' }}>12.4k</h2>
                  <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>Total Customers</p>
                </div>
              </div>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <div className="bento-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3>Tenant Lifecycle</h3>
                  <span className="status-pill"><span className="status-dot online"></span> 14 Active</span>
                </div>
                <IonList>
                  {tenants.map((tenant) => (
                    <IonItem key={tenant.id} lines="none" style={{ borderRadius: '12px', marginBottom: '8px', border: '1px solid #f0f0f0' }}>
                      <IonLabel>
                        <h2 style={{ fontWeight: 600 }}>{tenant.name}</h2>
                        <p style={{ fontSize: '11px' }}>Plan: {tenant.plan.toUpperCase()} • Monthly Sales: {tenant.sales}</p>
                      </IonLabel>
                      <IonBadge color={tenant.status === 'active' ? 'success' : 'danger'} slot="end">
                        {tenant.status}
                      </IonBadge>
                      <IonToggle 
                        slot="end" 
                        checked={tenant.status === 'active'} 
                      />
                    </IonItem>
                  ))}
                </IonList>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AdminPanel;
