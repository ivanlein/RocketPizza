import React from "react";

import "./scss/app.scss";
import Home from "./pages/Home.tsx";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout.tsx";

const Cart = React.lazy(() => import(/*webpackChunkName: "Cart" */'./pages/Cart.tsx'))
const FullPizza = React.lazy(() => import(/*webpackChunkName: "FullPizza" */'./pages/FullPizza.tsx'))
const NotFound = React.lazy(() => import(/*webpackChunkName: "NotFound" */'./pages/NotFound.tsx'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<React.Suspense fallback={<></>}>
          <Cart />
        </React.Suspense>} />
        <Route path="pizza/:id" element={<React.Suspense fallback={<></>}>
          <FullPizza />
        </React.Suspense>} />
        <Route path="*" element={<React.Suspense fallback={<></>}>
          <NotFound />
        </React.Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;
