// src/pages/Profile.tsx
import React, { useState } from 'react';
import { 
  IonContent, IonButton, IonIcon, IonItem, IonLabel, IonInput, 
  IonCheckbox, IonGrid, IonRow, IonCol, IonNote, IonSpinner,
  IonAlert, IonLoading, IonBadge, IonChip, IonToggle, IonList,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle
} from '@ionic/react';
import { 
  personCircleOutline, mailOutline, locationOutline, phonePortraitOutline,
  calendarOutline, cardOutline, lockClosedOutline, notificationsOutline,
  starOutline, bagHandleOutline, heartOutline, settingsOutline,
  pencilOutline, checkmarkCircleOutline, shieldCheckmarkOutline,
  trophyOutline, documentTextOutline, logOutOutline, arrowBack
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

// hooks/usePageTitle.ts
import { useIonViewWillEnter } from '@ionic/react';

export const usePageTitle = (title: string) => {
  useIonViewWillEnter(() => {
    document.title = title;
  });
};

interface UserAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface UserPreferences {
  newsletter: boolean;
  smsNotifications: boolean;
  emailPromotions: boolean;
  specialOffers: boolean;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  address: UserAddress;
  preferences: UserPreferences;
}

const Profile: React.FC = () => {
  usePageTitle("Mi Perfil - Variedades Doña Luz");
  const history = useHistory();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [notifications, setNotifications] = useState<Array<{id: number, type: string, title: string, message: string}>>([]);

  const [userData, setUserData] = useState<UserData>({
    firstName: 'María',
    lastName: 'González',
    email: 'maria.gonzalez@email.com',
    phone: '+57 300 123 4567',
    birthDate: '1990-05-15',
    gender: 'femenino',
    address: {
      street: 'Calle 123 #45-67',
      city: 'Bogotá',
      state: 'Cundinamarca',
      zipCode: '110111'
    },
    preferences: {
      newsletter: true,
      smsNotifications: false,
      emailPromotions: true,
      specialOffers: true
    }
  });

  const [editData, setEditData] = useState<UserData>({ ...userData });

  const stats = {
    orders: 12,
    wishlist: 8,
    reviews: 5,
    loyaltyPoints: 1250
  };

  const recentOrders = [
    {
      id: 1,
      date: '2024-01-15',
      items: 2,
      total: '$189.99',
      status: 'entregado',
      products: ['Sneakers Urbanos', 'Esencia Floral']
    },
    {
      id: 2,
      date: '2024-01-10',
      items: 1,
      total: '$124.99',
      status: 'entregado',
      products: ['Zapatillas Running Pro']
    },
    {
      id: 3,
      date: '2024-01-05',
      items: 3,
      total: '$245.50',
      status: 'en camino',
      products: ['Oxford Elegante', 'Fragancia Ébano', 'Brisa de Verano']
    }
  ];

  const showNotification = (type: string, title: string, message: string, duration: number = 4000) => {
    const id = Date.now();
    const newNotification = { id, type, title, message };
    setNotifications(prev => [...prev, newNotification]);
    
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleEdit = () => {
    setEditData({ ...userData });
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setUserData({ ...editData });
      setIsEditing(false);
      setIsLoading(false);
      setShowSuccessAlert(true);
      showNotification('success', 'Perfil actualizado', 'Tus datos se han guardado correctamente');
    }, 1500);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...userData });
  };

  const handlePersonalInfoChange = (field: keyof UserData, value: any) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (field: keyof UserAddress, value: string) => {
    setEditData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handlePreferenceChange = (preference: keyof UserPreferences, value: boolean) => {
    setEditData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: value
      }
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'entregado': return 'success';
      case 'en camino': return 'warning';
      case 'procesando': return 'primary';
      default: return 'medium';
    }
  };

  return (
    <IonContent className="ion-padding force-light-theme">
      <style>{`
        .force-light-theme {
          --ion-background-color: #f8fafc !important;
          --ion-text-color: #1f2937 !important;
        }
        .force-light-theme ion-item {
          --background: white !important;
          background: white !important;
          --color: #1f2937 !important;
        }
        .force-light-theme ion-input {
          --background: white !important;
          background: white !important;
          --color: #1f2937 !important;
          --placeholder-color: #9ca3af !important;
        }
        .force-light-theme ion-select {
          --background: white !important;
          background: white !important;
          --color: #1f2937 !important;
        }
        .force-light-theme ion-card {
          --background: white !important;
          background: white !important;
        }
        .force-light-theme ion-card-content {
          --background: white !important;
          background: white !important;
        }
        .custom-input-item {
          --background: white !important;
          background: white !important;
        }
        .white-bg {
          background: white !important;
        }
        .text-dark {
          color: #1f2937 !important;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-white to-soft-green">
        
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <IonButton 
                onClick={() => history.push('/home')}
                fill="clear"
                className="text-forest-green font-semibold"
              >
                <IonIcon icon={arrowBack} className="mr-1" />
                Volver
              </IonButton>

              <h1 className="text-2xl font-bold text-forest-green">
                Mi Perfil
              </h1>

              <div className="flex items-center space-x-2">
                {!isEditing ? (
                  <IonButton
                    onClick={handleEdit}
                    className="bg-mint-green text-forest-green font-semibold"
                  >
                    <IonIcon icon={pencilOutline} className="mr-2" />
                    Editar
                  </IonButton>
                ) : (
                  <div className="flex space-x-2">
                    <IonButton
                      onClick={handleCancel}
                      fill="outline"
                      className="border-gray-300 text-gray-700"
                    >
                      Cancelar
                    </IonButton>
                    <IonButton
                      onClick={handleSave}
                      className="bg-mint-green text-forest-green font-semibold"
                    >
                      <IonIcon icon={checkmarkCircleOutline} className="mr-2" />
                      Guardar
                    </IonButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Columna Izquierda - Información del Perfil */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Tarjeta de Información Personal */}
              <IonCard className="rounded-2xl shadow-lg border border-gray-100 white-bg">
                <IonCardHeader className="bg-gradient-to-r from-mint-green to-lime-green text-forest-green rounded-t-2xl">
                  <IonCardTitle className="flex items-center text-forest-green">
                    <IonIcon icon={personCircleOutline} className="mr-3 text-2xl" />
                    Información Personal
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="p-6 white-bg">
                  <IonGrid>
                    <IonRow>
                      <IonCol size="6">
                        <div className="space-y-2 mb-4">
                          <IonItem className="ion-no-padding custom-input-item white-bg" lines="none">
                            <IonLabel position="stacked" className="text-gray-700 font-semibold mb-2 text-dark">
                              Nombre
                            </IonLabel>
                            {isEditing ? (
                              <IonInput
                                value={editData.firstName}
                                onIonInput={(e) => handlePersonalInfoChange('firstName', e.detail.value!)}
                                className="text-dark bg-white border border-gray-200 rounded-xl px-3"
                              />
                            ) : (
                              <div className="text-lg font-medium text-gray-800 bg-white p-2 rounded-xl">{userData.firstName}</div>
                            )}
                          </IonItem>
                        </div>
                      </IonCol>
                      <IonCol size="6">
                        <div className="space-y-2 mb-4">
                          <IonItem className="ion-no-padding custom-input-item white-bg" lines="none">
                            <IonLabel position="stacked" className="text-gray-700 font-semibold mb-2 text-dark">
                              Apellido
                            </IonLabel>
                            {isEditing ? (
                              <IonInput
                                value={editData.lastName}
                                onIonInput={(e) => handlePersonalInfoChange('lastName', e.detail.value!)}
                                className="text-dark bg-white border border-gray-200 rounded-xl px-3"
                              />
                            ) : (
                              <div className="text-lg font-medium text-gray-800 bg-white p-2 rounded-xl">{userData.lastName}</div>
                            )}
                          </IonItem>
                        </div>
                      </IonCol>
                    </IonRow>

                    <IonRow>
                      <IonCol size="6">
                        <div className="space-y-2 mb-4">
                          <IonItem className="ion-no-padding custom-input-item white-bg" lines="none">
                            <IonLabel position="stacked" className="text-gray-700 font-semibold mb-2 text-dark">
                              <IonIcon icon={mailOutline} className="mr-2" />
                              Correo Electrónico
                            </IonLabel>
                            {isEditing ? (
                              <IonInput
                                type="email"
                                value={editData.email}
                                onIonInput={(e) => handlePersonalInfoChange('email', e.detail.value!)}
                                className="text-dark bg-white border border-gray-200 rounded-xl px-3"
                              />
                            ) : (
                              <div className="text-lg font-medium text-gray-800 bg-white p-2 rounded-xl">{userData.email}</div>
                            )}
                          </IonItem>
                        </div>
                      </IonCol>
                      <IonCol size="6">
                        <div className="space-y-2 mb-4">
                          <IonItem className="ion-no-padding custom-input-item white-bg" lines="none">
                            <IonLabel position="stacked" className="text-gray-700 font-semibold mb-2 text-dark">
                              <IonIcon icon={phonePortraitOutline} className="mr-2" />
                              Teléfono
                            </IonLabel>
                            {isEditing ? (
                              <IonInput
                                type="tel"
                                value={editData.phone}
                                onIonInput={(e) => handlePersonalInfoChange('phone', e.detail.value!)}
                                className="text-dark bg-white border border-gray-200 rounded-xl px-3"
                              />
                            ) : (
                              <div className="text-lg font-medium text-gray-800 bg-white p-2 rounded-xl">{userData.phone}</div>
                            )}
                          </IonItem>
                        </div>
                      </IonCol>
                    </IonRow>

                    <IonRow>
                      <IonCol size="6">
                        <div className="space-y-2 mb-4">
                          <IonItem className="ion-no-padding custom-input-item white-bg" lines="none">
                            <IonLabel position="stacked" className="text-gray-700 font-semibold mb-2 text-dark">
                              <IonIcon icon={calendarOutline} className="mr-2" />
                              Fecha de Nacimiento
                            </IonLabel>
                            {isEditing ? (
                              <IonInput
                                type="date"
                                value={editData.birthDate}
                                onIonInput={(e) => handlePersonalInfoChange('birthDate', e.detail.value!)}
                                className="text-dark bg-white border border-gray-200 rounded-xl px-3"
                              />
                            ) : (
                              <div className="text-lg font-medium text-gray-800 bg-white p-2 rounded-xl">
                                {new Date(userData.birthDate).toLocaleDateString('es-ES')}
                              </div>
                            )}
                          </IonItem>
                        </div>
                      </IonCol>
                      <IonCol size="6">
                        <div className="space-y-2 mb-4">
                          <IonItem className="ion-no-padding custom-input-item white-bg" lines="none">
                            <IonLabel position="stacked" className="text-gray-700 font-semibold mb-2 text-dark">
                              Género
                            </IonLabel>
                            {isEditing ? (
                              <IonInput
                                value={editData.gender}
                                onIonInput={(e) => handlePersonalInfoChange('gender', e.detail.value!)}
                                className="text-dark bg-white border border-gray-200 rounded-xl px-3 capitalize"
                              />
                            ) : (
                              <div className="text-lg font-medium text-gray-800 bg-white p-2 rounded-xl capitalize">{userData.gender}</div>
                            )}
                          </IonItem>
                        </div>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>

              {/* Tarjeta de Dirección */}
              <IonCard className="rounded-2xl shadow-lg border border-gray-100 white-bg">
                <IonCardHeader className="bg-gradient-to-r from-soft-green to-mint-green text-forest-green rounded-t-2xl">
                  <IonCardTitle className="flex items-center text-forest-green">
                    <IonIcon icon={locationOutline} className="mr-3 text-2xl" />
                    Dirección de Envío
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="p-6 white-bg">
                  <IonGrid>
                    <IonRow>
                      <IonCol size="12">
                        <div className="space-y-2 mb-4">
                          <IonItem className="ion-no-padding custom-input-item white-bg" lines="none">
                            <IonLabel position="stacked" className="text-gray-700 font-semibold mb-2 text-dark">
                              Dirección
                            </IonLabel>
                            {isEditing ? (
                              <IonInput
                                value={editData.address.street}
                                onIonInput={(e) => handleAddressChange('street', e.detail.value!)}
                                className="text-dark bg-white border border-gray-200 rounded-xl px-3"
                              />
                            ) : (
                              <div className="text-lg font-medium text-gray-800 bg-white p-2 rounded-xl">{userData.address.street}</div>
                            )}
                          </IonItem>
                        </div>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol size="4">
                        <div className="space-y-2 mb-4">
                          <IonItem className="ion-no-padding custom-input-item white-bg" lines="none">
                            <IonLabel position="stacked" className="text-gray-700 font-semibold mb-2 text-dark">
                              Ciudad
                            </IonLabel>
                            {isEditing ? (
                              <IonInput
                                value={editData.address.city}
                                onIonInput={(e) => handleAddressChange('city', e.detail.value!)}
                                className="text-dark bg-white border border-gray-200 rounded-xl px-3"
                              />
                            ) : (
                              <div className="text-lg font-medium text-gray-800 bg-white p-2 rounded-xl">{userData.address.city}</div>
                            )}
                          </IonItem>
                        </div>
                      </IonCol>
                      <IonCol size="4">
                        <div className="space-y-2 mb-4">
                          <IonItem className="ion-no-padding custom-input-item white-bg" lines="none">
                            <IonLabel position="stacked" className="text-gray-700 font-semibold mb-2 text-dark">
                              Departamento
                            </IonLabel>
                            {isEditing ? (
                              <IonInput
                                value={editData.address.state}
                                onIonInput={(e) => handleAddressChange('state', e.detail.value!)}
                                className="text-dark bg-white border border-gray-200 rounded-xl px-3"
                              />
                            ) : (
                              <div className="text-lg font-medium text-gray-800 bg-white p-2 rounded-xl">{userData.address.state}</div>
                            )}
                          </IonItem>
                        </div>
                      </IonCol>
                      <IonCol size="4">
                        <div className="space-y-2 mb-4">
                          <IonItem className="ion-no-padding custom-input-item white-bg" lines="none">
                            <IonLabel position="stacked" className="text-gray-700 font-semibold mb-2 text-dark">
                              Código Postal
                            </IonLabel>
                            {isEditing ? (
                              <IonInput
                                value={editData.address.zipCode}
                                onIonInput={(e) => handleAddressChange('zipCode', e.detail.value!)}
                                className="text-dark bg-white border border-gray-200 rounded-xl px-3"
                              />
                            ) : (
                              <div className="text-lg font-medium text-gray-800 bg-white p-2 rounded-xl">{userData.address.zipCode}</div>
                            )}
                          </IonItem>
                        </div>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>

              {/* Tarjeta de Pedidos Recientes */}
              <IonCard className="rounded-2xl shadow-lg border border-gray-100 white-bg">
                <IonCardHeader className="bg-gradient-to-r from-pastel-green to-soft-green text-forest-green rounded-t-2xl">
                  <IonCardTitle className="flex items-center text-forest-green">
                    <IonIcon icon={bagHandleOutline} className="mr-3 text-2xl" />
                    Pedidos Recientes
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="p-6 white-bg">
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-white">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-800">Pedido #{order.id}</h4>
                            <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString('es-ES')}</p>
                          </div>
                          <IonBadge color={getStatusColor(order.status)} className="capitalize">
                            {order.status}
                          </IonBadge>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {order.items} producto(s) - Total: {order.total}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.products.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                  <IonButton 
                    expand="block" 
                    fill="clear" 
                    className="mt-4 text-forest-green font-semibold"
                    onClick={() => history.push('/orders')}
                  >
                    Ver todos los pedidos
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </div>

            {/* Columna Derecha - Stats y Preferencias */}
            <div className="space-y-8">
              
              {/* Tarjeta de Estadísticas */}
              <IonCard className="rounded-2xl shadow-lg border border-gray-100 white-bg">
                <IonCardHeader className="bg-gradient-to-r from-lime-green to-mint-green text-forest-green rounded-t-2xl">
                  <IonCardTitle className="flex items-center text-forest-green">
                    <IonIcon icon={trophyOutline} className="mr-3 text-2xl" />
                    Mi Actividad
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="p-6 white-bg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-soft-green rounded-lg">
                      <div className="flex items-center">
                        <IonIcon icon={bagHandleOutline} className="text-forest-green text-xl mr-3" />
                        <span className="text-gray-700">Pedidos</span>
                      </div>
                      <IonBadge color="success">{stats.orders}</IonBadge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-soft-green rounded-lg">
                      <div className="flex items-center">
                        <IonIcon icon={heartOutline} className="text-red-400 text-xl mr-3" />
                        <span className="text-gray-700">Favoritos</span>
                      </div>
                      <IonBadge color="danger">{stats.wishlist}</IonBadge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-soft-green rounded-lg">
                      <div className="flex items-center">
                        <IonIcon icon={starOutline} className="text-yellow-400 text-xl mr-3" />
                        <span className="text-gray-700">Reseñas</span>
                      </div>
                      <IonBadge color="warning">{stats.reviews}</IonBadge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-soft-green rounded-lg">
                      <div className="flex items-center">
                        <IonIcon icon={trophyOutline} className="text-purple-400 text-xl mr-3" />
                        <span className="text-gray-700">Puntos</span>
                      </div>
                      <IonChip color="primary">{stats.loyaltyPoints}</IonChip>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>

              {/* Tarjeta de Preferencias */}
              <IonCard className="rounded-2xl shadow-lg border border-gray-100 white-bg">
                <IonCardHeader className="bg-gradient-to-r from-soft-green to-pastel-green text-forest-green rounded-t-2xl">
                  <IonCardTitle className="flex items-center text-forest-green">
                    <IonIcon icon={settingsOutline} className="mr-3 text-2xl" />
                    Preferencias
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="p-6 white-bg">
                  <IonList lines="none">
                    <IonItem className="ion-no-padding mb-4 white-bg">
                      <IonLabel>
                        <div className="font-semibold text-gray-800">Boletín informativo</div>
                        <div className="text-sm text-gray-600">Recibir novedades por email</div>
                      </IonLabel>
                      <IonToggle
                        checked={isEditing ? editData.preferences.newsletter : userData.preferences.newsletter}
                        onIonChange={(e) => handlePreferenceChange('newsletter', e.detail.checked)}
                        disabled={!isEditing}
                        color="success"
                      />
                    </IonItem>
                    
                    <IonItem className="ion-no-padding mb-4 white-bg">
                      <IonLabel>
                        <div className="font-semibold text-gray-800">Notificaciones SMS</div>
                        <div className="text-sm text-gray-600">Alertas por mensaje de texto</div>
                      </IonLabel>
                      <IonToggle
                        checked={isEditing ? editData.preferences.smsNotifications : userData.preferences.smsNotifications}
                        onIonChange={(e) => handlePreferenceChange('smsNotifications', e.detail.checked)}
                        disabled={!isEditing}
                        color="primary"
                      />
                    </IonItem>
                    
                    <IonItem className="ion-no-padding mb-4 white-bg">
                      <IonLabel>
                        <div className="font-semibold text-gray-800">Promociones por email</div>
                        <div className="text-sm text-gray-600">Ofertas y descuentos especiales</div>
                      </IonLabel>
                      <IonToggle
                        checked={isEditing ? editData.preferences.emailPromotions : userData.preferences.emailPromotions}
                        onIonChange={(e) => handlePreferenceChange('emailPromotions', e.detail.checked)}
                        disabled={!isEditing}
                        color="success"
                      />
                    </IonItem>
                    
                    <IonItem className="ion-no-padding white-bg">
                      <IonLabel>
                        <div className="font-semibold text-gray-800">Ofertas especiales</div>
                        <div className="text-sm text-gray-600">Descuentos exclusivos</div>
                      </IonLabel>
                      <IonToggle
                        checked={isEditing ? editData.preferences.specialOffers : userData.preferences.specialOffers}
                        onIonChange={(e) => handlePreferenceChange('specialOffers', e.detail.checked)}
                        disabled={!isEditing}
                        color="warning"
                      />
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>

              {/* Acciones Rápidas */}
              <IonCard className="rounded-2xl shadow-lg border border-gray-100 white-bg">
                <IonCardHeader className="bg-gradient-to-r from-mint-green to-lime-green text-forest-green rounded-t-2xl">
                  <IonCardTitle className="flex items-center text-forest-green">
                    <IonIcon icon={documentTextOutline} className="mr-3 text-2xl" />
                    Acciones
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="p-6 white-bg">
                  <div className="space-y-3">
                    <IonButton 
                      expand="block" 
                      fill="outline" 
                      className="border-forest-green text-forest-green"
                      onClick={() => history.push('/wishlist')}
                    >
                      <IonIcon icon={heartOutline} slot="start" />
                      Mi Lista de Deseos
                    </IonButton>
                    
                    <IonButton 
                      expand="block" 
                      fill="outline" 
                      className="border-blue-500 text-blue-500"
                      onClick={() => history.push('/addresses')}
                    >
                      <IonIcon icon={locationOutline} slot="start" />
                      Mis Direcciones
                    </IonButton>
                    
                    <IonButton 
                      expand="block" 
                      fill="outline" 
                      className="border-purple-500 text-purple-500"
                      onClick={() => history.push('/payment-methods')}
                    >
                      <IonIcon icon={cardOutline} slot="start" />
                      Métodos de Pago
                    </IonButton>
                    
                    <IonButton 
                      expand="block" 
                      fill="outline" 
                      className="border-red-500 text-red-500"
                      onClick={() => history.push('/security')}
                    >
                      <IonIcon icon={shieldCheckmarkOutline} slot="start" />
                      Seguridad
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            </div>
          </div>
        </div>

        {/* Sistema de Notificaciones */}
        <div className="notification-container" style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '400px'
        }}>
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`notification ${notification.type}`}
              style={{
                background: 'white',
                color: '#333',
                padding: '16px 20px',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                borderLeft: `4px solid ${
                  notification.type === 'success' ? '#10b981' : 
                  notification.type === 'warning' ? '#f59e0b' : 
                  '#3b82f6'
                }`,
                animation: 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                maxWidth: '400px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div 
                className="notification-icon"
                style={{
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: notification.type === 'success' ? '#10b981' : 
                            notification.type === 'warning' ? '#f59e0b' : 
                            '#3b82f6',
                  color: 'white'
                }}
              >
                {notification.type === 'success' ? '✓' : 
                 notification.type === 'warning' ? '⚠' : 'ℹ'}
              </div>
              <div className="notification-content" style={{ flex: 1 }}>
                <div className="notification-title" style={{ 
                  fontWeight: '600', 
                  marginBottom: '4px', 
                  color: '#1f2937' 
                }}>
                  {notification.title}
                </div>
                <div 
                  className="notification-message" 
                  style={{ 
                    color: '#6b7280', 
                    fontSize: '14px', 
                    lineHeight: '1.4' 
                  }}
                >
                  {notification.message}
                </div>
              </div>
              <button 
                className="notification-close"
                onClick={() => removeNotification(notification.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px',
                  transition: 'all 0.2s',
                  flexShrink: 0
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Estilos CSS para las notificaciones */}
        <style>{`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}</style>
      </div>

      {/* Alertas */}
      <IonAlert
        isOpen={showSuccessAlert}
        onDidDismiss={() => setShowSuccessAlert(false)}
        header="¡Perfil Actualizado!"
        message="Tus datos se han guardado correctamente."
        buttons={['Continuar']}
      />

      <IonLoading
        isOpen={isLoading}
        message={'Guardando cambios...'}
        duration={0}
      />
    </IonContent>
  );
};

export default Profile;