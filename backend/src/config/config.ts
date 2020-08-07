import * as dotenv from 'dotenv';
dotenv.config();
import {dev} from './configs.dev';
import {local} from './configs.dev.local';

export const CURRENT_MODE = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'DEV';

let configMode = null;
switch (CURRENT_MODE) {
    case 'DEV':
    default:
        configMode =  {
            ...dev,
            ...local
        };
        break;
}

export let configs = configMode;
