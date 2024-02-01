import { Injectable, HttpException } from '@nestjs/common';
import { EmitPattern } from 'src/mc-config/config';

interface IResponse_ {
  success: boolean;
  status: number;
  data?: any;
  error?: any;
  message?: string;
}


interface IResponse {
  header: { success: boolean, resource: EmitPattern, status: number },
  data?: any;
  error?: any;
  message?: string;
}

@Injectable()
export class ServerResponse_ implements IResponse_ {
  /**
   *Creates an instance of ServerResponse.
   * @param {boolean} success - the success state
   * @param {number} status - the status
   * @param {string} [message] - the message if any
   * @param {*} [data] - the to send
   * @param {*} [error] - error if any
   * @param timestamp
   * @memberof ServerResponse
   */
  constructor(
    public readonly success: boolean,
    public readonly status: number,
    public readonly message?: string,
    public readonly data?: { items?: any[], meta?: any, item?: any },
    public readonly error?: any,
    public readonly timestamp?: any,
  ) {
    this.timestamp = Date.now();
  }

  /**
   * Throws a Server response exception
   *
   * @memberof ServerResponse
   * @returns {void} -
   */
  throw() {
    throw new HttpException(this, this.status);
  }
}


export class ServerResponse implements IResponse {
  /**
   *Creates an instance of ServerResponse.
   * @param {boolean} success - the success state
   * @param {number} status - the status
   * @param {string} [message] - the message if any
   * @param {*} [data] - the to send
   * @param {*} [error] - error if any
   * @param timestamp
   * @memberof ServerResponse
   */
  constructor(
    public readonly header: { success: boolean, resource: EmitPattern, status: number, },
    public readonly message: string,
    public readonly data?: { items?: any[], meta?: any, item?: any },
    public readonly error?: any,
    public readonly timestamp?: any,
  ) {
    this.timestamp = Date.now();
  }

  /**
   * Throws a Server response exception
   *
   * @memberof ServerResponse
   * @returns {void} -
   */
  throw() {
    return this
    // throw new HttpException(this, this.header.status);
  }
}