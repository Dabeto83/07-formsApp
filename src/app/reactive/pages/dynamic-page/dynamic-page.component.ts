import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css'
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ]),
  });

  public newFavorite: FormControl = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder) { }

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isNotValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
  }

  isNotValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors
      && formArray.controls[index].touched
  }

  getFieldError(field: string): string {
    if (!this.myForm.controls[field]) return '';
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracters.`;
      }
    }
    return '';
  }

  onAddToFavorites(): void {
    if (this.newFavorite.invalid) {
      return
    };

    const newGame = this.newFavorite.value;
    this.favoriteGames.push(this.formBuilder.control(newGame, [Validators.required]));
    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      console.log(this.myForm.controls['name'].errors)
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
   // this.myForm.controls['favoriteGames'].reset();
    (this.myForm.controls['favoriteGames'] as FormArray) = this.formBuilder.array([]);
    this.myForm.reset();
  }
}
