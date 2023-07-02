import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLoginService } from '../../services/auth-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  expiresIn: any;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private loginAuthService: AuthLoginService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['admin@hrvite.com', Validators.required],
      password: ['VijayHrviteV2Master@123', Validators.required]
    })
  }

  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.callingTokenApi();
  }

  callingTokenApi() {
    this.loginAuthService.loginTokenAccess(this.f.username.value, this.f.password.value)
      ?.subscribe((res: any) => {
        this.expiresIn = res.accessToken;
        this.router.navigate(['/dashboard'])
        this.loading = false;
        setInterval(() => {
          this.replaceApplicationToken(this.expiresIn);
        }, 1800000)
      }, (error: any) => {
        this.loading = false;
      })
  }

  replaceApplicationToken(authToken: string) {
    this.loginAuthService.refreshToken(authToken)
      ?.subscribe((res: any) => { }, ((error: any) => {
        this.loading = false;
      }))
  }
}
