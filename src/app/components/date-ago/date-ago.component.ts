import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, inject } from '@angular/core';

import { interval, Observable, Subject } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';

import { differenceInSeconds } from 'date-fns';

import { ago, duration as fsDuration, format as fsFormat, parse } from '../../../libs';
import { NgClass } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';


@Component({
    selector: 'fs-date-ago',
    templateUrl: './date-ago.component.html',
    styleUrls: ['./date-ago.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass, MatTooltip],
})
export class FsDateAgoComponent implements OnInit, OnChanges, OnDestroy {
  elementRef = inject(ElementRef);
  private _cd = inject(ChangeDetectorRef);


  @Input()
  public set date(value) {
    this._date = parse(value);
  }

  public get date(): Date {
    return this._date;
  }
  
  @Input() public showTime = false;
  @Input() public suffix = true;
  @Input() public format = 'date';
  @Input() public showTooltip = true;
  @Input() public tooltipDateFormat: string = null;

  public formattedDate: string = null;
  public tooltip: string = null;

  private _period = 60;
  private _timer$: Observable<number>;

  private _destroy$ = new Subject();
  private _date: Date = null;

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
    this.formattedDate = ago(this.date, this.format, { suffix: this.suffix });

    if (this.showTooltip) {
      const tooltipFormat = this._getTooltipFormat();
      const tooltipAgo = this._getTooltipAgo();

      this.tooltip = `${fsFormat(this.date, tooltipFormat)} · ${tooltipAgo}`;
    }
    this._cd.markForCheck();
  }

  /**
   * Setting format w/o year if year is the same
   */
  private _getTooltipFormat(): string {

    if (this.tooltipDateFormat) {
      return this.tooltipDateFormat;
    }

    let format = 'date-time';
    const todayYear = new Date().getFullYear();
    const dateYear = new Date(this.date).getFullYear();

    if (todayYear === dateYear) {
      format = 'date-time-yearless';
    }

    return format;
  }

  /**
   * Forming second part of the tooltip
   */
  private _getTooltipAgo(): string {
    let tooltip = 'now';

    if (!this.date) {
      return '';
    }

    const dateDifference = this._difference(this.date);
    const options = {
      maxOutputs: 1,
      suffix: true,
      years: true,
      months: true,
      days: true,
      hours: true,
      minutes: true,
    };

    // if difference more than 1 minute
    if (dateDifference > 59 || dateDifference < 0) {
      tooltip = fsDuration(dateDifference, options);
    }

    return tooltip;
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
