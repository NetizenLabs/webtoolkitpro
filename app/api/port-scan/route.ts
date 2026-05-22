import { NextResponse } from 'next/server';
import net from 'net';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get('target');
  
  if (!target) {
    return NextResponse.json({ error: 'Target is required' }, { status: 400 });
  }

  const commonPorts = [
    { port: 80, service: 'HTTP' },
    { port: 443, service: 'HTTPS' },
    { port: 21, service: 'FTP' },
    { port: 22, service: 'SSH' },
    { port: 25, service: 'SMTP' },
    { port: 3306, service: 'MySQL' }
  ];

  const scanPort = (port: number): Promise<string> => {
    return new Promise((resolve) => {
      const socket = new net.Socket();
      socket.setTimeout(2000);
      
      socket.on('connect', () => {
        socket.destroy();
        resolve('Open');
      });
      
      socket.on('timeout', () => {
        socket.destroy();
        resolve('Timeout');
      });
      
      socket.on('error', () => {
        socket.destroy();
        resolve('Closed');
      });
      
      socket.connect(port, target);
    });
  };

  const results = await Promise.all(
    commonPorts.map(async (p) => {
      const status = await scanPort(p.port);
      return { ...p, status };
    })
  );

  return NextResponse.json({ results });
}
