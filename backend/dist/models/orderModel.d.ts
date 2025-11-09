import mongoose from 'mongoose';
export declare const Order: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        productId: mongoose.Types.ObjectId;
        sizeId: mongoose.Types.ObjectId;
        quantity: number;
        name?: string | null | undefined;
        price?: number | null | undefined;
        color?: string | null | undefined;
        sizeValue?: string | null | undefined;
        image?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        productId: mongoose.Types.ObjectId;
        sizeId: mongoose.Types.ObjectId;
        quantity: number;
        name?: string | null | undefined;
        price?: number | null | undefined;
        color?: string | null | undefined;
        sizeValue?: string | null | undefined;
        image?: string | null | undefined;
    }> & {
        productId: mongoose.Types.ObjectId;
        sizeId: mongoose.Types.ObjectId;
        quantity: number;
        name?: string | null | undefined;
        price?: number | null | undefined;
        color?: string | null | undefined;
        sizeValue?: string | null | undefined;
        image?: string | null | undefined;
    }>;
    totalAmount: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    orderNumber?: string | null | undefined;
    shippingAddress?: {
        street?: string | null | undefined;
        city?: string | null | undefined;
        postalCode?: string | null | undefined;
        country?: string | null | undefined;
    } | null | undefined;
    paymentMethod?: {
        cardType?: string | null | undefined;
        lastFourDigits?: string | null | undefined;
    } | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        productId: mongoose.Types.ObjectId;
        sizeId: mongoose.Types.ObjectId;
        quantity: number;
        name?: string | null | undefined;
        price?: number | null | undefined;
        color?: string | null | undefined;
        sizeValue?: string | null | undefined;
        image?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        productId: mongoose.Types.ObjectId;
        sizeId: mongoose.Types.ObjectId;
        quantity: number;
        name?: string | null | undefined;
        price?: number | null | undefined;
        color?: string | null | undefined;
        sizeValue?: string | null | undefined;
        image?: string | null | undefined;
    }> & {
        productId: mongoose.Types.ObjectId;
        sizeId: mongoose.Types.ObjectId;
        quantity: number;
        name?: string | null | undefined;
        price?: number | null | undefined;
        color?: string | null | undefined;
        sizeValue?: string | null | undefined;
        image?: string | null | undefined;
    }>;
    totalAmount: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    orderNumber?: string | null | undefined;
    shippingAddress?: {
        street?: string | null | undefined;
        city?: string | null | undefined;
        postalCode?: string | null | undefined;
        country?: string | null | undefined;
    } | null | undefined;
    paymentMethod?: {
        cardType?: string | null | undefined;
        lastFourDigits?: string | null | undefined;
    } | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    userId: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        productId: mongoose.Types.ObjectId;
        sizeId: mongoose.Types.ObjectId;
        quantity: number;
        name?: string | null | undefined;
        price?: number | null | undefined;
        color?: string | null | undefined;
        sizeValue?: string | null | undefined;
        image?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        productId: mongoose.Types.ObjectId;
        sizeId: mongoose.Types.ObjectId;
        quantity: number;
        name?: string | null | undefined;
        price?: number | null | undefined;
        color?: string | null | undefined;
        sizeValue?: string | null | undefined;
        image?: string | null | undefined;
    }> & {
        productId: mongoose.Types.ObjectId;
        sizeId: mongoose.Types.ObjectId;
        quantity: number;
        name?: string | null | undefined;
        price?: number | null | undefined;
        color?: string | null | undefined;
        sizeValue?: string | null | undefined;
        image?: string | null | undefined;
    }>;
    totalAmount: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    orderNumber?: string | null | undefined;
    shippingAddress?: {
        street?: string | null | undefined;
        city?: string | null | undefined;
        postalCode?: string | null | undefined;
        country?: string | null | undefined;
    } | null | undefined;
    paymentMethod?: {
        cardType?: string | null | undefined;
        lastFourDigits?: string | null | undefined;
    } | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    userId: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        productId: mongoose.Types.ObjectId;
        sizeId: mongoose.Types.ObjectId;
        quantity: number;
        name?: string | null | undefined;
        price?: number | null | undefined;
        color?: string | null | undefined;
        sizeValue?: string | null | undefined;
        image?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        productId: mongoose.Types.ObjectId;
        sizeId: mongoose.Types.ObjectId;
        quantity: number;
        name?: string | null | undefined;
        price?: number | null | undefined;
        color?: string | null | undefined;
        sizeValue?: string | null | undefined;
        image?: string | null | undefined;
    }> & {
        productId: mongoose.Types.ObjectId;
        sizeId: mongoose.Types.ObjectId;
        quantity: number;
        name?: string | null | undefined;
        price?: number | null | undefined;
        color?: string | null | undefined;
        sizeValue?: string | null | undefined;
        image?: string | null | undefined;
    }>;
    totalAmount: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    orderNumber?: string | null | undefined;
    shippingAddress?: {
        street?: string | null | undefined;
        city?: string | null | undefined;
        postalCode?: string | null | undefined;
        country?: string | null | undefined;
    } | null | undefined;
    paymentMethod?: {
        cardType?: string | null | undefined;
        lastFourDigits?: string | null | undefined;
    } | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        productId: mongoose.Types.ObjectId;
        sizeId: mongoose.Types.ObjectId;
        quantity: number;
        name?: string | null | undefined;
        price?: number | null | undefined;
        color?: string | null | undefined;
        sizeValue?: string | null | undefined;
        image?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        productId: mongoose.Types.ObjectId;
        sizeId: mongoose.Types.ObjectId;
        quantity: number;
        name?: string | null | undefined;
        price?: number | null | undefined;
        color?: string | null | undefined;
        sizeValue?: string | null | undefined;
        image?: string | null | undefined;
    }> & {
        productId: mongoose.Types.ObjectId;
        sizeId: mongoose.Types.ObjectId;
        quantity: number;
        name?: string | null | undefined;
        price?: number | null | undefined;
        color?: string | null | undefined;
        sizeValue?: string | null | undefined;
        image?: string | null | undefined;
    }>;
    totalAmount: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    orderNumber?: string | null | undefined;
    shippingAddress?: {
        street?: string | null | undefined;
        city?: string | null | undefined;
        postalCode?: string | null | undefined;
        country?: string | null | undefined;
    } | null | undefined;
    paymentMethod?: {
        cardType?: string | null | undefined;
        lastFourDigits?: string | null | undefined;
    } | null | undefined;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        productId: mongoose.Types.ObjectId;
        sizeId: mongoose.Types.ObjectId;
        quantity: number;
        name?: string | null | undefined;
        price?: number | null | undefined;
        color?: string | null | undefined;
        sizeValue?: string | null | undefined;
        image?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        productId: mongoose.Types.ObjectId;
        sizeId: mongoose.Types.ObjectId;
        quantity: number;
        name?: string | null | undefined;
        price?: number | null | undefined;
        color?: string | null | undefined;
        sizeValue?: string | null | undefined;
        image?: string | null | undefined;
    }> & {
        productId: mongoose.Types.ObjectId;
        sizeId: mongoose.Types.ObjectId;
        quantity: number;
        name?: string | null | undefined;
        price?: number | null | undefined;
        color?: string | null | undefined;
        sizeValue?: string | null | undefined;
        image?: string | null | undefined;
    }>;
    totalAmount: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    orderNumber?: string | null | undefined;
    shippingAddress?: {
        street?: string | null | undefined;
        city?: string | null | undefined;
        postalCode?: string | null | undefined;
        country?: string | null | undefined;
    } | null | undefined;
    paymentMethod?: {
        cardType?: string | null | undefined;
        lastFourDigits?: string | null | undefined;
    } | null | undefined;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Order;
//# sourceMappingURL=orderModel.d.ts.map