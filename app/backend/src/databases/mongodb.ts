const {
  MONGODB_HOST: host,
  MONGODB_PORT: port,
  MONGODB_DATABASE: database
} = process.env;

export const dbConnection = {
  url: `mongodb://${host}:${port}/${database}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
};
