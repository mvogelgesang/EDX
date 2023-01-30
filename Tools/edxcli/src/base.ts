import { Command, Flags } from '@oclif/core';
import {
  FlagInput,
  OutputFlags,
  ParserOutput,
} from '@oclif/core/lib/interfaces';
import debug from 'debug';

// This is needed to get type safety working in derived classes
export type InferredFlagsType<T> = T extends FlagInput<infer F>
  ? F & {
      json: boolean | undefined;
    }
  : any;
export default abstract class BaseCommand<
  T extends typeof BaseCommand.flags,
> extends Command {
  static date: any = new Date();
  static formattedDate(): string {
    return `${this.date.getFullYear()}${this.date.getMonth() < 9 ? '0' : ''}${
      this.date.getMonth() + 1
    }${this.date.getDate() < 10 ? '0' : ''}${this.date.getDate()}`;
  }

  static flags = {
    loglevel: Flags.string({
      options: ['error', 'info', 'debug'],
      default: 'info',
    }),
  };

  protected parsedOutput?: ParserOutput<any, any>;

  get processedArgs(): { [name: string]: any } {
    return this.parsedOutput?.args ?? {};
  }

  get processedFlags(): InferredFlagsType<T> {
    return this.parsedOutput?.flags ?? {};
  }

  private get baseFlags() {
    return this.processedFlags as Partial<
      OutputFlags<typeof BaseCommand.flags>
    >;
  }

  /**
   * Allows messages to be printed to console at varying levels of detail.
   * @param msg message to print to console
   * @param level {string} on of, 'debug' > 'info' > 'error'
   * @returns void
   */
  log(msg: string, level: string): void {
    // logging is heirarchical. For instance, setting the level at debug should also print info logs
    const levelRanking: { [key: string]: number } = {
      debug: 3,
      info: 2,
      error: 1,
    };
    const rank = levelRanking[this.baseFlags.loglevel];

    if (rank >= 3 && level === 'debug') debug(msg);

    if (rank >= 2 && level === 'info') console.log(msg);

    if (rank >= 1 && level === 'error') console.error(msg);
  }

  async init(): Promise<void> {
    // do some initialization
    this.parsedOutput = await this.parse(this.ctor);
  }

  async catch(err: any) {
    // add any custom logic to handle errors from the command
    // or simply return the parent class error handling
    return super.catch(err);
  }

  async finally(err: any) {
    // called after run and catch regardless of whether or not the command errored
    return super.finally(err);
  }
}
