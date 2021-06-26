"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmChannel = void 0;
const channel_1 = require("./channel");
class ConfirmChannel extends channel_1.Channel {
    constructor(channel, connection) {
        super(channel, connection);
        this.connection = connection;
    }
    async publish(exchange, queue, content, options) {
        return this.nativeOperation((confirmChannel) => {
            return new Promise((resolve, reject) => {
                confirmChannel.publish(exchange, queue, content, options, (err, ok) => {
                    if (err)
                        reject(err);
                    else
                        resolve(ok);
                });
            });
        });
    }
    async waitForConfirms() {
        return this.nativeOperation((confirmChannel) => {
            return new Promise((resolve, reject) => {
                confirmChannel
                    .waitForConfirms()
                    .then(() => resolve())
                    .catch((err) => reject(err));
            });
        });
    }
    async nativeOperation(operation) {
        return super.nativeOperation(operation);
    }
}
exports.ConfirmChannel = ConfirmChannel;
//# sourceMappingURL=confirm-channel.js.map