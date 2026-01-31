import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Awareness from './pages/Awareness';
import Chat from './pages/Chat';
import Emergency from './pages/Emergency';
import Forum from './pages/Forum';
import Activities from './pages/Activities';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={!user ? <Auth onLogin={handleLogin} /> : <Navigate to="/home" replace />} 
        />
        <Route 
          path="/*" 
          element={
            user ? (
              <Layout user={user} onLogout={handleLogout}>
                <Routes>
                  <Route path="/home" element={<Home user={user} />} />
                  <Route path="/awareness" element={<Awareness />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/emergency" element={<Emergency />} />
                  <Route path="/forum" element={<Forum />} />
                  <Route path="/activities" element={<Activities />} />
                  <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;