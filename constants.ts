// Constants.js
const prod: any = {
  url: {
    API_URL: 'https://blockd.app/backend/api',
  }
};

const dev = {
  url: {
    API_URL: 'http://127.0.0.1:8000/api'
  }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;
