"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
exports.validateRegister = (body) => {
    const { email, name, password } = body;
    const errors = [];
    if (email.length > 10) {
        errors.push({
            message: 'email to long',
            type: 'register-email',
            id: uuid_1.v4()
        });
    }
    // console.log(email);
    // console.log(name);
    // console.log(password);
    return errors;
};
