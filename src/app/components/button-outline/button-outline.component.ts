import { Component } from '@angular/core';

@Component({
  selector: 'app-button-outline',
  template: `
    <button class="outline-button"><a href="register">Sign Up</a></button>
  `,
  styles: [
    `
      .outline-button {
        border: 2px solid #000;
        background-color: transparent;
        color: #000;
        padding: 8px 16px;
        font-size: 1.25rem;
        cursor: pointer;
        transition: all 0.5s ease;
        border-radius: 8px;
      }
      .outline-button:hover {
        background-color: #2f8c28;
        border: 2px solid #fff;
        color: #fff;
      }
    `,
  ],
})
export class ButtonOutlineComponent {}
