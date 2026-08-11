import LoginForm from "./LoginForm";

export default function PrijavaPage() {
    return (
        <main className="mx-auto max-w-md p-8">
            <h1 className="mb-6 text-3xl font-bold">
                Prijava
            </h1>

            <LoginForm />
        </main>
    );
}