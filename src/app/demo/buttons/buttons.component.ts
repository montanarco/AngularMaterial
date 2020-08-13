import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons',
  template: `
    <button class="mat-button">
    <mat-icon>face</mat-icon>
    click me!
  </button>
  &nbsp;   &nbsp; 
  <mat-checkbox>check me!</mat-checkbox>
  `,
  styles: [
  ]
})
export class ButtonsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
