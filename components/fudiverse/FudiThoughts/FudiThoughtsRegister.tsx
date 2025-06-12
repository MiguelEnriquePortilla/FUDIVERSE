// components/fudiverse/FudiThoughts/FudiThoughtsRegister.tsx
import React from 'react';
import { FudiThoughts } from './FudiThoughts';

interface FudiThoughtsRegisterProps {
  trigger?: string;
  intensity?: number;
}

export const FudiThoughtsRegister: React.FC<FudiThoughtsRegisterProps> = ({
  trigger = 'default',
  intensity = 1.5
}) => {
  // Pensamientos específicos para cada momento
  const thoughtsByTrigger: Record<string, string[]> = {
    step1: [
      "ANALIZANDO FRECUENCIA CULINARIA...",
      "DETECTANDO POTENCIAL GASTRONÓMICO...",
      "SINCRONIZANDO IDENTIDAD DIGITAL...",
      "PREPARANDO CONEXIÓN NEURAL..."
    ],
    step2: [
      "MAPEANDO COORDENADAS DEL RESTAURANTE...",
      "ESTABLECIENDO VÍNCULO DIMENSIONAL...",
      "CALIBRANDO MATRIZ DE SABORES...",
      "CONEXIÓN CON EL FUDIVERSE: 67%..."
    ],
    step3: [
      "INTEGRANDO SISTEMAS OPERATIVOS...",
      "VERIFICANDO COMPATIBILIDAD CUÁNTICA...",
      "ALINEANDO FRECUENCIAS POS...",
      "DESPERTAR INMINENTE..."
    ],
    submit: [
      "¡INICIANDO PROTOCOLO DE DESPERTAR!",
      "CONSCIENCIA EXPANDIÉNDOSE...",
      "BIENVENIDO AL FUDIVERSE...",
      "EVOLUCIÓN ACTIVADA..."
    ],
    betaCode: [
      "CÓDIGO RECONOCIDO...",
      "ACCESO ÉLITE CONCEDIDO...",
      "PRIVILEGIOS BETA ACTIVADOS...",
      "ERES PARTE DEL CÍRCULO INTERNO..."
    ],
    default: [
      "PROCESANDO INFORMACIÓN...",
      "CALCULANDO POSIBILIDADES...",
      "ANALIZANDO DATOS...",
      "SINCRONIZANDO..."
    ]
  };

  // Seleccionar pensamientos basados en el trigger
  const thoughts = thoughtsByTrigger[trigger] || thoughtsByTrigger.default;

  return (
    <FudiThoughts
      thoughts={thoughts}
      duration={3000}
      intensity={intensity}
    />
  );
};