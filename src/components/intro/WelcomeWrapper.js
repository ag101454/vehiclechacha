'use client';

import { useState } from 'react';
import WelcomeAnimation from './WelcomeAnimation';

export default function WelcomeWrapper() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && (
        <WelcomeAnimation onComplete={() => setShowIntro(false)} />
      )}
    </>
  );
}