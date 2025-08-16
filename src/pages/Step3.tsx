import { useNavigate } from "react-router-dom";
import { useFormStore } from "../store/useFormStore";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Step3 = () => {
    const navigate = useNavigate();
    const { getSurveyResults, resetForm } = useFormStore();

    const results = getSurveyResults();

    if (!results) {
        navigate("/step/1");
        return null;
    }

    const { step1, step2 } = results;

    const handleSubmit = () => {
        console.log("Final submission:", results);
        resetForm();
        navigate("/step/1");
    };

    return (
        <>
            <h1 className="text-2xl font-bold text-center">Step 3: Review & Confirm</h1>

            <div>
                <h2 className="text-lg font-semibold">Personal Information</h2>
                <Separator className="my-2" />
                <p><strong>Name:</strong> {step1.name}</p>
                <p><strong>Email:</strong> {step1.email}</p>
                <p><strong>Age Range:</strong> {step1.age}</p>
                <p><strong>Primary Role:</strong> {step1.primaryRole}</p>
                {step1.otherRoleDescription && (
                    <p><strong>Role Description:</strong> {step1.otherRoleDescription}</p>
                )}
            </div>

            <div>
                <h2 className="text-lg font-semibold">Survey Responses</h2>
                <Separator className="my-2" />
                <p><strong>Experience Level:</strong> {step2.experienceLevel} years</p>
                {step2.techStack && step2.techStack.length > 0 && (
                    <p><strong>Tech Stack:</strong> {step2.techStack.join(", ")}</p>
                )}
                <p><strong>Work Style:</strong> {step2.workStyle}</p>
                <p><strong>Learning Preferences:</strong> {step2.learningPreferences.join(", ")}</p>
                <p><strong>Communication Style:</strong> {step2.communicationStyle}</p>
                <p><strong>Current Challenges:</strong> {step2.challenges.join(", ")}</p>
                <p><strong>Future Goals:</strong> {step2.goals.join(", ")}</p>
            </div>

            <div className="flex justify-between">
                <Button variant="outline" onClick={() => navigate("/step/2")}>
                    Back
                </Button>
                <Button onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </>
    );
};

export default Step3;