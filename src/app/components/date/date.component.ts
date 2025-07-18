import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { interval, Observable, Subject } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';

import { differenceInSeconds } from 'date-fns';

import { format, parse } from '../../../libs';


@Component({
  selector: 'fs-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDateComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public set date(value) {
    this._date = parse(value);
  }

  public get date(): Date {
    return this._date;
  }

  @Input() public format = 'date-yeardiff';

  @Input() public timezone: string = null;

  public formattedDate: string = null;
  public tooltip: string = null;
  public year: string = null;

  private _period = 60;
  private _timer$: Observable<number>;

  private _destroy$ = new Subject();
  private _date: Date = null;

  constructor(
    public elementRef: ElementRef,
    private _cd: ChangeDetectorRef,
  ) { }

  public ngOnInit() {
    this._init();
  }

  public ngOnChanges() {
    this._init();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  private _updateFormatted() {
    if(!this.date) {
      this.formattedDate = null;
      this.tooltip = null;
      this.year = null;

      return;
    }

    let localFormat = this.format;
    if(localFormat.indexOf('-yearnewline') > -1) {
      localFormat += '-yearless';
      const yearDiff = localFormat.indexOf('-yeardiff') > -1;
      if(yearDiff) {
        localFormat = localFormat.replace('-yeardiff', '');
      }

      this.year = !yearDiff || (
        this.date.getFullYear() !== new Date().getFullYear()
      ) ? 
        format(this.date, 'yyyy') : 
        null;
    }

    this.tooltip = `${format(this.date, 'date-time')}`;
    this.formattedDate = format(this.date, localFormat, { timezone: this.timezone });
    this._cd.markForCheck();
  }

  private _init(): void {
    this._updateFormatted();
    if (this._updateWhile(this.date) && !this._timer$) {
      this._timerInit();
    }
  }

  private _timerInit(): void {
    this._timer$ = interval(this._period * 1000)
      .pipe(
        takeWhile(() => this._updateWhile(this.date)),
        takeUntil(this._destroy$),
      );

    this._timer$
      .subscribe({
        next: () => {
          this._updateFormatted();
        },
        complete:
          () => {
            this._timer$ = null;
          },
      });
  }

  private _difference(date: Date): number {
    return differenceInSeconds(new Date(), date);
  }

  private _updateWhile(date: Date): boolean {
    return Math.abs(this._difference(date)) <= (86400 + this._period);
  }

}
