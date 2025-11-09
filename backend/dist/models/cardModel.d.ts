export const Card: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    cardType: "Visa" | "Mastercard" | "Amex";
    lastFourDigits: string;
    cardholderName: string;
    expiryMonth: string;
    expiryYear: string;
    isDefault: boolean;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    cardType: "Visa" | "Mastercard" | "Amex";
    lastFourDigits: string;
    cardholderName: string;
    expiryMonth: string;
    expiryYear: string;
    isDefault: boolean;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    userId: mongoose.Types.ObjectId;
    cardType: "Visa" | "Mastercard" | "Amex";
    lastFourDigits: string;
    cardholderName: string;
    expiryMonth: string;
    expiryYear: string;
    isDefault: boolean;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    userId: mongoose.Types.ObjectId;
    cardType: "Visa" | "Mastercard" | "Amex";
    lastFourDigits: string;
    cardholderName: string;
    expiryMonth: string;
    expiryYear: string;
    isDefault: boolean;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    cardType: "Visa" | "Mastercard" | "Amex";
    lastFourDigits: string;
    cardholderName: string;
    expiryMonth: string;
    expiryYear: string;
    isDefault: boolean;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    cardType: "Visa" | "Mastercard" | "Amex";
    lastFourDigits: string;
    cardholderName: string;
    expiryMonth: string;
    expiryYear: string;
    isDefault: boolean;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Card;
import mongoose from 'mongoose';
//# sourceMappingURL=cardModel.d.ts.map