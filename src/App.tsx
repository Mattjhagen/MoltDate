import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MatchInterface from './components/MatchInterface';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={
          <Layout>
            <MatchInterface />
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
