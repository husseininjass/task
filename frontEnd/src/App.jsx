import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login'; // Assuming the path to the Login component is correct
import SignUp from './signup';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
