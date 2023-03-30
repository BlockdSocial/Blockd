// Constants.js
const prod: any = {
  url: {
    API_URL: 'https://blockd.app/backend/api',
    PUBLIC_URL: 'https://blockd.app/backend/images',
    DASHBOARD_URL: 'https://blockd.app/dashboard'
  }
};

const dev = {
  url: {
    API_URL: 'http://127.0.0.1:8000/api',
    PUBLIC_URL: 'http://127.0.0.1:8000/images',
    DASHBOARD_URL: 'http://localhost:3000/dashboard'
  }
};
export const config = process.env.NODE_ENV === 'development' ? prod : prod;
export const GID = process.env.NODE_ENV === 'development' ? '' : '=G-QW4Q5G8G4K';
export const AblyKey = "SGspkA.hkA1-w:xQcIQuax6oUPd6kvaYaipwsIvhjS_dL58l4zkoJwFBg";
