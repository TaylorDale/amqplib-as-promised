/// <reference types="node" />
import { ConfirmChannel as NativeConfirmChannel, Options, Replies } from 'amqplib';
import { Channel } from './channel';
import { Connection } from './connection';
export declare class ConfirmChannel extends Channel {
    protected connection: Connection;
    protected channel?: NativeConfirmChannel;
    constructor(channel: NativeConfirmChannel, connection: Connection);
    publish(exchange: string, queue: string, content: Buffer, options?: Options.Publish): Promise<Replies.Empty>;
    waitForConfirms(): Promise<void>;
    protected nativeOperation<T>(operation: (channel: NativeConfirmChannel) => Promise<T>): Promise<T>;
}
