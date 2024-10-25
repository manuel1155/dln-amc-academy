import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { FormFeedbackComponent, AlertComponent, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './../../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [FormFeedbackComponent, CommonModule, AlertComponent, ContainerComponent, FormsModule, ReactiveFormsModule, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  customStylesValidated = false;
  browserDefaultsValidated = false;
  tooltipValidated = false;
  errorSesion = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {
    if (this.authService.currentUser) {
      this.router.navigate(['/dashboard']);
    }
    this.onChanges();
  }

  onChanges(){
    this.loginForm.valueChanges.subscribe(data => {
      if(this.loginForm.value.email.length > 3 || this.loginForm.value.password.length > 3){
        this.customStylesValidated = true;
      }else{
        this.customStylesValidated = false;
      }
    })
  }

  onLogin() {
    this.customStylesValidated = true;
    console.log('Form submitted');
    console.log(this.loginForm.value)
    this.authService.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
    .then(async (userCredential) => {
      console.log('User signed in:', userCredential.user);
      this.router.navigate(['/dashboard']);
    })
    .catch((error) => {
      console.log('error de inicio de sesion')
      this.errorSesion = true;
      this.loginForm.setValue({
        email: '',
        password: ''
      });
    });
  }

}
