import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Netizen Labs - Engineering Web Apps That Dominate Search';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #09090b, #18181b)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        {/* Decorative Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Glow Element */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '300px',
            background: '#ccff00',
            filter: 'blur(150px)',
            opacity: 0.2,
            borderRadius: '50%',
          }}
        />

        {/* Logo/Brand Area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px', zIndex: 10 }}>
          <div style={{ display: 'flex', width: '48px', height: '48px', background: '#ffffff', borderRadius: '12px', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#09090b', fontSize: '24px', fontWeight: 'bold' }}>N</span>
          </div>
          <span style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-0.05em' }}>Netizen Labs</span>
        </div>

        {/* Main Title */}
        <div
          style={{
            display: 'flex',
            fontSize: '84px',
            fontWeight: '900',
            letterSpacing: '-0.05em',
            textAlign: 'center',
            lineHeight: 1.1,
            padding: '0 80px',
            zIndex: 10,
          }}
        >
          Engineering Web Apps That Dominate Search.
        </div>

        {/* Footer/Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '60px',
            padding: '12px 24px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '100px',
            fontSize: '24px',
            zIndex: 10,
          }}
        >
          <div style={{ width: '12px', height: '12px', background: '#ccff00', borderRadius: '50%' }} />
          <span>Zero-Server Model • 100/100 Performance</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
