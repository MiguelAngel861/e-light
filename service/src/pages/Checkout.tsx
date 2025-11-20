
import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonFooter, IonBadge, IonAlert, IonText } from '@ionic/react';
import { chevronBack, cardOutline, shieldCheckmarkOutline, rocketOutline, timeOutline, personCircleOutline, mailOutline, callOutline, homeOutline, locationOutline, mapOutline } from 'ionicons/icons';

const Checkout: React.FC = () => {
  useEffect(() => {
    document.title = "Checkout - Variedades Doña Luz";
  }, []);

  const [formData, setFormData] = useState({
    fullName: 'Miguel Angel',
    email: 'miguel@example.com',
    phone: '+123456789',
    address: '123 Green St',
    city: 'Caracas',
    zipCode: '1010',
    country: 'Venezuela'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const cartItems = [
    {
      id: 1,
      name: "Sneakers Urbanos Premium",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop",
      quantity: 1,
    },
    {
      id: 2,
      name: "Esencia Floral Natural",
      price: 65.50,
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=100&h=100&fit=crop",
      quantity: 2,
    },
    {
      id: 3,
      name: "Zapatillas Running Pro Max",
      price: 124.99,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=100&h=100&fit=crop",
      quantity: 1,
    }
  ];

  const calculateSubtotal = () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = calculateSubtotal() > 50 ? 0 : 5.99;
  const total = calculateSubtotal() + shippingCost;

  return (
    <IonContent>
      <div className="bg-gradient-to-br from-white to-soft-green min-h-screen">
        <IonHeader className="bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-b border-gray-100">
          <IonToolbar style={{ '--background': '#ffffff', '--border-color': '#f3f4f6' } as any}>
            <IonButtons slot="start">
              <IonButton routerLink="/cart" className="text-forest-green font-semibold">
                <IonIcon icon={chevronBack} className="mr-1" />
                Volver al Carrito
              </IonButton>
            </IonButtons>
            <IonTitle className="text-forest-green font-bold text-xl flex items-center">
              <IonIcon icon={cardOutline} className="mr-2 text-mint-green" />
              Finalizar Compra
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="max-w-7xl mx-auto p-4 lg:p-6">
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-4xl font-bold text-forest-green mb-3 bg-gradient-to-r from-forest-green to-mint-green bg-clip-text text-transparent">
              Casi listo...
            </h1>
            <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-600">
              <span className="flex items-center"><IonIcon icon={shieldCheckmarkOutline} className="text-green-500 mr-1" />Pago Seguro</span>
              <span className="flex items-center"><IonIcon icon={rocketOutline} className="text-mint-green mr-1" />Envío Rápido</span>
              <span className="flex items-center"><IonIcon icon={timeOutline} className="text-lime-green mr-1" />Entrega Garantizada</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna de Formulario */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-forest-green mb-6">Información de Envío</h2>
                <form className="space-y-6">
                  {/* Input Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <IonIcon icon={personCircleOutline} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Nombre Completo" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-mint-green focus:ring-2 focus:ring-mint-green/20 bg-gray-50" />
                    </div>
                    <div className="relative">
                      <IonIcon icon={mailOutline} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Correo Electrónico" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-mint-green focus:ring-2 focus:ring-mint-green/20 bg-gray-50" />
                    </div>
                  </div>
                  <div className="relative">
                    <IonIcon icon={callOutline} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Teléfono" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-mint-green focus:ring-2 focus:ring-mint-green/20 bg-gray-50" />
                  </div>
                  <div className="relative">
                    <IonIcon icon={homeOutline} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Dirección" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-mint-green focus:ring-2 focus:ring-mint-green/20 bg-gray-50" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative">
                      <IonIcon icon={locationOutline} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Ciudad" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-mint-green focus:ring-2 focus:ring-mint-green/20 bg-gray-50" />
                    </div>
                    <div className="relative">
                      <IonIcon icon={mapOutline} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="Código Postal" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-mint-green focus:ring-2 focus:ring-mint-green/20 bg-gray-50" />
                    </div>
                     <div className="relative">
                      <IonIcon icon={mapOutline} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" name="country" value={formData.country} onChange={handleInputChange} placeholder="País" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-mint-green focus:ring-2 focus:ring-mint-green/20 bg-gray-50" />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Columna de Resumen de Compra */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 sticky top-6 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-forest-green to-mint-green">
                  <h3 className="text-xl font-bold text-white">Resumen del Pedido</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover mr-4" />
                          <div>
                            <p className="font-semibold text-forest-green">{item.name}</p>
                            <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-bold text-forest-green">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Envío</span>
                      <span>{shippingCost === 0 ? 'Gratis' : `$${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-forest-green pt-2">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <IonButton expand="block" routerLink="/payment" className="mt-6 bg-gradient-to-r from-mint-green to-lime-green text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" size="large">
                    Continuar al Pago
                  </IonButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IonContent>
  );
};

export default Checkout;
