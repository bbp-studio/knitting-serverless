export class Token {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  isPhone(): boolean {
    return this.value.startsWith('010');
  }
}
