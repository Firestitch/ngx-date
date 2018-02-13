"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var common_2 = require("@firestitch/common");
var fsdate_pipe_1 = require("./fsdate.pipe");
var fsdate_service_1 = require("./fsdate.service");
var fsdateago_pipe_1 = require("./fsdateago.pipe");
var FsDateModule = (function () {
    function FsDateModule() {
    }
    FsDateModule_1 = FsDateModule;
    FsDateModule.forRoot = function () {
        return {
            ngModule: FsDateModule_1,
            providers: [fsdate_service_1.FsDate]
        };
    };
    FsDateModule = FsDateModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_2.FsCommonModule
            ],
            exports: [
                fsdate_pipe_1.FsDatePipe,
                fsdateago_pipe_1.FsDateAgoPipe
            ],
            entryComponents: [],
            declarations: [
                fsdate_pipe_1.FsDatePipe,
                fsdateago_pipe_1.FsDateAgoPipe
            ],
            providers: [
                fsdate_service_1.FsDate
            ],
        })
    ], FsDateModule);
    return FsDateModule;
    var FsDateModule_1;
}());
exports.FsDateModule = FsDateModule;
//# sourceMappingURL=fs-date.module.js.map