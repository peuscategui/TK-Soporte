import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginSimple from './pages/LoginSimple';
import TicketList from './pages/TicketList';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginSimple />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tickets" element={<TicketList />} />
      </Route>
    </Routes>
  );
}

export default App;