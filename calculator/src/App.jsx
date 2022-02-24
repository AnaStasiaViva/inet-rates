import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";

import MainLayout from "./layouts/MainLayout";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/main" element={<MainLayout />} />
        <Route path="*" element={<Navigate to="/main" />} />
      </Routes>
    </div>
  );
};

export default App;
