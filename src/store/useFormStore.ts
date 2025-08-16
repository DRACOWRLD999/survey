import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type FormStore,
  type PersonalInfo,
  type SurveyResponses,
} from "../types";

const initialState = {
  step1: {},
  step2: {},
  currentStep: 1,
  completedSteps: new Set<number>(),
};

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      updateStep1: (data) =>
        set((state) => ({
          step1: { ...state.step1, ...data },
        })),

      updateStep2: (data) =>
        set((state) => ({
          step2: { ...state.step2, ...data },
        })),

      setCurrentStep: (step) => set({ currentStep: step }),

      markStepComplete: (step) =>
        set((state) => ({
          completedSteps: new Set([...state.completedSteps, step]),
        })),

      canAccessStep: (step) => {
        const state = get();
        if (step === 1) return true;
        if (step === 2) return state.completedSteps.has(1);
        if (step === 3)
          return state.completedSteps.has(1) && state.completedSteps.has(2);
        return false;
      },

      getSurveyResults: () => {
        const state = get();
        if (state.completedSteps.has(1) && state.completedSteps.has(2)) {
          return {
            step1: state.step1 as PersonalInfo,
            step2: state.step2 as SurveyResponses,
          };
        }
        return null;
      },

      resetForm: () => set(initialState),
    }),
    {
      name: "multi-step-form",
      partialize: (state) => ({
        step1: state.step1,
        step2: state.step2,
        completedSteps: Array.from(state.completedSteps), // Convert Set to Array for storage
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.completedSteps) {
          // Convert Array back to Set
          state.completedSteps = new Set(
            state.completedSteps as unknown as number[]
          );
        }
      },
    }
  )
);
