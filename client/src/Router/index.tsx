import { Routes, Route } from 'react-router-dom';
import FilmsPage from '../Pages/FilmsPage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/films" element={<FilmsPage />} />
    </Routes>
  );
}

export default Router;