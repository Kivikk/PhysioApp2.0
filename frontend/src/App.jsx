// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./contexts/ToastContext";
import MainLayout from "./components/layout/MainLayout";
import Landing from "./pages/Landing";
import FavoritesPage from "./pages/FavoritesPage";
import ErrorPage from "./pages/ErrorPage";
import ExerciseDetail from "./pages/ExerciseDetail";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </MainLayout>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;