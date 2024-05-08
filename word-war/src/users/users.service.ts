import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createUserService(username: string, password: string): Promise<UserDocument | { success: boolean, message: string }> {
        try {
            if(!username || !password|| username === "" || password === ""){
                return {
                    success: false,
                    message: 'Username and password are required.'
                }
            }
            const duplicateUser = await this.findUserService(username);
            if(duplicateUser){
                return {
                    success: false,
                    message: 'Username already exists.'
                }
            }
            const user = new this.userModel({username, password});
            return await user.save();
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
    
    async findUserService(username: string): Promise<UserDocument | null> {
        return await this.userModel.findOne({username});
    }
}