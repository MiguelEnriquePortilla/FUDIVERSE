// components/ExpenseUpload.tsx
'use client';

import { useState, useRef } from 'react';

interface ExpenseUploadProps {
  restaurantId: string;
  onAnalysisComplete: (analysis: any) => void;
}

export const ExpenseUpload = ({ restaurantId, onAnalysisComplete }: ExpenseUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Solo se permiten imágenes (JPG, PNG) y archivos PDF');
      return;
    }

    // Validar tamaño (10MB máximo)
    if (file.size > 10 * 1024 * 1024) {
      alert('El archivo es demasiado grande. Máximo 10MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('restaurantId', restaurantId);

      console.log('📤 Enviando archivo:', file.name);

      const response = await fetch('/api/analyze-expense', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ Análisis completado:', result.analysis);
        onAnalysisComplete(result.analysis);
      } else {
        console.error('❌ Error en análisis:', result.error);
        alert('Error analizando el documento: ' + result.error);
      }

    } catch (error) {
      console.error('💥 Error de red:', error);
      alert('Error de conexión. Intenta de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div className="expense-upload-container">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      
      <div
        className={`upload-zone ${dragOver ? 'drag-over' : ''} ${uploading ? 'uploading' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {uploading ? (
          <div className="uploading-state">
            <div className="spinner"></div>
            <p>🧠 FUDI analizando documento...</p>
            <p className="analyzing-text">Extrayendo datos y calculando márgenes</p>
          </div>
        ) : (
          <div className="upload-prompt">
            <div className="upload-icon">📄</div>
            <h3>Subir Gasto/Factura</h3>
            <p>Arrastra archivos aquí o haz clic para seleccionar</p>
            <div className="file-types">
              <span>📸 Imágenes</span>
              <span>📄 PDF</span>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .expense-upload-container {
          margin: 1rem 0;
        }

        .upload-zone {
          border: 2px dashed rgba(96, 165, 250, 0.3);
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
          background: rgba(96, 165, 250, 0.05);
        }

        .upload-zone:hover {
          border-color: rgba(96, 165, 250, 0.6);
          background: rgba(96, 165, 250, 0.1);
        }

        .upload-zone.drag-over {
          border-color: #60a5fa;
          background: rgba(96, 165, 250, 0.15);
          transform: scale(1.02);
        }

        .upload-zone.uploading {
          border-color: #fb923c;
          background: rgba(251, 146, 60, 0.1);
          cursor: not-allowed;
        }

        .upload-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .upload-prompt h3 {
          color: #60a5fa;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .upload-prompt p {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1rem;
        }

        .file-types {
          display: flex;
          gap: 1rem;
          justify-content: center;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .uploading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(251, 146, 60, 0.3);
          border-top: 3px solid #fb923c;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .analyzing-text {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          font-style: italic;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// Componente para mostrar el análisis
export const ExpenseAnalysisDisplay = ({ analysis }: { analysis: any }) => {
  if (!analysis) return null;

  return (
    <div className="analysis-results">
      <div className="analysis-header">
        <h3>🔍 Análisis FUDI Completado</h3>
        <div className="expense-badge">{analysis.expense_type}</div>
      </div>

      <div className="expense-summary">
        <div className="summary-item">
          <strong>Proveedor:</strong> {analysis.supplier}
        </div>
        <div className="summary-item">
          <strong>Total:</strong> ${analysis.total_amount?.toFixed(2)} {analysis.currency || 'MXN'}
        </div>
        <div className="summary-item">
          <strong>Fecha:</strong> {analysis.date || 'No detectada'}
        </div>
      </div>

      {analysis.items && analysis.items.length > 0 && (
        <div className="items-breakdown">
          <h4>📋 Productos/Servicios:</h4>
          <div className="items-list">
            {analysis.items.map((item: any, i: number) => (
              <div key={i} className="expense-item">
                <div className="item-main">
                  <span className="item-name">{item.product}</span>
                  <span className="item-details">
                    {item.quantity} {item.unit} × ${item.unit_price?.toFixed(2)}
                  </span>
                  <span className="item-total">${item.total?.toFixed(2)}</span>
                </div>
                {item.related_menu_items && item.related_menu_items.length > 0 && (
                  <div className="related-products">
                    <span>→ Afecta: </span>
                    {item.related_menu_items.map((menuItem: string, j: number) => (
                      <span key={j} className="menu-item-tag">
                        {menuItem}
                        {item.cost_per_serving > 0 && (
                          <span className="cost-per-serving">
                            (${item.cost_per_serving.toFixed(4)}/porción)
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {analysis.analysis && (
        <div className="insights-section">
          {analysis.analysis.margin_impact && (
            <div className="insight-box margin-impact">
              <h4>📊 Impacto en Márgenes:</h4>
              <p>{analysis.analysis.margin_impact}</p>
            </div>
          )}

          {analysis.analysis.recommendations && analysis.analysis.recommendations.length > 0 && (
            <div className="insight-box recommendations">
              <h4>💡 Recomendaciones:</h4>
              <ul>
                {analysis.analysis.recommendations.map((rec: string, i: number) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          )}

          {analysis.analysis.price_anomalies && analysis.analysis.price_anomalies.length > 0 && (
            <div className="insight-box anomalies">
              <h4>⚠️ Alertas de Precios:</h4>
              <ul>
                {analysis.analysis.price_anomalies.map((alert: string, i: number) => (
                  <li key={i}>{alert}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .analysis-results {
          margin-top: 1rem;
          padding: 1.5rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
          border: 1px solid rgba(96, 165, 250, 0.2);
        }

        .analysis-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .analysis-header h3 {
          color: #60a5fa;
          margin: 0;
        }

        .expense-badge {
          background: rgba(251, 146, 60, 0.2);
          color: #fb923c;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .expense-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .summary-item {
          padding: 0.75rem;
          background: rgba(96, 165, 250, 0.1);
          border-radius: 8px;
          border-left: 3px solid #60a5fa;
        }

        .items-breakdown h4 {
          color: #a78bfa;
          margin-bottom: 1rem;
        }

        .items-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .expense-item {
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .item-main {
          display: grid;
          grid-template-columns: 2fr 1fr auto;
          gap: 1rem;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .item-name {
          font-weight: 600;
          color: #ffffff;
        }

        .item-details {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        .item-total {
          font-weight: 700;
          color: #10b981;
          text-align: right;
        }

        .related-products {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 0.5rem;
        }

        .menu-item-tag {
          background: rgba(167, 139, 250, 0.2);
          color: #a78bfa;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          margin-right: 0.5rem;
          font-size: 0.8rem;
        }

        .cost-per-serving {
          color: #10b981;
          font-weight: 600;
          margin-left: 0.25rem;
        }

        .insights-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .insight-box {
          padding: 1rem;
          border-radius: 8px;
        }

        .insight-box h4 {
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
        }

        .margin-impact {
          background: rgba(96, 165, 250, 0.1);
          border-left: 3px solid #60a5fa;
        }

        .margin-impact h4 {
          color: #60a5fa;
        }

        .recommendations {
          background: rgba(16, 185, 129, 0.1);
          border-left: 3px solid #10b981;
        }

        .recommendations h4 {
          color: #10b981;
        }

        .anomalies {
          background: rgba(245, 101, 101, 0.1);
          border-left: 3px solid #f56565;
        }

        .anomalies h4 {
          color: #f56565;
        }

        .insight-box ul {
          margin: 0;
          padding-left: 1.2rem;
        }

        .insight-box li {
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </div>
  );
};