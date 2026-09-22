import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-prices-page',
  templateUrl: './prices-page.html',
})
export class PricesPage {
  @Output() public homeRequested = new EventEmitter<void>();
}
