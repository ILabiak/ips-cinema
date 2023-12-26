import { Routes, Route } from 'react-router-dom';
import FilmsPage from '../Pages/FilmsPage';
import SellersPage from '../Pages/SellersPage';
import ViewersPage from '../Pages/ViewersPage';
import TicketsPage from '../Pages/TicketsPages';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/films" element={<FilmsPage />} />
      <Route path="/sellers" element={<SellersPage />} />
      <Route path="/viewers" element={<ViewersPage />} />
      <Route path='/tickets' element={<TicketsPage />} />
    </Routes>
  );
}

export default Router;