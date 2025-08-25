import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Blog Post';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Usar imágenes estáticas como alternativa según openGraph.images de SeoPage
export default async function Image({ params }: { params: { slug: string } }) {
  const title = decodeURIComponent(params.slug)
    .replace(/-/g, ' ')
    .replace(/[^\x00-\xFF]/g, '') // Remover caracteres no ASCII
    .substring(0, 60); // Limitar longitud
  
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#000000',
          backgroundImage: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Barra lateral izquierda */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '6px',
            height: '100%',
            background: 'linear-gradient(to right, #10b981, #059669)',
          }}
        />
        
        {/* Elementos decorativos */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100px',
            height: '100px',
            background: '#10b981',
            opacity: 0.1,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
          }}
        />
        
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100px',
            height: '100px',
            background: '#10b981',
            opacity: 0.1,
            clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
          }}
        />
        
        {/* Círculo decorativo */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            right: '140px',
            width: '120px',
            height: '120px',
            border: '2px solid #10b981',
            borderRadius: '50%',
            opacity: 0.3,
          }}
        />
        
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            fontSize: '52px',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          <span style={{ color: 'white' }}>Tecno</span>
          <span style={{ color: '#10b981' }}>Crypter</span>
        </div>
        
        {/* Línea separadora */}
        <div
          style={{
            width: '500px',
            height: '4px',
            background: 'linear-gradient(to right, #10b981, #059669)',
            borderRadius: '2px',
            marginBottom: '40px',
          }}
        />
        
        {/* Título */}
        <div
          style={{
            fontSize: '44px',
            fontWeight: '600',
            color: 'white',
            marginBottom: '20px',
            lineHeight: 1.2,
            maxWidth: '1000px',
          }}
        >
          {title}
        </div>
        
        {/* Subtítulo */}
        <div
          style={{
            fontSize: '26px',
            color: '#9ca3af',
            marginBottom: '180px',
          }}
        >
          Blog de Ciberseguridad y Tecnología
        </div>
        
        {/* Línea decorativa inferior */}
        <div
          style={{
            position: 'absolute',
            bottom: '90px',
            left: '60px',
            right: '60px',
            height: '2px',
            background: 'linear-gradient(to right, #10b981, #059669)',
            opacity: 0.6,
          }}
        />
        
        {/* Información adicional */}
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            left: '60px',
            fontSize: '22px',
            color: '#6b7280',
          }}
        >
          Mantente seguro en el mundo digital
        </div>
        
        {/* Badge decorativo */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '140px',
            height: '45px',
            backgroundColor: '#1a1a1a',
            border: '2px solid #10b981',
            borderRadius: '22px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#10b981',
          }}
        >
          VITR@
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}