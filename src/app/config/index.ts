import dotenv from 'dotenv';

interface IConfig {
    PORT: string | undefined;
    DATABASE_URL: string | undefined;
    BCRIPT_SALT: string | number | undefined
}

dotenv.config();

const config: IConfig = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    BCRIPT_SALT: process.env.BCRIPT_SALT
};

export default config;