import { useMemo, type ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useFormStore } from "@/store/useFormStore";

interface FormLayoutProps {
    children: ReactNode;
}

export const FormLayout = ({ children }: FormLayoutProps) => {
    const { currentStep } = useFormStore();

    // Map step -> progress percentage
    const progress = useMemo(() => {
        switch (currentStep) {
            case 1:
                return 0;
            case 2:
                return 50;
            case 3:
                return 100;
            default:
                return 0;
        }
    }, [currentStep]);

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-6">
                <Progress value={progress} className="h-2" />
            </div>
            <Card className="p-6 space-y-6">{children}</Card>
        </div>
    );
};
