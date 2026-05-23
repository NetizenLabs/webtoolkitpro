import React from 'react';

// Emergency override: Bypasses Next.js client-side router to force native browser navigations.
// This prevents Cloudflare WAF / Bot Fight Mode from silently killing background JS/RSC requests with 503s.
export default function NativeLink({ 
  href, 
  children, 
  className, 
  onClick,
  target,
  rel,
  ...props 
}: any) {
  // Pass through all standard HTMLAnchorElement attributes
  return (
    <a 
      href={href} 
      className={className} 
      onClick={onClick}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </a>
  );
}
