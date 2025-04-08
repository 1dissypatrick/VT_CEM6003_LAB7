"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.article = void 0;
exports.article = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/article",
    "title": "Article",
    "description": "An article in the blog",
    "type": "object",
    "properties": {
        "title": {
            "description": "Main title of the blog article",
            "type": "string",
            "minLength": 5,
            "maxLength": 100
        },
        "allText": {
            "description": "Body text of the blog article",
            "type": "string",
            "minLength": 10
        },
        "summary": {
            "description": "Optional short text summary of article",
            "type": "string",
            "maxLength": 200
        },
        "imageURL": {
            "description": "URL for main image to show in article",
            "type": "string",
            "format": "uri"
        },
        "published": {
            "description": "Is the article published or not",
            "type": "boolean",
            "default": false
        },
        "authorID": {
            "description": "User ID of the article author",
            "type": "integer",
            "minimum": 1
        }
    },
    "required": ["title", "allText", "authorID"],
    "additionalProperties": false
};
