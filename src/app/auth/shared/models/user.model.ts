export class PlatformUser {
  constructor(
    public readonly uid: string,
    public readonly email: string,
    public readonly authenticated: boolean
  ) {/** */}
}
