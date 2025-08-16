import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Step1 from "./pages/Step1";
import Step2 from "./pages/Step2";
import Step3 from "./pages/Step3";
import NotFound from "./pages/NotFound";
import { useStepGuard } from "./hooks/useStepGuard";
import { FormLayout } from "./components/layout/FormLayout";
import './App.css';

function StepWrapper({ children }: { children: React.ReactNode }) {
  useStepGuard();
  return <FormLayout>{children}</FormLayout>;
}

function StepRoutes() {
  const { step } = useParams<{ step: string }>();
  const stepNumber = parseInt(step || "1");

  switch (stepNumber) {
    case 1:
      return (
        <StepWrapper>
          <Step1 />
        </StepWrapper>
      );
    case 2:
      return (
        <StepWrapper>
          <Step2 />
        </StepWrapper>
      );
    case 3:
      return (
        <StepWrapper>
          <Step3 />
        </StepWrapper>
      );
    default:
      return <NotFound />;
  }
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/step/1" replace />} />
        <Route path="/step/:step" element={<StepRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;