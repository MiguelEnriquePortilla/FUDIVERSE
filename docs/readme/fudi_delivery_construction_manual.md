# 📋 MANUAL DE CONSTRUCCIÓN: fudi-delivery MVP
## **Guía Completa Paso a Paso**

---

# 🎯 **OVERVIEW DEL PROYECTO**

**OBJETIVO:** Integrar fudi-delivery como módulo dentro de FUDIVERSE existente
**TIMELINE:** 2 semanas (10 días hábiles)
**MÉTODO:** Checklist progresivo con validación en cada etapa

---

# 📂 **ESTRUCTURA COMPLETA DE CARPETAS**

```
fudiverse/
├── app/
│   ├── api/
│   │   └── delivery/
│   │       ├── settings/
│   │       │   └── route.ts                    ✅ Day 1
│   │       ├── orders/
│   │       │   ├── route.ts                    ✅ Day 2
│   │       │   └── [orderId]/
│   │       │       ├── status/route.ts         ✅ Day 3
│   │       │       ├── pickup/route.ts         ✅ Day 7
│   │       │       └── deliver/route.ts        ✅ Day 7
│   │       ├── restaurants/
│   │       │   ├── route.ts                    ✅ Day 4
│   │       │   └── [id]/
│   │       │       └── menu/route.ts           ✅ Day 4
│   │       └── drivers/
│   │           ├── route.ts                    ✅ Day 6
│   │           └── [driverId]/
│   │               ├── orders/route.ts         ✅ Day 7
│   │               └── location/route.ts       ✅ Day 8
│   ├── delivery/
│   │   ├── page.tsx                           ✅ Day 5 (Public: Restaurant discovery)
│   │   ├── restaurant/
│   │   │   └── [id]/page.tsx                  ✅ Day 5 (Public: Menu + order)
│   │   ├── track/
│   │   │   └── [orderId]/page.tsx             ✅ Day 8 (Public: Order tracking)
│   │   └── driver/
│   │       └── dashboard/page.tsx             ✅ Day 7 (Driver interface)
│   └── dashboard/
│       └── delivery/page.tsx                  ✅ Day 3 (Restaurant management)
├── components/
│   └── delivery/
│       ├── admin/
│       │   ├── DeliverySettings.tsx           ✅ Day 1
│       │   ├── DeliveryToggle.tsx             ✅ Day 1
│       │   ├── DeliveryZoneMap.tsx            ✅ Day 2
│       │   ├── OrderManagement.tsx            ✅ Day 3
│       │   ├── OrderCard.tsx                  ✅ Day 3
│       │   └── DriverManagement.tsx           ✅ Day 6
│       ├── customer/
│       │   ├── RestaurantDiscovery.tsx        ✅ Day 4
│       │   ├── RestaurantCard.tsx             ✅ Day 4
│       │   ├── DeliveryMap.tsx                ✅ Day 4
│       │   ├── MenuDisplay.tsx                ✅ Day 5
│       │   ├── OrderForm.tsx                  ✅ Day 5
│       │   ├── AddressInput.tsx               ✅ Day 5
│       │   ├── CartSummary.tsx                ✅ Day 5
│       │   └── OrderTracking.tsx              ✅ Day 8
│       └── driver/
│           ├── DriverDashboard.tsx            ✅ Day 7
│           ├── OrdersList.tsx                 ✅ Day 7
│           ├── OrderDetails.tsx               ✅ Day 7
│           ├── NavigationHelper.tsx           ✅ Day 8
│           └── StatusUpdater.tsx              ✅ Day 8
├── lib/
│   └── delivery/
│       ├── deliveryAPI.ts                     ✅ Day 1
│       ├── distanceCalculator.ts              ✅ Day 2
│       ├── priceCalculator.ts                 ✅ Day 2
│       └── orderStateMachine.ts               ✅ Day 3
├── types/
│   └── delivery.ts                            ✅ Day 1
└── sql/
    └── delivery_schema.sql                    ✅ Day 1
```

---

