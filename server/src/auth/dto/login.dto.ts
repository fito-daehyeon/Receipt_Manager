import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    employeeId: string; // 사번으로 로그인

    @IsNotEmpty()
    @IsString()
    password: string;
}
