export default interface IConstructorObject {
    algorithm?:string,
    key?:string | Buffer,
    iv?: string | Buffer
}