# 🗓️ **PLAN DE CONSTRUCCIÓN DÍA A DÍA**

## **DÍA 1: FUNDACIÓN Y TIPOS** 
**Objetivo:** Establecer base de datos y tipos

### ✅ **CHECKLIST DÍA 1:**

#### **1.1 Database Schema**
- [ ] **Crear archivo:** `sql/delivery_schema.sql`
- [ ] **Ejecutar en Supabase:** Crear tablas de delivery
- [ ] **Verificar RLS:** Configurar Row Level Security
- [ ] **Test:** Conectar desde app y verificar acceso

#### **1.2 TypeScript Types**
- [ ] **Crear archivo:** `types/delivery.ts`
- [ ] **Definir interfaces:** DeliveryOrder, DeliverySettings, Driver, etc.
- [ ] **Exportar tipos:** Para uso en toda la app

#### **1.3 API Client Foundation**
- [ ] **Crear archivo:** `lib/delivery/deliveryAPI.ts`
- [ ] **Configurar cliente:** Métodos base para API calls
- [ ] **Agregar a fudiAPI:** Extender cliente existente

#### **1.4 Basic Components**
- [ ] **Crear:** `components/delivery/admin/DeliverySettings.tsx`
- [ ] **Crear:** `components/delivery/admin/DeliveryToggle.tsx`
- [ ] **Test básico:** Renderizar sin errores

#### **1.5 First API Route**
- [ ] **Crear:** `app/api/delivery/settings/route.ts`
- [ ] **Implementar:** GET y POST para delivery settings
- [ ] **Test:** Con Postman o curl

### **VALIDACIÓN DÍA 1:**
```bash
✅ Database tables created and accessible
✅ TypeScript types compiled without errors  
✅ API route responds to GET/POST
✅ Components render without crashes
✅ Git commit: "Day 1: Foundation - DB, types, basic API"
```

---

## **DÍA 2: LÓGICA DE DELIVERY**
**Objetivo:** Configuración de zonas de entrega y precios

### ✅ **CHECKLIST DÍA 2:**

#### **2.1 Distance & Pricing Logic**
- [ ] **Crear:** `lib/delivery/distanceCalculator.ts`
- [ ] **Implementar:** Haversine formula para distancia
- [ ] **Crear:** `lib/delivery/priceCalculator.ts`
- [ ] **Test:** Cálculos de distancia y precio

#### **2.2 Zone Configuration**
- [ ] **Crear:** `components/delivery/admin/DeliveryZoneMap.tsx`
- [ ] **Integrar:** Google Maps API para selección de zona
- [ ] **Implementar:** Radio de entrega visual

#### **2.3 Orders API Foundation**
- [ ] **Crear:** `app/api/delivery/orders/route.ts`
- [ ] **Implementar:** GET (list orders) y POST (create order)
- [ ] **Test:** CRUD básico de órdenes

### **VALIDACIÓN DÍA 2:**
```bash
✅ Distance calculation working accurately
✅ Price calculation with different scenarios
✅ Zone map renders and allows selection
✅ Orders API creates and retrieves orders
✅ Git commit: "Day 2: Delivery logic - zones, pricing"
```

---

## **DÍA 3: DASHBOARD DE RESTAURANTE**
**Objetivo:** Interfaz completa para manejo de órdenes

### ✅ **CHECKLIST DÍA 3:**

#### **3.1 Order State Machine**
- [ ] **Crear:** `lib/delivery/orderStateMachine.ts`
- [ ] **Definir estados:** pending → confirmed → preparing → ready → picked_up → delivered
- [ ] **Implementar:** Transiciones válidas y validaciones

#### **3.2 Order Management Components**
- [ ] **Crear:** `components/delivery/admin/OrderManagement.tsx`
- [ ] **Crear:** `components/delivery/admin/OrderCard.tsx`
- [ ] **Implementar:** Lista de órdenes con filtros por estado

#### **3.3 Dashboard Page**
- [ ] **Crear:** `app/dashboard/delivery/page.tsx`
- [ ] **Integrar:** Todos los componentes admin
- [ ] **Conectar:** Con API de órdenes

