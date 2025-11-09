import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    name: string;
    description: string;
    categoryId: mongoose.Types.ObjectId;
    price: number;
    images: string[];
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    description: string;
    categoryId: mongoose.Types.ObjectId;
    price: number;
    images: string[];
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    name: string;
    description: string;
    categoryId: mongoose.Types.ObjectId;
    price: number;
    images: string[];
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    description: string;
    categoryId: mongoose.Types.ObjectId;
    price: number;
    images: string[];
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    description: string;
    categoryId: mongoose.Types.ObjectId;
    price: number;
    images: string[];
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    name: string;
    description: string;
    categoryId: mongoose.Types.ObjectId;
    price: number;
    images: string[];
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=productModel.d.ts.map