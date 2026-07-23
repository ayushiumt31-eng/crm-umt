// import { LeadForm } from "@/features/leads/components";

import LeadForm from "../forms/LeadForm";

export default function AddLead() {
    const handleSubmit = async (data: Record<string, any>) => {
        // Yahan useSubmit() se POST API call
        console.log("Create Customer:", data);
    };

    return (
        <LeadForm
            mode="create"
            onSubmit={handleSubmit}
        />
    );
}