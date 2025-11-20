
import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { chevronBack, cardOutline, shieldCheckmarkOutline, personOutline, calendarOutline, lockClosedOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const Payment: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    document.title = "Payment - Variedades Doña Luz";
  }, []);

  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    // Lógica de procesamiento de pago aquí
    console.log('Processing payment with data:', paymentData);
    history.push('/order-success');
  };

  return (
    <IonContent>
      <div className="bg-gradient-to-br from-white to-soft-green min-h-screen">
        <IonHeader className="bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-b border-gray-100">
          <IonToolbar style={{ '--background': '#ffffff', '--border-color': '#f3f4f6' } as any}>
            <IonButtons slot="start">
              <IonButton routerLink="/checkout" className="text-forest-green font-semibold">
                <IonIcon icon={chevronBack} className="mr-1" />
                Volver a Envío
              </IonButton>
            </IonButtons>
            <IonTitle className="text-forest-green font-bold text-xl flex items-center">
              <IonIcon icon={cardOutline} className="mr-2 text-mint-green" />
              Información de Pago
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="max-w-lg mx-auto p-4 lg:p-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-forest-green mb-3">Detalles de Pago</h1>
            <p className="text-gray-600 flex items-center justify-center">
              <IonIcon icon={shieldCheckmarkOutline} className="text-green-500 mr-2" />
              Transacción 100% segura y encriptada.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 p-8">
            <form className="space-y-6">
              <div className="relative">
                <IonIcon icon={personOutline} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" name="cardName" value={paymentData.cardName} onChange={handleInputChange} placeholder="Nombre en la Tarjeta" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-mint-green focus:ring-2 focus:ring-mint-green/20 bg-gray-50" />
              </div>
              <div className="relative">
                <IonIcon icon={cardOutline} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" name="cardNumber" value={paymentData.cardNumber} onChange={handleInputChange} placeholder="Número de Tarjeta" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-mint-green focus:ring-2 focus:ring-mint-green/20 bg-gray-50" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="relative">
                  <IonIcon icon={calendarOutline} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" name="expiryDate" value={paymentData.expiryDate} onChange={handleInputChange} placeholder="MM/AA" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-mint-green focus:ring-2 focus:ring-mint-green/20 bg-gray-50" />
                </div>
                <div className="relative">
                  <IonIcon icon={lockClosedOutline} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" name="cvv" value={paymentData.cvv} onChange={handleInputChange} placeholder="CVV" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-mint-green focus:ring-2 focus:ring-mint-green/20 bg-gray-50" />
                </div>
              </div>
              <IonButton expand="block" onClick={handlePayment} className="mt-6 bg-gradient-to-r from-mint-green to-lime-green text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" size="large">
                Pagar Ahora
              </IonButton>
            </form>
          </div>
        </div>
      </div>
    </IonContent>
  );
};

export default Payment;
