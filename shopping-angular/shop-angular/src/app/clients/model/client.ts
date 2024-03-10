export interface Client {
    id: number | null;
    name: string;
    email: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    active: boolean;
}
