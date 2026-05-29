import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import CompareBar from "./components/CompareBar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Compare from "./pages/Compare";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import UniversityDetails from "./pages/UniversityDetails";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/university/:id" element={<UniversityDetailsRoute />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
      <CompareBar />
    </BrowserRouter>
  );
}

function UniversityDetailsRoute() {
  const { id } = useParams();
  return <UniversityDetails key={id} />;
}

export default App;
