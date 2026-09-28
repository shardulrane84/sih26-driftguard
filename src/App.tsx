import React, { useState, useEffect } from 'react';
import { Navbar } from './components/public/Navbar';
import { Footer } from './components/public/Footer';
import { Home } from './pages/public/Home';
import { About } from './pages/public/About';
import { Product } from './pages/public/Product';
import { WhoItsFor } from './pages/public/WhoItsFor';
import { Solutions } from './pages/public/Solutions';
import { Pricing } from './pages/public/Pricing';
import { Market } from './pages/public/Market';
import { CaseStudies } from './pages/public/CaseStudies';
import { Resources } from './pages/public/Resources';
import { Careers } from './pages/public/Careers';
import { Contact } from './pages/public/Contact';
import { Login } from './pages/public/Login';
import { LegalPage } from './pages/public/LegalPage';
import { NotFound } from './pages/public/NotFound';

import { AppLayout, AppTab } from './components/app/AppLayout';
import { Overview } from './pages/app/Overview';
import { AddData } from './pages/app/AddData';
import { DataQuality } from './pages/app/DataQuality';
import { Lots } from './pages/app/Lots';
import { Components } from './pages/app/Components';
import { ComponentDetail } from './pages/app/ComponentDetail';
import { Alerts } from './pages/app/Alerts';
import { Reports } from './pages/app/Reports';
import { Support } from './pages/app/Support';

