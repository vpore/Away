import { BrowserRouter, Routes, Route } from "react-router-dom";
import Redirect from "./pages/Redirect";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding/Onboarding";
import OnboardingVideo from "./pages/Onboarding/OnboardingVideo";
import OnboardingAlarm from "./pages/Onboarding/OnboardingAlarm";
import OnboardingFinished from "./pages/Onboarding/OnboardingFinished";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="onboarding">
          <Route index element={<Onboarding />} />
          <Route path="video" element={<OnboardingVideo />} />
          <Route path="alarm" element={<OnboardingAlarm />} />
          <Route path="finished" element={<OnboardingFinished />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;