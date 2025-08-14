export default () => ({
  port: parseInt(process.env.BACKEND_PORT, 10) || 5001,
  backendUrl: process.env.BACKEND_URL,
  jwtSecret: process.env.JWT_SECRET || 'random_jwt_secret_123#4',
  imgurSecret: process.env.IMGUR_SECRET,
});
