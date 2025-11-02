import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RecoilRoot } from 'recoil';

import App from './App';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
);
