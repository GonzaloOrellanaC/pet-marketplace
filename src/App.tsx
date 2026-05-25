import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import Marketplace from './pages/public/Marketplace.tsx';
import Login from './pages/auth/Login.tsx';
import RegisterStore from './pages/auth/RegisterStore.tsx';
import Dashboard from './pages/seller/Dashboard.tsx';
import Inventory from './pages/seller/Inventory.tsx';
import Profile from './pages/seller/Profile.tsx';
import AdminPanel from './pages/admin/AdminPanel.tsx';
import SellerMenu from './components/SellerMenu.tsx';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import { CartProvider } from './context/CartContext.tsx';

setupIonicReact();

export default function App() {
  const Router = IonReactRouter as any;
  return (
    <IonApp>
      <CartProvider>
        <Router>
          <SellerMenu />
          <IonRouterOutlet id="seller-main-content">
            <Route exact path="/marketplace" component={Marketplace} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register-store" component={RegisterStore} />
            <Route exact path="/seller" component={Dashboard} />
            <Route exact path="/seller/inventory" component={Inventory} />
            <Route exact path="/seller/profile" component={Profile} />
            <Route exact path="/admin" component={AdminPanel} />
            <Route exact path="/">
              <Redirect to="/marketplace" />
            </Route>
          </IonRouterOutlet>
        </Router>
      </CartProvider>
    </IonApp>
  );
}