export default function App() {
  // Navigation State
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [isDemoModeActive, setIsDemoModeActive] = useState<boolean>(false);
  const [appTab, setAppTab] = useState<AppTab>('overview');
  const [selectedComponentId, setSelectedComponentId] = useState<string>('CMP-1048');
  const [userRole, setUserRole] = useState<string>('Lead Reliability Engineer');

  // Sync with browser URL / history
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      if (path.startsWith('/app')) {
        setIsDemoModeActive(true);
        const sub = path.replace('/app', '').replace('/', '') as AppTab;
        if (sub) setAppTab(sub);
      } else {
        setIsDemoModeActive(false);
        setCurrentPath(path);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigatePublic = (path: string) => {
    setIsDemoModeActive(false);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState({}, '', path);
    } catch (e) {
      // Ignore in iframe if pushState restricted
    }
  };

  const launchDemo = (initialTab: AppTab = 'overview') => {
    setIsDemoModeActive(true);
    setAppTab(initialTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState({}, '', `/app/${initialTab}`);
    } catch (e) {}
  };

  const exitDemo = () => {
    setIsDemoModeActive(false);
    setCurrentPath('/');
    try {
      window.history.pushState({}, '', '/');
    } catch (e) {}
  };

  const handleSelectComponent = (id: string) => {
    setSelectedComponentId(id);
    setAppTab('component-detail');
  };

  // EXPERIENCE B: DRIFTGUARD ENGINEERING APPLICATION (Authenticated / Demo Dashboard)
  if (isDemoModeActive) {
    return (
      <AppLayout
        currentTab={appTab}
        onSelectTab={(tab) => {
          setAppTab(tab);
          try {
            window.history.pushState({}, '', `/app/${tab}`);
          } catch (e) {}
        }}
        onExitDemo={exitDemo}
        selectedComponentId={selectedComponentId}
        onSelectComponent={handleSelectComponent}
        userRole={userRole}
      >
        {appTab === 'overview' && (
          <Overview
            onSelectComponent={handleSelectComponent}
            onNavigateTab={(tab) => setAppTab(tab)}
          />
        )}
        {appTab === 'add-data' && (
          <AddData
            onNavigateTab={(tab) => setAppTab(tab)}
            onSelectComponent={handleSelectComponent}
          />
        )}
        {appTab === 'data-quality' && (
          <DataQuality
            onSelectComponent={handleSelectComponent}
            onNavigateTab={(tab) => setAppTab(tab)}
          />
        )}
        {appTab === 'lots' && (
          <Lots
            onSelectComponent={handleSelectComponent}
            onNavigateTab={(tab) => setAppTab(tab)}
          />
        )}
        {appTab === 'components' && (
          <Components
            onSelectComponent={handleSelectComponent}
            onNavigateTab={(tab) => setAppTab(tab)}
          />
        )}
        {appTab === 'component-detail' && (
          <ComponentDetail
            componentId={selectedComponentId}
            onBack={() => setAppTab('overview')}
            onNavigateTab={(tab) => setAppTab(tab)}
          />
        )}
        {appTab === 'alerts' && (
          <Alerts
            onSelectComponent={handleSelectComponent}
            onNavigateTab={(tab) => setAppTab(tab)}
          />
        )}
        {appTab === 'reports' && (
          <Reports
            onSelectComponent={handleSelectComponent}
            onNavigateTab={(tab) => setAppTab(tab)}
          />
        )}
        {appTab === 'support' && (
          <Support
            onSelectComponent={handleSelectComponent}
            onNavigateTab={(tab) => setAppTab(tab)}
          />
        )}
      </AppLayout>
    );
  }

  // EXPERIENCE A: PUBLIC DRIFTGUARD WEBSITE
  return (
    <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar
        currentPath={currentPath}
        onNavigate={navigatePublic}
        onLaunchDemo={() => launchDemo('overview')}
      />

      <main className="flex-1">
        {currentPath === '/' && (
          <Home
            onNavigate={navigatePublic}
            onLaunchDemo={() => launchDemo('overview')}
          />
        )}
        {currentPath === '/about' && (
          <About
            onNavigate={navigatePublic}
            onLaunchDemo={() => launchDemo('overview')}
          />
        )}
        {currentPath === '/product' && (
          <Product
            onNavigate={navigatePublic}
            onLaunchDemo={() => launchDemo('overview')}
          />
        )}
        {currentPath === '/who-its-for' && (
          <WhoItsFor
            onNavigate={navigatePublic}
            onLaunchDemo={() => launchDemo('overview')}
          />
        )}
        {currentPath === '/solutions' && (
          <Solutions
            onNavigate={navigatePublic}
            onLaunchDemo={() => launchDemo('overview')}
          />
        )}
        {currentPath === '/pricing' && (
          <Pricing
            onNavigate={navigatePublic}
            onLaunchDemo={() => launchDemo('overview')}
          />
        )}
        {currentPath === '/market' && (
          <Market
            onNavigate={navigatePublic}
            onLaunchDemo={() => launchDemo('overview')}
          />
        )}
        {currentPath === '/case-studies' && (
          <CaseStudies
            onNavigate={navigatePublic}
            onLaunchDemo={() => launchDemo('overview')}
          />
        )}
        {currentPath === '/resources' && (
          <Resources
            onNavigate={navigatePublic}
            onLaunchDemo={() => launchDemo('overview')}
          />
        )}
        {currentPath === '/careers' && (
          <Careers
            onNavigate={navigatePublic}
            onLaunchDemo={() => launchDemo('overview')}
          />
        )}
        {currentPath === '/contact' && (
          <Contact
            onNavigate={navigatePublic}
            onLaunchDemo={() => launchDemo('overview')}
          />
        )}
        {currentPath === '/login' && (
          <Login
            onNavigate={navigatePublic}
            onLaunchDemo={() => launchDemo('overview')}
            onLoginSuccess={(role) => {
              setUserRole(role);
              launchDemo('overview');
            }}
          />
        )}
        {currentPath === '/legal/privacy' && (
          <LegalPage
            type="privacy"
            onNavigate={navigatePublic}
            onLaunchDemo={() => launchDemo('overview')}
          />
        )}
        {currentPath === '/legal/terms' && (
          <LegalPage
            type="terms"
            onNavigate={navigatePublic}
            onLaunchDemo={() => launchDemo('overview')}
          />
        )}
        {currentPath === '/legal/cookies' && (
          <LegalPage
            type="cookies"
            onNavigate={navigatePublic}
            onLaunchDemo={() => launchDemo('overview')}
          />
        )}
        {![
          '/',
          '/about',
          '/product',
          '/who-its-for',
          '/solutions',
          '/pricing',
          '/market',
          '/case-studies',
          '/resources',
          '/careers',
          '/contact',
          '/login',
          '/legal/privacy',
          '/legal/terms',
          '/legal/cookies',
        ].includes(currentPath) && (
          <NotFound
            onNavigate={navigatePublic}
            onLaunchDemo={() => launchDemo('overview')}
          />
        )}
      </main>

      <Footer
        onNavigate={navigatePublic}
        onLaunchDemo={() => launchDemo('overview')}
      />
    </div>
  );
}
