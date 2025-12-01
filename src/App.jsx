import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "./firebase/firebase";
import { useState, useEffect } from "react";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  if (loading) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '1.5rem',
      background: 'linear-gradient(135deg, #366033 0%, #4d804a 100%)',
      color: 'white'
    }}>
      Loading...
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={user ? <Home user={user} onSignOut={handleSignOut} /> : <Navigate to="/login" />} 
        />

        <Route 
          path="/login" 
          element={user ? <Navigate to="/" /> : <Login onLogin={handleGoogleLogin} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
