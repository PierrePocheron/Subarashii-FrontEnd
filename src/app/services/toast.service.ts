import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastStatut = new BehaviorSubject<any>(undefined);

  timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async activeToast(toastInfo: any) {
    const toast: any = document.getElementById('toast');
    toast.parentNode.style.zIndex = '99';
    if (this.toastStatut.getValue() == true) {
      return;
    }
    this.toastStatut.next(toastInfo);
    await this.timeout(6000);
    toast.parentNode.style.zIndex = '-1';
  }
}
