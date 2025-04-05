import dotenv from 'dotenv';

interface IConfig {
    NODE_ENV: string | undefined
    PORT: string | undefined;
    DATABASE_URL: string | undefined;
    BCRIPT_SALT: string | number | undefined;
    DEFAULT_PASSWORD: string | undefined
}

dotenv.config();

const config: IConfig = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    BCRIPT_SALT: process.env.BCRIPT_SALT,
    DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD
};

export default config;