export namespace Base64Service {
  export function encode(text: string): string {
    return Buffer.from(text, 'utf8').toString('base64');
  }

  export function decode(base64: string): string {
    return Buffer.from(base64, 'base64').toString('utf8');
  }
}
