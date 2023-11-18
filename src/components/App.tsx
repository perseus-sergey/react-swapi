import { memo } from 'react';
import './App.css';
import CardFilter from './CardFilter';
import FooterStyled from './FooterStyled';
import HeaderStyled from './HeaderStyled';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HeaderStyled />
      <main className="main">
        <CardFilter />

        <Outlet />
      </main>
      <FooterStyled />
    </ErrorBoundary>
  );
};

export default memo(App);
