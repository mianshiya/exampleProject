import React from 'react';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { IntroSection } from './components/IntroSection';
import { BasicTooltips } from './components/BasicTooltips';
import { PositionedTooltips } from './components/PositionedTooltips';
import { StyledTooltips } from './components/StyledTooltips';
import { AnimatedTooltips } from './components/AnimatedTooltips';
import { CodePlayground } from './components/CodePlayground';
import { Footer } from './components/Footer';

function App() {
  return (
    <Layout>
      <Header />
      <main className="flex-1">
        <IntroSection />
        <BasicTooltips />
        <PositionedTooltips />
        <StyledTooltips />
        <AnimatedTooltips />
        <CodePlayground />
      </main>
      <Footer />
    </Layout>
  );
}

export default App;