import { Document } from 'mongoose';

export interface InterfaceUser extends Document {
    readonly email: string;
    readonly password: string;
}