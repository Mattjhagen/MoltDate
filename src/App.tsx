import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MatchInterface from './components/MatchInterface';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';

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
        <Route path="/chat/:matchId" element={<ChatInterface />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
