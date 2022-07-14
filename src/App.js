// eslint-disable-next-line
import './App.css';

import LoginPage from './Pages/LoginPage';
import PortfolioManager from './Pages/PortfolioManager';
import RegisterPage from './Pages/RegisterPage';
import { ChakraProvider } from '@chakra-ui/react'
import CalculatePortfolio from './Pages/CalculatePortfolio';
import SellAssets from './Pages/SellAssets';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link as RouteLink
} from "react-router-dom";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/PortfolioManager" element={<PortfolioManager/>}/>
            <Route path="/CalculatePortfolio" element={<CalculatePortfolio/>}/>
            <Route path="/SellAssets" element={<SellAssets/>}/>
        </Routes>
      </Router>
      
    </ChakraProvider>
  );
}

export default App;
