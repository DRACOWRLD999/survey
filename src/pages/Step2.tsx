import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFormStore } from "../store/useFormStore";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { step2Schema, type Step2FormData } from "@/utils/validation";

const Step2 = () => {
    const navigate = useNavigate();
    const { step1, step2, updateStep2, markStepComplete } = useFormStore();

    const {
        handleSubmit,
        setValue,
        watch,
        setError,
        clearErrors,
        formState: { errors, isValid },
    } = useForm<Step2FormData>({
        resolver: zodResolver(step2Schema),
        defaultValues: {
            ...step2,
            techStack: step2.techStack || [],
            learningPreferences: step2.learningPreferences || [],
            challenges: step2.challenges || [],
            goals: step2.goals || [],
        },
        mode: "onChange",
    });

    const techStack = watch("techStack", []);
    const learningPreferences = watch("learningPreferences", []);
    const challenges = watch("challenges", []);
    const goals = watch("goals", []);

    const isDeveloper = step1.primaryRole === "developer";

    const onSubmit = (data: Step2FormData) => {
        if (isDeveloper && (!data.techStack || data.techStack.length === 0)) {
            setError("techStack", {
                type: "manual",
                message: "Please select at least one technology"
            });
            return;
        }

        const submitData = { ...data };
        if (!isDeveloper) {
            delete submitData.techStack;
        }
        updateStep2(submitData);

        markStepComplete(2);
        navigate("/step/3");
    };

    const toggleArrayValue = (field: keyof Step2FormData, value: string) => {
        const current = watch(field) as string[];
        if (current.includes(value)) {
            setValue(field, current.filter((v) => v !== value), { shouldValidate: true });
        } else {
            setValue(field, [...current, value], { shouldValidate: true });
        }

        if (field === "techStack" && errors.techStack) {
            clearErrors("techStack");
        }
    };

    return (
        <>
            <h1 className="text-2xl font-bold text-center">Step 2: Survey</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                <div className="space-y-2">
                    <Label>Experience Level</Label>
                    <Select
                        defaultValue={step2.experienceLevel}
                        onValueChange={(val) => setValue("experienceLevel", val as Step2FormData["experienceLevel"], { shouldValidate: true })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                            {["0-1", "2-5", "6-10", "10+"].map((exp) => (
                                <SelectItem key={exp} value={exp}>{exp} years</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.experienceLevel && <p className="text-red-500 text-sm">{errors.experienceLevel.message}</p>}
                </div>

                {isDeveloper && (
                    <div className="space-y-2">
                        <Label>Tech Stack</Label>
                        <div className="grid grid-cols-2 gap-2">
                            {["React", "Angular", "Vue", "Node.js", "Python", "TypeScript", "Java", "C#", "PHP", "Ruby"].map((tech) => (
                                <div key={tech} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={tech}
                                        checked={techStack!.includes(tech)}
                                        onCheckedChange={() => toggleArrayValue("techStack", tech)}
                                    />
                                    <Label htmlFor={tech}>{tech}</Label>
                                </div>
                            ))}
                        </div>
                        {errors.techStack && <p className="text-red-500 text-sm">{errors.techStack.message}</p>}
                    </div>
                )}

                <div className="space-y-2">
                    <Label>Work Style</Label>
                    <RadioGroup
                        defaultValue={step2.workStyle}
                        onValueChange={(val) => setValue("workStyle", val as Step2FormData["workStyle"], { shouldValidate: true })}
                    >
                        {["remote", "hybrid", "office", "freelance"].map((style) => (
                            <div key={style} className="flex items-center space-x-2">
                                <RadioGroupItem value={style} id={style} />
                                <Label htmlFor={style} className="capitalize">{style}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                    {errors.workStyle && <p className="text-red-500 text-sm">{errors.workStyle.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Learning Preferences</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {["Books", "Videos", "Courses", "Pair Programming", "Workshops", "Mentoring"].map((pref) => (
                            <div key={pref} className="flex items-center space-x-2">
                                <Checkbox
                                    id={pref}
                                    checked={learningPreferences.includes(pref)}
                                    onCheckedChange={() => toggleArrayValue("learningPreferences", pref)}
                                />
                                <Label htmlFor={pref}>{pref}</Label>
                            </div>
                        ))}
                    </div>
                    {errors.learningPreferences && <p className="text-red-500 text-sm">{errors.learningPreferences.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Communication Style</Label>
                    <RadioGroup
                        defaultValue={step2.communicationStyle}
                        onValueChange={(val) => setValue("communicationStyle", val as Step2FormData["communicationStyle"], { shouldValidate: true })}
                    >
                        {["direct", "collaborative", "analytical", "creative"].map((style) => (
                            <div key={style} className="flex items-center space-x-2">
                                <RadioGroupItem value={style} id={style} />
                                <Label htmlFor={style} className="capitalize">{style}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                    {errors.communicationStyle && <p className="text-red-500 text-sm">{errors.communicationStyle.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Current Challenges</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {["Keeping up with tech", "Time management", "Collaboration", "Career growth", "Work-life balance", "Skill development"].map((challenge) => (
                            <div key={challenge} className="flex items-center space-x-2">
                                <Checkbox
                                    id={challenge}
                                    checked={challenges.includes(challenge)}
                                    onCheckedChange={() => toggleArrayValue("challenges", challenge)}
                                />
                                <Label htmlFor={challenge}>{challenge}</Label>
                            </div>
                        ))}
                    </div>
                    {errors.challenges && <p className="text-red-500 text-sm">{errors.challenges.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Future Goals</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {["Become Senior Developer", "Contribute to Open Source", "Start a Startup", "Improve Leadership", "Learn New Technology", "Get Promoted"].map((goal) => (
                            <div key={goal} className="flex items-center space-x-2">
                                <Checkbox
                                    id={goal}
                                    checked={goals.includes(goal)}
                                    onCheckedChange={() => toggleArrayValue("goals", goal)}
                                />
                                <Label htmlFor={goal}>{goal}</Label>
                            </div>
                        ))}
                    </div>
                    {errors.goals && <p className="text-red-500 text-sm">{errors.goals.message}</p>}
                </div>

                <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => navigate("/step/1")}>
                        Back
                    </Button>
                    <Button type="submit" disabled={!isValid}>
                        Next
                    </Button>
                </div>
            </form>
        </>
    );
};

export default Step2;