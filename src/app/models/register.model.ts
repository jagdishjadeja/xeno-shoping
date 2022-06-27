import { FormControl } from '@angular/forms';

export interface RegisterModel {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
}
