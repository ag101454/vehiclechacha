'use client';

import { useEffect, useRef } from 'react';

export default function AdsterraBanner({ 
  adKey, 
  width = 728, 
  height = 90,
  className = '' 
}) {
  const bannerRef = useRef(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Prevent duplicate ads in React Strict Mode
    if (bannerRef.current && !scriptLoaded.current) {
      scriptLoaded.current = true;

      // Config script
      const configScript = document.createElement('script');
      configScript.type = 'text/javascript';
      configScript.innerHTML = `
        atOptions = {
          'key' : '${adKey}',
          'format' : 'iframe',
          'height' : ${height},
          'width' : ${width},
          'params' : {}
        };
      `;
      bannerRef.current.appendChild(configScript);

      // Invoke script
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = `https://www.highrevenueformat.com/${adKey}/invoke.js`;
      invokeScript.async = true;
      bannerRef.current.appendChild(invokeScript);
    }
  }, [adKey, width, height]);

  return (
    <div 
      ref={bannerRef} 
      className={`flex justify-center items-center my-6 ${className}`}
      style={{ minHeight: `${height}px` }}
    />
  );
}