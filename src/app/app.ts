import { Component } from '@angular/core';

interface UpcomingTuesday {
  label: string;
  day: number;
}

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  public currentPage: 'home' | 'prices' = 'home';
  public upcomingTuesdays: UpcomingTuesday[] = this.getUpcomingTuesdays();

  public setPage(page: 'home' | 'prices'): void {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private getUpcomingTuesdays(): UpcomingTuesday[] {
    const today = new Date();
    const labels = ['ZO', 'MA', 'DI', 'WO', 'DO', 'VR', 'ZA'];
    const result: UpcomingTuesday[] = [];

    for (let offset = 0; offset < 2; offset++) {
      const base = new Date(today);
      const currentDay = base.getDay();
      const daysUntilTuesday = (9 - currentDay) % 7 || 7;
      base.setDate(today.getDate() + daysUntilTuesday + offset * 7);

      result.push({
        label: labels[2],
        day: base.getDate(),
      });
    }

    return result;
  }
}