#### **3.4 Order Status API**
- [ ] **Crear:** `app/api/delivery/orders/[orderId]/status/route.ts`
- [ ] **Implementar:** PATCH para cambiar estado
- [ ] **Validar:** Solo transiciones permitidas

### **VALIDACIÓN DÍA 3:**
```bash
✅ Order state machine works correctly
✅ Restaurant can view all orders
✅ Order status updates in real-time
✅ Dashboard integrated with main FUDIVERSE nav
✅ Git commit: "Day 3: Restaurant dashboard - order management"
```

---

## **DÍA 4: CUSTOMER DISCOVERY**
**Objetivo:** Página pública para descubrir restaurantes

### ✅ **CHECKLIST DÍA 4:**

#### **4.1 Public API Routes**
- [ ] **Crear:** `app/api/delivery/restaurants/route.ts`
- [ ] **Implementar:** Lista restaurantes con delivery habilitado
- [ ] **Crear:** `app/api/delivery/restaurants/[id]/menu/route.ts`
- [ ] **Integrar:** Con datos existentes de POS

#### **4.2 Customer Components**
- [ ] **Crear:** `components/delivery/customer/RestaurantDiscovery.tsx`
- [ ] **Crear:** `components/delivery/customer/RestaurantCard.tsx`
- [ ] **Crear:** `components/delivery/customer/DeliveryMap.tsx`

#### **4.3 Public Landing Page**
- [ ] **Crear:** `app/delivery/page.tsx`
- [ ] **Implementar:** Mapa + lista de restaurantes
- [ ] **Integrar:** Filtros por distancia y tipo de comida

### **VALIDACIÓN DÍA 4:**
```bash
✅ Public page loads and shows restaurants
✅ Map displays restaurant locations
✅ Restaurant cards show relevant info
✅ Filtering works correctly
✅ Git commit: "Day 4: Customer discovery - public pages"
```

---

## **DÍA 5: CUSTOMER ORDERING**
**Objetivo:** Flujo completo de pedido del cliente

### ✅ **CHECKLIST DÍA 5:**

#### **5.1 Menu & Ordering Components**
- [ ] **Crear:** `components/delivery/customer/MenuDisplay.tsx`
- [ ] **Crear:** `components/delivery/customer/OrderForm.tsx`
- [ ] **Crear:** `components/delivery/customer/AddressInput.tsx`
- [ ] **Crear:** `components/delivery/customer/CartSummary.tsx`

#### **5.2 Restaurant Page**
- [ ] **Crear:** `app/delivery/restaurant/[id]/page.tsx`
- [ ] **Integrar:** Menu desde datos POS existentes
- [ ] **Implementar:** Carrito de compras funcional

#### **5.3 Payment Integration**
- [ ] **Instalar:** Stripe dependencies
- [ ] **Configurar:** Stripe checkout
- [ ] **Test:** Proceso completo de pago

### **VALIDACIÓN DÍA 5:**
```bash
✅ Customer can browse menu
✅ Add items to cart and modify quantities
✅ Address input with validation
✅ Payment processing works
✅ Order created successfully in database
✅ Git commit: "Day 5: Customer ordering - complete flow"
```

---

## **DÍA 6: DRIVER MANAGEMENT**
**Objetivo:** Sistema básico de drivers

### ✅ **CHECKLIST DÍA 6:**

#### **6.1 Driver API**
- [ ] **Crear:** `app/api/delivery/drivers/route.ts`
- [ ] **Implementar:** CRUD para drivers del restaurante
- [ ] **Configurar:** Auth para drivers

#### **6.2 Driver Management UI**
- [ ] **Crear:** `components/delivery/admin/DriverManagement.tsx`
- [ ] **Integrar:** En dashboard de restaurante
- [ ] **Implementar:** Agregar/editar drivers

