import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Learn from './components/Learn';
import Speaking from './components/Speaking';
import Writing from './components/Writing';
import Listening from './components/Listening';
import Reading from './components/Reading';
import Pricing from './components/Pricing';

import LoginPage from './components/LoginPage';
import Landingpage from './components/Landingpage.';
import SignupPage from './components/SignupPage';
import Guaranteed from './components/Guaranteed'
import BandeightTopics from './components/BandeightTopics'
import Maindash from './components/Maindash';
import Day1 from './components/Day1';
const App = () => {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<Landingpage/>} />
          <Route path="/maindash" element={<Maindash/>} />
          <Route path="/guaranteed" element={<Guaranteed/>} />
          <Route path="/maindash/bandeighttopics" element={<BandeightTopics/>} />
          <Route path="/maindash/Day1" element={<Day1/>} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/listening" element={<Listening />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          
          
          
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;

