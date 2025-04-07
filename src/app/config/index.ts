import dotenv from 'dotenv';

interface IConfig {
    NODE_ENV: string
    PORT: string
    DATABASE_URL: string
    BCRIPT_SALT: string
    DEFAULT_PASSWORD: string
    JWT_ACCESS_SECRET: string
}

dotenv.config();

const config: IConfig = {
    NODE_ENV: process.env.NODE_ENV as string,
    PORT: process.env.PORT as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    BCRIPT_SALT: process.env.BCRIPT_SALT as string,
    DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string
};

export default config;