import { Routes, Route } from 'react-router-dom';
import FilmsPage from '../Pages/FilmsPage';
import SellersPage from '../Pages/SellersPage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/films" element={<FilmsPage />} />
      <Route path="/sellers" element={<SellersPage />} />
    </Routes>
  );
}

export default Router;