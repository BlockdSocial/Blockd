// Constants.js
const prod: any = {
  url: {
    API_URL: 'https://blockd.app/backend/api',
    PUBLIC_URL: 'https://d12obed56w9rwd.cloudfront.net',
    DASHBOARD_URL: 'https://blockd.app/dashboard',
    ALCHEMY_API_KEY: 'MgmBBWoM_qBuALlxo8Y7rKm_eQ_28UB9'
  }
};

const dev = {
  url: {
    API_URL: 'http://127.0.0.1:8000/api',
    PUBLIC_URL: 'https://d12obed56w9rwd.cloudfront.net',
    DASHBOARD_URL: 'http://localhost:3000/dashboard',
    ALCHEMY_API_KEY: 'MgmBBWoM_qBuALlxo8Y7rKm_eQ_28UB9'
  }
};
export const config = process.env.NODE_ENV === 'development' ? prod : prod;
export const GID = process.env.NODE_ENV === 'development' ? '' : '=G-QW4Q5G8G4K';
export const AblyKey = "SGspkA.hkA1-w:xQcIQuax6oUPd6kvaYaipwsIvhjS_dL58l4zkoJwFBg";
