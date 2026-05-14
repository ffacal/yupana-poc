import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MarketResearch from './pages/MarketResearch';
import CompanyInsights from './pages/CompanyInsights';
import ExecutiveReport from './pages/ExecutiveReport';
import CustomerSupport from './pages/CustomerSupport';
import GlobalChatHistory from './pages/GlobalChatHistory';
import CommercialIntelligence from './pages/CommercialIntelligence';
import FeatureMock from './pages/FeatureMock';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="commercial-intelligence" element={<CommercialIntelligence />} />
          <Route path="commercial-intelligence/:featureId" element={<FeatureMock />} />
          <Route path="market-research" element={<MarketResearch />} />
          <Route path="company-insights" element={<CompanyInsights />} />
          <Route path="executive-report" element={<ExecutiveReport />} />
          <Route path="customer-support" element={<CustomerSupport />} />
          <Route path="global-chat-history" element={<GlobalChatHistory />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
