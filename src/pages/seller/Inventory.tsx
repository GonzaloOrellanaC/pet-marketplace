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
  IonButton,
  IonIcon,
  IonButtons,
  IonMenuButton,
  IonSearchbar,
  IonBadge,
  IonModal,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonFab,
  IonFabButton,
  IonActionSheet
} from '@ionic/react';
import { add, ellipsisVertical, trash, create, cube, imageOutline, cameraOutline, alertCircleOutline } from 'ionicons/icons';
import axios from 'axios';
import { Product } from '../../types/index.ts';

const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Partial<Product> | null>(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'food',
    stock: 0,
    sku: '',
    weight: '',
    dimensions: ''
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return;
      const user = JSON.parse(userStr);
      
      const response = await axios.get('/api/products', {
        params: { tenantId: user.tenantId }
      });
      setProducts(response.data);
    } catch (error: any) {
      console.error('Error fetching inventory:', error.message);
      // Optional: Set some dummy products if fetch fails for UX
      if (products.length === 0) {
        setProducts([
          { _id: '1', name: 'Alimento Premium Perro', description: 'Ejemplo de producto (Modo Offline)', price: 45.99, category: 'food', stock: 15, images: [], tenantId: '1', averageRating: 5 }
        ] as any);
      }
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      if (editProduct?._id) {
        await axios.put(`/api/products/${editProduct._id}`, formData, config);
      } else {
        await axios.post('/api/products', formData, config);
      }
      
      setShowModal(false);
      fetchInventory();
    } catch (error) {
      console.error('Error saving product');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchInventory();
    } catch (error) {
       console.error('Error deleting product');
    }
  };

  return (
    <IonPage id="seller-main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Gestión de Inventario</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar placeholder="Buscar en inventario..." />
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            {products.map((product) => (
              <IonCol size="12" sizeMd="6" sizeLg="4" key={product._id}>
                <div className="bento-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="bg-indigo-soft" style={{ padding: '10px', borderRadius: '12px' }}>
                      <IonIcon icon={cube} color="primary" />
                    </div>
                    <IonButton fill="clear" onClick={() => {
                      setSelectedProduct(product);
                      setShowActionSheet(true);
                    }}>
                      <IonIcon icon={ellipsisVertical} />
                    </IonButton>
                  </div>
                  
                  <h3 style={{ marginTop: '16px' }}>{product.name}</h3>
                  <p style={{ fontSize: '12px' }}>SKU: {product._id.substring(0, 8).toUpperCase()}</p>
                  
                  <div style={{ margin: '16px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Stock Disponible</span>
                      <IonBadge color={product.stock < 10 ? 'danger' : 'success'}>
                        {product.stock} unidades
                      </IonBadge>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px' }}>
                      <div style={{ 
                        width: `${Math.min(product.stock, 100)}%`, 
                        height: '100%', 
                        background: product.stock < 10 ? '#eb445a' : '#2dd36f',
                        borderRadius: '4px'
                      }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>${product.price}</span>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>{product.category}</span>
                  </div>
                </div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => {
            setEditProduct(null);
            setFormData({ name: '', description: '', price: 0, category: 'food', stock: 0 });
            setShowModal(true);
          }}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        {/* Create/Edit Modal */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{editProduct ? 'Editar Producto' : 'Nuevo Producto'}</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowModal(false)}>Cerrar</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonGrid>
              <IonRow>
                <IonCol size="12" sizeLg="8">
                  <div className="bento-card">
                    <h3 style={{ marginBottom: '20px' }}>Información General</h3>
                    <IonItem lines="full">
                      <IonLabel position="stacked">Nombre del Producto</IonLabel>
                      <IonInput value={formData.name} onIonInput={e => setFormData({...formData, name: e.detail.value!})} />
                    </IonItem>
                    <IonItem lines="full">
                      <IonLabel position="stacked">Descripción Detallada</IonLabel>
                      <IonTextarea rows={6} value={formData.description} onIonInput={e => setFormData({...formData, description: e.detail.value!})} />
                    </IonItem>
                                      <IonRow>
                      <IonCol size="6">
                        <IonItem lines="full">
                          <IonLabel position="stacked">Precio ($)</IonLabel>
                          <IonInput type="number" value={formData.price} onIonInput={e => setFormData({...formData, price: Number(e.detail.value)})} />
                        </IonItem>
                      </IonCol>
                      <IonCol size="6">
                        <IonItem lines="full">
                          <IonLabel position="stacked">Stock Disponible</IonLabel>
                          <IonInput type="number" value={formData.stock} onIonInput={e => setFormData({...formData, stock: Number(e.detail.value)})} />
                        </IonItem>
                      </IonCol>
                    </IonRow>

                    <IonRow>
                      <IonCol size="6">
                        <IonItem lines="full">
                          <IonLabel position="stacked">SKU / Código</IonLabel>
                          <IonInput value={formData.sku} onIonInput={e => setFormData({...formData, sku: e.detail.value!})} placeholder="EJ: PM-449" />
                        </IonItem>
                      </IonCol>
                      <IonCol size="6">
                        <IonItem lines="full">
                          <IonLabel position="stacked">Categoría</IonLabel>
                          <IonSelect value={formData.category} onIonChange={e => setFormData({...formData, category: e.detail.value})}>
                            <IonSelectOption value="food">Alimentos</IonSelectOption>
                            <IonSelectOption value="clothing">Ropa</IonSelectOption>
                            <IonSelectOption value="collars">Collares</IonSelectOption>
                            <IonSelectOption value="harness">Arnés</IonSelectOption>
                            <IonSelectOption value="snacks">Snacks</IonSelectOption>
                          </IonSelect>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </div>

                  <div className="bento-card" style={{ marginTop: '20px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Especificaciones Técnicas</h3>
                    <IonRow>
                      <IonCol size="6">
                        <IonItem lines="full">
                          <IonLabel position="stacked">Peso (kg/gr)</IonLabel>
                          <IonInput value={formData.weight} onIonInput={e => setFormData({...formData, weight: e.detail.value!})} />
                        </IonItem>
                      </IonCol>
                      <IonCol size="6">
                        <IonItem lines="full">
                          <IonLabel position="stacked">Dimensiones (cm)</IonLabel>
                          <IonInput value={formData.dimensions} onIonInput={e => setFormData({...formData, dimensions: e.detail.value!})} />
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </div>
                </IonCol>

                <IonCol size="12" sizeLg="4">
                  <div className="bento-card" style={{ opacity: 0.7 }}>
                    <h3 style={{ marginBottom: '16px' }}>Imágenes de Referencia</h3>
                    <div style={{ 
                      border: '2px dashed #CBD5E1', 
                      borderRadius: '16px', 
                      padding: '40px 20px', 
                      textAlign: 'center',
                      background: '#f8fafc' 
                    }}>
                      <IonIcon icon={imageOutline} style={{ fontSize: '48px', color: '#94A3B8', marginBottom: '12px' }} />
                      <p style={{ fontSize: '13px', color: '#64748B' }}>Arrastra imágenes aquí o haz clic para subir</p>
                      <IonButton fill="outline" size="small" disabled>Seleccionar Archivos</IonButton>
                    </div>
                    
                    <div className="bg-indigo-soft" style={{ marginTop: '20px', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center' }}>
                       <IonIcon icon={alertCircleOutline} color="primary" style={{ marginRight: '8px' }} />
                       <span style={{ fontSize: '11px', color: 'var(--bento-primary)' }}>El módulo de carga de archivos estará disponible en la v1.1</span>
                    </div>

                    <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                       <div style={{ height: '80px', background: '#f1f5f9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <IonIcon icon={cameraOutline} style={{ color: '#cbd5e1' }} />
                       </div>
                       <div style={{ height: '80px', background: '#f1f5f9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <IonIcon icon={cameraOutline} style={{ color: '#cbd5e1' }} />
                       </div>
                    </div>
                  </div>

                  <IonButton expand="block" size="large" style={{ marginTop: '20px' }} onClick={handleSave}>
                    {editProduct ? 'Actualizar Información' : 'Publicar Producto'}
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>

        {/* Actions Sheet */}
        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          header="Acciones de Producto"
          buttons={[
            {
              text: 'Eliminar',
              role: 'destructive',
              icon: trash,
              handler: () => selectedProduct && handleDelete(selectedProduct._id)
            },
            {
              text: 'Editar',
              icon: create,
              handler: () => {
                if (selectedProduct) {
                  setEditProduct(selectedProduct);
                  setFormData({
                    name: selectedProduct.name,
                    description: selectedProduct.description,
                    price: selectedProduct.price,
                    category: selectedProduct.category,
                    stock: selectedProduct.stock
                  });
                  setShowModal(true);
                }
              }
            },
            {
              text: 'Cancelar',
              role: 'cancel'
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Inventory;
