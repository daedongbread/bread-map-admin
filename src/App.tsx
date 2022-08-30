import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Layout } from '@/components/Layout';
import Tess from '@/components/Tess';
import './App.css';
import { BakeryContainer } from './containers/Bakery';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="bakery" />} />
          <Route path="report" element={<Tess />} />
          <Route path="report/:id" element={<Tess />} />
          <Route path="bakery" element={<BakeryContainer />} />
          <Route path="bakery/:id" element={<Tess />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
