import { firstValueFrom } from 'rxjs';
import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { toastInfo } from 'src/app/toast';

declare var bootstrap: any;
@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.css'],
})
export class ToastsComponent implements OnInit {
  myToast: any;

  _toastInf!: toastInfo;

  constructor(private toastS: ToastService) {
    this.toastS.toastStatut.subscribe((data) => (this.toastInf = data));
  }

  set toastInf(toastInfo: any) {
    if (toastInfo == undefined || !this.myToast) {
      var myToastEl = document.getElementById('toast');
      this.myToast = bootstrap.Toast.getOrCreateInstance(myToastEl);
      return;
    }

    if (!toastInfo.isShow) {
      return;
    } else {
      this._toastInf = toastInfo;
      this.myToast.show();
    }
  }

  ngOnInit() {
    var myToastEl: any = document.getElementById('toast');
    this.myToast = bootstrap.Toast.getOrCreateInstance(myToastEl);

    this.myToast.show();
    this.myToast.hide();
  }
}
