import { HostListener, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'webesidevopsmetrics';

  currentUser: any;

  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event) {
    localStorage.clear();
  }

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHandler(event) {
    localStorage.clear();
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }
}