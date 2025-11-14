// src/pages/Home.tsx
import React, { useState, useRef, useEffect } from 'react';
import { IonContent } from '@ionic/react';

const Home: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [offersIndex, setOffersIndex] = useState(0);
  const featuredCarouselRef = useRef<HTMLDivElement>(null);
  const offersCarouselRef = useRef<HTMLDivElement>(null);

  const featuredProducts = [
    {
      id: 1,
      name: "Sneakers Urbanos",
      description: "Comodidad y estilo para el día a día",
      price: "$89.99",
      originalPrice: "$112.50",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
      category: "Calzado"
    },
    {
      id: 2,
      name: "Zapatillas Running Pro",
      description: "Máximo rendimiento deportivo",
      price: "$124.99",
      originalPrice: "",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop",
      category: "Deportivo"
    },
    {
      id: 3,
      name: "Esencia Floral",
      description: "Fragancia fresca y duradera",
      price: "$65.50",
      originalPrice: "",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=300&fit=crop",
      category: "Perfume"
    },
    {
      id: 4,
      name: "Oxford Elegante",
      description: "Estilo clásico para ocasiones especiales",
      price: "$149.99",
      originalPrice: "$179.99",
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=300&fit=crop",
      category: "Formal"
    },
    {
      id: 5,
      name: "Fragancia Ébano",
      description: "Notas amaderadas y especiadas",
      price: "$78.25",
      originalPrice: "",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop",
      category: "Perfume"
    },
    {
      id: 6,
      name: "Botas de Cuero",
      description: "Duraderas y elegantes para toda ocasión",
      price: "$199.99",
      originalPrice: "$249.99",
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=300&fit=crop",
      category: "Calzado"
    }
  ];

  const specialOffers = [
    {
      id: 1,
      name: "Skate Pro Series",
      description: "Diseño urbano y máxima resistencia",
      price: "$67.99",
      originalPrice: "$97.00",
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=300&fit=crop",
      category: "Deportivo"
    },
    {
      id: 2,
      name: "Brisa de Verano",
      description: "Fragancia fresca y vibrante",
      price: "$45.99",
      originalPrice: "$65.70",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=300&fit=crop",
      category: "Perfume"
    },
    {
      id: 3,
      name: "Aventureros Junior",
      description: "Calzado cómodo para pequeños exploradores",
      price: "$34.99",
      originalPrice: "$49.99",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
      category: "Infantil"
    },
    {
      id: 4,
      name: "Seducción Nocturna",
      description: "Fragancia intensa y misteriosa",
      price: "$58.50",
      originalPrice: "$97.50",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop",
      category: "Perfume"
    },
    {
      id: 5,
      name: "Sandalias Primavera",
      description: "Elegancia y comodidad para el día",
      price: "$42.75",
      originalPrice: "$57.00",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop",
      category: "Calzado"
    },
    {
      id: 6,
      name: "Colonia Fresh",
      description: "Aroma revitalizante para el día a día",
      price: "$29.99",
      originalPrice: "$39.99",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=300&fit=crop",
      category: "Perfume"
    }
  ];

  const categories = [
    {
      name: "Esencia Femenina",
      description: "Descubre nuestra colección exclusiva para mujeres: calzado elegante y fragancias irresistibles.",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop",
      gradient: "from-pastel-green to-lime-green"
    },
    {
      name: "Estilo Masculino",
      description: "Encuentra el calzado perfecto y fragancias que reflejen tu personalidad única.",
      image: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=400&h=300&fit=crop",
      gradient: "from-sage-green to-forest-green"
    },
    {
      name: "Mundo de Princesas",
      description: "Zapatos mágicos y perfumes suaves para las princesas de la casa.",
      image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400&h=300&fit=crop",
      gradient: "from-pastel-green to-mint-green"
    },
    {
      name: "Aventura Infantil",
      description: "Calzado resistente y colonias frescas para pequeños aventureros.",
      image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&h=300&fit=crop",
      gradient: "from-lime-green to-sage-green"
    }
  ];

  // Función para el carrusel de productos destacados
  const nextFeatured = () => {
    const maxIndex = featuredProducts.length - 1;
    setFeaturedIndex(prev => prev < maxIndex ? prev + 1 : 0);
  };

  const prevFeatured = () => {
    const maxIndex = featuredProducts.length - 1;
    setFeaturedIndex(prev => prev > 0 ? prev - 1 : maxIndex);
  };

  // Función para el carrusel de ofertas
  const nextOffers = () => {
    const maxIndex = specialOffers.length - 1;
    setOffersIndex(prev => prev < maxIndex ? prev + 1 : 0);
  };

  const prevOffers = () => {
    const maxIndex = specialOffers.length - 1;
    setOffersIndex(prev => prev > 0 ? prev - 1 : maxIndex);
  };

  // Efecto para actualizar la posición del carrusel
  useEffect(() => {
    if (featuredCarouselRef.current) {
      const itemWidth = 316; // 300px + 16px gap
      featuredCarouselRef.current.style.transform = `translateX(-${featuredIndex * itemWidth}px)`;
    }
  }, [featuredIndex]);

  useEffect(() => {
    if (offersCarouselRef.current) {
      const itemWidth = 316; // 300px + 16px gap
      offersCarouselRef.current.style.transform = `translateX(-${offersIndex * itemWidth}px)`;
    }
  }, [offersIndex]);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      alert(`Buscando: ${searchTerm}`);
    }
  };

  const handleAddToCart = (productName: string) => {
    alert(`Agregado al carrito: ${productName}`);
  };

  const handleProductClick = (productName: string) => {
    alert(`Ver detalles de: ${productName}`);
  };

  return (
    <IonContent 
      className="bg-gradient-to-br from-white to-soft-green"
      style={{
        '--background': 'linear-gradient(135deg, #ffffff 0%, #E8F5E9 100%)',
      } as any}
    >
      {/* Navbar */}
      <nav className="bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <a href="#" className="text-forest-green font-bold text-2xl tracking-wider flex items-center">
                <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
                </svg>
                Variedades Doña Luz
              </a>
            </div>

            {/* Barra de búsqueda (Desktop) */}
            <div className="hidden lg:flex items-center flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder="Buscar calzado, perfumes, marcas..." 
                  className="w-full pl-5 pr-12 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-mint-green focus:ring-2 focus:ring-mint-green/20 transition-all duration-300 shadow-[0_6px_20px_rgba(76,175,80,0.15)]"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch((e.target as HTMLInputElement).value);
                    }
                  }}
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-mint-green text-forest-green p-2 rounded-full hover:bg-lime-green transition-colors duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Iconos de usuario y carrito */}
            <div className="flex items-center space-x-1">
              <a href="/profile" className="text-gray-700 hover:text-forest-green p-2 rounded-full hover:bg-soft-green transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </a>
              <a href="/cart" className="text-gray-700 hover:text-forest-green p-2 rounded-full hover:bg-soft-green transition-colors relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <span className="absolute -top-1 -right-1 bg-mint-green text-forest-green text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">3</span>
              </a>
            </div>

            {/* Botón menú móvil */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-forest-green focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-white shadow-[0_10px_25px_rgba(0,0,0,0.1)]`}>
          <div className="px-4 pt-2 pb-3 space-y-1">
            <div className="mb-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar productos..." 
                  className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-mint-green"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch((e.target as HTMLInputElement).value);
                    }
                  }}
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-mint-green text-forest-green p-1 rounded-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <a href="#" className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-soft-green">Esencia Femenina</a>
            <a href="#" className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-soft-green">Estilo Masculino</a>
            <a href="#" className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-soft-green">Mundo de Princesas</a>
            <a href="#" className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-soft-green">Aventura Infantil</a>
          </div>
        </div>
      </nav>

      {/* Hero Section con Imagen de Fondo */}
      <section 
        className="relative py-20 mb-10 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(232,245,233,0.9)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-forest-green mb-6 drop-shadow-lg">
              Encuentra tu estilo perfecto
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8 drop-shadow-md">
              Descubre calzado cómodo y fragancias únicas que reflejen tu personalidad
            </p>
          </div>

          {/* Barra de búsqueda destacada */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border border-white/20">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1">
                  <input 
                    type="text" 
                    placeholder="¿Qué estás buscando? Ej: Zapatos deportivos, perfume floral..." 
                    className="w-full px-6 py-4 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-green/30 text-lg bg-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch((e.target as HTMLInputElement).value);
                      }
                    }}
                  />
                </div>
                <button 
                  onClick={() => {
                    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                    if (input) handleSearch(input.value);
                  }}
                  className="bg-gradient-to-r from-mint-green to-lime-green text-forest-green font-semibold px-8 py-4 rounded-xl hover:from-lime-green hover:to-mint-green transition-all duration-300 flex items-center justify-center shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  Buscar
                </button>
              </div>
              
              {/* Sugerencias rápidas */}
              <div className="px-4 py-3 flex flex-wrap gap-2">
                <span className="text-gray-600 text-sm">Sugerencias:</span>
                <button 
                  onClick={() => handleSearch("Zapatos de tacón")}
                  className="text-forest-green bg-soft-green hover:bg-mint-green px-3 py-1 rounded-full text-sm transition-colors"
                >
                  Zapatos de tacón
                </button>
                <button 
                  onClick={() => handleSearch("Perfumes verano")}
                  className="text-forest-green bg-soft-green hover:bg-mint-green px-3 py-1 rounded-full text-sm transition-colors"
                >
                  Perfumes verano
                </button>
                <button 
                  onClick={() => handleSearch("Sneakers hombre")}
                  className="text-forest-green bg-soft-green hover:bg-mint-green px-3 py-1 rounded-full text-sm transition-colors"
                >
                  Sneakers hombre
                </button>
                <button 
                  onClick={() => handleSearch("Colonia infantil")}
                  className="text-forest-green bg-soft-green hover:bg-mint-green px-3 py-1 rounded-full text-sm transition-colors"
                >
                  Colonia infantil
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Tarjetas de categorías */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-forest-green text-center mb-8">Explora Nuestras Categorías</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 group cursor-pointer">
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-80`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold text-center p-4 drop-shadow-lg">
                      {category.name}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{category.description}</p>
                  <a href="#" className="mt-4 inline-block bg-mint-green text-forest-green px-4 py-2 rounded-md font-medium hover:bg-lime-green transition-colors">
                    Explorar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carrusel de Productos Destacados */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-forest-green">Productos Destacados</h2>
            <div className="flex space-x-2">
              <button 
                onClick={prevFeatured}
                className="carousel-btn prev-featured bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-50 transition-all duration-300"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button 
                onClick={nextFeatured}
                className="carousel-btn next-featured bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-50 transition-all duration-300"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="overflow-hidden relative">
            <div className="relative">
              <div 
                ref={featuredCarouselRef}
                className="flex transition-transform duration-500 ease-in-out gap-4"
                style={{ width: `${featuredProducts.length * 316}px` }}
              >
                {featuredProducts.map((product) => (
                  <div key={product.id} className="w-[300px] flex-shrink-0">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
                      <div className="h-48 relative overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3">
                          <span className="bg-mint-green text-forest-green text-xs px-2 py-1 rounded-full font-medium">
                            {product.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-forest-green font-bold text-xl">{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-gray-400 line-through text-sm ml-2">{product.originalPrice}</span>
                            )}
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product.name);
                            }}
                            className="bg-mint-green text-forest-green p-2 rounded-full hover:bg-lime-green transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Carrusel de Ofertas Especiales */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-forest-green">Ofertas Especiales</h2>
            <div className="flex space-x-2">
              <button 
                onClick={prevOffers}
                className="carousel-btn prev-offers bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-50 transition-all duration-300"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button 
                onClick={nextOffers}
                className="carousel-btn next-offers bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-50 transition-all duration-300"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="overflow-hidden relative">
            <div className="relative">
              <div 
                ref={offersCarouselRef}
                className="flex transition-transform duration-500 ease-in-out gap-4"
                style={{ width: `${specialOffers.length * 316}px` }}
              >
                {specialOffers.map((offer) => (
                  <div key={offer.id} className="w-[300px] flex-shrink-0">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer group relative">
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          OFERTA
                        </span>
                      </div>
                      <div className="h-48 relative overflow-hidden">
                        <img 
                          src={offer.image} 
                          alt={offer.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3">
                          <span className="bg-mint-green text-forest-green text-xs px-2 py-1 rounded-full font-medium">
                            {offer.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">{offer.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{offer.description}</p>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-forest-green font-bold text-xl">{offer.price}</span>
                            {offer.originalPrice && (
                              <span className="text-gray-400 line-through text-sm ml-2">{offer.originalPrice}</span>
                            )}
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(offer.name);
                            }}
                            className="bg-mint-green text-forest-green p-2 rounded-full hover:bg-lime-green transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </IonContent>
  );
};

export default Home;