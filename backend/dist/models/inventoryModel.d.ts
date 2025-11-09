import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    productId: mongoose.Types.ObjectId;
    sizeId: mongoose.Types.ObjectId;
    color: string;
    quantity: number;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    productId: mongoose.Types.ObjectId;
    sizeId: mongoose.Types.ObjectId;
    color: string;
    quantity: number;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    productId: mongoose.Types.ObjectId;
    sizeId: mongoose.Types.ObjectId;
    color: string;
    quantity: number;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    productId: mongoose.Types.ObjectId;
    sizeId: mongoose.Types.ObjectId;
    color: string;
    quantity: number;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    productId: mongoose.Types.ObjectId;
    sizeId: mongoose.Types.ObjectId;
    color: string;
    quantity: number;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    productId: mongoose.Types.ObjectId;
    sizeId: mongoose.Types.ObjectId;
    color: string;
    quantity: number;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=inventoryModel.d.ts.map