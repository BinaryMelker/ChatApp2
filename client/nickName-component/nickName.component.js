"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/*import NgZone for Google to work,
ref: http://stackoverflow.com/questions/39880243/implementing-google-sign-in-button-in-angular2 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var globalVars = require("../service/global");
var core_2 = require("@angular/core");
/// <reference path="../../typings/globals/jquery/index.d.ts/>
require("/socket.io/socket.io.js");
var NickNameComponent = (function () {
    function NickNameComponent(router, ngZone) {
        var _this = this;
        this.nickname = null;
        this.router = router;
        // Google signin stuff.
        window['onSignIn'] = function (user) { return ngZone.run(function () { return _this.onSignIn(user); }); };
    }
    NickNameComponent.prototype.submit = function (data) {
        this.nickname = data.value;
        if (this.nickname) {
            globalVars.socket = io({ query: "userName=" + this.nickname });
            this.router.navigate(["chat"]);
        }
    };
    NickNameComponent.prototype.addNickname = function ($event, nickname) {
        if ($event.which === 13) {
            this.submit(nickname);
        }
    };
    // Google sign in code
    NickNameComponent.prototype.onSignIn = function (googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
    };
    NickNameComponent.prototype.signOut = function () {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    };
    return NickNameComponent;
}());
NickNameComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "nick-name",
        templateUrl: "nickName.component.html"
    }),
    __param(0, core_2.Inject(router_1.Router))
], NickNameComponent);
exports.NickNameComponent = NickNameComponent;
