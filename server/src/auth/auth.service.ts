import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    // 회원가입
     async register(registerDto: RegisterDto) {
        // DTO에서는 name, email, password만 사용합니다.
        const { name, email, password } = registerDto;

        // User 테이블에서 이메일 중복을 확인합니다.
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Employee 테이블이 아닌 User 테이블에 사용자를 생성합니다.
        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        // password 필드를 제외하고 반환
        const { password: _, ...result } = user;
        return result;
    }

    // 로그인
    async login(loginDto: LoginDto) {
        const { employeeId, password } = loginDto;

        // 직원 조회
        const employee = await this.prisma.employee.findUnique({
            where: { employeeId },
        });

        if (!employee) {
            throw new UnauthorizedException('사번 또는 비밀번호가 올바르지 않습니다');
        }

        // 비밀번호 검증
        const isPasswordValid = await bcrypt.compare(password, employee.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('사번 또는 비밀번호가 올바르지 않습니다');
        }

        // JWT 토큰 생성
        const payload = {
            sub: employee.id,
            employeeId: employee.employeeId,
            role: employee.role
        };

        return {
            access_token: this.jwtService.sign(payload),
            employee: {
                id: employee.id,
                employeeId: employee.employeeId,
                name: employee.name,
                email: employee.email,
                role: employee.role,
                position: employee.position,
            },
        };
    }

    // JWT 토큰 검증 및 직원 정보 조회
    async validateUser(userId: number) {
        const employee = await this.prisma.employee.findUnique({
            where: { id: userId },
        });

        if (!employee) {
            return null;
        }

        const { password: _, ...result } = employee;
        return result;
    }

    async signup(email: string, password: string, name: string) {
        // 비밀번호 해시
        const hashedPassword = await bcrypt.hash(password, 10);

        // 사용자 생성
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        return { id: user.id, email: user.email, name: user.name };
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
}
