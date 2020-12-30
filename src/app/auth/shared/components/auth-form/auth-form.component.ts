import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthCredentials } from '../../models/auth.model';


@Component({
  selector: 'ft-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent {

  @Output()
  public readonly submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public readonly authForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private readonly fb: FormBuilder,
  ) {/** */}

  public onFormSubmit(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.authForm.valid) {
      this.submitted.emit(this.authForm);
    }
  }

  public getFieldRequired(field: keyof AuthCredentials): boolean {
    return (
      this.authForm.get(field).hasError('required')
      && this.authForm.get(field).touched
    );
  }

  public getFieldInvalidInput(field: keyof AuthCredentials, validation: string): boolean {
    return (
      this.authForm.get(field).hasError(validation)
      && this.authForm.get(field).touched
    );
  }
}
