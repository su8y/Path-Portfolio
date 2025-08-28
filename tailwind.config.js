/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.html"], // HTML 파일 경로를 지정합니다.
    darkMode: 'class', // 다크 모드 활성화 방식 (클래스 기반)
    theme: {
        extend: {
            colors: {
                toss: {
                    blue: '#3B82F6',
                    'light-blue': '#EFF6FF',
                    'text-dark': '#1F2937',
                    'text-light': '#6B7280',
                },
                dark: { // 다크 모드 색상 추가
                    'bg-primary': '#1A1A1A',
                    'bg-secondary': '#2C2C2C',
                    'text-dark': '#E0E0E0',
                    'text-light': '#A0A0A0',
                },
            },
            fontFamily: {
                sans: ['Pretendard Variable', 'sans-serif'], // Pretendard 폰트 적용 (설치 필요)
            },
        },
    },
    plugins: [],
};