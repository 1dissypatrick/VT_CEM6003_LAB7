"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
// schemas/user.schema.ts
exports.user = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/user",
    "title": "User",
    "description": "A blog user",
    "type": "object",
    "properties": {
        "username": {
            "type": "string",
            "minLength": 3,
            "maxLength": 20
        },
        "password": {
            "type": "string",
            "minLength": 8
        },
        "email": {
            "type": "string",
            "format": "email"
        }
    },
    "required": ["username", "password", "email"]
};
