import mongoose, {Schema,Document} from "mongoose";

export interface Message extends Document {
    text: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    text: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, required: true}
});

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    verifyCode: string;
    codeExpired: Date;
    isAcceptingMessages: boolean;
    isVerified: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    name: {type: String, required: [true, 'Name is required'], index: true},
    email: {type: String, required: [true, 'Email is required'], 
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'enter a valid email'], 
    index: true},
    password: {type: String, required: [true, 'Password is required'], index: true},
    verifyCode: {type: String, required: [true, 'Code is required'], unique: true, index: true},
    codeExpired: {type: Date, required: [true, 'Code expiration date is required'], default: Date.now, index: true},
    isAcceptingMessages: {type: Boolean, default: true},
    isVerified: {type: Boolean, default: false},
    messages: [MessageSchema]
});

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>('User', UserSchema);
export default UserModel;