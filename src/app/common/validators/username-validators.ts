import { AbstractControl, ValidationErrors } from '@angular/forms'
export class UsernameValidators {

  /**
 * Returns ValidationError if { username } contains any space
   * @param control
   */
  static canNotContainSpace(control: AbstractControl): ValidationErrors | null {
    if((control.value as string).indexOf(' ') > 0) {
      return {canNotContainSpace: true};
    }
    return null;
  }

  /**
   * Returns ValidationErrors if { username } is NOT unique
   * @param control
   */
  static shouldBeUnique(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        if(control.value ==='raj')
          resolve({shouldBeUnique: true});
        else
          resolve(null);
      }, 1000)
    });
  }
}
