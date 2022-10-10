import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import Tess from '@/components/Tess';
import Path from '@/constants/routes';
import { BakeriesContainer } from '@/containers/Bakeries';
import { BakeryDetailContainer } from '@/containers/BakeryDetail';
import { LoginContainer } from '@/containers/Login/LoginContainer';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={`${Path.LOGIN}`} element={<LoginContainer />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to={Path.BAKERIES} />} />
        <Route path={Path.BAKERIES} element={<BakeriesContainer />} />
        <Route path={`${Path.BAKERIES}/new`} element={<BakeryDetailContainer />} />
        <Route path={`${Path.BAKERIES}/:bakeryId`} element={<BakeryDetailContainer />} />
        <Route path={`${Path.BAKERY_REQUEST}`} element={<Tess />} />
        <Route path={`${Path.USERS}`} element={<Tess />} />
        <Route path={`${Path.USER_REPORT}`} element={<Tess />} />
        <Route path={`${Path.USER_REPORT}/:id`} element={<Tess />} />
      </Route>
      <Route path={'*'} element={<div>Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