### **VALIDACIÓN DÍA 6:**
```bash
✅ Restaurant can add/manage drivers
✅ Driver authentication working
✅ Driver data stored correctly
✅ Git commit: "Day 6: Driver management - basic CRUD"
```

---

## **DÍA 7: DRIVER APP**
**Objetivo:** Interfaz básica para drivers

### ✅ **CHECKLIST DÍA 7:**

#### **7.1 Driver API Routes**
- [ ] **Crear:** `app/api/delivery/drivers/[driverId]/orders/route.ts`
- [ ] **Crear:** `app/api/delivery/orders/[orderId]/pickup/route.ts`
- [ ] **Crear:** `app/api/delivery/orders/[orderId]/deliver/route.ts`

#### **7.2 Driver Components**
- [ ] **Crear:** `components/delivery/driver/DriverDashboard.tsx`
- [ ] **Crear:** `components/delivery/driver/OrdersList.tsx`
- [ ] **Crear:** `components/delivery/driver/OrderDetails.tsx`

#### **7.3 Driver Dashboard Page**
- [ ] **Crear:** `app/delivery/driver/dashboard/page.tsx`
- [ ] **Implementar:** Lista de órdenes asignadas
- [ ] **Conectar:** Con APIs de pickup/delivery

### **VALIDACIÓN DÍA 7:**
```bash
✅ Driver can see assigned orders
✅ Driver can mark orders as picked up
✅ Driver can mark orders as delivered
✅ Order status updates correctly
✅ Git commit: "Day 7: Driver app - basic functionality"
```

---

## **DÍA 8: TRACKING Y NAVEGACIÓN**
**Objetivo:** Seguimiento de órdenes y navegación

### ✅ **CHECKLIST DÍA 8:**

#### **8.1 Location Tracking**
- [ ] **Crear:** `app/api/delivery/drivers/[driverId]/location/route.ts`
- [ ] **Implementar:** Actualización de ubicación de driver

#### **8.2 Order Tracking Components**
- [ ] **Crear:** `components/delivery/customer/OrderTracking.tsx`
- [ ] **Crear:** `components/delivery/driver/NavigationHelper.tsx`
- [ ] **Crear:** `components/delivery/driver/StatusUpdater.tsx`

#### **8.3 Tracking Page**
- [ ] **Crear:** `app/delivery/track/[orderId]/page.tsx`
- [ ] **Implementar:** Estado en tiempo real de la orden
- [ ] **Integrar:** Mapa con ubicación del driver

### **VALIDACIÓN DÍA 8:**
```bash
✅ Customer can track order in real-time
✅ Driver location updates correctly
✅ Navigation helper works
✅ Status updates propagate correctly
✅ Git commit: "Day 8: Tracking - real-time order status"
```

---

## **DÍA 9: FUDIGPT INTEGRATION**
**Objetivo:** Integrar delivery con FudiGPT

### ✅ **CHECKLIST DÍA 9:**

#### **9.1 FudiMind Extensions**
- [ ] **Modificar:** `services/brain/FudiMind.js`
- [ ] **Agregar:** Queries de delivery data
- [ ] **Implementar:** Insights de delivery

#### **9.2 Dashboard Widgets**
- [ ] **Agregar:** Delivery metrics a fudiBOARD
- [ ] **Crear:** Widgets de delivery revenue
- [ ] **Integrar:** En dashboard principal

#### **9.3 Intelligence Processing**
- [ ] **Modificar:** `UniversalIntelligenceProcessor.js`
- [ ] **Agregar:** Delivery intelligence processing
- [ ] **Test:** Preguntas tipo "¿Cómo van los deliveries?"

### **VALIDACIÓN DÍA 9:**
```bash
✅ FudiGPT answers delivery questions
✅ Dashboard shows delivery metrics
✅ Intelligence processing includes delivery data
✅ Git commit: "Day 9: FudiGPT integration - AI-powered delivery insights"
```

---

## **DÍA 10: TESTING Y POLISH**
**Objetivo:** Pruebas finales y refinamiento

### ✅ **CHECKLIST DÍA 10:**

