var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { UserData } from '../../providers/user-data';
import { TabsPage } from '../tabs/tabs';
import { APIVariables } from '../../auth.variables';
var SignupPage = (function () {
    function SignupPage(navCtrl, userData, http) {
        this.navCtrl = navCtrl;
        this.userData = userData;
        this.http = http;
        this.signup = {};
        this.submitted = false;
    }
    SignupPage.prototype.onSignup = function (form) {
        var _this = this;
        this.submitted = true;
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        var options = new RequestOptions({ headers: headers, method: "post" });
        var body = 'email=' + this.signup.username + '&password=' + this.signup.password + '&api_key=' + APIVariables.API_KEY;
        if (form.valid) {
            this.http.post(APIVariables.API_URL + 'user/sign-up', body, options)
                .map(function (res) { return res.json(); }).subscribe(function (res) {
                alert("success " + res.message + 'hello ' + _this.signup.username);
                _this.userData.login(_this.signup.username);
                _this.navCtrl.push(TabsPage);
            }, function (err) {
                alert("failed");
            });
        }
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Component({
        selector: 'page-user',
        templateUrl: 'signup.html'
    }),
    __metadata("design:paramtypes", [NavController, UserData, Http])
], SignupPage);
export { SignupPage };
//# sourceMappingURL=signup.js.map