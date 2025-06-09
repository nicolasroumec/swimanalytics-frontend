import { Gender } from '../enums/gender.enum';
import { UserRole } from '../enums/user-role.enum';

export interface RegisterDTO {
  FirstName: string;
  LastName: string;
  DateOfBirth: Date;
  Gender: Gender;
  Height: number;
  Weight: number;
  Wingspan: number;
  Club: string;
  Email: string;
  Phone: string;
  Password: string;
  IsVerified: boolean;
  IsActive: boolean;
  role: UserRole;
}
