"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.credentials = exports.Channel = exports.Connection = void 0;
const channel_1 = require("./channel");
Object.defineProperty(exports, "Channel", { enumerable: true, get: function () { return channel_1.Channel; } });
const connection_1 = require("./connection");
Object.defineProperty(exports, "Connection", { enumerable: true, get: function () { return connection_1.Connection; } });
var amqplib_1 = require("amqplib");
Object.defineProperty(exports, "credentials", { enumerable: true, get: function () { return amqplib_1.credentials; } });
Object.defineProperty(exports, "connect", { enumerable: true, get: function () { return amqplib_1.connect; } });
//# sourceMappingURL=index.js.map