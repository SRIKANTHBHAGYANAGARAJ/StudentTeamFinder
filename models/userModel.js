import mongoose from 'mongoose'
const userCategories = ["USER","ADMIN","LEADER"] 


const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    roles: [{
        authority: {
            type: String,
            enum: userCategories,  // updated enum
            default: "USER"
        }
    }],
    },
    {timestamps:true}

)

userSchema.index({email:1},{unique:true})

const userModel =mongoose.model('users',userSchema)

export default userModel

