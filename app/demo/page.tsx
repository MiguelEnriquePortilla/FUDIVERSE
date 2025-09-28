'use client';

import { useState, useEffect } from 'react';
import { 
  Calendar, Clock, MapPin, Users, Utensils, TrendingUp,
  Brain, MessageSquare, BarChart3, CheckCircle, Play,
  Globe, ChevronDown, Send, Sparkles
} from 'lucide-react';
import { fudiAPI } from '@/lib/api';

// Nuestros módulos limpios
import { FudiBackground } from '@/components/fudiverse/FudiBackground';
import { FudiButton } from '@/components/fudiverse/FudiButton';
import { FudiCard } from '@/components/fudiverse/FudiCard';
import { FudiHeader } from '@/components/fudiverse/FudiHeader';

// Import del CSS separado y minimalista
import '@/styles/pages/fudi.demo.css';

// Tipos para el formulario
interface DemoForm {
  restaurantName: string;
  ownerName: string;
  email: string;
  phone: string;
  country: string;
  currentPOS: string;
  monthlyRevenue: string;
  locations: string;
  painPoints: string[];
  preferredLanguage: 'es' | 'en';
  demoDate: string;
  demoTime: string;
}

// Tipos para mensajes del chat
interface ChatMessage {
  type: 'user' | 'fudi';
  content: string;
}

// Mensajes bilingües
const messages = {
  es: {
    hero: {
      title: "DEJA QUE TUS DATOS HABLEN POR SÍ MISMOS",
      subtitle: "Reserva tu demo personalizado y descubre cómo FUDI transforma tu restaurante con la inteligencia artificial más avanzada del mundo!"
    },
    demo: {
      title: "Mira cómo funciona",
      userQ1: "¿Cómo me fue ayer?",
      fudiA1: "$3,200 en ventas - 15% arriba del promedio de martes. Tu nuevo combo de almuerzo impulsó las ventas: se vendió 89 veces vs 34 la semana pasada.",
      userQ2: "¿Cuáles son mis próximas entregas programadas?",
      fudiA2: "Tienes 3 entregas hoy: Proveedor López a las 2pm (verduras), Carnes Premium a las 4pm (carne), y Lácteos del Valle a las 6pm. El proveedor López suele llegar 20 minutos tarde.",
      userQ3: "¿Cuál es mi platillo más rentable?",
      fudiA3: "Tacos de carnitas: 67% margen de ganancia, 156 vendidos semanalmente. Promuévelos durante 7-9pm cuando los márgenes importan más."
    },
    form: {
      title: "Escribe tu historia de éxito con FUDIGPT!",
      restaurantName: "Nombre del Restaurante",
      ownerName: "Tu Nombre",
      email: "Email",
      phone: "Teléfono",
      country: "País",
      currentPOS: "Sistema POS Actual",
      monthlyRevenue: "Ingresos Mensuales (Aprox)",
      locations: "Número de Sucursales",
      painPoints: "Principales Desafíos (selecciona varios)",
      demoDate: "Fecha Preferida",
      demoTime: "Hora Preferida",
      submit: "Agendar Demo Gratis"
    }
  },
  en: {
    hero: {
      title: "LET YOUR DATA SPEAK FOR ITSELF",
      subtitle: "Book your personalized demo and discover how FUDI transforms your restaurant with the world's most advanced artificial intelligence!"
    },
    demo: {
      title: "See how it works",
      userQ1: "How did I do yesterday?",
      fudiA1: "$3,200 in sales - 15% above Tuesday average. Your new lunch combo drove sales: sold 89 times vs 34 last week.",
      userQ2: "What are my upcoming scheduled deliveries?",
      fudiA2: "You have 3 deliveries today: López Supplier at 2pm (vegetables), Premium Meats at 4pm (meat), and Valley Dairy at 6pm. López usually runs 20 minutes late.",
      userQ3: "What's my most profitable dish?",
      fudiA3: "Carnitas tacos: 67% profit margin, 156 sold weekly. Push them during 7-9pm when margins matter most."
    },
    form: {
      title: "YOU WRITE YOUR SUCCESS STORY WITH FUDIGPT!",
      restaurantName: "Restaurant Name",
      ownerName: "Your Name",
      email: "Email",
      phone: "Phone",
      country: "Country",
      currentPOS: "Current POS System",
      monthlyRevenue: "Monthly Revenue (Approx)",
      locations: "Number of Locations",
      painPoints: "Main Challenges (select multiple)",
      demoDate: "Preferred Date",
      demoTime: "Preferred Time",
      submit: "Schedule Free Demo"
    }
  }
};

const painPointsOptions = {
  es: [
    "Control de inventario",
    "Análisis de ventas",
    "Gestión de personal",
    "Control de costos",
    "Desperdicios de comida",
    "Reportes financieros"
  ],
  en: [
    "Inventory control",
    "Sales analysis", 
    "Staff management",
    "Cost control",
    "Food waste",
    "Financial reporting"
  ]
};

