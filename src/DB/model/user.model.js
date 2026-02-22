import mongoose from 'mongoose';  
import { GenderEnum ,ProviderEnum} from '../../common/enum/index.js';
import e from 'express';

 const userSchema = new mongoose.Schema({
    FirstName : {
        type:String, 
        required:true,
         minlength:3,
            maxlength:30,
            trim:true
        },
    LastName : {
        type:String, 
        required:true,
         minlength:3,
            maxlength:30,
            trim:true
        },
    Email : {type:String, required:true, unique:true},
    Password : {type:String, required:true},
    phone:String,
    confirnEmail:Date,
    changecrendentials:Date,
    provider:{type:Number, enum:Object.values(ProviderEnum), default:ProviderEnum.LOCAL},
    gender:{type:Number, enum:Object.values(GenderEnum), default:GenderEnum.MALE},
profilepicture:String,
coverprofilepicture:[String],

    }
 
, {
    collection : "Route User",
    timestamps:true,
    strict:true,
    strictQuery:true,
    optimisticconcurrency:true,
    autoindex:true,
    tojson:{virtuals:true},
    toobject:{virtuals:true}
})
userSchema.virtual("username").get(function() {
    return this.FirstName + " " + this.LastName;
});
    

export const users = [];
export const UserModel =mongoose.model.User || mongoose.model("User", userSchema)
