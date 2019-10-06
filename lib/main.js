"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailspring_exports_1 = require("mailspring-exports");
const pixel_tracking_extension = __importDefault(require("./matomo-pixel"));
function activate() {
        mailspring_exports_1.ExtensionRegistry.Composer.register(pixel_tracking_extension.default);
}
exports.activate = activate;
function serialize() { }
exports.serialize = serialize;
function deactivate() {
    mailspring_exports_1.ExtensionRegistry.Composer.unregister(pixel_tracking_extension.default);
}
exports.deactivate = deactivate;
