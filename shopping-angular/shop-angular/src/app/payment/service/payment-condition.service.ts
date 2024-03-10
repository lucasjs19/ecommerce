import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentCondition } from '../model/paymentCondition';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentConditionService {

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<PaymentCondition[]>('http://localhost:8080/payment_condition');
  }

  getConditionById(id: number){
    return this.httpClient.get<(PaymentCondition)>('http://localhost:8080/payment_condition/'+ id).pipe(
      map((data: any) => {
        return {
          id: data.id,
          description: data.description
        } as PaymentCondition;
      })
    )
  }
}
