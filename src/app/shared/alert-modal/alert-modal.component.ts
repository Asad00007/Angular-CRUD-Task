import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.css',
})
export class AlertModalComponent {
  @Input() errorMessages;
  @Output() close = new EventEmitter<any>();

  onClose() {
    this.close.emit();
  }
}
