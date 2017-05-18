/*import NgZone for Google to work,
ref: http://stackoverflow.com/questions/39880243/implementing-google-sign-in-button-in-angular2 */
import { Component, NgZone } from "@angular/core";
import { Router }    from "@angular/router";
import * as globalVars from "../service/global";
import {Inject} from "@angular/core";


/// <reference path="../../typings/globals/jquery/index.d.ts/>



import "/socket.io/socket.io.js";


@Component({
    moduleId: module.id,
    selector: "nick-name",
    templateUrl: "nickName.component.html"
})
export class NickNameComponent {
    nickname: string = null;
    protected router;
    //ngZone: NgZone;

    constructor( @Inject(Router) router: Router, ngZone: NgZone) {
        this.router = router;
        //this.ngZone = ngZone;
        // Google sign-in stuff.
        window['onSignIn'] = (user) => ngZone.run(() => this.onSignIn(user));
    }

    submit(data) {
      this.nickname = data.value;
      if (this.nickname) {
        globalVars.socket = io({ query: "userName=" + this.nickname });
        this.router.navigate(["chat"]);
      }
    }

    addNickname($event, nickname) {
      if ($event.which === 13) { // ENTER_KEY
        this.submit(nickname);
      }
    }

    // Google sign in code
    public onSignIn(googleUser):void {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
    }
    public signOut():void {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }

}