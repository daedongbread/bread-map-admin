import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import Tess from '@/components/Tess';
import { GhRoutes } from '@/constants/routes';
import { BakeriesContainer } from '@/containers/Bakeries';
import { BakeryDetailContainer } from '@/containers/BakeryDetail';
import { BakeryReportDetailContainer } from '@/containers/BakeryReportDetail';
import { BakeryReportsContainer } from '@/containers/BakeryReports';
import { LoginContainer } from '@/containers/Login/LoginContainer';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={GhRoutes.LOGIN} element={<LoginContainer />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to={GhRoutes.BAKERIES} />} />
        <Route path={GhRoutes.BAKERIES} element={<BakeriesContainer />} />
        <Route path={`${GhRoutes.BAKERIES}/new`} element={<BakeryDetailContainer />} />
        <Route path={`${GhRoutes.BAKERIES}/:bakeryId`} element={<BakeryDetailContainer />} />
        <Route path={GhRoutes.BAKERY_REPORT} element={<BakeryReportsContainer />} />
        <Route path={`${GhRoutes.BAKERY_REPORT}/:reportId`} element={<BakeryReportDetailContainer />} />
        <Route path={GhRoutes.USERS} element={<Tess />} />
        <Route path={GhRoutes.USER_REPORT} element={<Tess />} />
        <Route path={`${GhRoutes.USER_REPORT}/:id`} element={<Tess />} />
      </Route>
      <Route path={'*'} element={<div>Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
