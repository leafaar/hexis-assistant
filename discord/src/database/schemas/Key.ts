import mongoose, { Schema } from "mongoose";

export interface KeyType {
    guildID: string;
    guildName: string;
    createdAt: Date;
    endAt: Date;
}

const KeySchema = new Schema<KeyType>({
    guildID: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    guildName: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
   createdAt: {
       type: mongoose.SchemaTypes.Date,
       required: true
   },
   endAt: {
        type: mongoose.SchemaTypes.Date,
        required: true
   }
});

export default mongoose.model('keys', KeySchema);