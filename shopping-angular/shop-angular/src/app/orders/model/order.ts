import { Client } from "../../clients/model/client";
import { OrderItems } from "./orderItems";
import { OrderPayment } from "./orderPayment";

export interface Order {
    id: number | null;
    client: Client;
    status: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    orderItems: OrderItems[];
    orderPayment: OrderPayment | null
}
