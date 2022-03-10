import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastStatut = new BehaviorSubject<any>(undefined);

  activeToast(toastInfo: any) {
    if (this.toastStatut.getValue() == true) {
      return;
    }

    this.toastStatut.next(toastInfo);

    setTimeout(() => {
      this.toastStatut.next(undefined);
    }, 3000);
  }
}
