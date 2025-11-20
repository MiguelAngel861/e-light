// src/components/ProductCard.tsx
import React, { useState } from 'react';
import { 
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, 
  IonButton, IonIcon, IonBadge, IonChip, IonAlert, IonSpinner
} from '@ionic/react';
import { 
  heartOutline, heart, cartOutline, eyeOutline, 
  star, starOutline, flashOutline, timeOutline 
} from 'ionicons/icons';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  category: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isOnSale?: boolean;
  stock?: number;
  tags?: string[];
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
  isFavorite?: boolean;
  showActions?: boolean;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  onToggleFavorite,
  isFavorite = false,
  showActions = true,
  variant = 'default',
  className = ''
}) => {
  const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleAddToCart = async () => {
    if (!onAddToCart) return;
    
    setIsAddingToCart(true);
    try {
      await onAddToCart(product);
      setShowAlert(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleToggleFavorite = () => {
    setLocalIsFavorite(!localIsFavorite);
    if (onToggleFavorite) {
      onToggleFavorite(product);
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  const calculateDiscount = () => {
    if (!product.originalPrice) return 0;
    const price = parseFloat(product.price.replace('$', ''));
    const original = parseFloat(product.originalPrice.replace('$', ''));
    return Math.round(((original - price) / original) * 100);
  };

  const renderBadges = () => {
    const badges = [];
    
    if (product.isNew) {
      badges.push(
        <IonBadge key="new" color="success" className="absolute top-2 left-2 z-10">
          Nuevo
        </IonBadge>
      );
    }
    
    if (product.isOnSale && product.originalPrice) {
      badges.push(
        <IonBadge key="sale" color="danger" className="absolute top-2 right-2 z-10">
          -{calculateDiscount()}%
        </IonBadge>
      );
    }

    if (product.stock !== undefined && product.stock < 5) {
      badges.push(
        <IonBadge key="stock" color="warning" className="absolute top-10 left-2 z-10">
          Últimas {product.stock}
        </IonBadge>
      );
    }

    return badges;
  };

  const renderRating = () => {
    if (!product.rating) return null;
    
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<IonIcon key={i} icon={star} className="text-yellow-400 text-sm" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<IonIcon key={i} icon={star} className="text-yellow-400 text-sm" />);
      } else {
        stars.push(<IonIcon key={i} icon={starOutline} className="text-gray-300 text-sm" />);
      }
    }

    return (
      <div className="flex items-center mt-1">
        <div className="flex items-center">{stars}</div>
        {product.reviewCount && (
          <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
        )}
      </div>
    );
  };

  const renderTags = () => {
    if (!product.tags || product.tags.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {product.tags.slice(0, 2).map((tag, index) => (
          <IonChip key={index} color="medium" className="text-xs py-1">
            {tag}
          </IonChip>
        ))}
      </div>
    );
  };

  // Variantes de diseño
  const getCardClasses = () => {
    const baseClasses = "rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl";
    
    switch (variant) {
      case 'compact':
        return `${baseClasses} product-card-compact`;
      case 'featured':
        return `${baseClasses} product-card-featured transform hover:-translate-y-1`;
      default:
        return `${baseClasses} product-card-default`;
    }
  };

  const getImageHeight = () => {
    switch (variant) {
      case 'compact':
        return "h-32";
      case 'featured':
        return "h-56";
      default:
        return "h-48";
    }
  };

  if (variant === 'compact') {
    return (
      <>
        <IonCard className={`${getCardClasses()} ${className} white-bg`}>
          <div className="flex">
            <div className="relative flex-shrink-0 w-24 h-24">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover rounded-l-2xl"
              />
              {renderBadges()}
            </div>
            
            <IonCardContent className="flex-1 p-3 white-bg">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-1">
                    {product.description}
                  </p>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-forest-green text-sm">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through text-xs">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {showActions && (
                    <IonButton
                      size="small"
                      onClick={handleAddToCart}
                      disabled={isAddingToCart}
                      className="bg-mint-green text-forest-green text-xs"
                    >
                      {isAddingToCart ? (
                        <IonSpinner className="w-3 h-3" />
                      ) : (
                        <IonIcon icon={cartOutline} className="text-xs" />
                      )}
                    </IonButton>
                  )}
                </div>
              </div>
            </IonCardContent>
          </div>
        </IonCard>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="¡Producto agregado!"
          message={`${product.name} se ha añadido al carrito`}
          buttons={['Continuar']}
        />
      </>
    );
  }

  return (
    <>
      <IonCard className={`${getCardClasses()} ${className} white-bg cursor-pointer`} onClick={handleViewDetails}>
        {/* Imagen del producto */}
        <div className={`relative ${getImageHeight()} overflow-hidden`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          
          {/* Badges */}
          {renderBadges()}
          
          {/* Botón de favoritos */}
          {showActions && (
            <IonButton
              fill="clear"
              className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorite();
              }}
            >
              <IonIcon 
                icon={localIsFavorite ? heart : heartOutline} 
                className={localIsFavorite ? "text-red-500" : "text-gray-600"}
              />
            </IonButton>
          )}
        </div>

        <IonCardContent className="p-4 white-bg">
          {/* Categoría */}
          <div className="flex justify-between items-start mb-2">
            <IonChip color="primary" className="text-xs">
              {product.category}
            </IonChip>
            
            {product.stock !== undefined && product.stock > 10 && (
              <div className="flex items-center text-xs text-green-600">
                <IonIcon icon={flashOutline} className="mr-1" />
                En stock
              </div>
            )}
          </div>

          {/* Nombre y descripción */}
          <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          {renderRating()}

          {/* Tags */}
          {renderTags()}

          {/* Precio y acciones */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-forest-green text-xl">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-sm">
                  {product.originalPrice}
                </span>
              )}
            </div>
            
            {showActions && (
              <div className="flex space-x-1">
                <IonButton
                  fill="clear"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails();
                  }}
                  className="text-gray-600"
                >
                  <IonIcon icon={eyeOutline} />
                </IonButton>
                
                <IonButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart();
                  }}
                  disabled={isAddingToCart}
                  className="bg-mint-green text-forest-green font-semibold"
                >
                  {isAddingToCart ? (
                    <IonSpinner className="w-4 h-4" />
                  ) : (
                    <IonIcon icon={cartOutline} />
                  )}
                </IonButton>
              </div>
            )}
          </div>

          {/* Información adicional */}
          {variant === 'featured' && product.stock !== undefined && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Disponible: {product.stock} unidades</span>
                <div className="flex items-center">
                  <IonIcon icon={timeOutline} className="mr-1" />
                  <span>Envío gratis</span>
                </div>
              </div>
            </div>
          )}
        </IonCardContent>
      </IonCard>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="¡Producto agregado!"
        message={`${product.name} se ha añadido al carrito`}
        buttons={['Continuar']}
      />

      <style>{`
        .white-bg {
          background: white !important;
        }
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      `}</style>
    </>
  );
};

export default ProductCard;