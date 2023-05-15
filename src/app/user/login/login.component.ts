import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auth: AngularFireAuth, private router: Router, public googleAuth: AuthService){}
  credentials = {
    email: '',
    password: '',
  }
  showAlert = false;
  alertMsg = 'Please wait! We are logging you in'
  alertColor = 'Blue'
  inSubmission = false

 async login() {
  this.showAlert =true;
  this.inSubmission =true;
try {
   const user = await this.auth.signInWithEmailAndPassword(
    this.credentials.email, this.credentials.password
   )


} catch (error) {
  this.inSubmission = false;
  this.alertMsg= 'An unexpected error occurred. Please try again later.';
  this.alertColor = 'red';

  return
}
this.alertColor = 'green';
this.alertMsg=  'Success! You are now logged in'

}


}
