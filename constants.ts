// Constants.js
const prod: any = {
  url: {
    API_URL: 'https://blockd.app/backend/api',
    PUBLIC_URL: 'https://blockd.app/backend/images'
  }
};

const dev = {
  url: {
    API_URL: 'http://127.0.0.1:8000/api',
    PUBLIC_URL: 'http://127.0.0.1:8000/images'
  }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;