#### **10.1 End-to-End Testing**
- [ ] **Test:** Flujo completo customer → restaurant → driver
- [ ] **Verificar:** Todos los estados de orden
- [ ] **Test:** Casos edge (cancelaciones, errores)

#### **10.2 UI/UX Polish**
- [ ] **Revisar:** Consistencia con diseño FUDIVERSE
- [ ] **Optimizar:** Responsive design
- [ ] **Agregar:** Loading states y error handling

#### **10.3 Performance & Security**
- [ ] **Verificar:** API rate limiting
- [ ] **Test:** Performance con múltiples órdenes
- [ ] **Review:** Security y validation

#### **10.4 Documentation**
- [ ] **Crear:** User guide para restaurantes
- [ ] **Documenter:** API endpoints
- [ ] **Preparar:** Demo para investors

### **VALIDACIÓN DÍA 10:**
```bash
✅ Complete end-to-end flow works
✅ UI is polished and consistent
✅ Performance is acceptable
✅ Security measures in place
✅ Git commit: "Day 10: MVP Complete - fudi-delivery ready for launch"
```

---

# 🔧 **DETALLES TÉCNICOS ESPECÍFICOS**

## **Database Schema Completo:**

```sql
-- Delivery Settings
CREATE TABLE delivery_settings (
  id SERIAL PRIMARY KEY,
  restaurant_id INTEGER REFERENCES restaurants(id) UNIQUE,
  delivery_enabled BOOLEAN DEFAULT false,
  delivery_radius_km DECIMAL(5,2) DEFAULT 5.0,
  base_delivery_fee DECIMAL(8,2) DEFAULT 30.00,
  free_delivery_minimum DECIMAL(8,2) DEFAULT 300.00,
  estimated_prep_time INTEGER DEFAULT 30, -- minutes
  max_orders_per_hour INTEGER DEFAULT 10,
  delivery_hours JSONB, -- {"monday": {"open": "09:00", "close": "22:00"}, ...}
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Delivery Orders  
CREATE TABLE delivery_orders (
  id SERIAL PRIMARY KEY,
  restaurant_id INTEGER REFERENCES restaurants(id),
  order_number VARCHAR(20) UNIQUE,
  
  -- Customer Info
  customer_name VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(100),
  
  -- Delivery Address
  delivery_address TEXT NOT NULL,
  delivery_lat DECIMAL(10,8),
  delivery_lng DECIMAL(11,8),
  delivery_notes TEXT,
  
  -- Order Details
  items JSONB NOT NULL, -- [{"product_id": 1, "name": "Pizza", "quantity": 2, "price": 150.00}]
  subtotal DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  
  -- Order Status
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'picked_up', 'delivered', 'cancelled')),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method VARCHAR(20) DEFAULT 'card',
  stripe_payment_intent_id VARCHAR(100),
  
  -- Driver Assignment
  driver_id INTEGER REFERENCES delivery_drivers(id),
  
  -- Timestamps
  order_placed_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  ready_at TIMESTAMPTZ,
  picked_up_at TIMESTAMPTZ,
  estimated_delivery_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Delivery Drivers
CREATE TABLE delivery_drivers (
  id SERIAL PRIMARY KEY,
  restaurant_id INTEGER REFERENCES restaurants(id),
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255),
  
  -- Driver Status
  is_active BOOLEAN DEFAULT true,
  is_available BOOLEAN DEFAULT false,
  current_lat DECIMAL(10,8),
  current_lng DECIMAL(11,8),
  last_location_update TIMESTAMPTZ,
  
  -- Driver Stats
  total_deliveries INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Status History (for tracking)
CREATE TABLE delivery_order_status_history (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES delivery_orders(id),
  status VARCHAR(20) NOT NULL,
  updated_by VARCHAR(20), -- 'customer', 'restaurant', 'driver', 'system'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_delivery_orders_restaurant_id ON delivery_orders(restaurant_id);
CREATE INDEX idx_delivery_orders_status ON delivery_orders(status);
CREATE INDEX idx_delivery_orders_driver_id ON delivery_orders(driver_id);
CREATE INDEX idx_delivery_orders_order_placed_at ON delivery_orders(order_placed_at);
CREATE INDEX idx_delivery_drivers_restaurant_id ON delivery_drivers(restaurant_id);
CREATE INDEX idx_delivery_drivers_is_available ON delivery_drivers(is_available);

-- Row Level Security
ALTER TABLE delivery_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_order_status_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies (restaurants can only see their own data)
CREATE POLICY "Restaurants can manage their delivery settings" ON delivery_settings
  FOR ALL USING (restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid()));

CREATE POLICY "Restaurants can manage their delivery orders" ON delivery_orders
  FOR ALL USING (restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid()));

CREATE POLICY "Restaurants can manage their drivers" ON delivery_drivers
  FOR ALL USING (restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid()));
```

