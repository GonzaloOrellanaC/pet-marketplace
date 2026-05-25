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
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonBadge,
  IonIcon,
  IonModal,
  IonButtons,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  IonInput,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonMenu,
  IonMenuToggle
} from '@ionic/react';
import { cartOutline, bagHandleOutline, storefrontOutline, arrowForwardOutline, closeOutline, addOutline, removeOutline, storefront, searchOutline, filterOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { MOCK_PRODUCTS } from '../../data/mockProducts.ts';
import { Product } from '../../types/index.ts';
import { useCart } from '../../context/CartContext.tsx';

const CATEGORIES = ['Todos', 'Comida', 'Ropa', 'Collares', 'Arnés', 'Snacks', 'Higiene', 'Juguetes', 'Camas', 'Salud', 'Viaje'];
const STORES = ['Todas', 'Pet Paradise', 'Mundo Animal', 'La Casa del Gato'];

const Marketplace: React.FC = () => {
  const { addToCart, totalItems, cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('Todos');
  const [store, setStore] = useState('Todas');
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isInfiniteDisabled, setIsInfiniteDisabled] = useState(false);

  useEffect(() => {
    let result = products;

    if (searchText) {
      result = result.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()));
    }

    if (category !== 'Todos') {
      result = result.filter(p => p.category === category);
    }

    if (store !== 'Todas') {
      result = result.filter(p => {
        const storeName = p.tenantId === 'store-1' ? 'Pet Paradise' : p.tenantId === 'store-2' ? 'Mundo Animal' : 'La Casa del Gato';
        return storeName === store;
      });
    }

    setFilteredProducts(result);
    setDisplayedProducts(result.slice(0, 20));
    setIsInfiniteDisabled(result.length <= 20);
  }, [searchText, category, store, products]);

  const loadMoreData = (ev: any) => {
    setTimeout(() => {
      const currentLength = displayedProducts.length;
      const nextBatchSize = 20;
      const nextBatch = filteredProducts.slice(currentLength, currentLength + nextBatchSize);
      
      setDisplayedProducts([...displayedProducts, ...nextBatch]);
      ev.target.complete();

      if (displayedProducts.length + nextBatch.length >= filteredProducts.length) {
        setIsInfiniteDisabled(true);
      }
    }, 500);
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const finishCheckout = () => {
    setShowCheckout(false);
    clearCart();
    alert('¡Compra realizada con éxito! Recibirás un correo de confirmación.');
  };

  return (
    <React.Fragment>
      <IonMenu side="end" menuId="marketplace-filters" contentId="marketplace-content-id" type="overlay">
        <IonHeader>
          <IonToolbar color="light">
            <IonTitle style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Filtros</IonTitle>
            <IonButtons slot="end">
              <IonMenuToggle menu="marketplace-filters">
                <IonButton>
                  <IonIcon icon={closeOutline} slot="icon-only" />
                </IonButton>
              </IonMenuToggle>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div className="bento-card" style={{ boxShadow: 'none', background: 'transparent', border: 'none', padding: '0px' }}>
            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
              <IonIcon icon={searchOutline} color="medium" style={{ marginRight: '10px' }} />
              <IonInput 
                placeholder="Buscador..." 
                value={searchText} 
                onIonInput={(e) => setSearchText(e.detail.value!)} 
                style={{ '--padding-start': '0' }}
              />
            </div>

            <IonLabel style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748B', display: 'block', marginBottom: '8px' }}>CATEGORÍA</IonLabel>
            <IonSelect value={category} onIonChange={(e) => setCategory(e.detail.value)} interface="popover" style={{ background: '#f8fafc', borderRadius: '10px', marginBottom: '20px', padding: '0 10px' }}>
              {CATEGORIES.map(c => <IonSelectOption key={c} value={c}>{c}</IonSelectOption>)}
            </IonSelect>

            <IonLabel style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748B', display: 'block', marginBottom: '8px' }}>TIENDA</IonLabel>
            <IonSelect value={store} onIonChange={(e) => setStore(e.detail.value)} interface="popover" style={{ background: '#f8fafc', borderRadius: '10px', padding: '0 10px' }}>
              {STORES.map(s => <IonSelectOption key={s} value={s}>{s}</IonSelectOption>)}
            </IonSelect>

            <div className="bg-indigo-soft" style={{ marginTop: '24px', padding: '16px', borderRadius: '16px', fontSize: '13px' }}>
              <p style={{ color: 'var(--bento-primary)', fontWeight: '600' }}>💡 Tip del día</p>
              <p style={{ margin: 0, fontSize: '12px' }}>Suscríbete a Pet Paradise y obtén 10% en snacks cada mes.</p>
            </div>

            <div style={{ marginTop: '20px', padding: '16px', border: '1px dashed var(--bento-primary)', borderRadius: '16px', textAlign: 'center' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: 'bold' }}>¿Tienes una tienda o PYME?</p>
              <p style={{ margin: '0 0 12px 0', fontSize: '11px', color: '#64748B' }}>Vende tus alimentos, ropa o juguetes en nuestra plataforma.</p>
              <IonMenuToggle menu="marketplace-filters">
                <IonButton expand="block" size="small" fill="outline" routerLink="/register-store" style={{ margin: 0 }}>
                  Postular Comercio
                </IonButton>
              </IonMenuToggle>
            </div>

            <IonMenuToggle menu="marketplace-filters" autoHide={false}>
              <IonButton expand="block" style={{ marginTop: '30px' }}>
                Ver resultados
              </IonButton>
            </IonMenuToggle>
          </div>
        </IonContent>
      </IonMenu>

      <IonPage id="marketplace-content-id">
        <IonHeader>
          <IonToolbar>
            <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}>
               <div className="bg-indigo-soft" style={{ padding: '8px', borderRadius: '10px', marginRight: '12px' }}>
                  <IonIcon icon={storefront} color="primary" />
               </div>
               <IonTitle style={{ padding: 0 }}>Pet Marketplace</IonTitle>
            </div>
            <IonButtons slot="end">
              <IonMenuToggle menu="marketplace-filters" className="mobile-only">
                <IonButton className="mobile-only" style={{ marginRight: '8px' }}>
                  <IonIcon icon={filterOutline} slot="icon-only" />
                </IonButton>
              </IonMenuToggle>

              <IonButton onClick={() => setShowCart(true)}>
                <IonIcon icon={cartOutline} />
                <IonBadge color="primary" style={{ position: 'absolute', top: '0', right: '0', fontSize: '10px' }}>
                  {totalItems}
                </IonBadge>
              </IonButton>
              <IonButton routerLink="/login" fill="outline" style={{ margin: '0 10px' }}>Login</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            {/* Sidebar Filters */}
            <IonCol size="12" sizeMd="3" className="desktop-only">
              <div className="bento-card" style={{ position: 'sticky', top: '0' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Filtros</h3>
                
                <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                  <IonIcon icon={searchOutline} color="medium" style={{ marginRight: '10px' }} />
                  <IonInput 
                    placeholder="Buscador..." 
                    value={searchText} 
                    onIonInput={(e) => setSearchText(e.detail.value!)} 
                    style={{ '--padding-start': '0' }}
                  />
                </div>

                <IonLabel style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748B', display: 'block', marginBottom: '8px' }}>CATEGORÍA</IonLabel>
                <IonSelect value={category} onIonChange={(e) => setCategory(e.detail.value)} interface="popover" style={{ background: '#f8fafc', borderRadius: '10px', marginBottom: '20px', padding: '0 10px' }}>
                  {CATEGORIES.map(c => <IonSelectOption key={c} value={c}>{c}</IonSelectOption>)}
                </IonSelect>

                <IonLabel style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748B', display: 'block', marginBottom: '8px' }}>TIENDA</IonLabel>
                <IonSelect value={store} onIonChange={(e) => setStore(e.detail.value)} interface="popover" style={{ background: '#f8fafc', borderRadius: '10px', padding: '0 10px' }}>
                  {STORES.map(s => <IonSelectOption key={s} value={s}>{s}</IonSelectOption>)}
                </IonSelect>

                <div className="bg-indigo-soft" style={{ marginTop: '24px', padding: '16px', borderRadius: '16px', fontSize: '13px' }}>
                  <p style={{ color: 'var(--bento-primary)', fontWeight: '600' }}>💡 Tip del día</p>
                  <p style={{ margin: 0, fontSize: '12px' }}>Suscríbete a Pet Paradise y obtén 10% en snacks cada mes.</p>
                </div>

                <div style={{ marginTop: '20px', padding: '16px', border: '1px dashed var(--bento-primary)', borderRadius: '16px', textAlign: 'center' }}>
                  <p style={{ margin: '0 0 8px 0', fontSize: '13.5px', fontWeight: 'bold' }}>¿Tienes una tienda o PYME?</p>
                  <p style={{ margin: '0 0 12px 0', fontSize: '11.5px', color: '#64748B' }}>Vende tus alimentos, ropa o juguetes en nuestra plataforma.</p>
                  <IonButton expand="block" size="small" fill="outline" routerLink="/register-store" style={{ margin: 0 }}>
                    Registrar PYME
                  </IonButton>
                </div>
              </div>
            </IonCol>
            
            {/* Product Grid */}
            <IonCol size="12" sizeMd="9">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <p>Mostrando <b>{filteredProducts.length}</b> productos</p>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <IonMenuToggle menu="marketplace-filters" className="mobile-only">
                    <IonButton className="mobile-only" fill="outline" size="small" style={{ '--border-radius': '10px', margin: 0 }}>
                      <IonIcon icon={filterOutline} slot="start" />
                      Filtros
                    </IonButton>
                  </IonMenuToggle>
                  <div className="status-pill">
                    <span className="status-dot online"></span> {store === 'Todas' ? 'Multitienda activo' : store}
                  </div>
                </div>
              </div>

              <IonRow>
                {displayedProducts.length > 0 ? (
                  displayedProducts.map((product) => (
                    <IonCol size="12" sizeSm="6" sizeLg="4" key={product._id}>
                        <div className="bento-card" style={{ cursor: 'pointer' }} onClick={() => setSelectedProduct(product)}>
                          <div style={{ borderRadius: '12px', overflow: 'hidden', height: '200px' }}>
                            <Swiper
                              modules={[Pagination]}
                              pagination={{ clickable: true }}
                              style={{ width: '100%', height: '100%' }}
                            >
                              {product.images.map((img, i) => (
                                <SwiperSlide key={i}>
                                  <img 
                                    alt={product.name} 
                                    src={img} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  />
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          </div>
                          <div style={{ marginTop: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <p className="text-indigo" style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>{product.category}</p>
                              <IonBadge color={product.stock < 10 ? 'danger' : 'success'} style={{ fontSize: '10px' }}>Stock: {product.stock}</IonBadge>
                            </div>
                            <h3 style={{ margin: '4px 0', fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h3>
                            <p style={{ fontSize: '13px', height: '40px', overflow: 'hidden' }}>{product.description}</p>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                              <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>${product.price}</span>
                              <IonButton size="small" onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                              }}>
                                <IonIcon icon={addOutline} slot="start" />
                                Agregar
                              </IonButton>
                            </div>
                          </div>
                        </div>
                    </IonCol>
                  ))
                ) : (
                  <IonCol size="12" className="ion-text-center">
                    <div className="bento-card" style={{ padding: '60px' }}>
                      <IonIcon icon={bagHandleOutline} style={{ fontSize: '64px', color: '#CBD5E1', marginBottom: '20px' }} />
                      <h3>No se encontraron productos</h3>
                      <p>Intenta ajustar tus filtros o búsqueda.</p>
                      <IonButton fill="clear" onClick={() => { setCategory('Todos'); setStore('Todas'); setSearchText(''); }}>Limpiar Filtros</IonButton>
                    </div>
                  </IonCol>
                )}
              </IonRow>
              
              <IonInfiniteScroll
                threshold="100px"
                disabled={isInfiniteDisabled}
                onIonInfinite={loadMoreData}
              >
                <IonInfiniteScrollContent
                  loadingSpinner="bubbles"
                  loadingText="Cargando más productos..."
                ></IonInfiniteScrollContent>
              </IonInfiniteScroll>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Product Detail Modal */}
        <IonModal isOpen={!!selectedProduct} onDidDismiss={() => setSelectedProduct(null)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Detalle del Producto</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setSelectedProduct(null)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {selectedProduct && (
              <IonGrid>
                <IonRow>
                  <IonCol size="12" sizeMd="6">
                    <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
                      <Swiper modules={[Pagination]} pagination={{ clickable: true }}>
                        {selectedProduct.images.map((img, i) => (
                          <SwiperSlide key={i}>
                            <img src={img} alt="Product" style={{ width: '100%', borderRadius: '20px' }} />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </IonCol>
                  <IonCol size="12" sizeMd="6">
                    <div className="bento-card" style={{ height: 'auto' }}>
                      <p className="text-indigo" style={{ fontWeight: 'bold' }}>{selectedProduct.category.toUpperCase()}</p>
                      <h1 style={{ fontSize: '2rem' }}>{selectedProduct.name}</h1>
                      <div className="status-pill" style={{ marginBottom: '20px' }}>
                         Tienda: {selectedProduct.tenantId === 'store-1' ? 'Pet Paradise' : selectedProduct.tenantId === 'store-2' ? 'Mundo Animal' : 'La Casa del Gato'}
                      </div>
                      <p style={{ fontSize: '1.1rem', marginBottom: '24px' }}>{selectedProduct.description}</p>
                      
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f1f1', paddingTop: '20px' }}>
                        <div>
                          <p style={{ margin: 0, fontSize: '14px' }}>Precio Total</p>
                          <h2 style={{ fontSize: '2.5rem' }}>${selectedProduct.price}</h2>
                        </div>
                        <IonButton size="large" onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); setShowCart(true); }}>
                          Comprar Ahora
                        </IonButton>
                      </div>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            )}
          </IonContent>
        </IonModal>

        {/* Cart Modal */}
        <IonModal isOpen={showCart} onDidDismiss={() => setShowCart(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Tu Carrito</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowCart(false)}>Cerrar</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <IonIcon icon={cartOutline} style={{ fontSize: '80px', color: '#CBD5E1' }} />
                <h3>Tu carrito está vacío</h3>
                <IonButton onClick={() => setShowCart(false)}>Seguir comprando</IonButton>
              </div>
            ) : (
              <div className="bento-card">
                <IonList>
                  {cart.map(item => (
                    <IonItem key={item.product._id} lines="full">
                      <IonThumbnail slot="start">
                        <img src={item.product.images[0]} alt="p" style={{ borderRadius: '8px' }} />
                      </IonThumbnail>
                      <IonLabel>
                        <h3>{item.product.name}</h3>
                        <p>${item.product.price} c/u</p>
                      </IonLabel>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IonButton size="small" fill="clear" onClick={() => updateQuantity(item.product._id, -1)}>
                          <IonIcon icon={removeOutline} />
                        </IonButton>
                        <span style={{ margin: '0 10px', fontWeight: 'bold' }}>{item.quantity}</span>
                        <IonButton size="small" fill="clear" onClick={() => updateQuantity(item.product._id, 1)}>
                          <IonIcon icon={addOutline} />
                        </IonButton>
                        <IonButton size="small" fill="clear" color="danger" onClick={() => removeFromCart(item.product._id)}>
                          <IonIcon icon={closeOutline} />
                        </IonButton>
                      </div>
                    </IonItem>
                  ))}
                </IonList>
                <div style={{ marginTop: '20px', textAlign: 'right' }}>
                  <h2>Total: ${totalPrice.toFixed(2)}</h2>
                  <IonButton expand="block" onClick={handleCheckout}>
                    Proceder al Pago <IonIcon icon={arrowForwardOutline} slot="end" />
                  </IonButton>
                </div>
              </div>
            )}
          </IonContent>
        </IonModal>

        {/* Checkout Simulation Modal */}
        <IonModal isOpen={showCheckout} onDidDismiss={() => setShowCheckout(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Finalizar Compra</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowCheckout(false)}>Cancelar</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <div className="bento-card" style={{ maxWidth: '500px', margin: 'auto' }}>
              <h3>Resumen de Pago</h3>
              <p>Monto a pagar: <b>${totalPrice.toFixed(2)}</b></p>
              
              <div style={{ marginTop: '20px' }}>
                <IonItem lines="none" style={{ background: '#f8fafc', borderRadius: '12px', marginBottom: '12px' }}>
                  <IonLabel position="stacked">Dirección de Envío</IonLabel>
                  <IonInput placeholder="Av. Siempre Viva 742" />
                </IonItem>
                <IonItem lines="none" style={{ background: '#f8fafc', borderRadius: '12px', marginBottom: '12px' }}>
                  <IonLabel position="stacked">Método de Pago</IonLabel>
                  <IonSelect placeholder="Selecciona uno">
                    <IonSelectOption value="visa">Visa **** 4422</IonSelectOption>
                    <IonSelectOption value="master">Mastercard **** 1122</IonSelectOption>
                    <IonSelectOption value="transfer">Transferencia</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </div>

              <div className="bg-indigo-soft" style={{ padding: '16px', borderRadius: '12px', margin: '20px 0' }}>
                 <p style={{ margin: 0, fontSize: '13px' }}>✅ Envío gratuito incluido por compras superiores a $50.</p>
              </div>

              <IonButton expand="block" size="large" onClick={finishCheckout}>
                Confirmar y Pagar
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

      </IonContent>
    </IonPage>
  </React.Fragment>
);
};

export default Marketplace;
