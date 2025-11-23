import apiClient from './apiClient';
// 'SignupFormData'를 중괄호로 감싸주세요.
import type { SignupFormData } from '../types.ts'; // (O)

export const authAPI = {
  // 모든 필드를 포함하는 객체를 받도록 수정
  signup: (formData: SignupFormData) =>
    apiClient.post('/auth/signup', formData),

  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
};