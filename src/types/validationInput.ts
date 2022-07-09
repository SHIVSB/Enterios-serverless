import {
  IsString,
  IsBoolean,
  IsArray,
  IsDate,
  isDateString,
  IsDateString,
} from "class-validator";

export class UserSignUpInput {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  city: string;
  @IsString()
  role: string;
  @IsBoolean()
  isAccountVerified: boolean;
  @IsString()
  accountVerificationToken: string;
  @IsDateString()
  accountVerificationTokenExpires: Date;
}

export class UserSignInInput {
  @IsString()
  email: string;
  @IsString()
  password: string;
}

export class EmployeeSignUpInput {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  phone: number;
  @IsString()
  city: string;
  @IsString()
  profilePhoto: string;
  @IsString()
  bio: string;
  @IsString()
  role: string;
  @IsString()
  linkedinProfile: string;
}

export class AddCityInput {
  @IsString()
  city: string;
}
