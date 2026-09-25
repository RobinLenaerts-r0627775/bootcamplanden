import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';

export interface UpcomingTuesday {
  label: string;
  day: number;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
})
export class HomePage implements AfterViewInit, OnDestroy {
  @Input() public upcomingTuesdays: UpcomingTuesday[] = [];
  @Output() public pricesRequested = new EventEmitter<void>();

  @ViewChild('reviewsCarousel') private reviewsCarousel?: ElementRef<HTMLElement>;
  @ViewChild('reviewsTrack') private reviewsTrack?: ElementRef<HTMLElement>;

  private reviewResizeObserver?: ResizeObserver;

  public ngAfterViewInit(): void {
    this.updateReviewDistance();

    this.reviewResizeObserver = new ResizeObserver(() => this.updateReviewDistance());
    if (this.reviewsCarousel) {
      this.reviewResizeObserver.observe(this.reviewsCarousel.nativeElement);
    }
    if (this.reviewsTrack) {
      this.reviewResizeObserver.observe(this.reviewsTrack.nativeElement);
    }
  }

  public ngOnDestroy(): void {
    this.reviewResizeObserver?.disconnect();
  }

  private updateReviewDistance(): void {
    const carousel = this.reviewsCarousel?.nativeElement;
    const track = this.reviewsTrack?.nativeElement;

    if (!carousel || !track) {
      return;
    }

    const lastReview = track.lastElementChild as HTMLElement | null;
    const lastReviewEnd = lastReview ? lastReview.offsetLeft + lastReview.offsetWidth : 0;
    const distance = Math.max(0, lastReviewEnd - carousel.clientWidth);
    track.style.setProperty('--review-offset', `${-distance}px`);
  }
}
