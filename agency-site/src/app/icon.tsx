import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#09090b', // Obsidian dark
          color: '#ffffff', // White text
          borderRadius: '8px', // Slightly rounded edges
          border: '1px solid #27272a', // Subtle border
          fontSize: '20px',
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
        }}
      >
        N
      </div>
    ),
    {
      ...size,
    }
  );
}
