import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface UpcomingTuesday {
  label: string;
  day: number;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
})
export class HomePage {
  @Input() public upcomingTuesdays: UpcomingTuesday[] = [];
  @Output() public pricesRequested = new EventEmitter<void>();
}
