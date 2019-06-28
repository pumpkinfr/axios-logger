import dateformat from 'dateformat';
import { GlobalLogConfig } from './types';

class StringBuilder {
    private config: GlobalLogConfig;
    private printQueue: Array<string>;

    constructor(config: GlobalLogConfig) {
        this.config = config;
        this.printQueue = [];
    }

    makePrefix(logType: string) {
        const prefix = this.config.prefixText ? `[${this.config.prefixText}][${logType}]` : `[Axios][${logType}]`;
        this.printQueue.push(prefix);
        return this;
    }

    makeDateFormat() {
        const dateFormat = dateformat(new Date(), this.config.dateFormat || 'isoDateTime');
        this.printQueue.push(dateFormat);
        return this;
    }

    makeUrl(url?: string) {
        if(url) this.printQueue.push(url);
        return this;
    }

    makeMethod(method?: string) {
        if(method) this.printQueue.push(method.toUpperCase());
        return this;
    }

    makeData(data: object) {
        if(data) this.printQueue.push(JSON.stringify(data));
        return this;
    }

    makeStatus(status?:number, statusText?: string) {
        if(status && statusText) this.printQueue.push(`${status}:${statusText}`);
        return this;
    }

    build() {
        return this.printQueue.join(' ');
    }
}

export default StringBuilder;