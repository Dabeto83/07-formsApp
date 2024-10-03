import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {


  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    //email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [new EmailValidatorService()]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualToFieldTwo('password', 'confirmPassword'),
    ]
  });

  constructor(private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidatorService
  ) { }

  isNotValidField(field: string) {
    //TODO: Obtener de servicio especializado.
    return this.validatorsService.isNotValidField(this.myForm, field)
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
