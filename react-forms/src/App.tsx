import { memo } from 'react';
import './App.css';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';
import { Outlet } from 'react-router-dom';
import HeaderStyled from './components/HeaderStyled';
import FooterStyled from './components/FooterStyled';
import HeaderNav from './components/HeaderNav';

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HeaderStyled />
      <HeaderNav />
      <main className="main">
        {/* <CardFilter /> */}

        <Outlet />
      </main>
      <FooterStyled />
    </ErrorBoundary>
  );
};

export default memo(App);
