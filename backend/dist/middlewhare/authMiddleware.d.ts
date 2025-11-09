import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/userModel.js';
declare global {
    namespace Express {
        interface User extends IUser {
        }
    }
}
export declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const adminMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=authMiddleware.d.ts.map