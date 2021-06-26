/// <reference types="node" />
import amqplib from 'amqplib';
import { EventEmitter } from 'events';
import { Channel } from './channel';
import { ConfirmChannel } from './confirm-channel';
export declare class Connection extends EventEmitter {
    protected url: string;
    protected options?: amqplib.Options.Connect | undefined;
    finallyClosed: boolean;
    protected connection?: amqplib.Connection;
    constructor(url: string, options?: amqplib.Options.Connect | undefined);
    init(): Promise<void>;
    createNativeChannel(): Promise<amqplib.ConfirmChannel>;
    createChannel(): Promise<Channel>;
    createNativeConfirmChannel(): Promise<amqplib.ConfirmChannel>;
    createConfirmChannel(): Promise<ConfirmChannel>;
    close(): Promise<void>;
    waitForClose(): Promise<void>;
}
