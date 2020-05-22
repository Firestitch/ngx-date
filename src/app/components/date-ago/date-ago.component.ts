import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit
} from '@angular/core';

import { ago, duration as fsDuration, format as fsFormat, parse } from '../../../libs';
import { differenceInSeconds } from 'date-fns';


@Component({
  selector: 'fs-date-ago',
  templateUrl: './date-ago.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsDateAgoComponent implements OnInit, OnChanges {

  @Input() public date = null;
  @Input() public showTime = false;
  @Input() public format = 'date';
  @Input() public showTooltip = true;

  @Input() public tooltipDateFormat: string = null;

  public formattedDate: string = null;
  public tooltip: string = null;

  constructor(public elementRef: ElementRef) { }

  public ngOnInit() {
    this.updateFormatted();
  }

  public ngOnChanges() {
    this.updateFormatted();
  }

  private updateFormatted() {
    this.formattedDate = ago(this.date, this.format);

    if (this.showTooltip) {
      const tooltipFormat = this.getTooltipFormat();
      const tooltipAgo = this.getTooltipAgo();

      this.tooltip = fsFormat(this.date, tooltipFormat) + ' · ' + tooltipAgo;
    }
  }

  /**
   * Setting format w/o year if year is the same
   */
  private getTooltipFormat(): string {

    if (this.tooltipDateFormat) {
      return this.tooltipDateFormat;
    }

    let format = 'date-time';
    const todayYear = new Date().getFullYear();
    const dateYear = new Date(this.date).getFullYear();

    if (todayYear === dateYear) {
      format = 'date-time-yearless';
    }

    return format
  }

  /**
   * Forming second part of the tooltip
   */
  private getTooltipAgo(): string {
    let tooltip = 'now';

    const date = parse(this.date);
    if (!date) {
      return '';
    }

    const dateDifference = differenceInSeconds(new Date(), date);

    const options = {
      maxOutputs: 1,
      suffix: true,
      years: true,
      months: true,
      days: true,
      hours: true,
      minutes: true
    };

    // if difference more than 1 minute
    if (dateDifference > 59 || dateDifference < 0) {
      tooltip = fsDuration(dateDifference, options)
    }

    return tooltip;
  }
}
