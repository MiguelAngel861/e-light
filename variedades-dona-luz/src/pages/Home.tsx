// src/pages/Home.tsx
import React, { useState, useRef, useEffect } from 'react';
import { IonContent } from '@ionic/react';

// hooks/usePageTitle.ts
import { useIonViewWillEnter } from '@ionic/react';

export const usePageTitle = (title: string) => {
  useIonViewWillEnter(() => {
    document.title = title;
  });
};

const Home: React.FC = () => {
  usePageTitle("Variedades Doña Luz - Inicio");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [offersIndex, setOffersIndex] = useState(0);
  const featuredCarouselRef = useRef<HTMLDivElement>(null);
  const offersCarouselRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Array<{id: number, type: string, title: string, message: string}>>([]);

  const featuredProducts = [
    {
      id: 1,
      name: "Sneakers Urbanos",
      description: "Comodidad y estilo para el día a día",
      price: "$89.99",
      originalPrice: "$112.50",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "Calzado"
    },
    {
      id: 2,
      name: "Zapatillas Running Pro",
      description: "Máximo rendimiento deportivo",
      price: "$124.99",
      originalPrice: "",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "Deportivo"
    },
    {
      id: 3,
      name: "Esencia Floral",
      description: "Fragancia fresca y duradera",
      price: "$65.50",
      originalPrice: "",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "Perfume"
    },
    {
      id: 4,
      name: "Oxford Elegante",
      description: "Estilo clásico para ocasiones especiales",
      price: "$149.99",
      originalPrice: "$179.99",
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "Formal"
    },
    {
      id: 5,
      name: "Fragancia Ébano",
      description: "Notas amaderadas y especiadas",
      price: "$78.25",
      originalPrice: "",
      image: "https://images.unsplash.com/photo-1590736968-fc5c5f8e1f6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "Perfume"
    }
  ];

  const specialOffers = [
    {
      id: 1,
      name: "Skate Pro Series",
      description: "Diseño urbano y máxima resistencia",
      price: "$67.99",
      originalPrice: "$97.00",
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "Deportivo"
    },
    {
      id: 2,
      name: "Brisa de Verano",
      description: "Fragancia fresca y vibrante",
      price: "$45.99",
      originalPrice: "$65.70",
      image: "https://tse4.mm.bing.net/th/id/OIP.vhn6U2RWEaNPuWL4AuWBGgHaHa?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",
      category: "Perfume"
    },
    {
      id: 3,
      name: "Aventureros Junior",
      description: "Calzado cómodo para pequeños exploradores",
      price: "$34.99",
      originalPrice: "$49.99",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "Infantil"
    },
    {
      id: 4,
      name: "Seducción Nocturna",
      description: "Fragancia intensa y misteriosa",
      price: "$58.50",
      originalPrice: "$97.50",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "Perfume"
    },
    {
      id: 5,
      name: "Sandalias Primavera",
      description: "Elegancia y comodidad para el día",
      price: "$42.75",
      originalPrice: "$57.00",
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "Calzado"
    }
  ];

  const categories = [
    {
      name: "Esencia Femenina",
      description: "Descubre nuestra colección exclusiva para mujeres: calzado elegante y fragancias irresistibles.",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Estilo Masculino",
      description: "Encuentra el calzado perfecto y fragancias que reflejen tu personalidad única.",
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Mundo de Princesas",
      description: "Zapatos mágicos y perfumes suaves para las princesas de la casa.",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Aventura Infantil",
      description: "Calzado resistente y colonias frescas para pequeños aventureros.",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    }
  ];

  // Funciones del carrusel
  const nextFeatured = () => {
    const maxIndex = featuredProducts.length - 1;
    setFeaturedIndex(prev => prev < maxIndex ? prev + 1 : 0);
  };

  const prevFeatured = () => {
    const maxIndex = featuredProducts.length - 1;
    setFeaturedIndex(prev => prev > 0 ? prev - 1 : maxIndex);
  };

  const nextOffers = () => {
    const maxIndex = specialOffers.length - 1;
    setOffersIndex(prev => prev < maxIndex ? prev + 1 : 0);
  };

  const prevOffers = () => {
    const maxIndex = specialOffers.length - 1;
    setOffersIndex(prev => prev > 0 ? prev - 1 : maxIndex);
  };

  // Efectos para actualizar carruseles
  useEffect(() => {
    if (featuredCarouselRef.current) {
      const itemWidth = 316;
      featuredCarouselRef.current.style.transform = `translateX(-${featuredIndex * itemWidth}px)`;
    }
  }, [featuredIndex]);

  useEffect(() => {
    if (offersCarouselRef.current) {
      const itemWidth = 316;
      offersCarouselRef.current.style.transform = `translateX(-${offersIndex * itemWidth}px)`;
    }
  }, [offersIndex]);

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

  // Funcionalidades JavaScript convertidas a React
  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      showNotification(
        'info',
        'Búsqueda realizada',
        `Buscando productos relacionados con: "${searchTerm}"`,
        3000
      );
    }
  };

  const handleAddToCart = (productName: string, productPrice: string = '') => {
    showNotification(
      'success',
      '¡Producto agregado!',
      `${productName} ${productPrice ? `- ${productPrice}` : ''}`,
      3500
    );
  };

  const handleProductClick = (productName: string, productPrice: string = '', description: string = '') => {
    showNotification(
      'info',
      'Detalles del producto',
      `<strong>${productName}</strong><br>${productPrice}<br><small>${description}</small>`,
      4500
    );
  };

  const handleCategoryClick = (categoryName: string) => {
    showNotification(
      'info',
      'Explorando categoría',
      `Navegando a: ${categoryName}`,
      3000
    );
  };

  // Notificación de bienvenida
  useEffect(() => {
    const timer = setTimeout(() => {
      showNotification(
        'info',
        '¡Bienvenido a Variedades Doña Luz!',
        'Descubre nuestra exclusiva colección de calzado y fragancias',
        5000
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <IonContent>
      {/* Contenedor principal con el fondo */}
      <div className="bg-gradient-to-br from-white to-soft-green min-h-screen">
        
        {/* Navbar - IDÉNTICO al original */}
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
                    className="w-full pl-5 pr-12 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-mint-green focus:ring-2 focus:ring-mint-green/20 transition-all duration-300 shadow-[0_6px_20px_rgba(76,175,80,0.15)] bg-white text-gray-800"
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

              {/* Categorías */}
              <div className="hidden md:flex items-center space-x-6">
                {/* Categoría Mujeres */}
                <div className="relative group">
                  <button className="text-gray-700 hover:text-forest-green font-medium px-3 py-2 rounded-md transition-all duration-300 flex items-center hover:bg-soft-green">
                    Esencia Femenina
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-[0_10px_25px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100">
                    <div className="py-2">
                      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-mint-green hover:text-forest-green transition-colors">Zapatos Elegantes</a>
                      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-mint-green hover:text-forest-green transition-colors">Sneakers Deportivos</a>
                      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-mint-green hover:text-forest-green transition-colors">Perfumes Florales</a>
                      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-mint-green hover:text-forest-green transition-colors">Fragancias Exclusivas</a>
                    </div>
                  </div>
                </div>

                {/* Categoría Hombres */}
                <div className="relative group">
                  <button className="text-gray-700 hover:text-forest-green font-medium px-3 py-2 rounded-md transition-all duration-300 flex items-center hover:bg-soft-green">
                    Estilo Masculino
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-[0_10px_25px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-100">
                    <div className="py-2">
                      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-mint-green hover:text-forest-green transition-colors">Calzado Formal</a>
                      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-mint-green hover:text-forest-green transition-colors">Zapatos Casuales</a>
                      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-mint-green hover:text-forest-green transition-colors">Fragancias Clásicas</a>
                      <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-mint-green hover:text-forest-green transition-colors">Colonias Modernas</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Iconos de usuario y carrito */}
              <div className="flex items-center space-x-1">
                <a href="/profile" className="text-gray-700 hover:text-forest-green p-2 rounded-full hover:bg-soft-green transition-colors">
                  <img src="https://i.pravatar.cc/150?img=12" alt="Foto de perfil" className="rounded-full h-12 w-12 shadow-md"/>
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

            {/* Barra de búsqueda (Tablet) */}
            <div className="hidden md:flex lg:hidden pb-4">
              <div className="relative w-full max-w-2xl mx-auto">
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
          </div>

          {/* Menú móvil */}
          <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-white shadow-[0_10px_25px_rgba(0,0,0,0.1)]`}>
            <div className="px-4 pt-2 pb-3 space-y-1">
              {/* Barra de búsqueda (Móvil) */}
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

        {/* Hero Section Mejorada - IDÉNTICA al original */}
        <section className="relative bg-gradient-to-r from-white to-soft-green overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-soft-green/80 z-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Texto principal */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-forest-green mb-6 leading-tight">
                  Descubre tu <span className="text-mint-green">estilo único</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                  Encuentra calzado cómodo y fragancias exclusivas que reflejen tu personalidad. Calidad y estilo en un solo lugar.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a 
                    href="#" 
                    className="bg-gradient-to-r from-mint-green to-lime-green text-forest-green font-semibold px-8 py-4 rounded-xl hover:from-lime-green hover:to-mint-green transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick('Colección Completa');
                    }}
                  >
                    Explorar Colección
                  </a>
                  <a 
                    href="#" 
                    className="bg-white text-forest-green border-2 border-forest-green font-semibold px-8 py-4 rounded-xl hover:bg-forest-green hover:text-white transition-all duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick('Ofertas Especiales');
                    }}
                  >
                    Ver Ofertas
                  </a>
                </div>
              </div>
              
              {/* Imagen Hero */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="Calzado y perfumes de Variedades Doña Luz" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                {/* Elementos decorativos */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-pastel-green rounded-full opacity-70 z-0"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-lime-green rounded-full opacity-50 z-0"></div>
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
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 group cursor-pointer"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                      <span className="text-white text-2xl font-bold p-4">{category.name}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600">{category.description}</p>
                    <a 
                      href="#" 
                      className="mt-4 inline-block bg-mint-green text-forest-green px-4 py-2 rounded-md font-medium hover:bg-lime-green transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCategoryClick(category.name);
                      }}
                    >
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
              <div 
                ref={featuredCarouselRef}
                className="carousel-track featured-products flex transition-transform duration-500 ease-in-out"
              >
                {featuredProducts.map((product) => (
                  <div key={product.id} className="min-w-[300px] mx-2">
                    <div 
                      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                      onClick={() => handleProductClick(product.name, product.price, product.description)}
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-forest-green font-bold text-xl mb-1">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-forest-green font-bold text-xl">{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-gray-400 line-through text-sm ml-2">{product.originalPrice}</span>
                            )}
                          </div>
                          <button 
                            className="bg-mint-green text-forest-green p-2 rounded-full hover:bg-lime-green transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product.name, product.price);
                            }}
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
              <div 
                ref={offersCarouselRef}
                className="carousel-track special-offers flex transition-transform duration-500 ease-in-out"
              >
                {specialOffers.map((offer) => (
                  <div key={offer.id} className="min-w-[300px] mx-2">
                    <div 
                      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                      onClick={() => handleProductClick(offer.name, offer.price, offer.description)}
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={offer.image} 
                          alt={offer.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-forest-green font-bold text-xl mb-1">{offer.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{offer.description}</p>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-forest-green font-bold text-xl">{offer.price}</span>
                            {offer.originalPrice && (
                              <span className="text-gray-400 line-through text-sm ml-2">{offer.originalPrice}</span>
                            )}
                          </div>
                          <button 
                            className="bg-mint-green text-forest-green p-2 rounded-full hover:bg-lime-green transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(offer.name, offer.price);
                            }}
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
          </section>
        </div>

        {/* Sistema de Notificaciones - IGUAL al HTML original */}
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
                  dangerouslySetInnerHTML={{ __html: notification.message }}
                />
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
        `}</style>
      </div>
    </IonContent>
  );
};

export default Home;