import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, inject } from '@angular/core';

import { Subject } from 'rxjs';


import { format, parse } from '../../../libs';
import { MatTooltip } from '@angular/material/tooltip';


@Component({
    selector: 'fs-date-range',
    templateUrl: './date-range.component.html',
    styleUrls: ['./date-range.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatTooltip],
})
export class FsDateRangeComponent implements OnInit, OnChanges, OnDestroy {
  elementRef = inject(ElementRef);
  private _cd = inject(ChangeDetectorRef);


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
  }

}
