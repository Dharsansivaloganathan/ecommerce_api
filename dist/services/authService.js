"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authRepository_1 = require("../repositories/authRepository");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const registerUser = async (name, email, password) => {
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    return await (0, authRepository_1.createUser)({ name, email, password: hashedPassword, role: "customer" });
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await (0, authRepository_1.findUserByEmail)(email);
    if (!user)
        throw new Error("Invalid credentials");
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error("Invalid credentials");
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return { token, user };
};
exports.loginUser = loginUser;
//# sourceMappingURL=authService.js.map