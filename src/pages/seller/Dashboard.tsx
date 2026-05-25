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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonIcon,
  IonFab,
  IonFabButton,
  IonButtons,
  IonMenuButton
} from '@ionic/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { add, logOut, cube, cart, people, notifications } from 'ionicons/icons';
import { useSocket } from '../../hooks/useSocket.ts';

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [alerts, setAlerts] = useState<string[]>([]);
  const socket = useSocket(user?.tenantId);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('new-order', (data: any) => {
        setAlerts(prev => [...prev, `New order received! Amount: $${data.amount}`]);
      });
      socket.on('low-stock', (data: any) => {
        setAlerts(prev => [...prev, `Low stock alert: ${data.productName}`]);
      });
    }
  }, [socket]);

  return (
    <IonPage id="seller-main-content">
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Seller Dashboard</IonTitle>
          <IonButton slot="end" fill="clear" onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}>
            <IonIcon icon={logOut} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            {/* Stats Overview */}
            <IonCol size="12" sizeMd="3">
              <div className="bento-card" style={{ backgroundColor: 'var(--bento-primary)', color: 'white' }}>
                <div style={{ textAlign: 'center' }}>
                  <IonIcon icon={cart} style={{ fontSize: '32px' }} />
                  <h2 style={{ color: 'white', fontSize: '2rem' }}>24</h2>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Daily Orders</p>
                </div>
              </div>
            </IonCol>
            <IonCol size="12" sizeMd="3">
              <div className="bento-card">
                <div style={{ textAlign: 'center' }}>
                  <IonIcon icon={people} style={{ fontSize: '32px', color: 'var(--ion-color-success)' }} />
                  <h2 style={{ fontSize: '2rem' }}>$1,240</h2>
                  <p style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Today's Sales</p>
                </div>
              </div>
            </IonCol>
            <IonCol size="12" sizeMd="3">
              <div className="bento-card">
                <div style={{ textAlign: 'center' }}>
                  <IonIcon icon={cube} style={{ fontSize: '32px', color: 'var(--ion-color-warning)' }} />
                  <h2 style={{ fontSize: '2rem' }}>12</h2>
                  <p style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>Critical Stock</p>
                </div>
              </div>
            </IonCol>
            <IonCol size="12" sizeMd="3">
              <div className="bento-card">
                <div style={{ textAlign: 'center' }}>
                  <IonIcon icon={notifications} style={{ fontSize: '32px', color: 'var(--ion-color-danger)' }} />
                  <h2 style={{ fontSize: '2rem' }}>{alerts.length}</h2>
                  <p style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>New Alerts</p>
                </div>
              </div>
            </IonCol>
          </IonRow>

          <IonRow>
            {/* Sales Chart */}
            <IonCol size="12" sizeLg="8">
              <div className="bento-card">
                <h3 style={{ marginBottom: '20px' }}>Weekly Performance</h3>
                <div style={{ height: '300px', width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      />
                      <Line type="monotone" dataKey="sales" stroke="var(--bento-primary)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </IonCol>

            {/* Real-time Alerts */}
            <IonCol size="12" sizeLg="4">
              <div className="bento-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3>Event Stream</h3>
                  <span className="status-dot online" style={{ animation: 'pulse 2s infinite' }}></span>
                </div>
                <div className="socket-log" style={{ flex: 1, minHeight: '200px' }}>
                  {alerts.length > 0 ? alerts.map((alert, i) => (
                    <p key={i}>[{new Date().toLocaleTimeString()}] {alert}</p>
                  )) : (
                    <p className="opacity-50">Listening for events...</p>
                  )}
                  <p>[14:22:10] Connection established (WSID: 8821)</p>
                  <p>[14:22:15] Tenant system heartbeat ok</p>
                </div>
              </div>
            </IonCol>
          </IonRow>

          <IonRow>
            {/* Quick Actions / Recent Orders */}
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Recent Orders</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonLabel>
                        <h2>Order #1234 - Puppy Food Bulk</h2>
                        <p>Customer: John Doe • 2 items • $85.00</p>
                      </IonLabel>
                      <IonBadge color="success">Delivered</IonBadge>
                    </IonItem>
                    <IonItem>
                      <IonLabel>
                        <h2>Order #1235 - Chew Toy (Large)</h2>
                        <p>Customer: Jane Smith • 1 item • $15.00</p>
                      </IonLabel>
                      <IonBadge color="warning">Preparing</IonBadge>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/seller/inventory">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
