export interface PersonalInfo {
  name: string;
  email: string;
  age: string;
  occupation: string;
}

export interface SurveyResponses {
  primaryRole: "developer" | "designer" | "manager" | "student" | "other";
  experienceLevel: "0-1" | "2-5" | "6-10" | "10+";
  techStack: string[];
  workStyle: "remote" | "hybrid" | "office" | "freelance";
  learningPreferences: string[];
  communicationStyle: "direct" | "collaborative" | "analytical" | "creative";
  challenges: string[];
  goals: string[];
}
export interface FormData {
  step1: Partial<PersonalInfo>;
  step2: Partial<SurveyResponses>;
  currentStep: number;
  completedSteps: Set<number>;
}
export interface FormStore extends FormData {
  updateStep1: (data: Partial<PersonalInfo>) => void;
  updateStep2: (data: Partial<SurveyResponses>) => void;
  setCurrentStep: (step: number) => void;
  markStepComplete: (step: number) => void;
  canAccessStep: (step: number) => boolean;
  resetForm: () => void;
  getSurveyResults: () => {
    step1: PersonalInfo;
    step2: SurveyResponses;
  } | null;
}
