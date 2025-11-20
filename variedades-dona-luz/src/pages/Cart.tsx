// src/pages/Cart.tsx
import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonFooter, IonBadge, IonAlert, IonText } from '@ionic/react';
import { chevronBack, trashOutline, addOutline, removeOutline, cardOutline, star, giftOutline, shieldCheckmarkOutline, rocketOutline, timeOutline, heartOutline, shareSocialOutline } from 'ionicons/icons';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Sneakers Urbanos Premium",
      description: "Comodidad y estilo para el día a día - Materiales ecológicos",
      price: 89.99,
      originalPrice: 112.50,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      category: "Calzado",
      quantity: 1,
      size: "42",
      color: "Negro",
      rating: 4.8,
      reviews: 124,
      inStock: true,
      delivery: "Entrega en 24h",
      favorite: false
    },
    {
      id: 2,
      name: "Esencia Floral Natural",
      description: "Fragancia fresca y duradera - 100ml - Extractos naturales",
      price: 65.50,
      originalPrice: 85.00,
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop",
      category: "Perfume",
      quantity: 2,
      size: "100ml",
      color: "Transparente",
      rating: 4.9,
      reviews: 89,
      inStock: true,
      delivery: "Entrega en 48h",
      favorite: true
    },
    {
      id: 3,
      name: "Zapatillas Running Pro Max",
      description: "Máximo rendimiento deportivo - Tecnología de amortiguación avanzada",
      price: 124.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
      category: "Deportivo",
      quantity: 1,
      size: "41",
      color: "Azul Noche",
      rating: 4.7,
      reviews: 203,
      inStock: true,
      delivery: "Entrega en 24h",
      favorite: false
    }
  ]);

  const [showClearCartAlert, setShowClearCartAlert] = useState(false);
  const [showRemoveAlert, setShowRemoveAlert] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<Array<{id: number, type: string, title: string, message: string}>>([]);

  // Sistema de notificaciones
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

  // Cambiar título de la página
  useEffect(() => {
    document.title = "Carrito - Variedades Doña Luz";
  }, []);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
    
    if (change > 0) {
      showNotification('success', 'Cantidad actualizada', 'Producto agregado al carrito', 2000);
    }
  };

  const removeItem = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    setShowRemoveAlert(null);
    
    if (item) {
      showNotification('warning', 'Producto eliminado', `${item.name} fue removido del carrito`, 3000);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setShowClearCartAlert(false);
    showNotification('info', 'Carrito vaciado', 'Todos los productos han sido eliminados', 3000);
  };

  const toggleFavorite = (id: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, favorite: !item.favorite }
          : item
      )
    );
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

  const getSavingsPercentage = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  const suggestedProducts = [
    {
      id: 4,
      name: "Oxford Elegante Clásico",
      description: "Cuero genuino - Hecho a mano - Edición limitada",
      price: 149.99,
      originalPrice: 189.99,
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=300&h=300&fit=crop",
      category: "Formal",
      rating: 4.9,
      delivery: "Entrega en 48h"
    },
    {
      id: 5,
      name: "Fragancia Ébano Noir",
      description: "Notas amaderadas premium - Duración 12 horas",
      price: 78.25,
      originalPrice: 95.00,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop",
      category: "Perfume",
      rating: 4.8,
      delivery: "Entrega en 24h"
    },
    {
      id: 6,
      name: "Bolso Artesanal Eco",
      description: "Materiales sostenibles - Diseño exclusivo",
      price: 45.99,
      originalPrice: 65.00,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
      category: "Accesorio",
      rating: 4.7,
      delivery: "Entrega en 72h"
    }
  ];

  const addSuggestedToCart = (product: any) => {
    const newItem = {
      ...product,
      id: Date.now(),
      quantity: 1,
      size: "Único",
      color: "Estándar",
      inStock: true,
      favorite: false
    };
    setCartItems(prev => [...prev, newItem]);
    showNotification('success', '¡Agregado!', `${product.name} añadido al carrito`, 3000);
  };

  return (
    <IonContent>
      {/* Contenedor principal con fondo idéntico al home */}
      <div className="bg-gradient-to-br from-white to-soft-green min-h-screen">
        
        {/* Header Mejorado */}
        <IonHeader className="bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-b border-gray-100">
          <IonToolbar 
            className="bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-b border-gray-100"
            style={{
              '--background': '#ffffff',
              '--border-color': '#f3f4f6'
            } as any}
          >
            <IonButtons slot="start">
              <IonButton routerLink="/home" className="text-forest-green font-semibold">
                <IonIcon icon={chevronBack} className="mr-1" />
                Volver a la Tienda
              </IonButton>
            </IonButtons>
            <IonTitle className="text-forest-green font-bold text-xl flex items-center">
              <IonIcon icon={cardOutline} className="mr-2 text-mint-green" />
              Mi Carrito de Compras
            </IonTitle>
            <IonButtons slot="end">
              {cartItems.length > 0 && (
                <IonButton 
                  onClick={() => setShowClearCartAlert(true)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  fill="clear"
                >
                  <IonIcon icon={trashOutline} className="mr-1" />
                  Vaciar
                </IonButton>
              )}
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div className="max-w-7xl mx-auto p-4 lg:p-6">
          {/* Header Mejorado del Carrito */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold text-forest-green mb-3 bg-gradient-to-r from-forest-green to-mint-green bg-clip-text text-transparent">
                Tu Carrito de Compras
              </h1>
              <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-600">
                <span className="flex items-center">
                  <IonIcon icon={shieldCheckmarkOutline} className="text-green-500 mr-1" />
                  Compra 100% segura
                </span>
                <span className="flex items-center">
                  <IonIcon icon={rocketOutline} className="text-mint-green mr-1" />
                  Envío rápido
                </span>
                <span className="flex items-center">
                  <IonIcon icon={timeOutline} className="text-lime-green mr-1" />
                  Entrega garantizada
                </span>
              </div>
            </div>
            
            {cartItems.length > 0 && (
              <div className="mt-4 lg:mt-0">
                <div className="bg-white rounded-2xl shadow-lg p-4 border border-mint-green/20">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'}</span>
                    <span className="text-2xl font-bold text-forest-green">
                      ${(calculateTotal() + shippingCost).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna Principal - Productos */}
            <div className="lg:col-span-2 space-y-6">
              {/* Resumen del Carrito */}
              <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-soft-green to-white">
                  <h2 className="text-2xl font-bold text-forest-green flex items-center">
                    <IonIcon icon={cardOutline} className="mr-3 text-mint-green" />
                    Resumen del Pedido
                    <span className="ml-4 text-sm font-normal text-gray-500 bg-white px-3 py-1 rounded-full">
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
                    </span>
                  </h2>
                </div>

                {/* Lista de Productos */}
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 hover:bg-soft-green/20 transition-all duration-300 group">
                      <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
                        {/* Imagen del Producto con Badges */}
                        <div className="flex-shrink-0 relative">
                          <div className="relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-28 h-28 lg:w-32 lg:h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Badges */}
                            <div className="absolute top-2 left-2 flex flex-col space-y-1">
                              {item.originalPrice > item.price && (
                                <IonBadge color="success" className="text-xs font-bold">
                                  -{getSavingsPercentage(item.originalPrice, item.price)}%
                                </IonBadge>
                              )}
                              {item.delivery.includes('24h') && (
                                <IonBadge color="warning" className="text-xs font-bold">
                                  ⚡ Rápido
                                </IonBadge>
                              )}
                            </div>
                            
                            {/* Favorite Button */}
                            <button 
                              onClick={() => toggleFavorite(item.id)}
                              className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                item.favorite 
                                  ? 'bg-red-500 text-white shadow-lg' 
                                  : 'bg-white/90 text-gray-400 hover:bg-white hover:text-red-500'
                              }`}
                            >
                              <IonIcon icon={heartOutline} className="text-sm" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Información del Producto */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3">
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-bold text-forest-green text-xl leading-tight pr-4">
                                  {item.name}
                                </h3>
                                <button 
                                  onClick={() => setShowRemoveAlert(item.id)}
                                  className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-red-50"
                                >
                                  <IonIcon icon={trashOutline} className="text-lg" />
                                </button>
                              </div>
                              
                              <p className="text-gray-600 text-sm mb-3 leading-relaxed">{item.description}</p>
                              
                              {/* Rating y Delivery */}
                              <div className="flex flex-wrap items-center gap-4 mb-4">
                                <div className="flex items-center space-x-1">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <IonIcon 
                                        key={i}
                                        icon={star} 
                                        className={`text-sm ${
                                          i < Math.floor(item.rating) 
                                            ? 'text-yellow-400' 
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm font-medium text-gray-700 ml-1">{item.rating}</span>
                                  <span className="text-gray-400 text-sm">({item.reviews})</span>
                                </div>
                                
                                <span className="flex items-center text-sm text-mint-green font-medium">
                                  <IonIcon icon={timeOutline} className="mr-1" />
                                  {item.delivery}
                                </span>
                              </div>
                              
                              {/* Especificaciones */}
                              <div className="flex flex-wrap gap-2">
                                <span className="bg-mint-green/20 text-forest-green px-3 py-2 rounded-xl text-sm font-medium border border-mint-green/30 flex items-center">
                                  <span className="w-2 h-2 bg-mint-green rounded-full mr-2"></span>
                                  Talla: {item.size}
                                </span>
                                <span className="bg-lime-green/20 text-forest-green px-3 py-2 rounded-xl text-sm font-medium border border-lime-green/30 flex items-center">
                                  <span className="w-2 h-2 bg-lime-green rounded-full mr-2"></span>
                                  Color: {item.color}
                                </span>
                                <span className="bg-pastel-green/20 text-forest-green px-3 py-2 rounded-xl text-sm font-medium border border-pastel-green/30 flex items-center">
                                  <span className="w-2 h-2 bg-pastel-green rounded-full mr-2"></span>
                                  {item.category}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Precio y Controles */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            {/* Precio */}
                            <div className="flex items-center space-x-3">
                              <div className="text-right">
                                <span className="text-2xl font-bold text-forest-green">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                                {item.originalPrice > item.price && (
                                  <div className="flex items-center space-x-2">
                                    <span className="text-lg text-gray-400 line-through">
                                      ${(item.originalPrice * item.quantity).toFixed(2)}
                                    </span>
                                    <span className="text-green-600 text-sm font-bold bg-green-50 px-2 py-1 rounded-full">
                                      Ahorras ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Controles de Cantidad */}
                            <div className="flex items-center space-x-3 bg-gray-50 rounded-2xl p-2 border border-gray-200">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all duration-300 shadow-sm border border-gray-200 hover:border-mint-green"
                              >
                                <IonIcon icon={removeOutline} className="text-gray-600 text-lg" />
                              </button>
                              
                              <span className="w-12 text-center font-bold text-forest-green text-xl">
                                {item.quantity}
                              </span>
                              
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-10 h-10 bg-gradient-to-r from-mint-green to-lime-green rounded-xl flex items-center justify-center hover:from-lime-green hover:to-mint-green transition-all duration-300 shadow-sm"
                              >
                                <IonIcon icon={addOutline} className="text-white text-lg" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Estado Vacío Mejorado */}
                {cartItems.length === 0 && (
                  <div className="text-center py-20 px-6">
                    <div className="w-40 h-40 bg-gradient-to-br from-mint-green to-lime-green rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                      <IonIcon icon={cardOutline} className="text-6xl text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-600 mb-4">Tu carrito está vacío</h3>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed text-lg">
                      Descubre nuestra increíble colección de calzado y perfumes exclusivos. 
                      Encuentra productos únicos que reflejen tu estilo personal.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <IonButton 
                        routerLink="/home" 
                        className="bg-gradient-to-r from-mint-green to-lime-green text-white font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        size="large"
                      >
                        <IonIcon icon={chevronBack} className="mr-2" />
                        Explorar Productos
                      </IonButton>
                      <IonButton 
                        fill="outline"
                        className="border-2 border-forest-green text-forest-green font-bold px-8 py-4 text-lg hover:bg-forest-green hover:text-white transition-all duration-300"
                        size="large"
                      >
                        <IonIcon icon={giftOutline} className="mr-2" />
                        Ver Ofertas
                      </IonButton>
                    </div>
                  </div>
                )}
              </div>

              {/* Productos Sugeridos Mejorados */}
              {cartItems.length > 0 && (
                <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-forest-green flex items-center">
                      <IonIcon icon={giftOutline} className="mr-3 text-mint-green" />
                      Productos que te pueden gustar
                    </h3>
                    <span className="text-sm text-gray-500 bg-soft-green px-3 py-1 rounded-full">
                      Recomendados para ti
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {suggestedProducts.map((product) => (
                      <div key={product.id} className="group cursor-pointer">
                        <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 hover:border-mint-green hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                          <div className="relative mb-3">
                            <img 
                              src={product.image}
                              alt={product.name}
                              className="w-full h-32 object-cover rounded-xl"
                            />
                            {product.originalPrice > product.price && (
                              <div className="absolute top-2 left-2">
                                <IonBadge color="success" className="text-xs font-bold">
                                  -{getSavingsPercentage(product.originalPrice, product.price)}%
                                </IonBadge>
                              </div>
                            )}
                            <button 
                              onClick={() => addSuggestedToCart(product)}
                              className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-mint-green hover:text-white"
                            >
                              <IonIcon icon={addOutline} className="text-sm" />
                            </button>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-semibold text-forest-green group-hover:text-mint-green transition-colors line-clamp-2">
                              {product.name}
                            </h4>
                            <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                  <IonIcon icon={star} className="text-yellow-400 text-sm" />
                                  <span className="text-sm font-medium text-gray-700 ml-1">{product.rating}</span>
                                </div>
                                <span className="flex items-center text-xs text-mint-green">
                                  <IonIcon icon={timeOutline} className="mr-1" />
                                  {product.delivery}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between pt-2">
                              <div>
                                <span className="text-lg font-bold text-forest-green">${product.price}</span>
                                {product.originalPrice > product.price && (
                                  <span className="text-gray-400 line-through text-sm ml-2">${product.originalPrice}</span>
                                )}
                              </div>
                              <span className="bg-soft-green text-forest-green text-xs px-2 py-1 rounded-full">
                                {product.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Resumen de Compra Mejorado */}
            {cartItems.length > 0 && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 sticky top-6 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-forest-green to-mint-green">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <IonIcon icon={cardOutline} className="mr-2" />
                      Resumen de Compra
                    </h3>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    {/* Líneas de Resumen */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                        <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
                      </div>
                      
                      {calculateDiscount() > 0 && (
                        <div className="flex justify-between text-green-600 bg-green-50 rounded-lg p-3">
                          <span className="font-medium">Descuentos aplicados</span>
                          <span className="font-bold">-${calculateDiscount().toFixed(2)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-gray-600">
                        <span>Envío</span>
                        <span className="font-semibold">
                          {shippingCost === 0 ? (
                            <span className="text-green-600 font-bold">¡Gratis!</span>
                          ) : (
                            `$${shippingCost.toFixed(2)}`
                          )}
                        </span>
                      </div>

                      {/* Entrega Estimada */}
                      <div className="flex justify-between text-gray-600 border-t pt-3">
                        <span className="flex items-center">
                          <IonIcon icon={timeOutline} className="mr-2 text-mint-green" />
                          Entrega estimada
                        </span>
                        <span className="font-semibold text-forest-green">{estimatedDelivery}</span>
                      </div>
                    </div>

                    {/* Promoción Envío Gratis */}
                    {calculateSubtotal() < 50 && (
                      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-amber-200 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <IonIcon icon={giftOutline} className="text-amber-500" />
                          <span className="font-bold text-amber-700">¡Envío gratis disponible!</span>
                        </div>
                        <p className="text-sm text-amber-600">
                          Agrega <span className="font-bold">${(50 - calculateSubtotal()).toFixed(2)}</span> más 
                          para obtener envío gratuito.
                        </p>
                      </div>
                    )}

                    {/* Total */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-xl font-bold mb-2">
                        <span className="text-forest-green">Total</span>
                        <span className="text-forest-green">
                          ${(calculateTotal() + shippingCost).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm">Incluye impuestos aplicables</p>
                    </div>

                    {/* Botón de Checkout Mejorado */}
                    <IonButton 
                      expand="block" 
                      className="mt-6 bg-gradient-to-r from-mint-green to-lime-green text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      routerLink="/checkout"
                      size="large"
                    >
                      <IonIcon icon={cardOutline} className="mr-2" />
                      Proceder al Pago
                    </IonButton>

                    {/* Garantías Mejoradas */}
                    <div className="text-center space-y-3 pt-4">
                      <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-1">
                            <IonIcon icon={shieldCheckmarkOutline} className="text-green-500" />
                          </div>
                          <span>Pago seguro</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                            <IonIcon icon={rocketOutline} className="text-blue-500" />
                          </div>
                          <span>Envío rápido</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-1">
                            <IonIcon icon={timeOutline} className="text-purple-500" />
                          </div>
                          <span>Devoluciones</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cupón de Descuento */}
                <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 p-6 mt-6">
                  <h4 className="font-bold text-forest-green mb-3 flex items-center">
                    <IonIcon icon={giftOutline} className="mr-2 text-mint-green" />
                    ¿Tienes un cupón?
                  </h4>
                  <div className="flex space-x-2">
                    <input 
                      type="text" 
                      placeholder="Código de descuento"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-mint-green focus:ring-2 focus:ring-mint-green/20 bg-white text-gray-800"
                    />
                    <button className="bg-mint-green text-forest-green px-4 py-2 rounded-xl font-medium hover:bg-lime-green transition-colors">
                      Aplicar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Mejorado */}
        <IonFooter className="bg-forest-green text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <IonIcon icon={cardOutline} className="mr-2 text-lime-green" />
                  Variedades Doña Luz
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Tu tienda de confianza para calzado y perfumes de calidad. 
                  Más de 10,000 clientes satisfechos.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Compra Segura</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center">
                    <IonIcon icon={shieldCheckmarkOutline} className="mr-2 text-lime-green" />
                    <span>Pago 100% seguro</span>
                  </div>
                  <div className="flex items-center">
                    <IonIcon icon={rocketOutline} className="mr-2 text-lime-green" />
                    <span>Envío garantizado</span>
                  </div>
                  <div className="flex items-center">
                    <IonIcon icon={timeOutline} className="mr-2 text-lime-green" />
                    <span>Soporte 24/7</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <a href="#" className="block hover:text-lime-green transition-colors">Sobre Nosotros</a>
                  <a href="#" className="block hover:text-lime-green transition-colors">Contacto</a>
                  <a href="#" className="block hover:text-lime-green transition-colors">Preguntas Frecuentes</a>
                  <a href="#" className="block hover:text-lime-green transition-colors">Términos y Condiciones</a>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Contacto</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>📞 +1 234 567 890</p>
                  <p>✉️ hola@donaluz.com</p>
                  <p>📍 Caracas, Venezuela</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-600 pt-8 text-center">
              <p className="text-gray-400 text-sm">
                © 2024 Variedades Doña Luz. Todos los derechos reservados. 
                Hecho con ❤️ para nuestros clientes.
              </p>
            </div>
          </div>
        </IonFooter>

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

        {/* Alertas */}
        <IonAlert
          isOpen={showClearCartAlert}
          onDidDismiss={() => setShowClearCartAlert(false)}
          header={'Vaciar Carrito'}
          message={'¿Estás seguro de que quieres eliminar todos los productos del carrito?'}
          buttons={[
            { 
              text: 'Cancelar', 
              role: 'cancel',
              cssClass: 'text-gray-600'
            },
            { 
              text: 'Vaciar', 
              role: 'confirm', 
              handler: clearCart,
              cssClass: 'text-red-500 font-bold'
            }
          ]}
        />

        <IonAlert
          isOpen={showRemoveAlert !== null}
          onDidDismiss={() => setShowRemoveAlert(null)}
          header={'Eliminar Producto'}
          message={'¿Estás seguro de que quieres eliminar este producto del carrito?'}
          buttons={[
            { 
              text: 'Cancelar', 
              role: 'cancel',
              cssClass: 'text-gray-600'
            },
            { 
              text: 'Eliminar', 
              role: 'confirm', 
              handler: () => removeItem(showRemoveAlert!),
              cssClass: 'text-red-500 font-bold'
            }
          ]}
        />

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
          
          @keyframes slideOutRight {
            from {
              transform: translateX(0);
              opacity: 1;
            }
            to {
              transform: translateX(100%);
              opacity: 0;
            }
          }
          
          @keyframes progress {
            from {
              width: 100%;
              opacity: 1;
              height: 3px;
              border-radius: 0 0 0 0;
              transform: scaleX(1);
              transform-origin: left;
            }
            to {
              width: 100%;
              opacity: 0;
              height: 3px;
              border-radius: 0 0 0 0;
              transform: scaleX(0);
              transform-origin: left;
            }
          }
          
          .notification::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: #10b981;
            animation: progress 3s linear forwards;
          }
          
          .notification.success::before {
            background: #10b981;
          }
          
          .notification.info::before {
            background: #3b82f6;
          }
          
          .notification.warning::before {
            background: #f59e0b;
          }
          
          .notification.exiting {
            animation: slideOutRight 0.3s ease-in forwards;
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </IonContent>
  );
};

export default Cart;