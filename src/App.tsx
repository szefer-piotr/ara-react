import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Upload from './pages/Upload';
import Plan from './pages/Plan';
import Chat from './pages/Chat';
import Report from './pages/Report';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <Header />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Navigate to="/upload" />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/plan" element={<Plan />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/report" element={<Report />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