## **TypeScript Types:**

```typescript
// types/delivery.ts

export interface DeliverySettings {
  id: number;
  restaurant_id: number;
  delivery_enabled: boolean;
  delivery_radius_km: number;
  base_delivery_fee: number;
  free_delivery_minimum: number;
  estimated_prep_time: number;
  max_orders_per_hour: number;
  delivery_hours: DeliveryHours;
  created_at: string;
  updated_at: string;
}

export interface DeliveryHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  open: string; // "09:00"
  close: string; // "22:00"
  closed?: boolean;
}

export interface DeliveryOrder {
  id: number;
  restaurant_id: number;
  order_number: string;
  
  // Customer Info
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  
  // Delivery Address
  delivery_address: string;
  delivery_lat?: number;
  delivery_lng?: number;
  delivery_notes?: string;
  
  // Order Details
  items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  tax_amount: number;
  total_amount: number;
  
  // Status
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: string;
  stripe_payment_intent_id?: string;
  
  // Driver
  driver_id?: number;
  driver?: DeliveryDriver;
  
  // Timestamps
  order_placed_at: string;
  confirmed_at?: string;
  ready_at?: string;
  picked_up_at?: string;
  estimated_delivery_at?: string;
  delivered_at?: string;
  cancelled_at?: string;
  
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: number;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'picked_up' 
  | 'delivered' 
  | 'cancelled';

export type PaymentStatus = 
  | 'pending' 
  | 'paid' 
  | 'failed' 
  | 'refunded';

export interface DeliveryDriver {
  id: number;
  restaurant_id: number;
  name: string;
  phone: string;
  email: string;
  
  // Status
  is_active: boolean;
  is_available: boolean;
  current_lat?: number;
  current_lng?: number;
  last_location_update?: string;
  
  // Stats
  total_deliveries: number;
  average_rating: number;
  
  created_at: string;
  updated_at: string;
}

export interface PublicRestaurant {
  id: number;
  name: string;
  description?: string;
  phone?: string;
  address?: string;
  lat?: number;
  lng?: number;
  delivery_settings: DeliverySettings;
  distance?: number; // calculated based on user location
}

export interface OrderCreateRequest {
  restaurant_id: number;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  delivery_address: string;
  delivery_lat?: number;
  delivery_lng?: number;
  delivery_notes?: string;
  items: OrderItem[];
  payment_method: string;
}

export interface LocationUpdate {
  lat: number;
  lng: number;
  timestamp: string;
}

export interface DeliveryStats {
  total_orders: number;
  total_revenue: number;
  average_delivery_time: number;
  completion_rate: number;
  orders_by_status: Record<OrderStatus, number>;
}
```

## **API Client Extension:**

