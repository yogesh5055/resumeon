import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from './pages/Hero.js';
import Terms from './pages/Terms.js';
import User from './pages/User.js';
import Load from './pages/Loading.js';
import Forms from './pages/Forms.js';
import Down from './pages/Download.js';


const App = () => {
  return (
    <Router>
      <Routes>
       
         <Route path="/" element={<Hero />} />
         <Route path="/terms" element={<Terms />} />
          <Route path="/user" element={<User />} />
          <Route path="/load" element={<Load />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/download" element={<Down />} />



      </Routes>
    </Router>
  );
};

export default App;
