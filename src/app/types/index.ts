export type User = {
    id: string;
    name: string;
    email: string;
    image?: string;
};

export type Session = {
    user: User;
    expires: string;
};