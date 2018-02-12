"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var pages_1 = require("../pages");
var pages_2 = require("../pages");
/**
 * Generated class for the VendorTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VendorTabPage = (function () {
    function VendorTabPage(navCtrl, translateService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.translateService = translateService;
        this.Tab5Root = pages_1.Tab5Root;
        this.tab4Root = pages_2.Tab4Root;
        this.tab1Title = " ";
        this.tab3Title = " ";
        translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE']).subscribe(function (values) {
            _this.tab1Title = values['TAB1_TITLE'];
            _this.tab3Title = values['TAB3_TITLE'];
        });
    }
    VendorTabPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad VendorTabPage');
    };
    return VendorTabPage;
}());
VendorTabPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: 'page-vendor-tab',
        templateUrl: 'vendor-tab.html',
    })
], VendorTabPage);
exports.VendorTabPage = VendorTabPage;
