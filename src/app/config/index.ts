import dotenv from 'dotenv';

interface IConfig {
    PORT: string | undefined;
    DATABASE_URL: string | undefined;
}

dotenv.config();

const config: IConfig = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL
};

export default config;