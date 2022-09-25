import mongoose, { Schema } from "mongoose";

export interface User {
    id: string;
    discordId: string;
    accessToken: string;
    refreshToken: string;
    wallets: string[];
    userCollection: UserCollection[];
}
export interface UserCollection {
    guildID: string;
    primaryWallet: string;
}
const UserCollectionSchema = new Schema<UserCollection>({
    guildID: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    primaryWallet: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
});

const UserSchema = new Schema<User>({
    discordId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    accessToken: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    refreshToken: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    wallets: {
        type: [mongoose.SchemaTypes.String],
        required: true,
    },
    userCollection: {
        type: [UserCollectionSchema],
        required: false,
    },
});

export default mongoose.model('users', UserSchema);