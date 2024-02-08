import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Learn from './components/Learn';
import Speaking from './components/Speaking';
import Writing from './components/Writing';
import Listening from './components/Listening';
import Reading from './components/Reading';
import Pricing from './components/Pricing';
import IeltsMocktestSection from './components/IeltsMocktestSection';
import HowItWorksSection from './components/HowItWorksSection';
import LearningPlanSection from './components/LearningPlanSection';

import TrustSection from './components/TrustSection';
import TestimonialsCarousel from './components/testimonialsData';
import FAQSection from './components/FAQSection';
import FreeTrialSection from './components/FreeTrialSection';
import HelpCenter from './components/HelpCenter';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/listening" element={<Listening />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </div>
      <IeltsMocktestSection/>
      <HowItWorksSection/>
      <LearningPlanSection/>
      
      <TrustSection/>
      <TestimonialsCarousel/>
      <FAQSection/>
      <FreeTrialSection/>
      <HelpCenter/>
    </Router>
  );
};

export default App;

