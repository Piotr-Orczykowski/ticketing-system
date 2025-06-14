const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User model for MongoDB
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'agent', 'customer'],
        default: 'customer'
    }
}, {timestamps: true});

// Hash password before saving to the database
userSchema.pre('save', async function(next) {   
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);