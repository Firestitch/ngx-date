"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var fsdate_service_1 = require("./fsdate.service");
var FsDateAgoPipe = (function () {
    function FsDateAgoPipe(FsDate) {
        this.FsDate = FsDate;
    }
    FsDateAgoPipe.prototype.transform = function (value, format) {
        return this.FsDate.ago(value, format);
    };
    FsDateAgoPipe = __decorate([
        core_1.Pipe({
            name: 'fsDateAgo'
        }),
        __metadata("design:paramtypes", [fsdate_service_1.FsDate])
    ], FsDateAgoPipe);
    return FsDateAgoPipe;
}());
exports.FsDateAgoPipe = FsDateAgoPipe;
//# sourceMappingURL=fsdateago.pipe.js.map