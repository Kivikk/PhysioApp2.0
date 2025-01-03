import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import MainLayout from "./components/layout/MainLayout";
import Landing from "./pages/Landing";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </MainLayout>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;