import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor() { }
  // validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

  //   const email = control.value;
  //   console.log({ email });

  //   return of({
  //     emailTaken: true
  //   }).pipe(
  //     delay(2000)
  //   );
  // }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    const email = control.value;


    // return this.http.get<any[]>(`http://localhost:3000/users?q=${email}`).pipe(
    //   map(response => {
    //     return (response.length === 0) ? null : {
    //       emailTake: true
    //     }
    //   })
    // );

    const httpCallObservable = new Observable<ValidationErrors | null>((subscriber) => {
      console.log({ email });

      if (email === 'dario.barreto@gmail.com') {
        subscriber.next({ emailTaken: true });
        subscriber.complete();
        return;
      }

      subscriber.next(null);
      subscriber.complete()
    }).pipe(
      delay(2000)
    );

    return httpCallObservable;
  }

}
