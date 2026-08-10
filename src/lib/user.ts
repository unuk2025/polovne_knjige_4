export type Status = "gost" | "kupac" | "administrator";

export type User = {
    status: Status;
    korisnickoIme: string | null;
};

export const currentUser: User = {
    status: "administrator",
    korisnickoIme: "admin",
};