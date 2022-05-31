import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  search: string = '';
  role: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authS: AuthService,
    private userService: UserService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.search = params['search'];
    });
    this.role = '';
  }

  async ngOnInit() {
    const dataUser: any = await this.userService.getUser();
    this.role = dataUser.body.role;
  }

  onEnter() {
    this.router
      .navigate(['/'], { queryParams: { search: this.search } })
      .then(() => {
        window.location.reload();
      });
  }

  logout() {
    this.authS.logout();
  }
}
