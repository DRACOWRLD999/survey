// src/pages/Step1.tsx
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFormStore } from "../store/useFormStore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { step1Schema, type Step1FormData } from "@/utils/validation";

const Step1 = () => {
    const navigate = useNavigate();
    const { step1, updateStep1, updateStep2, markStepComplete } = useFormStore();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid },
    } = useForm<Step1FormData>({
        resolver: zodResolver(step1Schema),
        defaultValues: {
            name: step1.name || "",
            email: step1.email || "",
            age: step1.age || "",
            primaryRole: step1.primaryRole || undefined,
            otherRoleDescription: step1.otherRoleDescription || "",
        },
        mode: "onChange",
    });

    const primaryRole = watch("primaryRole");

    const onSubmit = (data: Step1FormData) => {
        // Create a copy and conditionally remove otherRoleDescription
        const submitData = { ...data };
        if (data.primaryRole !== "other") {
            delete submitData.otherRoleDescription;
        }

        updateStep1(submitData);

        // Clear tech stack from step2 if user is no longer a developer
        if (data.primaryRole !== "developer") {
            updateStep2({ techStack: undefined });
        }

        markStepComplete(1);
        navigate("/step/2");
    };

    return (
        <>
            <h1 className="text-2xl font-bold text-center">Step 1: Personal Information</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" {...register("name")} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" {...register("email")} />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Age Range</Label>
                    <Select
                        defaultValue={step1.age}
                        onValueChange={(val) => setValue("age", val, { shouldValidate: true })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select your age range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="18-24">18–24</SelectItem>
                            <SelectItem value="25-34">25–34</SelectItem>
                            <SelectItem value="35-44">35–44</SelectItem>
                            <SelectItem value="45-54">45–54</SelectItem>
                            <SelectItem value="55+">55+</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Primary Role</Label>
                    <RadioGroup
                        defaultValue={step1.primaryRole}
                        onValueChange={(val) => setValue("primaryRole", val as Step1FormData["primaryRole"], { shouldValidate: true })}
                    >
                        {["developer", "designer", "manager", "student", "other"].map((role) => (
                            <div key={role} className="flex items-center space-x-2">
                                <RadioGroupItem value={role} id={role} />
                                <Label htmlFor={role} className="capitalize">{role}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                    {errors.primaryRole && <p className="text-red-500 text-sm">{errors.primaryRole.message}</p>}
                </div>

                {/* Conditional Other Role Description */}
                {primaryRole === "other" && (
                    <div className="space-y-2">
                        <Label htmlFor="otherRoleDescription">Please describe your role</Label>
                        <Input
                            id="otherRoleDescription"
                            placeholder="e.g., Freelance consultant, Entrepreneur, etc."
                            {...register("otherRoleDescription")}
                        />
                        {errors.otherRoleDescription && <p className="text-red-500 text-sm">{errors.otherRoleDescription.message}</p>}
                    </div>
                )}

                <div className="flex justify-end">
                    <Button type="submit" disabled={!isValid}>
                        Next
                    </Button>
                </div>
            </form>
        </>
    );
};

export default Step1;