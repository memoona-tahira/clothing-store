import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    googleId: string;
    email: string;
    name: string;
    picture: string;
    isAdmin: boolean;
}
export declare const ClothingUser: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=userModel.d.ts.map