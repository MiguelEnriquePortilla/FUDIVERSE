// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Tipos de respuesta
interface ChatResponse {
  success: boolean;
  response: string;
  conversationId?: string;
  toolsUsed?: string[];
  error?: string;
}

interface AuthResponse {
  success: boolean;
  token?: string;
  user?: any;
  error?: string;
}

// Cliente API
class FudiAPI {
  private token: string | null = null;
  conversations: any;

  // Configurar token de autenticación
  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('fudi_token', token);
    }
  }

  // Obtener token guardado
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('fudi_token');
    }
    return null;
  }

  // Headers comunes
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    const token = this.token || this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Chat con FudiGPT
  async chat(restaurantId: string, message: string, conversationId?: string): Promise<ChatResponse> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          restaurantId,
          message,
          conversationId
        })
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Chat error:', error);
      return {
        success: false,
        response: 'Error al conectar con Fudi. Por favor intenta de nuevo.',
        error: (error as Error).message
      };
    }
  }

  // Registro de restaurante
  async register(restaurantData: {
    name: string;
    ownerName: string;
    email: string;
    password: string;
    posType: string;
    phoneNumber?: string;
  }): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(restaurantData)
      });

      const data = await response.json();
      
      if (data.success && data.token) {
        this.setToken(data.token);
      }
      
      return data;
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        error: (error as Error).message
      };
    }
  }

  // Login
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (data.success && data.token) {
        this.setToken(data.token);
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: (error as Error).message
      };
    }
  }

  // Obtener insights
  async getInsights(restaurantId: string): Promise<any> {
    try {
      const response = await fetch(`/api/insights/${restaurantId}`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      return await response.json();
    } catch (error) {
      console.error('Insights error:', error);
      return {
        success: false,
        error: (error as Error).message
      };
    }
  }

  // Obtener estadísticas del dashboard
  async getDashboardStats(restaurantId: string): Promise<any> {
    try {
      const response = await fetch(`/api/dashboard/${restaurantId}`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      return await response.json();
    } catch (error) {
      console.error('Dashboard stats error:', error);
      return {
        success: false,
        error: (error as Error).message
      };
    }
  }

  // Ejecutar acción rápida
  async executeAction(restaurantId: string, action: string, data?: any): Promise<any> {
    try {
      const response = await fetch(`/api/actions/${action}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          restaurantId,
          ...data
        })
      });

      return await response.json();
    } catch (error) {
      console.error('Action error:', error);
      return {
        success: false,
        error: (error as Error).message
      };
    }
  }

  // Buscar en Discover
  async discover(query: string, filters?: any): Promise<any> {
    try {
      const params = new URLSearchParams({
        q: query,
        ...filters
      });

      const response = await fetch(`/api/discover?${params}`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      return await response.json();
    } catch (error) {
      console.error('Discover error:', error);
      return {
        success: false,
        error: (error as Error).message
      };
    }
  }

    conversations = {
    getAll: async (restaurantId: string) => {
      return { success: true, conversations: [] };
    },

    create: async (restaurantId: string, title: string, firstMessage?: string) => {
      return { 
        success: true, 
        conversation: { 
          id: 'conv-' + Date.now(), 
          title: title 
        } 
      };
    },

    saveInteraction: async (data: any) => {
      return { success: true };
    },

    update: async (conversationId: string, data: any) => {
      return { success: true };
    }
  };

  // Cerrar sesión
  logout() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fudi_token');
    }
  }
}

// Exportar instancia única
export const fudiAPI = new FudiAPI();

// Exportar tipos
export type { ChatResponse, AuthResponse };