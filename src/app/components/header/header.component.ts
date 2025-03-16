import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <h1>Chithram</h1>
    </header>
  `,
  styles: [`
    .header {
      background-color: #fff;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
      margin: 0;
      color: #333;
    }
  `]
})
export class HeaderComponent {} 