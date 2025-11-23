import React, { useState } from 'react';
import { authAPI } from '../../api/auth.ts';
import styles from './Signup.module.css';
import logo from '../../assets/logo.png';
import Confetti from 'react-confetti';
import type { SignupFormData } from '../../types.ts';

// 부서 목록 정의
const DEPARTMENTS = ['영업부', '관리부', '기술부', '마케팅부'];

const Signup = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    position: DEPARTMENTS[0], // 기본값으로 첫 번째 부서 설정
  });

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    setMessage('');

    try {
      await authAPI.signup(formData);
      setIsSuccess(true);
      setMessage('회원가입 성공! 환영합니다 🎉');
      // 폼 초기화
      setFormData({
        name: '',
        email: '',
        password: '',
        position: DEPARTMENTS[0],
      });
    } catch (error: any) {
      setIsSuccess(false);
      const errorMessage =
        error.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
      setMessage(`회원가입 실패: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {isSuccess && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <div className={styles.brandingPanel}>
        <img src={logo} alt="Company Logo" className={styles.brandingLogo} />
        <h2 className={styles.brandingTitle}>Receipt Manager</h2>
        <p className={styles.title}>영수증 관리를 손쉽게 시작하세요.</p>
      </div>
      <div className={styles.formPanel}>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>직원 회원가입</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">이름</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요 (8자 이상)"
                required
                minLength={8}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="position">부서</label>
              <select
                name="position"
                id="position"
                value={formData.position}
                onChange={handleChange}
                required
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className={styles.button} disabled={isLoading}>
              {isLoading ? '가입 처리 중...' : '회원가입'}
            </button>
          </form>
          {message && (
            <p className={`${styles.message} ${isSuccess ? styles.success : styles.error}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;