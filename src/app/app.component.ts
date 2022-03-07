import { AuthGuard } from './services/auth.guard';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'subarashii';
  public showTemplate: boolean = true;
  private urls = ['/login', '/register'];

  constructor(private authG: AuthGuard) {
    this.showTemplate = !this.urls.includes(location.pathname);
  }

  ngOnInit() {}
}
