import { PipeTransform } from '@angular/core';
import { FsDate } from './fsdate.service';
export declare class FsDateAgoPipe implements PipeTransform {
    private FsDate;
    constructor(FsDate: FsDate);
    transform(value: any, format?: string): string;
}
