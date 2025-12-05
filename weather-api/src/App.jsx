import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CityWeather from "./components/CityWeather";
import CountryWeather from "./components/CountryWeather";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CityWeather />} />
        <Route path="/country" element={<CountryWeather />} />
      </Routes>
    </Router>
  );
}
