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
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonCheckbox,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import { storefront, personOutline, businessOutline, mailOutline, lockClosedOutline, callOutline, globeOutline, checkmarkCircleOutline, arrowForwardOutline, arrowBackOutline, logoInstagram, shieldCheckmarkOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const RegisterStore: React.FC = () => {
  const history = useHistory();
  const [step, setStep] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    repName: '',
    repEmail: '',
    repPhone: '',
    password: '',
    companyName: '',
    businessId: '', // RUT / Tax ID
    category: 'Comida',
    description: '',
    website: '',
    instagram: '',
    hasPhysicalStore: false,
    shippingCover: 'local',
    termsAccepted: false
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.repName || !formData.repEmail || !formData.password) {
        setToastMessage('Por favor completa los campos principales de contacto.');
        setShowToast(true);
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.companyName || !formData.businessId || !formData.description) {
        setToastMessage('Por favor completa la información de tu empresa/pyme.');
        setShowToast(true);
        return;
      }
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      setToastMessage('Debes aceptar los términos y condiciones de la plataforma.');
      setShowToast(true);
      return;
    }

    // Process submission simulation
    setIsSuccess(true);
  };

  const simulateSellerLogin = () => {
    // Generate mock company with submitted details
    const newUser = {
      id: `store-${Math.floor(Math.random() * 1000)}`,
      email: formData.repEmail,
      name: formData.repName,
      companyName: formData.companyName,
      role: 'seller',
      tenantId: 'store-custom'
    };

    localStorage.setItem('token', 'simulated-new-store-token');
    localStorage.setItem('user', JSON.stringify(newUser));
    history.push('/seller');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
          <IonTitle>Registro para Empresas y PYMEs</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ maxWidth: '750px', margin: '40px auto 1000px auto' }}>
          
          {/* Header Progress Stepper */}
          {!isSuccess && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', padding: '0 10px' }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ 
                  width: '36px', height: '36px', borderRadius: '50%', 
                  background: step >= 1 ? 'var(--bento-primary)' : '#e2e8f0',
                  color: step >= 1 ? '#ffffff' : '#475569',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto',
                  fontWeight: 'bold', fontSize: '14px'
                }}>1</div>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: step === 1 ? 'var(--bento-text-main)' : 'var(--bento-text-muted)' }}>Representante</span>
              </div>
              <div style={{ height: '2px', background: step >= 2 ? 'var(--bento-primary)' : '#e2e8f0', flex: 1, alignSelf: 'center', marginBottom: '18px' }}></div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ 
                  width: '36px', height: '36px', borderRadius: '50%', 
                  background: step >= 2 ? 'var(--bento-primary)' : '#e2e8f0',
                  color: step >= 2 ? '#ffffff' : '#475569',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto',
                  fontWeight: 'bold', fontSize: '14px'
                }}>2</div>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: step === 2 ? 'var(--bento-text-main)' : 'var(--bento-text-muted)' }}>Tu PYME</span>
              </div>
              <div style={{ height: '2px', background: step >= 3 ? 'var(--bento-primary)' : '#e2e8f0', flex: 1, alignSelf: 'center', marginBottom: '18px' }}></div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ 
                  width: '36px', height: '36px', borderRadius: '50%', 
                  background: step >= 3 ? 'var(--bento-primary)' : '#e2e8f0',
                  color: step >= 3 ? '#ffffff' : '#475569',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto',
                  fontWeight: 'bold', fontSize: '14px'
                }}>3</div>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: step === 3 ? 'var(--bento-text-main)' : 'var(--bento-text-muted)' }}>Configuración</span>
              </div>
            </div>
          )}

          {!isSuccess ? (
            <div className="bento-card" style={{ padding: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                <div className="bg-indigo-soft" style={{ padding: '10px', borderRadius: '12px', marginRight: '16px' }}>
                  <IonIcon 
                    icon={step === 1 ? personOutline : step === 2 ? businessOutline : globeOutline} 
                    color="primary" 
                    style={{ fontSize: '24px' }} 
                  />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.4rem' }}>
                    {step === 1 && 'Información de Contacto'}
                    {step === 2 && 'Detalles de tu Empresa'}
                    {step === 3 && 'Opciones de Venta y Redes'}
                  </h2>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--bento-text-muted)' }}>
                    {step === 1 && 'Completa los datos del dueño administrador de la cuenta comercial.'}
                    {step === 2 && 'Cuéntanos sobre tu emprendimiento de mascotas para postularte.'}
                    {step === 3 && 'Conecta tu presencia online y define tus alcances de envío.'}
                  </p>
                </div>
              </div>

              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <IonItem lines="none" style={{ background: '#f8fafc', borderRadius: '12px', padding: '0 8px' }}>
                    <IonLabel position="stacked" style={{ color: '#475569', fontWeight: 'bold', fontSize: '12px' }}>NOMBRE DEL REPRESENTANTE *</IonLabel>
                    <IonInput 
                      value={formData.repName} 
                      onIonInput={e => handleInputChange('repName', e.detail.value!)} 
                      placeholder="Ej: Carolina Pérez"
                    />
                  </IonItem>
                  <IonItem lines="none" style={{ background: '#f8fafc', borderRadius: '12px', padding: '0 8px' }}>
                    <IonLabel position="stacked" style={{ color: '#475569', fontWeight: 'bold', fontSize: '12px' }}>EMAIL DE CONTACTO *</IonLabel>
                    <IonInput 
                      type="email" 
                      value={formData.repEmail} 
                      onIonInput={e => handleInputChange('repEmail', e.detail.value!)} 
                      placeholder="Ej: contacto@tupyme.com"
                    />
                  </IonItem>
                  <IonRow style={{ margin: '0 -8px' }}>
                    <IonCol size="12" sizeMd="6" style={{ padding: '0 8px' }}>
                      <IonItem lines="none" style={{ background: '#f8fafc', borderRadius: '12px', padding: '0 8px' }}>
                        <IonLabel position="stacked" style={{ color: '#475569', fontWeight: 'bold', fontSize: '12px' }}>TELÉFONO MÓVIL</IonLabel>
                        <IonInput 
                          type="tel" 
                          value={formData.repPhone} 
                          onIonInput={e => handleInputChange('repPhone', e.detail.value!)} 
                          placeholder="Ej: +56912345678"
                        />
                      </IonItem>
                    </IonCol>
                    <IonCol size="12" sizeMd="6" style={{ padding: '0 8px' }}>
                      <IonItem lines="none" style={{ background: '#f8fafc', borderRadius: '12px', padding: '0 8px' }}>
                        <IonLabel position="stacked" style={{ color: '#475569', fontWeight: 'bold', fontSize: '12px' }}>CONTRASEÑA SEGURA *</IonLabel>
                        <IonInput 
                          type="password" 
                          value={formData.password} 
                          onIonInput={e => handleInputChange('password', e.detail.value!)} 
                          placeholder="Mínimo 6 caracteres"
                        />
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <IonItem lines="none" style={{ background: '#f8fafc', borderRadius: '12px', padding: '0 8px' }}>
                    <IonLabel position="stacked" style={{ color: '#475569', fontWeight: 'bold', fontSize: '12px' }}>NOMBRE DE LA PYME / EMPRESA *</IonLabel>
                    <IonInput 
                      value={formData.companyName} 
                      onIonInput={e => handleInputChange('companyName', e.detail.value!)} 
                      placeholder="Ej: Pet Paradise Boutique"
                    />
                  </IonItem>
                  <IonRow style={{ margin: '0 -8px' }}>
                    <IonCol size="12" sizeMd="6" style={{ padding: '0 8px' }}>
                      <IonItem lines="none" style={{ background: '#f8fafc', borderRadius: '12px', padding: '0 8px' }}>
                        <IonLabel position="stacked" style={{ color: '#475569', fontWeight: 'bold', fontSize: '12px' }}>IDENTIFICACIÓN TRIBUTARIA (RUT / TAX ID) *</IonLabel>
                        <IonInput 
                          value={formData.businessId} 
                          onIonInput={e => handleInputChange('businessId', e.detail.value!)} 
                          placeholder="Ej: 76.123.456-K"
                        />
                      </IonItem>
                    </IonCol>
                    <IonCol size="12" sizeMd="6" style={{ padding: '0 8px' }}>
                      <IonItem lines="none" style={{ background: '#f8fafc', borderRadius: '12px', padding: '0 8px' }}>
                        <IonLabel position="stacked" style={{ color: '#475569', fontWeight: 'bold', fontSize: '12px' }}>CATEGORÍA PRINCIPAL DE VENTAS</IonLabel>
                        <IonSelect 
                          value={formData.category} 
                          onIonChange={e => handleInputChange('category', e.detail.value)}
                          interface="popover"
                          style={{ width: '100%', '--padding-start': '0' }}
                        >
                          <IonSelectOption value="Comida">Alimentos y Snacks</IonSelectOption>
                          <IonSelectOption value="Arnés">Indumentaria y Accesorios</IonSelectOption>
                          <IonSelectOption value="Juguetes">Juguetes y Entretenimiento</IonSelectOption>
                          <IonSelectOption value="Salud">Salud y Cuidado Especial</IonSelectOption>
                        </IonSelect>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonItem lines="none" style={{ background: '#f8fafc', borderRadius: '12px', padding: '0 8px' }}>
                    <IonLabel position="stacked" style={{ color: '#475569', fontWeight: 'bold', fontSize: '12px' }}>DESCRIPCIÓN COMERCIAL *</IonLabel>
                    <IonTextarea 
                      rows={4} 
                      value={formData.description} 
                      onIonInput={e => handleInputChange('description', e.detail.value!)} 
                      placeholder="Cuéntanos brevemente qué productos vendes y la historia de tu pyme..."
                    />
                  </IonItem>
                </div>
              )}

              {step === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <IonRow style={{ margin: '0 -8px' }}>
                    <IonCol size="12" sizeMd="6" style={{ padding: '0 8px' }}>
                      <IonItem lines="none" style={{ background: '#f8fafc', borderRadius: '12px', padding: '0 8px' }}>
                        <IonLabel position="stacked" style={{ color: '#475569', fontWeight: 'bold', fontSize: '12px' }}>SITIO WEB / CATÁLOGO (OPCIONAL)</IonLabel>
                        <IonInput 
                          type="url" 
                          value={formData.website} 
                          onIonInput={e => handleInputChange('website', e.detail.value!)} 
                          placeholder="https://tupyme.com"
                        />
                      </IonItem>
                    </IonCol>
                    <IonCol size="12" sizeMd="6" style={{ padding: '0 8px' }}>
                      <IonItem lines="none" style={{ background: '#f8fafc', borderRadius: '12px', padding: '0 8px' }}>
                        <IonLabel position="stacked" style={{ color: '#475569', fontWeight: 'bold', fontSize: '12px' }}>USUARIO DE INSTAGRAM</IonLabel>
                        <IonInput 
                          value={formData.instagram} 
                          onIonInput={e => handleInputChange('instagram', e.detail.value!)} 
                          placeholder="@pyme_mascotas"
                        />
                      </IonItem>
                    </IonCol>
                  </IonRow>

                  <IonItem lines="none" style={{ background: '#f8fafc', borderRadius: '12px', padding: '12px 0 12px 12px' }}>
                    <IonCheckbox 
                      checked={formData.hasPhysicalStore} 
                      onIonChange={e => handleInputChange('hasPhysicalStore', e.detail.checked)}
                      slot="start"
                    />
                    <IonLabel style={{ whiteSpace: 'normal', fontSize: '14px' }}>
                      <strong>Contamos con tienda física</strong> <br />
                      <span style={{ fontSize: '12px', color: '#64748B' }}>Selecciona si posees una veterinaria o pet shop físico habilitado al público.</span>
                    </IonLabel>
                  </IonItem>

                  <IonItem lines="none" style={{ background: '#f8fafc', borderRadius: '12px', padding: '0 8px' }}>
                    <IonLabel position="stacked" style={{ color: '#475569', fontWeight: 'bold', fontSize: '12px' }}>COBERTURA DE ENVÍOS DISPONIBLE</IonLabel>
                    <IonSelect 
                      value={formData.shippingCover} 
                      onIonChange={e => handleInputChange('shippingCover', e.detail.value)}
                      interface="popover"
                      style={{ width: '100%' }}
                    >
                      <IonSelectOption value="local">Solo envío Local / Metropolitano</IonSelectOption>
                      <IonSelectOption value="regional">Envíos Regionales</IonSelectOption>
                      <IonSelectOption value="national">Envíos a todo el País</IonSelectOption>
                    </IonSelect>
                  </IonItem>

                  <IonItem lines="none" style={{ background: 'transparent', padding: '10px 0' }}>
                    <IonCheckbox 
                      checked={formData.termsAccepted} 
                      onIonChange={e => handleInputChange('termsAccepted', e.detail.checked)}
                      slot="start"
                    />
                    <IonLabel style={{ whiteSpace: 'normal', fontSize: '13px' }}>
                      Acepto los términos generales de servicio comercial de PetMarket y la comisión del 6.5% por transacción aprobada.
                    </IonLabel>
                  </IonItem>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                {step > 1 ? (
                  <IonButton fill="outline" onClick={handlePrevStep} style={{ flex: 1, height: '48px' }}>
                    <IonIcon icon={arrowBackOutline} slot="start" /> Atrás
                  </IonButton>
                ) : (
                  <IonButton fill="clear" onClick={() => history.push('/login')} style={{ flex: 1, height: '48px', color: '#64748B' }}>
                    Volver al login
                  </IonButton>
                )}

                {step < 3 ? (
                  <IonButton onClick={handleNextStep} style={{ flex: 1, height: '48px' }}>
                    Siguiente <IonIcon icon={arrowForwardOutline} slot="end" />
                  </IonButton>
                ) : (
                  <IonButton color="primary" onClick={handleSubmit} style={{ flex: 1, height: '48px' }}>
                    Enviar Solicitud
                  </IonButton>
                )}
              </div>
            </div>
          ) : (
            /* Success confirmation card */
            <div className="bento-card" style={{ padding: '40px', textAlign: 'center' }}>
              <div style={{ 
                background: 'var(--bento-primary-soft)', 
                width: '72px', height: '72px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px auto'
              }}>
                <IonIcon icon={checkmarkCircleOutline} color="primary" style={{ fontSize: '42px' }} />
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '12px' }}>¡Solicitud Recibida!</h2>
              <p style={{ color: 'var(--bento-text-muted)', fontSize: '15px', lineHeight: '1.6', maxWidth: '580px', margin: '0 auto 24px auto' }}>
                Tu postulación comercial para la empresa <strong>{formData.companyName}</strong> está bajo supervisión de soporte PetMarket. Recibirás un correo de aprobación y bienvenida en un plazo máximo de 24 horas hábiles.
              </p>

              <div className="bg-indigo-soft" style={{ padding: '20px', borderRadius: '16px', textAlign: 'left', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <IonIcon icon={shieldCheckmarkOutline} color="primary" />
                  <strong style={{ fontSize: '14px', color: 'var(--bento-primary)' }}>Resumen Comercial Registrado:</strong>
                </div>
                <div style={{ fontSize: '13px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <p style={{ margin: 0 }}><strong>Representante:</strong> {formData.repName} ({formData.repEmail})</p>
                  <p style={{ margin: 0 }}><strong>RUT / Tax ID:</strong> {formData.businessId}</p>
                  <p style={{ margin: 0 }}><strong>Rubro / Categoria:</strong> Mascotas - {formData.category}</p>
                  <p style={{ margin: 0 }}><strong>Cobertura:</strong> {formData.shippingCover === 'local' ? 'Local / Metropolitano' : formData.shippingCover === 'regional' ? 'Regional' : 'Todo el País'}</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <IonButton fill="outline" style={{ flex: 1 }} onClick={() => { setIsSuccess(false); setStep(1); }}>
                  Registrar otra PYME
                </IonButton>
                <IonButton style={{ flex: 1 }} color="success" onClick={simulateSellerLogin}>
                  Simular Aprobación y Acceder
                </IonButton>
              </div>
            </div>
          )}

        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
};

export default RegisterStore;
