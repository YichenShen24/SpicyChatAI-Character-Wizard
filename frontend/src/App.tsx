import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CharacterCreationPage } from "./pages/CharacterCreationPage";
import { ThemeProvider } from "./components/layout/ThemeProvider";
import { MainLayout } from "./components/layout/MainLayout";
import { CharacterDetailPage } from "./pages/CharacterDetailPage";
import { CharacterList } from "./components/characters/CharacterList";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<CharacterCreationPage />} />
            <Route path="/character/:id" element={<CharacterDetailPage />} />
            <Route path="/all" element={<CharacterList />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
