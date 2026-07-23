import EmployeeForm from "../forms/EmployeeForm";


export default function AddEmployee() {
    const handleSubmit = async (data: Record<string, any>) => {
        // Yahan useSubmit() se POST API call
        console.log("Create Customer:", data);
    };

    return (
        <EmployeeForm
            mode="create"
            onSubmit={handleSubmit}
        />
    );
}