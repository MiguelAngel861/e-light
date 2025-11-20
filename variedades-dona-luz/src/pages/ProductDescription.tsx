// src/components/ProductDescription.tsx
import React, { useState } from 'react';
import { 
  IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonButton, IonIcon, IonBadge, IonChip, IonAlert, IonSpinner,
  IonGrid, IonRow, IonCol, IonText, IonItem, IonLabel, IonSelect, 
  IonSelectOption, IonSegment, IonSegmentButton, IonAccordion,
  IonAccordionGroup, IonList, IonThumbnail, IonProgressBar
} from '@ionic/react';
import { 
  star, starOutline, starHalf, heartOutline, heart,
  shieldCheckmarkOutline, truckOutline, arrowUndoOutline,
  checkmarkCircleOutline, cartOutline, shareSocialOutline,
  informationCircleOutline, listOutline, chatbubbleOutline
} from 'ionicons/icons';

interface ProductVariant {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  size?: string;
  color?: string;
  colorCode?: string;
  stock: number;
  sku: string;
}

interface ProductReview {
  id: number;
  user: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  likes: number;
}

interface ProductDescriptionProps {
  product: {
    id: number;
    name: string;
    description: string;
    fullDescription: string;
    price: string;
    originalPrice?: string;
    image: string;
    images: string[];
    category: string;
    brand: string;
    rating: number;
    reviewCount: number;
    stock: number;
    sku: string;
    tags: string[];
    features: string[];
    specifications: { [key: string]: string };
    variants?: ProductVariant[];
    reviews?: ProductReview[];
    warranty: string;
    shipping: string;
    returnPolicy: string;
  };
  onAddToCart: (product: any, quantity: number, variant?: ProductVariant) => void;
  onToggleFavorite: (product: any) => void;
  isFavorite?: boolean;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeSegment, setActiveSegment] = useState('description');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite);

  const currentProduct = selectedVariant ? {
    ...product,
    price: selectedVariant.price,
    originalPrice: selectedVariant.originalPrice,
    stock: selectedVariant.stock
  } : product;

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await onAddToCart(currentProduct, quantity, selectedVariant || undefined);
      setShowSuccessAlert(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleToggleFavorite = () => {
    setLocalIsFavorite(!localIsFavorite);
    onToggleFavorite(product);
  };

  const calculateDiscount = () => {
    if (!currentProduct.originalPrice) return 0;
    const price = parseFloat(currentProduct.price.replace('$', ''));
    const original = parseFloat(currentProduct.originalPrice.replace('$', ''));
    return Math.round(((original - price) / original) * 100);
  };

  const renderRatingStars = (rating: number, size: string = 'text-lg') => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<IonIcon key={i} icon={star} className={`${size} text-yellow-400`} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<IonIcon key={i} icon={starHalf} className={`${size} text-yellow-400`} />);
      } else {
        stars.push(<IonIcon key={i} icon={starOutline} className={`${size} text-gray-300`} />);
      }
    }

    return <div className="flex items-center">{stars}</div>;
  };

  const renderSizeVariants = () => {
    if (!product.variants) return null;

    const sizeVariants = product.variants.filter(v => v.size);
    
    return (
      <div className="mb-6">
        <IonLabel className="block text-sm font-semibold text-gray-700 mb-3">
          Talla: <span className="text-forest-green">{selectedVariant?.size}</span>
        </IonLabel>
        <div className="flex flex-wrap gap-2">
          {sizeVariants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant)}
              className={`px-4 py-2 border-2 rounded-lg font-medium transition-all duration-200 ${
                selectedVariant?.id === variant.id
                  ? 'border-forest-green bg-forest-green text-white'
                  : 'border-gray-300 text-gray-700 hover:border-forest-green'
              } ${
                variant.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={variant.stock === 0}
            >
              {variant.size}
              {variant.stock === 0 && (
                <span className="block text-xs text-red-500">Agotado</span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderColorVariants = () => {
    if (!product.variants) return null;

    const colorVariants = product.variants.filter(v => v.color);
    
    return (
      <div className="mb-6">
        <IonLabel className="block text-sm font-semibold text-gray-700 mb-3">
          Color: <span className="text-forest-green">{selectedVariant?.color}</span>
        </IonLabel>
        <div className="flex flex-wrap gap-3">
          {colorVariants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant)}
              className={`w-12 h-12 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                selectedVariant?.id === variant.id
                  ? 'border-forest-green ring-2 ring-forest-green/30'
                  : 'border-gray-300'
              } ${
                variant.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              style={{ backgroundColor: variant.colorCode }}
              disabled={variant.stock === 0}
              title={variant.color}
            >
              {variant.stock === 0 && (
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">×</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderImageGallery = () => (
    <div className="space-y-4">
      {/* Imagen principal */}
      <div className="rounded-2xl overflow-hidden bg-gray-100">
        <img
          src={product.images[activeImage]}
          alt={product.name}
          className="w-full h-96 object-cover"
        />
      </div>
      
      {/* Miniaturas */}
      {product.images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                activeImage === index 
                  ? 'border-forest-green ring-2 ring-forest-green/30' 
                  : 'border-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const renderProductInfo = () => (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <IonChip color="primary" className="mb-2">
          {product.category}
        </IonChip>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {product.name}
        </h1>
        <div className="flex items-center space-x-4 mb-3">
          {renderRatingStars(product.rating)}
          <span className="text-gray-600">
            {product.reviewCount} reseñas
          </span>
          <IonBadge color="success" className="flex items-center">
            <IonIcon icon={checkmarkCircleOutline} className="mr-1" />
            SKU: {currentProduct.sku}
          </IonBadge>
        </div>
      </div>

      {/* Precio */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <span className="text-4xl font-bold text-forest-green">
            {currentProduct.price}
          </span>
          {currentProduct.originalPrice && (
            <>
              <span className="text-2xl text-gray-400 line-through">
                {currentProduct.originalPrice}
              </span>
              <IonBadge color="danger" className="text-lg">
                -{calculateDiscount()}%
              </IonBadge>
            </>
          )}
        </div>
        <p className="text-green-600 font-semibold flex items-center">
          <IonIcon icon={shieldCheckmarkOutline} className="mr-1" />
          {currentProduct.stock > 10 
            ? 'En stock - Listo para enviar' 
            : `Solo ${currentProduct.stock} disponibles`}
        </p>
      </div>

      {/* Descripción corta */}
      <div>
        <p className="text-gray-700 text-lg leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Variantes */}
      {renderSizeVariants()}
      {renderColorVariants()}

      {/* Cantidad y acciones */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <IonLabel className="text-sm font-semibold text-gray-700">
            Cantidad:
          </IonLabel>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              -
            </button>
            <span className="px-4 py-2 font-semibold text-gray-800">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(currentProduct.stock, quantity + 1))}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-500">
            Máximo: {currentProduct.stock} unidades
          </span>
        </div>

        <div className="flex space-x-3">
          <IonButton
            expand="block"
            onClick={handleAddToCart}
            disabled={isAddingToCart || currentProduct.stock === 0}
            className="bg-mint-green text-forest-green font-semibold text-lg py-4 flex-1"
          >
            {isAddingToCart ? (
              <IonSpinner className="mr-2" />
            ) : (
              <IonIcon icon={cartOutline} className="mr-2" />
            )}
            {currentProduct.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
          </IonButton>

          <IonButton
            fill="outline"
            onClick={handleToggleFavorite}
            className="border-forest-green text-forest-green w-14"
          >
            <IonIcon icon={localIsFavorite ? heart : heartOutline} />
          </IonButton>
        </div>
      </div>

      {/* Beneficios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <IonIcon icon={truckOutline} className="text-2xl text-forest-green" />
          <div>
            <p className="font-semibold text-gray-800">Envío Gratis</p>
            <p className="text-sm text-gray-600">En compras +$50</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <IonIcon icon={shieldCheckmarkOutline} className="text-2xl text-forest-green" />
          <div>
            <p className="font-semibold text-gray-800">Garantía</p>
            <p className="text-sm text-gray-600">{product.warranty}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <IonIcon icon={arrowUndoOutline} className="text-2xl text-forest-green" />
          <div>
            <p className="font-semibold text-gray-800">Devoluciones</p>
            <p className="text-sm text-gray-600">{product.returnPolicy}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDescriptionTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Descripción del Producto
        </h3>
        <div className="prose max-w-none text-gray-700 leading-relaxed">
          <p>{product.fullDescription}</p>
        </div>
      </div>

      {product.features.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            Características Principales
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <IonIcon icon={checkmarkCircleOutline} className="text-green-500" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {Object.keys(product.specifications).length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            Especificaciones Técnicas
          </h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <table className="w-full">
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key} className="border-b border-gray-200 last:border-b-0">
                    <td className="py-2 font-semibold text-gray-700">{key}</td>
                    <td className="py-2 text-gray-600">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const renderReviewsTab = () => (
    <div className="space-y-6">
      {/* Resumen de reseñas */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-forest-green mb-2">
              {product.rating}
            </div>
            {renderRatingStars(product.rating, 'text-2xl')}
            <p className="text-gray-600 mt-1">{product.reviewCount} reseñas</p>
          </div>
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = product.reviews?.filter(r => Math.floor(r.rating) === stars).length || 0;
              const percentage = (count / product.reviewCount) * 100;
              
              return (
                <div key={stars} className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 w-8">{stars}</span>
                  <IonIcon icon={star} className="text-yellow-400" />
                  <IonProgressBar 
                    value={percentage / 100} 
                    className="flex-1 h-2"
                  />
                  <span className="text-sm text-gray-600 w-12">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lista de reseñas */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800">
            Opiniones de Clientes
          </h4>
          {product.reviews.map((review) => (
            <IonCard key={review.id} className="rounded-lg">
              <IonCardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-gray-800">{review.user}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {renderRatingStars(review.rating)}
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                  {review.verified && (
                    <IonBadge color="success" className="flex items-center">
                      <IonIcon icon={checkmarkCircleOutline} className="mr-1" />
                      Verificado
                    </IonBadge>
                  )}
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <div className="flex justify-between items-center mt-3">
                  <button className="text-sm text-gray-500 hover:text-forest-green transition-colors">
                    <IonIcon icon={heartOutline} className="mr-1" />
                    Útil ({review.likes})
                  </button>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <span>Inicio</span>
            <span>/</span>
            <span>{product.category}</span>
            <span>/</span>
            <span className="text-forest-green font-semibold">{product.name}</span>
          </nav>

          {/* Contenido principal */}
          <IonGrid>
            <IonRow>
              <IonCol size="12" sizeMd="6">
                {renderImageGallery()}
              </IonCol>
              <IonCol size="12" sizeMd="6">
                {renderProductInfo()}
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Tabs de información */}
          <div className="mt-12">
            <IonSegment value={activeSegment} onIonChange={e => setActiveSegment(e.detail.value as string)}>
              <IonSegmentButton value="description">
                <IonIcon icon={informationCircleOutline} className="mr-2" />
                <IonLabel>Descripción</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="specifications">
                <IonIcon icon={listOutline} className="mr-2" />
                <IonLabel>Especificaciones</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="reviews">
                <IonIcon icon={chatbubbleOutline} className="mr-2" />
                <IonLabel>Reseñas ({product.reviewCount})</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            <div className="mt-6">
              {activeSegment === 'description' && renderDescriptionTab()}
              {activeSegment === 'specifications' && renderDescriptionTab()} {/* Mismo contenido por ahora */}
              {activeSegment === 'reviews' && renderReviewsTab()}
            </div>
          </div>
        </div>
      </div>

      <IonAlert
        isOpen={showSuccessAlert}
        onDidDismiss={() => setShowSuccessAlert(false)}
        header="¡Producto agregado!"
        message={`${quantity} x ${product.name} se ha añadido al carrito`}
        buttons={['Seguir comprando', 'Ver carrito']}
      />
    </>
  );
};

export default ProductDescription;