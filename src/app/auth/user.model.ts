export class User {
  constructor(public access_token?: string, public expires_in?: number) {}

  get token() {
    if (!this.expires_in) {
      return null;
    }
    return this.access_token;
  }
}
