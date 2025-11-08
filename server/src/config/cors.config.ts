// cors.config.ts
import cors, { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
    origin: 'http://localhost:5500', // Tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

export default cors(corsOptions);