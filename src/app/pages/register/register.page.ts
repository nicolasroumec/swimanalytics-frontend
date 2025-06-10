import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegisterDTO } from '../../models/dtos/register.dto';
import { Gender } from '../../models/enums/gender.enum';
import { UserRole } from '../../models/enums/user-role.enum';


export function passwordMatchValidator(control: AbstractControl): {[key: string]: boolean} | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  return password.value === confirmPassword.value ? null : { 'passwordMismatch': true };
}

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ]
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;

  Gender = Gender;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],

      height: ['', [Validators.required, Validators.min(100), Validators.max(250)]],
      weight: ['', [Validators.required, Validators.min(30), Validators.max(200)]],
      wingspan: ['', [Validators.required, Validators.min(100), Validators.max(300)]],

      club: [''],

      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmPassword: ['', Validators.required],

      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validators: passwordMatchValidator
    });
  }

  passwordStrengthValidator(control: AbstractControl): {[key: string]: boolean} | null {
    if (!control.value) return null;

    const password = control.value;
    const hasNumber = /[0-9]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);

    const valid = hasNumber && hasUpper && hasLower;
    return valid ? null : { 'passwordStrength': true };
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;

      const formValue = this.registerForm.value;

      const registerData: RegisterDTO = {
        FirstName: formValue.firstName.trim(),
        LastName: formValue.lastName.trim(),
        Email: formValue.email.toLowerCase().trim(),
        Phone: formValue.phone.trim(),
        DateOfBirth: new Date(formValue.dateOfBirth),
        Gender: parseInt(formValue.gender) as Gender,
        Height: parseFloat(formValue.height),
        Weight: parseFloat(formValue.weight),
        Wingspan: parseFloat(formValue.wingspan),
        Club: formValue.club?.trim() || '',
        Password: formValue.password,
        IsVerified: false,
        IsActive: false,
        role: UserRole.Swimmer
      };

      console.log('Register data:', registerData);

      setTimeout(() => {
        this.isLoading = false;
        console.log('Usuario registrado exitosamente');
        this.router.navigate(['/login'], {
          queryParams: {
            registered: 'true',
            email: registerData.Email,
            verification: 'pending'
          }
        });
      }, 3000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  goBack(): void {
    this.location.back();
  }

  openTerms(event: Event): void {
    event.preventDefault();
    console.log('Opening terms and conditions');
  }

  openPrivacy(event: Event): void {
    event.preventDefault();
    console.log('Opening privacy policy');
  }

  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get email() { return this.registerForm.get('email'); }
  get phone() { return this.registerForm.get('phone'); }
  get dateOfBirth() { return this.registerForm.get('dateOfBirth'); }
  get gender() { return this.registerForm.get('gender'); }
  get height() { return this.registerForm.get('height'); }
  get weight() { return this.registerForm.get('weight'); }
  get wingspan() { return this.registerForm.get('wingspan'); }
  get club() { return this.registerForm.get('club'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get acceptTerms() { return this.registerForm.get('acceptTerms'); }
}
