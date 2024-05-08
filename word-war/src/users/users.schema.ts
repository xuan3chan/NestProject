import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: mongoose.Schema.Types.String, required: true, unique: true })
  username: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  password: string;
}

export type UserDocument = User & mongoose.Document;
export const UserSchema = SchemaFactory.createForClass(User);