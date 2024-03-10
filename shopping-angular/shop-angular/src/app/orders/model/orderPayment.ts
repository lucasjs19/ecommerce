import { PaymentCondition } from "../../payment/model/paymentCondition";

export interface OrderPayment {
    id: number | null;
    payment: PaymentCondition | null;
    prize: number;
}