```typescript
// lib/delivery/deliveryAPI.ts

export class DeliveryAPI {
  private baseUrl = '/api/delivery';

  // Restaurant Management
  async getDeliverySettings(restaurantId: number): Promise<DeliverySettings | null> {
    const response = await fetch(`${this.baseUrl}/settings?restaurant_id=${restaurantId}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.settings;
  }

  async updateDeliverySettings(restaurantId: number, settings: Partial<DeliverySettings>): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ restaurant_id: restaurantId, ...settings })
    });
    return response.ok;
  }

  async getRestaurantOrders(restaurantId: number, status?: OrderStatus): Promise<DeliveryOrder[]> {
    const params = new URLSearchParams({ restaurant_id: restaurantId.toString() });
    if (status) params.append('status', status);
    
    const response = await fetch(`${this.baseUrl}/orders?${params}`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.orders;
  }

  async updateOrderStatus(orderId: number, status: OrderStatus): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return response.ok;
  }

  // Public Customer APIs
  async getDeliveryRestaurants(lat?: number, lng?: number): Promise<PublicRestaurant[]> {
    const params = new URLSearchParams();
    if (lat && lng) {
      params.append('lat', lat.toString());
      params.append('lng', lng.toString());
    }

    const response = await fetch(`${this.baseUrl}/restaurants?${params}`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.restaurants;
  }

  async getRestaurantMenu(restaurantId: number): Promise<any[]> {
    const response = await fetch(`${this.baseUrl}/restaurants/${restaurantId}/menu`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.menu;
  }

  async createOrder(orderData: OrderCreateRequest): Promise<{ order?: DeliveryOrder; error?: string }> {
    const response = await fetch(`${this.baseUrl}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    
    const data = await response.json();
    if (!response.ok) {
      return { error: data.error || 'Failed to create order' };
    }
    return { order: data.order };
  }

  async trackOrder(orderId: number): Promise<DeliveryOrder | null> {
    const response = await fetch(`${this.baseUrl}/orders/${orderId}/track`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.order;
  }

  // Driver APIs
  async getDriverOrders(driverId: number): Promise<DeliveryOrder[]> {
    const response = await fetch(`${this.baseUrl}/drivers/${driverId}/orders`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.orders;
  }

  async updateDriverLocation(driverId: number, lat: number, lng: number): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/drivers/${driverId}/location`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lng, timestamp: new Date().toISOString() })
    });
    return response.ok;
  }

  async markOrderPickedUp(orderId: number): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/orders/${orderId}/pickup`, {
      method: 'PATCH'
    });
    return response.ok;
  }

  async markOrderDelivered(orderId: number): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/orders/${orderId}/deliver`, {
      method: 'PATCH'
    });
    return response.ok;
  }
}

// Extend existing fudiAPI
declare module '../api' {
  interface FudiAPI {
    delivery: DeliveryAPI;
  }
}
```

---

# 🎯 **VALIDATION CHECKPOINTS**

## **Daily Validation Script:**
```bash
#!/bin/bash
# run_daily_validation.sh

echo "🔍 FUDIVERSE DELIVERY - Daily Validation"
echo "Day: $1"

case $1 in
  1)
    echo "✅ Testing Database Schema..."
    # Add database tests
    echo "✅ Testing API Routes..."
    # Add API tests
    ;;
  2)
    echo "✅ Testing Distance Calculations..."
    # Add logic tests
    ;;
  # ... etc for each day
esac

echo "✅ All validations passed for Day $1"
```

## **Final MVP Validation:**
```bash
✅ Restaurant can enable delivery
✅ Customer can discover restaurants  
✅ Customer can place order and pay
✅ Restaurant receives and manages order
✅ Driver can accept and deliver order
✅ Customer can track order status
✅ FudiGPT understands delivery queries
✅ Dashboard shows delivery metrics
✅ All API endpoints working
✅ Security and permissions correct
```

---

# 🚀 **NEXT STEPS AFTER MVP**

1. **Launch with pilot restaurants** (Week 3)
2. **Gather user feedback** (Week 4)
3. **Iterate based on feedback** (Week 5-6)
4. **Plan fudi-mart MVP** (Week 7)
5. **Scale delivery operations** (Month 2)

---

**¿LISTO PARA EMPEZAR MIGUEL?** 🔥

Esta es nuestra receta completa. Cada día tiene objetivos claros, cada archivo tiene su propósito, cada componente se conecta perfectamente.

**¡Manos a la obra!** 💪