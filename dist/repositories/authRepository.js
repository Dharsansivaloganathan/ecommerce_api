"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const createUser = async (userData) => {
    return await User_1.default.create(userData);
};
exports.createUser = createUser;
const findUserByEmail = async (email) => {
    return await User_1.default.findOne({ where: { email } });
};
exports.findUserByEmail = findUserByEmail;
//# sourceMappingURL=authRepository.js.map