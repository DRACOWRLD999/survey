import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormStore } from "../store/useFormStore";

export const useStepGuard = () => {
  const navigate = useNavigate();
  const { step } = useParams<{ step: string }>();
  const { canAccessStep, setCurrentStep } = useFormStore();

  useEffect(() => {
    const stepNumber = parseInt(step || "1");

    if (!canAccessStep(stepNumber)) {
      let redirectStep = 1;
      for (let i = 1; i <= 3; i++) {
        if (canAccessStep(i)) {
          redirectStep = i;
        } else {
          break;
        }
      }
      navigate(`/step/${redirectStep}`, { replace: true });
    } else {
      setCurrentStep(stepNumber);
    }
  }, [step, canAccessStep, navigate, setCurrentStep]);
};
