// // app.component.ts
// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   template: `
//     <div class="app-wrapper">
//       <nav>
//       </nav>
//       <router-outlet></router-outlet>
//     </div>
//   `,
//   styles: [`
//     .app-wrapper {
//       padding: 20px;
//     }
//     nav {
//       margin-bottom: 20px;
//     }
//     a {
//       padding: 8px 16px;
//       background-color: #007bff;
//       color: white;
//       text-decoration: none;
//       border-radius: 4px;
//     }
//   `]
// })
// export class AppComponent {}
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}