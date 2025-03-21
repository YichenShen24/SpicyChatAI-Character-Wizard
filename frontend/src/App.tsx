import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CharacterCreationPage } from "./pages/CharacterCreationPage";
import { ThemeProvider } from "./components/layout/ThemeProvider";
import { MainLayout } from "./components/layout/MainLayout";
import { CharacterDetailPage } from "./pages/CharacterDetailPage";
import { CharacterList } from "./components/characters/CharacterList";
import { ToastProvider } from "./components/ui/Toast";

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<CharacterCreationPage />} />
              <Route path="/character/:id" element={<CharacterDetailPage />} />
              <Route path="/all" element={<CharacterList />} />
            </Routes>
          </MainLayout>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
