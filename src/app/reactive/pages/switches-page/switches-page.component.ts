import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styleUrl: './switches-page.component.css'
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = this.formBuilder.group({
    gender: ['M', [Validators.required]],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  });

  public person = {
    gender: 'M',
    wantNotifications: false
  }


  constructor(private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  isNotValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
  }

  getFieldError(field: string): string {
    if (!this.myForm.controls[field]) return '';
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Debe aceptar las condiciones de uso.';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracters.`;
      }
    }
    return '';
  }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }



    const { termsAndConditions, ...newPerson } = this.myForm.value

    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);
  }
}
