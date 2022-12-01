import { Routes, Route } from 'react-router-dom';

import { Homepage } from 'pages/Home';

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}
