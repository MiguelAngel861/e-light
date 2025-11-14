// src/pages/Cart.tsx
import React, { useState } from 'react';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonFooter, IonBadge, IonAlert } from '@ionic/react';
import { chevronBack, trashOutline, addOutline, removeOutline, cardOutline, starOutline, giftOutline, shieldCheckmarkOutline } from 'ionicons/icons';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Sneakers Urbanos Premium",
      description: "Comodidad y estilo para el día a día - Materiales ecológicos",
      price: 89.99,
      originalPrice: 112.50,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
      category: "Calzado",
      quantity: 1,
      size: "42",
      color: "Negro",
      rating: 4.8,
      reviews: 124,
      inStock: true
    },
    {
      id: 2,
      name: "Esencia Floral Natural",
      description: "Fragancia fresca y duradera - 100ml - Extractos naturales",
      price: 65.50,
      originalPrice: 0,
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300&h=300&fit=crop",
      category: "Perfume",
      quantity: 2,
      size: "100ml",
      color: "Transparente",
      rating: 4.9,
      reviews: 89,
      inStock: true
    },
    {
      id: 3,
      name: "Zapatillas Running Pro Max",
      description: "Máximo rendimiento deportivo - Tecnología de amortiguación",
      price: 124.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop",
      category: "Deportivo",
      quantity: 1,
      size: "41",
      color: "Azul Noche",
      rating: 4.7,
      reviews: 203,
      inStock: true
    }
  ]);

  const [showClearCartAlert, setShowClearCartAlert] = useState(false);
  const [showRemoveAlert, setShowRemoveAlert] = useState<number | null>(null);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    setShowRemoveAlert(null);
  };

  const clearCart = () => {
    setCartItems([]);
    setShowClearCartAlert(false);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    return cartItems.reduce((total, item) => {
      if (item.originalPrice > item.price) {
        return total + ((item.originalPrice - item.price) * item.quantity);
      }
      return total;
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const shippingCost = calculateTotal() > 50 ? 0 : 5.99;
  const estimatedDelivery = "2-4 días hábiles";

  const suggestedProducts = [
    {
      id: 4,
      name: "Oxford Elegante Clásico",
      description: "Cuero genuino - Hecho a mano",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=200&h=200&fit=crop",
      category: "Formal"
    },
    {
      id: 5,
      name: "Fragancia Ébano Noir",
      description: "Notas amaderadas premium",
      price: 78.25,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop",
      category: "Perfume"
    }
  ];

  const getSavingsPercentage = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <IonContent className="bg-gradient-to-br from-white to-soft-green">
      <IonHeader className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton routerLink="/home" className="text-forest-green font-semibold">
              <IonIcon icon={chevronBack} className="mr-1" />
              Volver
            </IonButton>
          </IonButtons>
          <IonTitle className="text-forest-green font-bold text-xl">Mi Carrito de Compras</IonTitle>
          <IonButtons slot="end">
            {cartItems.length > 0 && (
              <IonButton 
                onClick={() => setShowClearCartAlert(true)}
                className="text-red-500"
              >
                <IonIcon icon={trashOutline} />
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <div className="max-w-6xl mx-auto p-4 lg:p-6">
        {/* Header del Carrito */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-forest-green mb-2">Tu Carrito</h1>
            <p className="text-gray-600">
              {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'} en tu carrito
            </p>
          </div>
          {cartItems.length > 0 && (
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <div className="flex items-center space-x-2 text-sm">
                <IonIcon icon={shieldCheckmarkOutline} className="text-green-500" />
                <span className="text-gray-600">Compra 100% segura</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <IonIcon icon={giftOutline} className="text-mint-green" />
                <span className="text-gray-600">Envío gratis +$50</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna Principal - Productos */}
          <div className="lg:col-span-2">
            {/* Resumen del Carrito */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-forest-green">Resumen del Pedido</h2>
              </div>

              {/* Lista de Productos */}
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-soft-green/30 transition-colors duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                      {/* Imagen del Producto */}
                      <div className="flex-shrink-0 relative">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shadow-lg"
                        />
                        {item.originalPrice > item.price && (
                          <div className="absolute -top-2 -left-2">
                            <IonBadge color="success" className="text-xs">
                              -{getSavingsPercentage(item.originalPrice, item.price)}%
                            </IonBadge>
                          </div>
                        )}
                      </div>
                      
                      {/* Información del Producto */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                          <div className="flex-1">
                            <h3 className="font-bold text-forest-green text-lg mb-1">{item.name}</h3>
                            <p className="text-gray-600 text-sm mb-2 leading-relaxed">{item.description}</p>
                            
                            {/* Rating */}
                            <div className="flex items-center space-x-1 mb-3">
                              <div className="flex items-center">
                                <IonIcon icon={starOutline} className="text-yellow-400 text-sm" />
                                <span className="text-sm font-medium text-gray-700 ml-1">{item.rating}</span>
                              </div>
                              <span className="text-gray-400 text-sm">({item.reviews} reviews)</span>
                            </div>
                            
                            {/* Especificaciones */}
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-mint-green/20 text-forest-green px-3 py-1 rounded-full text-sm font-medium border border-mint-green/30">
               
 Talla: {item.size}
                              </span>
                              <span className="bg-lime-green/20 text-forest-green px-3 py-1 rounded-full text-sm font-medium border border-lime-green/30">
                                Color: {item.color}
                              </span>
                              <span className="bg-pastel-green/20 text-forest-green px-3 py-1 rounded-full text-sm font-medium border border-pastel-green/30">
                                {item.category}
                              </span>
                            </div>
                          </div>

                          {/* Precio y Acciones */}
                          <div className="flex flex-col items-end space-y-3 mt-4 sm:mt-0">
                            {/* Precio */}
                            <div className="text-right">
                              <span className="text-2xl font-bold text-forest-green">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              {item.originalPrice > item.price && (
                                <div className="flex items-center space-x-2 justify-end">
                                  <span className="text-lg text-gray-400 line-through">
                                    ${(item.originalPrice * item.quantity).toFixed(2)}
                                  </span>
                                  <span className="text-green-600 text-sm font-bold">
                                    Ahorras ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Controles de Cantidad */}
                            <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-2">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm border border-gray-200"
                              >
                                <IonIcon icon={removeOutline} className="text-gray-600 text-lg" />
                              </button>
                              
                              <span className="w-12 text-center font-bold text-forest-green text-lg">
                                {item.quantity}
                              </span>
                              
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-10 h-10 bg-mint-green rounded-lg flex items-center justify-center hover:bg-lime-green transition-colors shadow-sm"
                              >
                                <IonIcon icon={addOutline} className="text-forest-green text-lg" />
                              </button>
                            </div>

                            {/* Acciones */}
                            <button 
                              onClick={() => setShowRemoveAlert(item.id)}
                              className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center transition-colors"
                            >
                              <IonIcon icon={trashOutline} className="mr-1" />
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Estado Vacío */}
              {cartItems.length === 0 && (
                <div className="text-center py-16 px-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-mint-green to-lime-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <IonIcon icon={trashOutline} className="text-5xl text-forest-green" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-600 mb-3">Tu carrito está vacío</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                    Descubre nuestra increíble colección de calzado y perfumes. Encuentra productos únicos que se adapten a tu estilo.
                  </p>
                  <IonButton 
                    routerLink="/home" 
                    className="bg-gradient-to-r from-mint-green to-lime-green text-forest-green font-bold px-8 py-4 text-lg shadow-lg"
                    size="large"
                  >
                    Explorar Productos
                  </IonButton>
                </div>
              )}
            </div>

            {/* Productos Sugeridos */}
            {cartItems.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mt-6">
                <h3 className="text-xl font-bold text-forest-green mb-6 flex items-center">
                  <IonIcon icon={giftOutline} className="mr-2 text-mint-green" />
                  Productos que te pueden gustar
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suggestedProducts.map((product) => (
                    <div key={product.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:border-mint-green hover:shadow-md transition-all duration-300 cursor-pointer group">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover shadow-md group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-forest-green group-hover:text-mint-green transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-gray-600 text-sm mb-1">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-forest-green">{product.price}</span>
                          <span className="bg-soft-green text-forest-green text-xs px-2 py-1 rounded-full">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Resumen de Compra */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 sticky top-6">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-forest-green">Resumen de Compra</h3>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Líneas de Resumen */}
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  
                  {calculateDiscount() > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Descuentos aplicados</span>
                      <span className="font-bold">-${calculateDiscount().toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span className="font-semibold">
                      {shippingCost === 0 ? (
                        <span className="text-green-600 font-bold">Gratis</span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {/* Entrega Estimada */}
                  <div className="flex justify-between text-gray-600 border-t pt-4">
                    <span>Entrega estimada</span>
                    <span className="font-semibold text-forest-green">{estimatedDelivery}</span>
                  </div>

                  {/* Promoción Envío Gratis */}
                  {calculateSubtotal() < 50 && (
                    <div className="bg-gradient-to-r from-pastel-green to-mint-green border border-mint-green rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <IonIcon icon={giftOutline} className="text-forest-green" />
                        <span className="font-bold text-forest-green">¡Envío gratis disponible!</span>
                      </div>
                      <p className="text-sm text-forest-green">
                        Agrega <span className="font-bold">${(50 - calculateSubtotal()).toFixed(2)}</span> más 
                        para obtener envío gratuito.
                      </p>
                    </div>
                  )}

                  {/* Total */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-forest-green">Total</span>
                      <span className="text-forest-green">
                        ${(calculateTotal() + shippingCost).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Incluye impuestos aplicables</p>
                  </div>

                  {/* Botón de Checkout */}
                  <IonButton 
                    expand="block" 
                    className="mt-6 bg-gradient-to-r from-mint-green to-lime-green text-forest-green font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    routerLink="/checkout"
                    size="large"
                  >
                    <IonIcon icon={cardOutline} className="mr-2" />
                    Proceder al Pago
                  </IonButton>

                  {/* Garantías */}
                  <div className="text-center space-y-2 pt-4">
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                      <span>🛡️ Pago seguro</span>
                      <span>🚚 Envío rápido</span>
                      <span>↩️ Devoluciones</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Alertas */}
      <IonAlert
        isOpen={showClearCartAlert}
        onDidDismiss={() => setShowClearCartAlert(false)}
        header={'Vaciar Carrito'}
        message={'¿Estás seguro de que quieres eliminar todos los productos del carrito?'}
        buttons={[
          { text: 'Cancelar', role: 'cancel' },
          { text: 'Vaciar', role: 'confirm', handler: clearCart }
        ]}
      />

      <IonAlert
        isOpen={showRemoveAlert !== null}
        onDidDismiss={() => setShowRemoveAlert(null)}
        header={'Eliminar Producto'}
        message={'¿Estás seguro de que quieres eliminar este producto del carrito?'}
        buttons={[
          { text: 'Cancelar', role: 'cancel' },
          { text: 'Eliminar', role: 'confirm', handler: () => removeItem(showRemoveAlert!) }
        ]}
      />

      {/* Footer */}
      <IonFooter className="bg-forest-green text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-2xl font-bold mb-3">Variedades Doña Luz</p>
          <p className="text-gray-200 mb-4 max-w-2xl mx-auto leading-relaxed">
            Tu tienda de confianza para calzado y perfumes de calidad. Más de 10,000 clientes satisfechos.
          </p>
          <div className="flex justify-center space-x-8 mt-4">
            <a href="#" className="hover:text-lime-green transition-colors text-sm font-medium">Términos</a>
            <a href="#" className="hover:text-lime-green transition-colors text-sm font-medium">Privacidad</a>
            <a href="#" className="hover:text-lime-green transition-colors text-sm font-medium">Ayuda</a>
            <a href="#" className="hover:text-lime-green transition-colors text-sm font-medium">Contacto</a>
          </div>
          <p className="text-gray-300 text-xs mt-6">© 2024 Variedades Doña Luz. Todos los derechos reservados.</p>
        </div>
      </IonFooter>
    </IonContent>
  );
};

export default Cart;