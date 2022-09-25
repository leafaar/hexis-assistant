import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface CollectionType {
    guildID: string;
    guildName: string;
    key: ObjectId;
    channelID: string;
    messageID: string;
    roleID: string;
    contract: string;
}

const CollectionSchema = new Schema<CollectionType>({
    guildID: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    guildName: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    key: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    channelID: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    messageID: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    roleID: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    contract: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
});

export default mongoose.model('collections', CollectionSchema);