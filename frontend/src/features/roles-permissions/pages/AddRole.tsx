import RoleForm from "../forms/RoleForm";


export default function AddRole() {
    const handleSubmit = async (data: Record<string, any>) => {
        // Yahan useSubmit() se POST API call
        console.log("Create Customer:", data);
    };

    return (
        <RoleForm
            mode="create"
            onSubmit={handleSubmit}
        />
    );
}