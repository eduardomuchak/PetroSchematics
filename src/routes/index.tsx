import { Routes, Route } from 'react-router-dom';

import { Homepage } from 'pages/Home';
import { StyleGuide } from 'pages/StyleGuide';

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/style-guide" element={<StyleGuide />} />
    </Routes>
  );
}
