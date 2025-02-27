"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const authService_1 = require("../services/authService");
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await (0, authService_1.registerUser)(name, email, password);
        res.status(201).json({ message: "User registered", user });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await (0, authService_1.loginUser)(email, password);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map