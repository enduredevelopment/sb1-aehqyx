import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { JobPage } from './pages/JobPage';
import { SeniorFrontendEngineer } from './pages/jobs/SeniorFrontendEngineer';
import { ProductDesigner } from './pages/jobs/ProductDesigner';
import { DeveloperAdvocate } from './pages/jobs/DeveloperAdvocate';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/job/1" element={<SeniorFrontendEngineer />} />
          <Route path="/job/2" element={<ProductDesigner />} />
          <Route path="/job/3" element={<DeveloperAdvocate />} />
          <Route path="/job/:id" element={<JobPage />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;