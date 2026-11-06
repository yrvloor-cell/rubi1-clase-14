
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'dotenv';

@Injectable()
export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor() {
        const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

        if (isDevelopmentEnv) {
            const envFilePath = path.join(process.cwd(), '.env.development');

            const existsPath = fs.existsSync(envFilePath);

            if (!existsPath) {
                throw new Error('.env.development no existe');
            }

            this.envConfig = parse(fs.readFileSync(envFilePath));
        } else {
            const envFilePath = path.join(process.cwd(), '.env.production');

            const existsPath = fs.existsSync(envFilePath);

            if (!existsPath) {
                throw new Error('.env.production no existe');
            }

            this.envConfig = parse(fs.readFileSync(envFilePath));
        }
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}
