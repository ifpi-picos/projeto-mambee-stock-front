import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-error',
  templateUrl: './message-error.component.html',
})
export class MessageErrorComponent implements OnInit {
  @Input() message = '';
  constructor() {}

  ngOnInit(): void {}
}
