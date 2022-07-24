import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Tess from '@/components/Tess';
import Test from '@/components/Test';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  // / => /bakery로 이동시키기
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Test />} />
          <Route path="bakery" element={<Test />} />
          <Route path="bakery/:id" element={<Tess />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
