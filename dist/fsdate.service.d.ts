import { FsUtil, FsMath } from '@firestitch/common';
export declare const SECONDS: {
    YEAR: number;
    MONTH: number;
    DAY: number;
    HOUR: number;
    MINUTE: number;
};
export declare class FsDate {
    private FsUtil;
    private FsMath;
    constructor(FsUtil: FsUtil, FsMath: FsMath);
    duration(time: any, options: any): string;
    granularDuration(time: any, options?: {}): string;
    iso8601(date: any): any;
    ago(date: any, format?: string): string;
    format(date: any, format?: string): string;
    range(from: any, to: any, format?: string): any;
    private get_format_string(date, format?);
    private formatOptions(options);
}
