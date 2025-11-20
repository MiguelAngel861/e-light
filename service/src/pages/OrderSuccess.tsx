
import React, { useEffect } from 'react';
import { IonContent, IonButton, IonIcon } from '@ionic/react';
import { checkmarkCircleOutline, arrowBackOutline } from 'ionicons/icons';

const OrderSuccess: React.FC = () => {
  useEffect(() => {
    document.title = "Pedido Confirmado - Variedades Doña Luz";
  }, []);

  return (
    <IonContent>
      <div className="bg-gradient-to-br from-white to-soft-green min-h-screen flex items-center justify-center p-4">
        <div className="text-center bg-white p-10 rounded-2xl shadow-2xl max-w-md mx-auto">
          <IonIcon icon={checkmarkCircleOutline} className="text-8xl text-mint-green mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-forest-green mb-4">¡Pedido Confirmado!</h1>
          <p className="text-gray-600 text-lg mb-8">
            Gracias por tu compra. Hemos recibido tu pedido y lo estamos procesando. Recibirás una confirmación por correo electrónico en breve.
          </p>
          <IonButton routerLink="/home" className="bg-gradient-to-r from-mint-green to-lime-green text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300" size="large">
            <IonIcon icon={arrowBackOutline} className="mr-2" />
            Volver a la Tienda
          </IonButton>
        </div>
      </div>
    </IonContent>
  );
};

export default OrderSuccess;