export default function DemoPage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  const [form, setForm] = useState<DemoForm>({
    restaurantName: '',
    ownerName: '',
    email: '',
    phone: '',
    country: '',
    currentPOS: '',
    monthlyRevenue: '',
    locations: '',
    painPoints: [],
    preferredLanguage: 'es',
    demoDate: '',
    demoTime: ''
  });

  const t = messages[language];

  // Demo conversation messages
  const demoMessages: ChatMessage[] = [
    { type: 'user', content: t.demo.userQ1 },
    { type: 'fudi', content: t.demo.fudiA1 },
    { type: 'user', content: t.demo.userQ2 },
    { type: 'fudi', content: t.demo.fudiA2 },
    { type: 'user', content: t.demo.userQ3 },
    { type: 'fudi', content: t.demo.fudiA3 }
  ];

  // Auto-play demo using React state
  useEffect(() => {
    if (!isPlaying) return;

    if (currentMessageIndex < demoMessages.length) {
      const delay = currentMessageIndex === 0 ? 1000 : 3000;
      
      const timer = setTimeout(() => {
        setDisplayedMessages(prev => [...prev, demoMessages[currentMessageIndex]]);
        setCurrentMessageIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else if (currentMessageIndex >= demoMessages.length) {
      // Restart demo after 2 seconds
      const restartTimer = setTimeout(() => {
        setDisplayedMessages([]);
        setCurrentMessageIndex(0);
      }, 2000);

      return () => clearTimeout(restartTimer);
    }
  }, [isPlaying, currentMessageIndex, demoMessages]);

  // Update demo messages when language changes
  useEffect(() => {
    if (isPlaying) {
      // Reset and restart with new language
      setDisplayedMessages([]);
      setCurrentMessageIndex(0);
    }
  }, [language]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    console.log("🔥 handleSubmit called!");
    console.log("🔥 Event:", e);
    e.preventDefault();
    
    console.log("🔥 Form data:", form);
    console.log("🔥 Setting isLoading to true");
    setIsLoading(true);

    try {
      console.log("🔥 About to call fudiAPI.demo...");
      const result = await fudiAPI.demo({
        restaurantName: form.restaurantName,
        ownerName: form.ownerName,
        email: form.email,
        phone: form.phone,
        country: form.country,
        painPoints: form.painPoints,
        preferredLanguage: language,
        demoDate: form.demoDate,
        demoTime: form.demoTime,
        currentPOS: form.currentPOS
      });

      console.log("🔥 API Result:", result);

      if (result.success) {
        console.log("🔥 Success! Showing alert...");
        alert(language === 'es' 
          ? '¡Demo agendado! Te contactaremos en 24 horas.' 
          : 'Demo scheduled! We\'ll contact you within 24 hours.'
        );
        
        // Reset form
        console.log("🔥 Resetting form...");
        setForm({
          restaurantName: '', 
          ownerName: '', 
          email: '', 
          phone: '', 
          country: '', 
          currentPOS: '', 
          monthlyRevenue: '', 
          locations: '', 
          painPoints: [], 
          preferredLanguage: language, 
          demoDate: '', 
          demoTime: ''
        });
      } else {
        console.log("🔥 API Error:", result.error);
        alert(result.error || 'Error al agendar demo');
      }
    } catch (error) {
      console.log("🔥 Catch Error:", error);
      alert(language === 'es' 
        ? 'Error al enviar. Intenta de nuevo.' 
        : 'Error submitting. Please try again.'
      );
    } finally {
      console.log("🔥 Setting isLoading to false");
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof DemoForm, value: string | string[]) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePainPoint = (painPoint: string) => {
    setForm(prev => ({
      ...prev,
      painPoints: prev.painPoints.includes(painPoint)
        ? prev.painPoints.filter(p => p !== painPoint)
        : [...prev.painPoints, painPoint]
    }));
  };

  const startDemo = () => {
    setIsPlaying(true);
    setDisplayedMessages([]);
    setCurrentMessageIndex(0);
  };

  const stopDemo = () => {
    setIsPlaying(false);
    setDisplayedMessages([]);
    setCurrentMessageIndex(0);
  };

  return (
    <div className="demo-container-refined">
      
      {/* Background ÚNICO - Apple Style */}
      <FudiBackground 
        variant="gradient"
        theme="business"  
        opacity={1}
        fixed={true}
      />

      {/* Header estándar */}
      <FudiHeader 
        currentPage="demo"
        showAuthButtons={true}
      />

      {/* Language Toggle */}
      <div className="language-toggle-refined">
        <FudiButton
          variant={language === 'es' ? 'orange' : 'ghost'}
          size="small"
          onClick={() => setLanguage('es')}
        >
          ES
        </FudiButton>
        <FudiButton
          variant={language === 'en' ? 'orange' : 'ghost'}
          size="small"
          onClick={() => setLanguage('en')}
        >
          EN
        </FudiButton>
      </div>

      {/* Hero Section */}
      <section className="hero-demo-refined">
        <div className="hero-content-demo-refined">
          
          {/* FUDI Character - Tu logo real */}
          <div className="fudi-character-demo-refined">
            <img 
              src="/favicon.png"
              alt="FUDI Character" 
              className="fudi-logo-demo-refined"
            />
          </div>
          
          <h1 className="hero-title-demo-refined">
            {t.hero.title}
          </h1>
          <p className="hero-subtitle-demo-refined">
            {t.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo-section-refined">
        <div className="demo-content-refined">
          
          <div className="demo-header-refined">
            <h2 className="demo-title-refined">{t.demo.title}</h2>
            <div className="demo-controls">
              {!isPlaying ? (
                <FudiButton
                  variant="orange"
                  size="large"
                  onClick={startDemo}
                  icon={<Play size={20} />}
                >
                  {language === 'es' ? 'Iniciar Demo' : 'Start Demo'}
                </FudiButton>
              ) : (
                <FudiButton
                  variant="ghost"
                  size="large"
                  onClick={stopDemo}
                >
                  {language === 'es' ? 'Reiniciar' : 'Restart'}
                </FudiButton>
              )}
            </div>
          </div>

          <FudiCard variant="chat" padding="large" className="chat-demo-refined">
            <div className="chat-header-refined">
              <div className="chat-avatar-refined">
                <img src="/images/logo.png" alt="FUDI" />
              </div>
              <div className="chat-info-refined">
                <h3>FUDI Assistant</h3>
                <p>Claude MCP • {language === 'es' ? 'Datos en tiempo real' : 'Real-time data'}</p>
              </div>
            </div>
            
            <div className="chat-messages-refined">
              {displayedMessages.map((msg, index) => (
                <div key={index} className={`message-demo-refined ${msg.type}`}>
                  <div className="message-avatar-refined">
                    {msg.type === 'user' ? '👨‍💼' : '🤖'}
                  </div>
                  <div className="message-content-refined">
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {displayedMessages.length === 0 && !isPlaying && (
                <div className="chat-placeholder">
                  <p className="text-center text-gray-400">
                    {language === 'es' 
                      ? 'Haz clic en "Iniciar Demo" para ver FUDI en acción' 
                      : 'Click "Start Demo" to see FUDI in action'
                    }
                  </p>
                </div>
              )}
            </div>
          </FudiCard>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section-refined">
        <div className="form-content-refined">
          
          <div className="form-header-refined">
            <h2 className="form-title-refined">{t.form.title}</h2>
          </div>

          <form onSubmit={handleSubmit} className="demo-form-refined">
            <div className="form-grid-refined">
              
              <div className="form-group-refined">
                <label>{t.form.restaurantName} *</label>
                <input
                  type="text"
                  required
                  value={form.restaurantName}
                  onChange={(e) => handleInputChange('restaurantName', e.target.value)}
                  className="form-input-refined"
                />
              </div>

              <div className="form-group-refined">
                <label>{t.form.ownerName} *</label>
                <input
                  type="text"
                  required
                  value={form.ownerName}
                  onChange={(e) => handleInputChange('ownerName', e.target.value)}
                  className="form-input-refined"
                />
              </div>

              <div className="form-group-refined">
                <label>{t.form.email} *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="form-input-refined"
                />
              </div>

              <div className="form-group-refined">
                <label>{t.form.phone} *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="form-input-refined"
                />
              </div>

              <div className="form-group-refined">
                <label>{t.form.country}</label>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="form-input-refined"
                />
              </div>

              <div className="form-group-refined">
                <label>{t.form.currentPOS}</label>
                <input
                  type="text"
                  value={form.currentPOS}
                  onChange={(e) => handleInputChange('currentPOS', e.target.value)}
                  className="form-input-refined"
                />
              </div>

            </div>

            <div className="form-group-refined full-width">
              <label>{t.form.painPoints}</label>
              <div className="pain-points-grid-refined">
                {painPointsOptions[language].map((point) => (
                  <div
                    key={point}
                    className={`pain-point-refined ${form.painPoints.includes(point) ? 'selected' : ''}`}
                    onClick={() => togglePainPoint(point)}
                  >
                    <CheckCircle size={16} />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-actions-refined">
              <FudiButton
                variant="orange"
                size="large"
                disabled={isLoading}
                onClick={() => {
                  const form = document.querySelector('.demo-form-refined') as HTMLFormElement;
                  if (form) {
                    const event = new Event('submit', { bubbles: true, cancelable: true });
                    form.dispatchEvent(event);
                  }
                }}
                icon={<Calendar size={20} />}
              >
                {isLoading ? (language === 'es' ? 'ENVIANDO...' : 'SENDING...') : t.form.submit}
              </FudiButton>
            </div>

          </form>
        </div>
      </section>

    </div>
  );
}