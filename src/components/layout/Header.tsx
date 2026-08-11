import { currentUser } from "@/lib/user";

export default async function Header() {
    const user = await currentUser();

    return (
        <header className="mb-10 flex items-center justify-between rounded-lg border border-gray-300 bg-slate-100 p-5">
            <div>
                <h1 className="text-3xl font-bold">
                    Polovne knjige
                </h1>

                <p className="text-sm text-gray-600">
                    Studentski projekat
                </p>
            </div>

            <div className="text-right">
                <p className="text-sm text-gray-600">
                    Status korisnika
                </p>

                <p className="text-lg font-semibold">
                    {user.status}
                </p>

                {user.korisnickoIme && (
                    <p className="text-sm text-gray-600">
                        {user.korisnickoIme}
                    </p>
                )}
            </div>
        </header>
    );
}