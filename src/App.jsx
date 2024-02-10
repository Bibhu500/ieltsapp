import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Learn from './components/Learn';
import Speaking from './components/Speaking';
import Writing from './components/Writing';
import Listening from './components/Listening';
import Reading from './components/Reading';
import Pricing from './components/Pricing';

import LoginSignupPage from './components/LoginSignupPage';
import Landingpage from './components/Landingpage.';


const App = () => {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<Landingpage/>} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/listening" element={<Listening />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<LoginSignupPage/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

