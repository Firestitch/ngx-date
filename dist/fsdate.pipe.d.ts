import { PipeTransform } from '@angular/core';
import { FsDate } from './fsdate.service';
export declare class FsDatePipe implements PipeTransform {
    private FsDate;
    constructor(FsDate: FsDate);
    transform(value: any, format?: string): string;
}
