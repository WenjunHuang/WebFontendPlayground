/**
 * Github 账号
 */
export class Account {
    public static anonymous():Account {
        return new Account('',getDotComAPIEndpoint(),'',[],
            '',-1,'')
    }

    public constructor(
        public readonly login:string,
        public readonly endpoint:string,
        public readonly token:string,
        public readonly emails:ReadonlyArray<IAPIEmail>,
        public readonly avatarURL:string,
        public readonly id:number,
        public readonly name:string
    ){}
}