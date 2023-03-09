export class FSError extends Error {
  /**
   * @param message optional
   */
  constructor(message?: string) {
    const prefixMessage = 'FS operation failed';

    super(
      `${prefixMessage}${typeof message === 'string' ? `. ${message}` : ''}`
    );
  }
}
