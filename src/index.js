import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import './styles/index.css';

// PWA Service Worker Registration
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('Service Worker registered:', registration);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available
              if (window.confirm('New version available! Reload to update?')) {
                window.location.reload();
              }
            }
          });
        }
      });

      // Handle messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('Message from service worker:', event.data);
      });

    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

// PWA Install Prompt
let deferredPrompt;
const setupInstallPrompt = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installPrompt = document.getElementById('pwa-install-prompt');
    if (installPrompt) {
      installPrompt.classList.add('show');
    }

    document.getElementById('pwa-install-btn')?.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log('Install outcome:', outcome);
        deferredPrompt = null;

        const installPrompt = document.getElementById('pwa-install-prompt');
        if (installPrompt) {
          installPrompt.classList.remove('show');
        }
      }
    });

    document.getElementById('pwa-dismiss-btn')?.addEventListener('click', () => {
      const installPrompt = document.getElementById('pwa-install-prompt');
      if (installPrompt) {
        installPrompt.classList.remove('show');
      }
      deferredPrompt = null;
    });
  });

  // Hide install prompt if already installed
  window.addEventListener('appinstalled', () => {
    console.log('PWA installed');
    deferredPrompt = null;
    const installPrompt = document.getElementById('pwa-install-prompt');
    if (installPrompt) {
      installPrompt.classList.remove('show');
    }
  });
};

// Performance monitoring
const setupPerformanceMonitoring = () => {
  if ('PerformanceObserver' in window) {
    // Monitor long tasks
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn('Long task detected:', entry);
        }
      }
    });
    observer.observe({ entryTypes: ['longtask'] });

    // Monitor layout shifts
    const layoutObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.value > 0.1) {
          console.warn('Layout shift detected:', entry);
        }
      }
    });
    layoutObserver.observe({ entryTypes: ['layout-shift'] });
  }
};

// Initialize app
const initializeApp = async () => {
  // Hide loading screen
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }

  // Register service worker
  await registerServiceWorker();

  // Setup PWA install prompt
  setupInstallPrompt();

  // Setup performance monitoring
  setupPerformanceMonitoring();

  // Render React app
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

// Start the app
initializeApp().catch(console.error);

// Web Vitals monitoring
import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
  getCLS(console.log);
  getFID(console.log);
  getFCP(console.log);
  getLCP(console.log);
  getTTFB(console.log);
}).catch(() => {
  // Web vitals not available
});