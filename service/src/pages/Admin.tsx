// src/pages/Admin.tsx
import React, { useState } from 'react';
import {
  IonContent, IonButton, IonIcon, IonItem, IonLabel, IonInput,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid,
  IonRow, IonCol, IonAlert, IonLoading, IonBadge, IonChip,
  IonSelect, IonSelectOption, IonSearchbar, IonSegment,
  IonSegmentButton, IonList, IonThumbnail, IonToggle,
  IonModal, IonHeader, IonToolbar, IonTitle, IonTextarea,
  IonDatetime, IonFooter, IonProgressBar
} from '@ionic/react';
import {
  arrowBack, analyticsOutline, bagHandleOutline, peopleOutline,
  cashOutline, trendingUpOutline, alertCircleOutline, checkmarkCircleOutline,
  addOutline, searchOutline, filterOutline, downloadOutline,
  eyeOutline, pencilOutline, trashOutline, refreshOutline,
  starOutline, timeOutline, cartOutline, storefrontOutline,
  layersOutline, cubeOutline, barcodeOutline, pricetagOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

// hooks/usePageTitle.ts
import { useIonViewWillEnter } from '@ionic/react';

export const usePageTitle = (title: string) => {
  useIonViewWillEnter(() => {
    document.title = title;
  });
};

const Admin: React.FC = () => {
  usePageTitle("Panel de Administración - Variedades Doña Luz");
  const history = useHistory();

  const [activeSegment, setActiveSegment] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Datos de ejemplo para el dashboard
  const dashboardStats = {
    totalSales: 12540,
    totalOrders: 342,
    totalProducts: 156,
    lowStock: 8,
    monthlyGrowth: 12.5,
    pendingOrders: 23,
    totalCustomers: 892,
    revenue: 45890
  };

  const inventory = [
    {
      id: 1,
      name: "Sneakers Urbanos",
      sku: "SNK-001",
      category: "Calzado",
      price: 89.99,
      stock: 45,
      minStock: 10,
      status: "in_stock",
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      name: "Esencia Floral",
      sku: "PER-001",
      category: "Perfume",
      price: 65.50,
      stock: 8,
      minStock: 5,
      status: "low_stock",
      lastUpdated: "2024-01-14"
    },
    {
      id: 3,
      name: "Zapatillas Running Pro",
      sku: "DEP-001",
      category: "Deportivo",
      price: 124.99,
      stock: 0,
      minStock: 3,
      status: "out_of_stock",
      lastUpdated: "2024-01-13"
    },
    {
      id: 4,
      name: "Oxford Elegante",
      sku: "FOR-001",
      category: "Formal",
      price: 149.99,
      stock: 22,
      minStock: 5,
      status: "in_stock",
      lastUpdated: "2024-01-15"
    },
    {
      id: 5,
      name: "Fragancia Ébano",
      sku: "PER-002",
      category: "Perfume",
      price: 78.25,
      stock: 15,
      minStock: 5,
      status: "in_stock",
      lastUpdated: "2024-01-12"
    }
  ];

  const recentOrders = [
    {
      id: 1001,
      customer: "María González",
      date: "2024-01-15",
      amount: 189.99,
      status: "completed",
      items: 2
    },
    {
      id: 1002,
      customer: "Carlos Rodríguez",
      date: "2024-01-15",
      amount: 124.99,
      status: "processing",
      items: 1
    },
    {
      id: 1003,
      customer: "Ana Martínez",
      date: "2024-01-14",
      amount: 245.50,
      status: "shipped",
      items: 3
    },
    {
      id: 1004,
      customer: "Pedro López",
      date: "2024-01-14",
      amount: 67.99,
      status: "pending",
      items: 1
    }
  ];

  const handleSegmentChange = (e: CustomEvent) => {
    setActiveSegment(e.detail.value as string);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'success';
      case 'low_stock': return 'warning';
      case 'out_of_stock': return 'danger';
      case 'completed': return 'success';
      case 'processing': return 'primary';
      case 'shipped': return 'warning';
      case 'pending': return 'medium';
      default: return 'medium';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_stock': return 'En Stock';
      case 'low_stock': return 'Stock Bajo';
      case 'out_of_stock': return 'Sin Stock';
      case 'completed': return 'Completado';
      case 'processing': return 'Procesando';
      case 'shipped': return 'Enviado';
      case 'pending': return 'Pendiente';
      default: return status;
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowProductModal(true);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleSaveProduct = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowProductModal(false);
    }, 1500);
  };

  const handleExportData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Datos exportados exitosamente');
    }, 2000);
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
        .force-light-theme ion-segment {
          --background: white !important;
          background: white !important;
        }
        .force-light-theme ion-segment-button {
          --color: #6b7280 !important;
          --color-checked: #1f2937 !important;
          --background-checked: #f3f4f6 !important;
        }
        .white-bg {
          background: white !important;
        }
        .text-dark {
          color: #1f2937 !important;
        }
        table {
          background: white !important;
        }
        th, td {
          background: white !important;
          color: #1f2937 !important;
        }
      `}</style>

      <div className="min-h-screen bg-gray-50">

        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <IonButton
                  onClick={() => history.push('/home')}
                  fill="clear"
                  className="text-forest-green font-semibold"
                >
                  <IonIcon icon={arrowBack} className="mr-1" />
                  Volver
                </IonButton>
                <h1 className="text-2xl font-bold text-forest-green ml-4">
                  Panel de Administración
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <IonButton
                  onClick={handleExportData}
                  fill="outline"
                  className="border-forest-green text-forest-green"
                >
                  <IonIcon icon={downloadOutline} className="mr-2" />
                  Exportar
                </IonButton>
                <IonButton
                  onClick={() => setIsLoading(true)}
                  className="bg-mint-green text-forest-green font-semibold"
                >
                  <IonIcon icon={refreshOutline} className="mr-2" />
                  Actualizar
                </IonButton>
              </div>
            </div>
          </div>
        </div>

        {/* Segment Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <IonSegment value={activeSegment} onIonChange={handleSegmentChange}>
              <IonSegmentButton value="dashboard">
                <IonIcon icon={analyticsOutline} className="mr-2" />
                <IonLabel>Dashboard</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="inventory">
                <IonIcon icon={cubeOutline} className="mr-2" />
                <IonLabel>Inventario</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="orders">
                <IonIcon icon={bagHandleOutline} className="mr-2" />
                <IonLabel>Pedidos</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="customers">
                <IonIcon icon={peopleOutline} className="mr-2" />
                <IonLabel>Clientes</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">

          {/* Dashboard Segment */}
          {activeSegment === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <IonCard className="rounded-2xl shadow-lg white-bg">
                  <IonCardContent className="p-6 white-bg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Ventas Totales</p>
                        <p className="text-2xl font-bold text-forest-green">${dashboardStats.totalSales.toLocaleString()}</p>
                        <div className="flex items-center mt-1">
                          <IonIcon icon={trendingUpOutline} className="text-green-500 mr-1" />
                          <span className="text-sm text-green-600">+{dashboardStats.monthlyGrowth}%</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <IonIcon icon={cashOutline} className="text-2xl text-green-600" />
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>

                <IonCard className="rounded-2xl shadow-lg white-bg">
                  <IonCardContent className="p-6 white-bg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Pedidos Totales</p>
                        <p className="text-2xl font-bold text-forest-green">{dashboardStats.totalOrders}</p>
                        <div className="flex items-center mt-1">
                          <IonBadge color="warning">{dashboardStats.pendingOrders} pendientes</IonBadge>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <IonIcon icon={bagHandleOutline} className="text-2xl text-blue-600" />
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>

                <IonCard className="rounded-2xl shadow-lg white-bg">
                  <IonCardContent className="p-6 white-bg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Productos</p>
                        <p className="text-2xl font-bold text-forest-green">{dashboardStats.totalProducts}</p>
                        <div className="flex items-center mt-1">
                          <IonBadge color="danger">{dashboardStats.lowStock} bajo stock</IonBadge>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <IonIcon icon={cubeOutline} className="text-2xl text-purple-600" />
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>

                <IonCard className="rounded-2xl shadow-lg white-bg">
                  <IonCardContent className="p-6 white-bg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Clientes</p>
                        <p className="text-2xl font-bold text-forest-green">{dashboardStats.totalCustomers}</p>
                        <div className="flex items-center mt-1">
                          <IonIcon icon={trendingUpOutline} className="text-green-500 mr-1" />
                          <span className="text-sm text-green-600">+8.2%</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <IonIcon icon={peopleOutline} className="text-2xl text-orange-600" />
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <IonCard className="rounded-2xl shadow-lg white-bg">
                  <IonCardHeader className="bg-gradient-to-r from-mint-green to-lime-green text-forest-green rounded-t-2xl">
                    <IonCardTitle className="flex items-center text-forest-green">
                      <IonIcon icon={alertCircleOutline} className="mr-3 text-2xl" />
                      Alertas de Inventario
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent className="p-6 white-bg">
                    <div className="space-y-4">
                      {inventory.filter(item => item.status !== 'in_stock').map(item => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                          <div>
                            <p className="font-semibold text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-600">Stock: {item.stock} unidades</p>
                          </div>
                          <IonBadge color={getStatusColor(item.status)}>
                            {getStatusText(item.status)}
                          </IonBadge>
                        </div>
                      ))}
                    </div>
                  </IonCardContent>
                </IonCard>

                <IonCard className="rounded-2xl shadow-lg white-bg">
                  <IonCardHeader className="bg-gradient-to-r from-soft-green to-mint-green text-forest-green rounded-t-2xl">
                    <IonCardTitle className="flex items-center text-forest-green">
                      <IonIcon icon={timeOutline} className="mr-3 text-2xl" />
                      Pedidos Recientes
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent className="p-6 white-bg">
                    <div className="space-y-4">
                      {recentOrders.map(order => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-semibold text-gray-800">Pedido #{order.id}</p>
                            <p className="text-sm text-gray-600">{order.customer} - ${order.amount}</p>
                          </div>
                          <IonBadge color={getStatusColor(order.status)}>
                            {getStatusText(order.status)}
                          </IonBadge>
                        </div>
                      ))}
                    </div>
                  </IonCardContent>
                </IonCard>
              </div>
            </div>
          )}

          {/* Inventory Segment */}
          {activeSegment === 'inventory' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-forest-green">Gestión de Inventario</h2>
                <IonButton
                  onClick={handleAddProduct}
                  className="bg-mint-green text-forest-green font-semibold"
                >
                  <IonIcon icon={addOutline} className="mr-2" />
                  Agregar Producto
                </IonButton>
              </div>

              <IonCard className="rounded-2xl shadow-lg white-bg">
                <IonCardContent className="p-0 white-bg">
                  <div className="p-4 border-b border-gray-200 white-bg">
                    <IonSearchbar
                      placeholder="Buscar productos..."
                      className="custom-searchbar white-bg"
                    />
                  </div>

                  <div className="overflow-x-auto white-bg">
                    <table className="w-full white-bg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Producto
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Categoría
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Precio
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stock
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {inventory.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50 white-bg">
                            <td className="px-6 py-4 whitespace-nowrap white-bg">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                  <div className="text-sm text-gray-500">{product.sku}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap white-bg">
                              <div className="text-sm text-gray-900">{product.category}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap white-bg">
                              <div className="text-sm font-medium text-gray-900">${product.price}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap white-bg">
                              <div className="text-sm text-gray-900">{product.stock} unidades</div>
                              {product.stock <= product.minStock && (
                                <div className="text-xs text-red-600">Mín: {product.minStock}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap white-bg">
                              <IonBadge color={getStatusColor(product.status)}>
                                {getStatusText(product.status)}
                              </IonBadge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium white-bg">
                              <div className="flex space-x-2">
                                <IonButton
                                  fill="clear"
                                  size="small"
                                  onClick={() => handleEditProduct(product)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <IonIcon icon={pencilOutline} />
                                </IonButton>
                                <IonButton
                                  fill="clear"
                                  size="small"
                                  className="text-green-600 hover:text-green-900"
                                >
                                  <IonIcon icon={eyeOutline} />
                                </IonButton>
                                <IonButton
                                  fill="clear"
                                  size="small"
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <IonIcon icon={trashOutline} />
                                </IonButton>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </IonCardContent>
              </IonCard>
            </div>
          )}

          {/* Orders Segment */}
          {activeSegment === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-forest-green">Gestión de Pedidos</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentOrders.map((order) => (
                  <IonCard key={order.id} className="rounded-2xl shadow-lg white-bg">
                    <IonCardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-2xl">
                      <div className="flex justify-between items-start">
                        <div>
                          <IonCardTitle className="text-gray-800">Pedido #{order.id}</IonCardTitle>
                          <p className="text-sm text-gray-600 mt-1">{order.date}</p>
                        </div>
                        <IonBadge color={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </IonBadge>
                      </div>
                    </IonCardHeader>
                    <IonCardContent className="p-4 white-bg">
                      <div className="space-y-3">
                        <div>
                          <p className="font-semibold text-gray-800">{order.customer}</p>
                          <p className="text-sm text-gray-600">{order.items} producto(s)</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-forest-green">${order.amount}</span>
                          <div className="flex space-x-2">
                            <IonButton size="small" fill="outline">
                              <IonIcon icon={eyeOutline} />
                            </IonButton>
                            <IonButton size="small" className="bg-mint-green text-forest-green">
                              <IonIcon icon={checkmarkCircleOutline} />
                            </IonButton>
                          </div>
                        </div>
                      </div>
                    </IonCardContent>
                  </IonCard>
                ))}
              </div>
            </div>
          )}

          {/* Customers Segment */}
          {activeSegment === 'customers' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-forest-green">Gestión de Clientes</h2>

              <IonCard className="rounded-2xl shadow-lg white-bg">
                <IonCardContent className="p-6 white-bg">
                  <div className="text-center py-12">
                    <IonIcon icon={peopleOutline} className="text-6xl text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Gestión de Clientes
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Esta sección está en desarrollo. Próximamente podrás gestionar toda la información de tus clientes.
                    </p>
                    <IonButton className="bg-mint-green text-forest-green">
                      <IonIcon icon={addOutline} className="mr-2" />
                      Agregar Cliente
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            </div>
          )}
        </div>
      </div>

      {/* Modal para Agregar/Editar Producto */}
      <IonModal isOpen={showProductModal} onDidDismiss={() => setShowProductModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              {selectedProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
            </IonTitle>
            <IonButton slot="end" fill="clear" onClick={() => setShowProductModal(false)}>
              Cerrar
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding force-light-theme">
          <div className="space-y-4">
            <IonItem className="white-bg">
              <IonLabel position="stacked">Nombre del Producto</IonLabel>
              <IonInput
                value={selectedProduct?.name || ''}
                placeholder="Ej: Sneakers Urbanos"
                className="white-bg"
              />
            </IonItem>

            <IonItem className="white-bg">
              <IonLabel position="stacked">SKU</IonLabel>
              <IonInput
                value={selectedProduct?.sku || ''}
                placeholder="Ej: SNK-001"
                className="white-bg"
              />
            </IonItem>

            <IonItem className="white-bg">
              <IonLabel position="stacked">Categoría</IonLabel>
              <IonSelect value={selectedProduct?.category || 'Calzado'} className="white-bg">
                <IonSelectOption value="Calzado">Calzado</IonSelectOption>
                <IonSelectOption value="Perfume">Perfume</IonSelectOption>
                <IonSelectOption value="Deportivo">Deportivo</IonSelectOption>
                <IonSelectOption value="Formal">Formal</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem className="white-bg">
              <IonLabel position="stacked">Precio</IonLabel>
              <IonInput
                type="number"
                value={selectedProduct?.price || ''}
                placeholder="0.00"
                className="white-bg"
              />
            </IonItem>

            <IonItem className="white-bg">
              <IonLabel position="stacked">Stock</IonLabel>
              <IonInput
                type="number"
                value={selectedProduct?.stock || ''}
                placeholder="0"
                className="white-bg"
              />
            </IonItem>

            <IonItem className="white-bg">
              <IonLabel position="stacked">Stock Mínimo</IonLabel>
              <IonInput
                type="number"
                value={selectedProduct?.minStock || ''}
                placeholder="0"
                className="white-bg"
              />
            </IonItem>
          </div>
        </IonContent>
        <IonFooter>
          <IonToolbar>
            <div className="px-4 py-3 flex justify-end space-x-3">
              <IonButton
                fill="outline"
                onClick={() => setShowProductModal(false)}
              >
                Cancelar
              </IonButton>
              <IonButton
                onClick={handleSaveProduct}
                className="bg-mint-green text-forest-green"
              >
                {selectedProduct ? 'Actualizar' : 'Agregar'} Producto
              </IonButton>
            </div>
          </IonToolbar>
        </IonFooter>
      </IonModal>

      <IonLoading
        isOpen={isLoading}
        message={'Procesando...'}
        duration={0}
      />
    </IonContent>
  );
};

export default Admin;