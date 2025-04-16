import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'FE';

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.checkUrl();
  }

  protected checkUrl() {
    const userSession = localStorage.getItem('token');
    if (userSession) {
      const basePathRoute = location.pathname;
      if (basePathRoute.includes('/ui-components/login')) {
        this.router.navigate(['/'], {replaceUrl: true}).then();
      }
    } else {
      this.router.navigate(['/ui-components/login']).then();
    }
  }
}
