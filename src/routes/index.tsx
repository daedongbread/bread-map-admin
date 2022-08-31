import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Layout } from '@/components/Layout';
import Tess from '@/components/Tess';
import Path from '@/constants/routes';
import { BakeryContainer } from '@/containers/Bakery';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to={Path.BAKERY} />} />
          <Route path={Path.BAKERY} element={<BakeryContainer />} />
          <Route path={`${Path.BAKERY}/:id`} element={<Tess />} />
          <Route path="report" element={<Tess />} />
          <Route path="report/:id" element={<Tess />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
