/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare module 'node-forge'
declare module 'stellar-sdk'
declare module 'niceware';