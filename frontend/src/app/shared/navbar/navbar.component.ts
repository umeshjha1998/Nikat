import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  isAdmin = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
      this.isLoggedIn = this.authService.isLoggedIn();
      this.isAdmin = this.authService.getUserRole() === 'ADMIN';
  }

  toggleDarkMode(event: any) {
    if (event.checked) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  translate() {
    alert('Translation feature coming soon!');
  }
}
