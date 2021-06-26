"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const tslib_1 = require("tslib");
const amqplib_1 = tslib_1.__importDefault(require("amqplib"));
const events_1 = require("events");
const channel_1 = require("./channel");
const confirm_channel_1 = require("./confirm-channel");
class Connection extends events_1.EventEmitter {
    constructor(url, options) {
        super();
        this.url = url;
        this.options = options;
        this.finallyClosed = false;
    }
    async init() {
        this.connection = await amqplib_1.default.connect(this.url, this.options);
        this.connection.once('close', () => {
            this.finallyClosed = true;
            this.emit('close');
            delete this.connection;
        });
        this.connection.on('error', (e) => this.emit('error', e));
    }
    async createNativeChannel() {
        if (!this.connection) {
            throw new Error('Cannot create channel - connection wrapper is not initialized.');
        }
        return this.connection.createConfirmChannel();
    }
    async createChannel() {
        if (!this.connection) {
            throw new Error('Cannot create channel - connection wrapper is not initialized.');
        }
        const nativeChannel = await this.createNativeChannel();
        return new channel_1.Channel(nativeChannel, this);
    }
    async createNativeConfirmChannel() {
        if (!this.connection) {
            throw new Error('Cannot create channel - connection wrapper is not initialized.');
        }
        return this.connection.createConfirmChannel();
    }
    async createConfirmChannel() {
        if (!this.connection) {
            throw new Error('Cannot create channel - connection wrapper is not initialized.');
        }
        const nativeConfirmChannel = await this.createNativeConfirmChannel();
        return new confirm_channel_1.ConfirmChannel(nativeConfirmChannel, this);
    }
    async close() {
        if (this.connection) {
            await this.connection.close();
        }
    }
    async waitForClose() {
        return new Promise((resolve, reject) => {
            if (!this.connection) {
                reject(new Error('Cannot wait for connection close - connection not initialized.'));
            }
            else {
                this.connection.once('close', () => {
                    resolve();
                });
            }
        });
    }
}
exports.Connection = Connection;
//# sourceMappingURL=connection.js.map