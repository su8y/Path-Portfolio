const path = require('path');

module.exports = {
  mode: 'production', // 배포용으로, 코드를 최적화합니다.
  entry: './src/index.js',
  output: {
    // 번들 파일명과 저장 경로
    filename: 'geoport.umd.js',
    path: path.resolve(__dirname, 'dist'),

    // 라이브러리의 전역 변수명 (브라우저에서 `<script>` 태그로 로드했을 때)
    library: 'GeoPort',

    // UMD (Universal Module Definition) 형식으로 빌드
    libraryTarget: 'umd',

    // 브라우저와 Node.js 환경에서 모두 `this`를 전역 객체로 사용
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};