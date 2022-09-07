import './App.css';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import unidecode from 'unidecode';
import Nav from './components/nav/Nav';
import Continents from './components/continents/Continents';
import Country from './components/country/Country';

function App() {
  const country = useSelector((state) => state.country);
  const countryPath = `/continents/country/:${unidecode(country.name.replace(/ /gi, '-'))}`;
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate replace to="/continents" />} />
        <Route path="/continents/*" element={<Continents />} />
        <Route path={countryPath} element={<Country />} />
      </Routes>
    </div>
  );
}

export default App;
