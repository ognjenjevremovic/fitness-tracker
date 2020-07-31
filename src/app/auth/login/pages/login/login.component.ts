import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor() {/** */}

  public loginUser(formGroup: FormGroup): void {
    console.log(formGroup.value);
  }

}
