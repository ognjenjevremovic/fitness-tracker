import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AuthFormComponent {

  @Output()
  public readonly submit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public readonly authForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private readonly fb: FormBuilder,
  ) {/** */}

  public onFormSubmit(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.authForm.valid) {
      this.submit.emit(this.authForm);
    }
  }

  public getFieldRequired(field: string): boolean {
    return this.authForm.get(field).hasError('required')
      && this.authForm.get(field).touched;
  }

  public getFieldInvalidInput(field: string, validation: string): boolean {
    console.log(this.authForm.get('password').errors);
    return this.authForm.get(field).hasError(validation)
      && this.authForm.get(field).touched;
  }
}
