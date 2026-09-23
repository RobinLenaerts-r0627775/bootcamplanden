import { Component } from '@angular/core';
import { HomePage, UpcomingTuesday } from './home-page';
import { PricesPage } from './prices-page';

@Component({
  imports: [HomePage, PricesPage],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  public currentPage: 'home' | 'prices' = 'home';
  public upcomingTuesdays: UpcomingTuesday[] = this.getUpcomingTuesdays();

  public setPage(page: 'home' | 'prices'): void {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public navigateTo(section: string, event: Event): void {
    event.preventDefault();
    this.currentPage = 'home';

    requestAnimationFrame(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  public showContact(): void {
    this.currentPage = 'home';

    requestAnimationFrame(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
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
