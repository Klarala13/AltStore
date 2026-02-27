
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Developer
 * 
 */
export type Developer = $Result.DefaultSelection<Prisma.$DeveloperPayload>
/**
 * Model App
 * 
 */
export type App = $Result.DefaultSelection<Prisma.$AppPayload>
/**
 * Model Version
 * 
 */
export type Version = $Result.DefaultSelection<Prisma.$VersionPayload>
/**
 * Model DownloadLog
 * 
 */
export type DownloadLog = $Result.DefaultSelection<Prisma.$DownloadLogPayload>
/**
 * Model SecurityLog
 * 
 */
export type SecurityLog = $Result.DefaultSelection<Prisma.$SecurityLogPayload>
/**
 * Model Tag
 * 
 */
export type Tag = $Result.DefaultSelection<Prisma.$TagPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const DeveloperType: {
  INDIVIDUAL: 'INDIVIDUAL',
  COMPANY: 'COMPANY'
};

export type DeveloperType = (typeof DeveloperType)[keyof typeof DeveloperType]


export const AppStatus: {
  PENDING_REVIEW: 'PENDING_REVIEW',
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  REMOVED: 'REMOVED'
};

export type AppStatus = (typeof AppStatus)[keyof typeof AppStatus]


export const VersionStatus: {
  SCANNING: 'SCANNING',
  CLEAN: 'CLEAN',
  INFECTED: 'INFECTED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type VersionStatus = (typeof VersionStatus)[keyof typeof VersionStatus]


export const Platform: {
  ANDROID: 'ANDROID',
  IOS: 'IOS',
  BOTH: 'BOTH'
};

export type Platform = (typeof Platform)[keyof typeof Platform]


export const Severity: {
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  CRITICAL: 'CRITICAL'
};

export type Severity = (typeof Severity)[keyof typeof Severity]


export const Category: {
  PRODUCTIVITY: 'PRODUCTIVITY',
  SOCIAL: 'SOCIAL',
  ENTERTAINMENT: 'ENTERTAINMENT',
  TOOLS: 'TOOLS',
  EDUCATION: 'EDUCATION',
  HEALTH: 'HEALTH',
  FINANCE: 'FINANCE',
  GAMES: 'GAMES',
  PHOTOGRAPHY: 'PHOTOGRAPHY',
  NAVIGATION: 'NAVIGATION',
  OTHER: 'OTHER'
};

export type Category = (typeof Category)[keyof typeof Category]

}

export type DeveloperType = $Enums.DeveloperType

export const DeveloperType: typeof $Enums.DeveloperType

export type AppStatus = $Enums.AppStatus

export const AppStatus: typeof $Enums.AppStatus

export type VersionStatus = $Enums.VersionStatus

export const VersionStatus: typeof $Enums.VersionStatus

export type Platform = $Enums.Platform

export const Platform: typeof $Enums.Platform

export type Severity = $Enums.Severity

export const Severity: typeof $Enums.Severity

export type Category = $Enums.Category

export const Category: typeof $Enums.Category

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Developers
 * const developers = await prisma.developer.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Developers
   * const developers = await prisma.developer.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.developer`: Exposes CRUD operations for the **Developer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Developers
    * const developers = await prisma.developer.findMany()
    * ```
    */
  get developer(): Prisma.DeveloperDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.app`: Exposes CRUD operations for the **App** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Apps
    * const apps = await prisma.app.findMany()
    * ```
    */
  get app(): Prisma.AppDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.version`: Exposes CRUD operations for the **Version** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Versions
    * const versions = await prisma.version.findMany()
    * ```
    */
  get version(): Prisma.VersionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.downloadLog`: Exposes CRUD operations for the **DownloadLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DownloadLogs
    * const downloadLogs = await prisma.downloadLog.findMany()
    * ```
    */
  get downloadLog(): Prisma.DownloadLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.securityLog`: Exposes CRUD operations for the **SecurityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SecurityLogs
    * const securityLogs = await prisma.securityLog.findMany()
    * ```
    */
  get securityLog(): Prisma.SecurityLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Developer: 'Developer',
    App: 'App',
    Version: 'Version',
    DownloadLog: 'DownloadLog',
    SecurityLog: 'SecurityLog',
    Tag: 'Tag'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "developer" | "app" | "version" | "downloadLog" | "securityLog" | "tag"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Developer: {
        payload: Prisma.$DeveloperPayload<ExtArgs>
        fields: Prisma.DeveloperFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeveloperFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeveloperPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeveloperFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeveloperPayload>
          }
          findFirst: {
            args: Prisma.DeveloperFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeveloperPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeveloperFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeveloperPayload>
          }
          findMany: {
            args: Prisma.DeveloperFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeveloperPayload>[]
          }
          create: {
            args: Prisma.DeveloperCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeveloperPayload>
          }
          createMany: {
            args: Prisma.DeveloperCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeveloperCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeveloperPayload>[]
          }
          delete: {
            args: Prisma.DeveloperDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeveloperPayload>
          }
          update: {
            args: Prisma.DeveloperUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeveloperPayload>
          }
          deleteMany: {
            args: Prisma.DeveloperDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeveloperUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeveloperUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeveloperPayload>[]
          }
          upsert: {
            args: Prisma.DeveloperUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeveloperPayload>
          }
          aggregate: {
            args: Prisma.DeveloperAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeveloper>
          }
          groupBy: {
            args: Prisma.DeveloperGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeveloperGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeveloperCountArgs<ExtArgs>
            result: $Utils.Optional<DeveloperCountAggregateOutputType> | number
          }
        }
      }
      App: {
        payload: Prisma.$AppPayload<ExtArgs>
        fields: Prisma.AppFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>
          }
          findFirst: {
            args: Prisma.AppFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>
          }
          findMany: {
            args: Prisma.AppFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>[]
          }
          create: {
            args: Prisma.AppCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>
          }
          createMany: {
            args: Prisma.AppCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>[]
          }
          delete: {
            args: Prisma.AppDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>
          }
          update: {
            args: Prisma.AppUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>
          }
          deleteMany: {
            args: Prisma.AppDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>[]
          }
          upsert: {
            args: Prisma.AppUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>
          }
          aggregate: {
            args: Prisma.AppAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApp>
          }
          groupBy: {
            args: Prisma.AppGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppCountArgs<ExtArgs>
            result: $Utils.Optional<AppCountAggregateOutputType> | number
          }
        }
      }
      Version: {
        payload: Prisma.$VersionPayload<ExtArgs>
        fields: Prisma.VersionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VersionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VersionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionPayload>
          }
          findFirst: {
            args: Prisma.VersionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VersionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionPayload>
          }
          findMany: {
            args: Prisma.VersionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionPayload>[]
          }
          create: {
            args: Prisma.VersionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionPayload>
          }
          createMany: {
            args: Prisma.VersionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VersionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionPayload>[]
          }
          delete: {
            args: Prisma.VersionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionPayload>
          }
          update: {
            args: Prisma.VersionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionPayload>
          }
          deleteMany: {
            args: Prisma.VersionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VersionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VersionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionPayload>[]
          }
          upsert: {
            args: Prisma.VersionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VersionPayload>
          }
          aggregate: {
            args: Prisma.VersionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVersion>
          }
          groupBy: {
            args: Prisma.VersionGroupByArgs<ExtArgs>
            result: $Utils.Optional<VersionGroupByOutputType>[]
          }
          count: {
            args: Prisma.VersionCountArgs<ExtArgs>
            result: $Utils.Optional<VersionCountAggregateOutputType> | number
          }
        }
      }
      DownloadLog: {
        payload: Prisma.$DownloadLogPayload<ExtArgs>
        fields: Prisma.DownloadLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DownloadLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DownloadLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadLogPayload>
          }
          findFirst: {
            args: Prisma.DownloadLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DownloadLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadLogPayload>
          }
          findMany: {
            args: Prisma.DownloadLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadLogPayload>[]
          }
          create: {
            args: Prisma.DownloadLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadLogPayload>
          }
          createMany: {
            args: Prisma.DownloadLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DownloadLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadLogPayload>[]
          }
          delete: {
            args: Prisma.DownloadLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadLogPayload>
          }
          update: {
            args: Prisma.DownloadLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadLogPayload>
          }
          deleteMany: {
            args: Prisma.DownloadLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DownloadLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DownloadLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadLogPayload>[]
          }
          upsert: {
            args: Prisma.DownloadLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadLogPayload>
          }
          aggregate: {
            args: Prisma.DownloadLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDownloadLog>
          }
          groupBy: {
            args: Prisma.DownloadLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<DownloadLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.DownloadLogCountArgs<ExtArgs>
            result: $Utils.Optional<DownloadLogCountAggregateOutputType> | number
          }
        }
      }
      SecurityLog: {
        payload: Prisma.$SecurityLogPayload<ExtArgs>
        fields: Prisma.SecurityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SecurityLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SecurityLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>
          }
          findFirst: {
            args: Prisma.SecurityLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SecurityLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>
          }
          findMany: {
            args: Prisma.SecurityLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>[]
          }
          create: {
            args: Prisma.SecurityLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>
          }
          createMany: {
            args: Prisma.SecurityLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SecurityLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>[]
          }
          delete: {
            args: Prisma.SecurityLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>
          }
          update: {
            args: Prisma.SecurityLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>
          }
          deleteMany: {
            args: Prisma.SecurityLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SecurityLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SecurityLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>[]
          }
          upsert: {
            args: Prisma.SecurityLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityLogPayload>
          }
          aggregate: {
            args: Prisma.SecurityLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSecurityLog>
          }
          groupBy: {
            args: Prisma.SecurityLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SecurityLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SecurityLogCountArgs<ExtArgs>
            result: $Utils.Optional<SecurityLogCountAggregateOutputType> | number
          }
        }
      }
      Tag: {
        payload: Prisma.$TagPayload<ExtArgs>
        fields: Prisma.TagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findFirst: {
            args: Prisma.TagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findMany: {
            args: Prisma.TagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          create: {
            args: Prisma.TagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          createMany: {
            args: Prisma.TagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          delete: {
            args: Prisma.TagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          update: {
            args: Prisma.TagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          deleteMany: {
            args: Prisma.TagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          upsert: {
            args: Prisma.TagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.TagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    developer?: DeveloperOmit
    app?: AppOmit
    version?: VersionOmit
    downloadLog?: DownloadLogOmit
    securityLog?: SecurityLogOmit
    tag?: TagOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DeveloperCountOutputType
   */

  export type DeveloperCountOutputType = {
    apps: number
  }

  export type DeveloperCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    apps?: boolean | DeveloperCountOutputTypeCountAppsArgs
  }

  // Custom InputTypes
  /**
   * DeveloperCountOutputType without action
   */
  export type DeveloperCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeveloperCountOutputType
     */
    select?: DeveloperCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DeveloperCountOutputType without action
   */
  export type DeveloperCountOutputTypeCountAppsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppWhereInput
  }


  /**
   * Count Type AppCountOutputType
   */

  export type AppCountOutputType = {
    versions: number
    tags: number
  }

  export type AppCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    versions?: boolean | AppCountOutputTypeCountVersionsArgs
    tags?: boolean | AppCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * AppCountOutputType without action
   */
  export type AppCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppCountOutputType
     */
    select?: AppCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AppCountOutputType without action
   */
  export type AppCountOutputTypeCountVersionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VersionWhereInput
  }

  /**
   * AppCountOutputType without action
   */
  export type AppCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
  }


  /**
   * Count Type VersionCountOutputType
   */

  export type VersionCountOutputType = {
    downloadLogs: number
  }

  export type VersionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    downloadLogs?: boolean | VersionCountOutputTypeCountDownloadLogsArgs
  }

  // Custom InputTypes
  /**
   * VersionCountOutputType without action
   */
  export type VersionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VersionCountOutputType
     */
    select?: VersionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VersionCountOutputType without action
   */
  export type VersionCountOutputTypeCountDownloadLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DownloadLogWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    apps: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    apps?: boolean | TagCountOutputTypeCountAppsArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountAppsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Developer
   */

  export type AggregateDeveloper = {
    _count: DeveloperCountAggregateOutputType | null
    _min: DeveloperMinAggregateOutputType | null
    _max: DeveloperMaxAggregateOutputType | null
  }

  export type DeveloperMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    type: $Enums.DeveloperType | null
    vatNumber: string | null
    country: string | null
    verified: boolean | null
    verifiedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeveloperMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    type: $Enums.DeveloperType | null
    vatNumber: string | null
    country: string | null
    verified: boolean | null
    verifiedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeveloperCountAggregateOutputType = {
    id: number
    email: number
    name: number
    passwordHash: number
    type: number
    vatNumber: number
    country: number
    verified: number
    verifiedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DeveloperMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    type?: true
    vatNumber?: true
    country?: true
    verified?: true
    verifiedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeveloperMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    type?: true
    vatNumber?: true
    country?: true
    verified?: true
    verifiedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeveloperCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    type?: true
    vatNumber?: true
    country?: true
    verified?: true
    verifiedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DeveloperAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Developer to aggregate.
     */
    where?: DeveloperWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Developers to fetch.
     */
    orderBy?: DeveloperOrderByWithRelationInput | DeveloperOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeveloperWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Developers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Developers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Developers
    **/
    _count?: true | DeveloperCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeveloperMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeveloperMaxAggregateInputType
  }

  export type GetDeveloperAggregateType<T extends DeveloperAggregateArgs> = {
        [P in keyof T & keyof AggregateDeveloper]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeveloper[P]>
      : GetScalarType<T[P], AggregateDeveloper[P]>
  }




  export type DeveloperGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeveloperWhereInput
    orderBy?: DeveloperOrderByWithAggregationInput | DeveloperOrderByWithAggregationInput[]
    by: DeveloperScalarFieldEnum[] | DeveloperScalarFieldEnum
    having?: DeveloperScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeveloperCountAggregateInputType | true
    _min?: DeveloperMinAggregateInputType
    _max?: DeveloperMaxAggregateInputType
  }

  export type DeveloperGroupByOutputType = {
    id: string
    email: string
    name: string
    passwordHash: string | null
    type: $Enums.DeveloperType
    vatNumber: string | null
    country: string
    verified: boolean
    verifiedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: DeveloperCountAggregateOutputType | null
    _min: DeveloperMinAggregateOutputType | null
    _max: DeveloperMaxAggregateOutputType | null
  }

  type GetDeveloperGroupByPayload<T extends DeveloperGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeveloperGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeveloperGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeveloperGroupByOutputType[P]>
            : GetScalarType<T[P], DeveloperGroupByOutputType[P]>
        }
      >
    >


  export type DeveloperSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    type?: boolean
    vatNumber?: boolean
    country?: boolean
    verified?: boolean
    verifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    apps?: boolean | Developer$appsArgs<ExtArgs>
    _count?: boolean | DeveloperCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["developer"]>

  export type DeveloperSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    type?: boolean
    vatNumber?: boolean
    country?: boolean
    verified?: boolean
    verifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["developer"]>

  export type DeveloperSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    type?: boolean
    vatNumber?: boolean
    country?: boolean
    verified?: boolean
    verifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["developer"]>

  export type DeveloperSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    type?: boolean
    vatNumber?: boolean
    country?: boolean
    verified?: boolean
    verifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DeveloperOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "passwordHash" | "type" | "vatNumber" | "country" | "verified" | "verifiedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["developer"]>
  export type DeveloperInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    apps?: boolean | Developer$appsArgs<ExtArgs>
    _count?: boolean | DeveloperCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DeveloperIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DeveloperIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DeveloperPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Developer"
    objects: {
      apps: Prisma.$AppPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      passwordHash: string | null
      type: $Enums.DeveloperType
      vatNumber: string | null
      country: string
      verified: boolean
      verifiedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["developer"]>
    composites: {}
  }

  type DeveloperGetPayload<S extends boolean | null | undefined | DeveloperDefaultArgs> = $Result.GetResult<Prisma.$DeveloperPayload, S>

  type DeveloperCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeveloperFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeveloperCountAggregateInputType | true
    }

  export interface DeveloperDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Developer'], meta: { name: 'Developer' } }
    /**
     * Find zero or one Developer that matches the filter.
     * @param {DeveloperFindUniqueArgs} args - Arguments to find a Developer
     * @example
     * // Get one Developer
     * const developer = await prisma.developer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeveloperFindUniqueArgs>(args: SelectSubset<T, DeveloperFindUniqueArgs<ExtArgs>>): Prisma__DeveloperClient<$Result.GetResult<Prisma.$DeveloperPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Developer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeveloperFindUniqueOrThrowArgs} args - Arguments to find a Developer
     * @example
     * // Get one Developer
     * const developer = await prisma.developer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeveloperFindUniqueOrThrowArgs>(args: SelectSubset<T, DeveloperFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeveloperClient<$Result.GetResult<Prisma.$DeveloperPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Developer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeveloperFindFirstArgs} args - Arguments to find a Developer
     * @example
     * // Get one Developer
     * const developer = await prisma.developer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeveloperFindFirstArgs>(args?: SelectSubset<T, DeveloperFindFirstArgs<ExtArgs>>): Prisma__DeveloperClient<$Result.GetResult<Prisma.$DeveloperPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Developer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeveloperFindFirstOrThrowArgs} args - Arguments to find a Developer
     * @example
     * // Get one Developer
     * const developer = await prisma.developer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeveloperFindFirstOrThrowArgs>(args?: SelectSubset<T, DeveloperFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeveloperClient<$Result.GetResult<Prisma.$DeveloperPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Developers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeveloperFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Developers
     * const developers = await prisma.developer.findMany()
     * 
     * // Get first 10 Developers
     * const developers = await prisma.developer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const developerWithIdOnly = await prisma.developer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeveloperFindManyArgs>(args?: SelectSubset<T, DeveloperFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeveloperPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Developer.
     * @param {DeveloperCreateArgs} args - Arguments to create a Developer.
     * @example
     * // Create one Developer
     * const Developer = await prisma.developer.create({
     *   data: {
     *     // ... data to create a Developer
     *   }
     * })
     * 
     */
    create<T extends DeveloperCreateArgs>(args: SelectSubset<T, DeveloperCreateArgs<ExtArgs>>): Prisma__DeveloperClient<$Result.GetResult<Prisma.$DeveloperPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Developers.
     * @param {DeveloperCreateManyArgs} args - Arguments to create many Developers.
     * @example
     * // Create many Developers
     * const developer = await prisma.developer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeveloperCreateManyArgs>(args?: SelectSubset<T, DeveloperCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Developers and returns the data saved in the database.
     * @param {DeveloperCreateManyAndReturnArgs} args - Arguments to create many Developers.
     * @example
     * // Create many Developers
     * const developer = await prisma.developer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Developers and only return the `id`
     * const developerWithIdOnly = await prisma.developer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeveloperCreateManyAndReturnArgs>(args?: SelectSubset<T, DeveloperCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeveloperPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Developer.
     * @param {DeveloperDeleteArgs} args - Arguments to delete one Developer.
     * @example
     * // Delete one Developer
     * const Developer = await prisma.developer.delete({
     *   where: {
     *     // ... filter to delete one Developer
     *   }
     * })
     * 
     */
    delete<T extends DeveloperDeleteArgs>(args: SelectSubset<T, DeveloperDeleteArgs<ExtArgs>>): Prisma__DeveloperClient<$Result.GetResult<Prisma.$DeveloperPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Developer.
     * @param {DeveloperUpdateArgs} args - Arguments to update one Developer.
     * @example
     * // Update one Developer
     * const developer = await prisma.developer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeveloperUpdateArgs>(args: SelectSubset<T, DeveloperUpdateArgs<ExtArgs>>): Prisma__DeveloperClient<$Result.GetResult<Prisma.$DeveloperPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Developers.
     * @param {DeveloperDeleteManyArgs} args - Arguments to filter Developers to delete.
     * @example
     * // Delete a few Developers
     * const { count } = await prisma.developer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeveloperDeleteManyArgs>(args?: SelectSubset<T, DeveloperDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Developers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeveloperUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Developers
     * const developer = await prisma.developer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeveloperUpdateManyArgs>(args: SelectSubset<T, DeveloperUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Developers and returns the data updated in the database.
     * @param {DeveloperUpdateManyAndReturnArgs} args - Arguments to update many Developers.
     * @example
     * // Update many Developers
     * const developer = await prisma.developer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Developers and only return the `id`
     * const developerWithIdOnly = await prisma.developer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DeveloperUpdateManyAndReturnArgs>(args: SelectSubset<T, DeveloperUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeveloperPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Developer.
     * @param {DeveloperUpsertArgs} args - Arguments to update or create a Developer.
     * @example
     * // Update or create a Developer
     * const developer = await prisma.developer.upsert({
     *   create: {
     *     // ... data to create a Developer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Developer we want to update
     *   }
     * })
     */
    upsert<T extends DeveloperUpsertArgs>(args: SelectSubset<T, DeveloperUpsertArgs<ExtArgs>>): Prisma__DeveloperClient<$Result.GetResult<Prisma.$DeveloperPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Developers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeveloperCountArgs} args - Arguments to filter Developers to count.
     * @example
     * // Count the number of Developers
     * const count = await prisma.developer.count({
     *   where: {
     *     // ... the filter for the Developers we want to count
     *   }
     * })
    **/
    count<T extends DeveloperCountArgs>(
      args?: Subset<T, DeveloperCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeveloperCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Developer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeveloperAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeveloperAggregateArgs>(args: Subset<T, DeveloperAggregateArgs>): Prisma.PrismaPromise<GetDeveloperAggregateType<T>>

    /**
     * Group by Developer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeveloperGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeveloperGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeveloperGroupByArgs['orderBy'] }
        : { orderBy?: DeveloperGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeveloperGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeveloperGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Developer model
   */
  readonly fields: DeveloperFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Developer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeveloperClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    apps<T extends Developer$appsArgs<ExtArgs> = {}>(args?: Subset<T, Developer$appsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Developer model
   */
  interface DeveloperFieldRefs {
    readonly id: FieldRef<"Developer", 'String'>
    readonly email: FieldRef<"Developer", 'String'>
    readonly name: FieldRef<"Developer", 'String'>
    readonly passwordHash: FieldRef<"Developer", 'String'>
    readonly type: FieldRef<"Developer", 'DeveloperType'>
    readonly vatNumber: FieldRef<"Developer", 'String'>
    readonly country: FieldRef<"Developer", 'String'>
    readonly verified: FieldRef<"Developer", 'Boolean'>
    readonly verifiedAt: FieldRef<"Developer", 'DateTime'>
    readonly createdAt: FieldRef<"Developer", 'DateTime'>
    readonly updatedAt: FieldRef<"Developer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Developer findUnique
   */
  export type DeveloperFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Developer
     */
    select?: DeveloperSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Developer
     */
    omit?: DeveloperOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeveloperInclude<ExtArgs> | null
    /**
     * Filter, which Developer to fetch.
     */
    where: DeveloperWhereUniqueInput
  }

  /**
   * Developer findUniqueOrThrow
   */
  export type DeveloperFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Developer
     */
    select?: DeveloperSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Developer
     */
    omit?: DeveloperOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeveloperInclude<ExtArgs> | null
    /**
     * Filter, which Developer to fetch.
     */
    where: DeveloperWhereUniqueInput
  }

  /**
   * Developer findFirst
   */
  export type DeveloperFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Developer
     */
    select?: DeveloperSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Developer
     */
    omit?: DeveloperOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeveloperInclude<ExtArgs> | null
    /**
     * Filter, which Developer to fetch.
     */
    where?: DeveloperWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Developers to fetch.
     */
    orderBy?: DeveloperOrderByWithRelationInput | DeveloperOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Developers.
     */
    cursor?: DeveloperWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Developers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Developers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Developers.
     */
    distinct?: DeveloperScalarFieldEnum | DeveloperScalarFieldEnum[]
  }

  /**
   * Developer findFirstOrThrow
   */
  export type DeveloperFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Developer
     */
    select?: DeveloperSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Developer
     */
    omit?: DeveloperOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeveloperInclude<ExtArgs> | null
    /**
     * Filter, which Developer to fetch.
     */
    where?: DeveloperWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Developers to fetch.
     */
    orderBy?: DeveloperOrderByWithRelationInput | DeveloperOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Developers.
     */
    cursor?: DeveloperWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Developers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Developers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Developers.
     */
    distinct?: DeveloperScalarFieldEnum | DeveloperScalarFieldEnum[]
  }

  /**
   * Developer findMany
   */
  export type DeveloperFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Developer
     */
    select?: DeveloperSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Developer
     */
    omit?: DeveloperOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeveloperInclude<ExtArgs> | null
    /**
     * Filter, which Developers to fetch.
     */
    where?: DeveloperWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Developers to fetch.
     */
    orderBy?: DeveloperOrderByWithRelationInput | DeveloperOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Developers.
     */
    cursor?: DeveloperWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Developers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Developers.
     */
    skip?: number
    distinct?: DeveloperScalarFieldEnum | DeveloperScalarFieldEnum[]
  }

  /**
   * Developer create
   */
  export type DeveloperCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Developer
     */
    select?: DeveloperSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Developer
     */
    omit?: DeveloperOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeveloperInclude<ExtArgs> | null
    /**
     * The data needed to create a Developer.
     */
    data: XOR<DeveloperCreateInput, DeveloperUncheckedCreateInput>
  }

  /**
   * Developer createMany
   */
  export type DeveloperCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Developers.
     */
    data: DeveloperCreateManyInput | DeveloperCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Developer createManyAndReturn
   */
  export type DeveloperCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Developer
     */
    select?: DeveloperSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Developer
     */
    omit?: DeveloperOmit<ExtArgs> | null
    /**
     * The data used to create many Developers.
     */
    data: DeveloperCreateManyInput | DeveloperCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Developer update
   */
  export type DeveloperUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Developer
     */
    select?: DeveloperSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Developer
     */
    omit?: DeveloperOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeveloperInclude<ExtArgs> | null
    /**
     * The data needed to update a Developer.
     */
    data: XOR<DeveloperUpdateInput, DeveloperUncheckedUpdateInput>
    /**
     * Choose, which Developer to update.
     */
    where: DeveloperWhereUniqueInput
  }

  /**
   * Developer updateMany
   */
  export type DeveloperUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Developers.
     */
    data: XOR<DeveloperUpdateManyMutationInput, DeveloperUncheckedUpdateManyInput>
    /**
     * Filter which Developers to update
     */
    where?: DeveloperWhereInput
    /**
     * Limit how many Developers to update.
     */
    limit?: number
  }

  /**
   * Developer updateManyAndReturn
   */
  export type DeveloperUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Developer
     */
    select?: DeveloperSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Developer
     */
    omit?: DeveloperOmit<ExtArgs> | null
    /**
     * The data used to update Developers.
     */
    data: XOR<DeveloperUpdateManyMutationInput, DeveloperUncheckedUpdateManyInput>
    /**
     * Filter which Developers to update
     */
    where?: DeveloperWhereInput
    /**
     * Limit how many Developers to update.
     */
    limit?: number
  }

  /**
   * Developer upsert
   */
  export type DeveloperUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Developer
     */
    select?: DeveloperSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Developer
     */
    omit?: DeveloperOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeveloperInclude<ExtArgs> | null
    /**
     * The filter to search for the Developer to update in case it exists.
     */
    where: DeveloperWhereUniqueInput
    /**
     * In case the Developer found by the `where` argument doesn't exist, create a new Developer with this data.
     */
    create: XOR<DeveloperCreateInput, DeveloperUncheckedCreateInput>
    /**
     * In case the Developer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeveloperUpdateInput, DeveloperUncheckedUpdateInput>
  }

  /**
   * Developer delete
   */
  export type DeveloperDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Developer
     */
    select?: DeveloperSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Developer
     */
    omit?: DeveloperOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeveloperInclude<ExtArgs> | null
    /**
     * Filter which Developer to delete.
     */
    where: DeveloperWhereUniqueInput
  }

  /**
   * Developer deleteMany
   */
  export type DeveloperDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Developers to delete
     */
    where?: DeveloperWhereInput
    /**
     * Limit how many Developers to delete.
     */
    limit?: number
  }

  /**
   * Developer.apps
   */
  export type Developer$appsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    where?: AppWhereInput
    orderBy?: AppOrderByWithRelationInput | AppOrderByWithRelationInput[]
    cursor?: AppWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppScalarFieldEnum | AppScalarFieldEnum[]
  }

  /**
   * Developer without action
   */
  export type DeveloperDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Developer
     */
    select?: DeveloperSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Developer
     */
    omit?: DeveloperOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeveloperInclude<ExtArgs> | null
  }


  /**
   * Model App
   */

  export type AggregateApp = {
    _count: AppCountAggregateOutputType | null
    _avg: AppAvgAggregateOutputType | null
    _sum: AppSumAggregateOutputType | null
    _min: AppMinAggregateOutputType | null
    _max: AppMaxAggregateOutputType | null
  }

  export type AppAvgAggregateOutputType = {
    totalDownloads: number | null
  }

  export type AppSumAggregateOutputType = {
    totalDownloads: number | null
  }

  export type AppMinAggregateOutputType = {
    id: string | null
    slug: string | null
    name: string | null
    bundleId: string | null
    developerId: string | null
    category: $Enums.Category | null
    description: string | null
    shortDesc: string | null
    iconUrl: string | null
    status: $Enums.AppStatus | null
    platform: $Enums.Platform | null
    minAndroid: string | null
    minIos: string | null
    websiteUrl: string | null
    privacyUrl: string | null
    sourceUrl: string | null
    totalDownloads: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    name: string | null
    bundleId: string | null
    developerId: string | null
    category: $Enums.Category | null
    description: string | null
    shortDesc: string | null
    iconUrl: string | null
    status: $Enums.AppStatus | null
    platform: $Enums.Platform | null
    minAndroid: string | null
    minIos: string | null
    websiteUrl: string | null
    privacyUrl: string | null
    sourceUrl: string | null
    totalDownloads: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppCountAggregateOutputType = {
    id: number
    slug: number
    name: number
    bundleId: number
    developerId: number
    category: number
    description: number
    shortDesc: number
    iconUrl: number
    screenshots: number
    status: number
    platform: number
    minAndroid: number
    minIos: number
    websiteUrl: number
    privacyUrl: number
    sourceUrl: number
    totalDownloads: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AppAvgAggregateInputType = {
    totalDownloads?: true
  }

  export type AppSumAggregateInputType = {
    totalDownloads?: true
  }

  export type AppMinAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    bundleId?: true
    developerId?: true
    category?: true
    description?: true
    shortDesc?: true
    iconUrl?: true
    status?: true
    platform?: true
    minAndroid?: true
    minIos?: true
    websiteUrl?: true
    privacyUrl?: true
    sourceUrl?: true
    totalDownloads?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppMaxAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    bundleId?: true
    developerId?: true
    category?: true
    description?: true
    shortDesc?: true
    iconUrl?: true
    status?: true
    platform?: true
    minAndroid?: true
    minIos?: true
    websiteUrl?: true
    privacyUrl?: true
    sourceUrl?: true
    totalDownloads?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppCountAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    bundleId?: true
    developerId?: true
    category?: true
    description?: true
    shortDesc?: true
    iconUrl?: true
    screenshots?: true
    status?: true
    platform?: true
    minAndroid?: true
    minIos?: true
    websiteUrl?: true
    privacyUrl?: true
    sourceUrl?: true
    totalDownloads?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AppAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which App to aggregate.
     */
    where?: AppWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Apps to fetch.
     */
    orderBy?: AppOrderByWithRelationInput | AppOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Apps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Apps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Apps
    **/
    _count?: true | AppCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppMaxAggregateInputType
  }

  export type GetAppAggregateType<T extends AppAggregateArgs> = {
        [P in keyof T & keyof AggregateApp]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApp[P]>
      : GetScalarType<T[P], AggregateApp[P]>
  }




  export type AppGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppWhereInput
    orderBy?: AppOrderByWithAggregationInput | AppOrderByWithAggregationInput[]
    by: AppScalarFieldEnum[] | AppScalarFieldEnum
    having?: AppScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppCountAggregateInputType | true
    _avg?: AppAvgAggregateInputType
    _sum?: AppSumAggregateInputType
    _min?: AppMinAggregateInputType
    _max?: AppMaxAggregateInputType
  }

  export type AppGroupByOutputType = {
    id: string
    slug: string
    name: string
    bundleId: string
    developerId: string
    category: $Enums.Category
    description: string
    shortDesc: string
    iconUrl: string
    screenshots: string[]
    status: $Enums.AppStatus
    platform: $Enums.Platform
    minAndroid: string | null
    minIos: string | null
    websiteUrl: string | null
    privacyUrl: string
    sourceUrl: string | null
    totalDownloads: number
    createdAt: Date
    updatedAt: Date
    _count: AppCountAggregateOutputType | null
    _avg: AppAvgAggregateOutputType | null
    _sum: AppSumAggregateOutputType | null
    _min: AppMinAggregateOutputType | null
    _max: AppMaxAggregateOutputType | null
  }

  type GetAppGroupByPayload<T extends AppGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppGroupByOutputType[P]>
            : GetScalarType<T[P], AppGroupByOutputType[P]>
        }
      >
    >


  export type AppSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    bundleId?: boolean
    developerId?: boolean
    category?: boolean
    description?: boolean
    shortDesc?: boolean
    iconUrl?: boolean
    screenshots?: boolean
    status?: boolean
    platform?: boolean
    minAndroid?: boolean
    minIos?: boolean
    websiteUrl?: boolean
    privacyUrl?: boolean
    sourceUrl?: boolean
    totalDownloads?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    developer?: boolean | DeveloperDefaultArgs<ExtArgs>
    versions?: boolean | App$versionsArgs<ExtArgs>
    tags?: boolean | App$tagsArgs<ExtArgs>
    _count?: boolean | AppCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["app"]>

  export type AppSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    bundleId?: boolean
    developerId?: boolean
    category?: boolean
    description?: boolean
    shortDesc?: boolean
    iconUrl?: boolean
    screenshots?: boolean
    status?: boolean
    platform?: boolean
    minAndroid?: boolean
    minIos?: boolean
    websiteUrl?: boolean
    privacyUrl?: boolean
    sourceUrl?: boolean
    totalDownloads?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    developer?: boolean | DeveloperDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["app"]>

  export type AppSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    bundleId?: boolean
    developerId?: boolean
    category?: boolean
    description?: boolean
    shortDesc?: boolean
    iconUrl?: boolean
    screenshots?: boolean
    status?: boolean
    platform?: boolean
    minAndroid?: boolean
    minIos?: boolean
    websiteUrl?: boolean
    privacyUrl?: boolean
    sourceUrl?: boolean
    totalDownloads?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    developer?: boolean | DeveloperDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["app"]>

  export type AppSelectScalar = {
    id?: boolean
    slug?: boolean
    name?: boolean
    bundleId?: boolean
    developerId?: boolean
    category?: boolean
    description?: boolean
    shortDesc?: boolean
    iconUrl?: boolean
    screenshots?: boolean
    status?: boolean
    platform?: boolean
    minAndroid?: boolean
    minIos?: boolean
    websiteUrl?: boolean
    privacyUrl?: boolean
    sourceUrl?: boolean
    totalDownloads?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AppOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "name" | "bundleId" | "developerId" | "category" | "description" | "shortDesc" | "iconUrl" | "screenshots" | "status" | "platform" | "minAndroid" | "minIos" | "websiteUrl" | "privacyUrl" | "sourceUrl" | "totalDownloads" | "createdAt" | "updatedAt", ExtArgs["result"]["app"]>
  export type AppInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    developer?: boolean | DeveloperDefaultArgs<ExtArgs>
    versions?: boolean | App$versionsArgs<ExtArgs>
    tags?: boolean | App$tagsArgs<ExtArgs>
    _count?: boolean | AppCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AppIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    developer?: boolean | DeveloperDefaultArgs<ExtArgs>
  }
  export type AppIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    developer?: boolean | DeveloperDefaultArgs<ExtArgs>
  }

  export type $AppPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "App"
    objects: {
      developer: Prisma.$DeveloperPayload<ExtArgs>
      versions: Prisma.$VersionPayload<ExtArgs>[]
      tags: Prisma.$TagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      name: string
      bundleId: string
      developerId: string
      category: $Enums.Category
      description: string
      shortDesc: string
      iconUrl: string
      screenshots: string[]
      status: $Enums.AppStatus
      platform: $Enums.Platform
      minAndroid: string | null
      minIos: string | null
      websiteUrl: string | null
      privacyUrl: string
      sourceUrl: string | null
      totalDownloads: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["app"]>
    composites: {}
  }

  type AppGetPayload<S extends boolean | null | undefined | AppDefaultArgs> = $Result.GetResult<Prisma.$AppPayload, S>

  type AppCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppCountAggregateInputType | true
    }

  export interface AppDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['App'], meta: { name: 'App' } }
    /**
     * Find zero or one App that matches the filter.
     * @param {AppFindUniqueArgs} args - Arguments to find a App
     * @example
     * // Get one App
     * const app = await prisma.app.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppFindUniqueArgs>(args: SelectSubset<T, AppFindUniqueArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one App that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppFindUniqueOrThrowArgs} args - Arguments to find a App
     * @example
     * // Get one App
     * const app = await prisma.app.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppFindUniqueOrThrowArgs>(args: SelectSubset<T, AppFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first App that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppFindFirstArgs} args - Arguments to find a App
     * @example
     * // Get one App
     * const app = await prisma.app.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppFindFirstArgs>(args?: SelectSubset<T, AppFindFirstArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first App that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppFindFirstOrThrowArgs} args - Arguments to find a App
     * @example
     * // Get one App
     * const app = await prisma.app.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppFindFirstOrThrowArgs>(args?: SelectSubset<T, AppFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Apps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Apps
     * const apps = await prisma.app.findMany()
     * 
     * // Get first 10 Apps
     * const apps = await prisma.app.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appWithIdOnly = await prisma.app.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppFindManyArgs>(args?: SelectSubset<T, AppFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a App.
     * @param {AppCreateArgs} args - Arguments to create a App.
     * @example
     * // Create one App
     * const App = await prisma.app.create({
     *   data: {
     *     // ... data to create a App
     *   }
     * })
     * 
     */
    create<T extends AppCreateArgs>(args: SelectSubset<T, AppCreateArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Apps.
     * @param {AppCreateManyArgs} args - Arguments to create many Apps.
     * @example
     * // Create many Apps
     * const app = await prisma.app.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppCreateManyArgs>(args?: SelectSubset<T, AppCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Apps and returns the data saved in the database.
     * @param {AppCreateManyAndReturnArgs} args - Arguments to create many Apps.
     * @example
     * // Create many Apps
     * const app = await prisma.app.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Apps and only return the `id`
     * const appWithIdOnly = await prisma.app.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppCreateManyAndReturnArgs>(args?: SelectSubset<T, AppCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a App.
     * @param {AppDeleteArgs} args - Arguments to delete one App.
     * @example
     * // Delete one App
     * const App = await prisma.app.delete({
     *   where: {
     *     // ... filter to delete one App
     *   }
     * })
     * 
     */
    delete<T extends AppDeleteArgs>(args: SelectSubset<T, AppDeleteArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one App.
     * @param {AppUpdateArgs} args - Arguments to update one App.
     * @example
     * // Update one App
     * const app = await prisma.app.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppUpdateArgs>(args: SelectSubset<T, AppUpdateArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Apps.
     * @param {AppDeleteManyArgs} args - Arguments to filter Apps to delete.
     * @example
     * // Delete a few Apps
     * const { count } = await prisma.app.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppDeleteManyArgs>(args?: SelectSubset<T, AppDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Apps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Apps
     * const app = await prisma.app.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppUpdateManyArgs>(args: SelectSubset<T, AppUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Apps and returns the data updated in the database.
     * @param {AppUpdateManyAndReturnArgs} args - Arguments to update many Apps.
     * @example
     * // Update many Apps
     * const app = await prisma.app.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Apps and only return the `id`
     * const appWithIdOnly = await prisma.app.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AppUpdateManyAndReturnArgs>(args: SelectSubset<T, AppUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one App.
     * @param {AppUpsertArgs} args - Arguments to update or create a App.
     * @example
     * // Update or create a App
     * const app = await prisma.app.upsert({
     *   create: {
     *     // ... data to create a App
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the App we want to update
     *   }
     * })
     */
    upsert<T extends AppUpsertArgs>(args: SelectSubset<T, AppUpsertArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Apps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppCountArgs} args - Arguments to filter Apps to count.
     * @example
     * // Count the number of Apps
     * const count = await prisma.app.count({
     *   where: {
     *     // ... the filter for the Apps we want to count
     *   }
     * })
    **/
    count<T extends AppCountArgs>(
      args?: Subset<T, AppCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a App.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppAggregateArgs>(args: Subset<T, AppAggregateArgs>): Prisma.PrismaPromise<GetAppAggregateType<T>>

    /**
     * Group by App.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppGroupByArgs['orderBy'] }
        : { orderBy?: AppGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the App model
   */
  readonly fields: AppFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for App.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    developer<T extends DeveloperDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DeveloperDefaultArgs<ExtArgs>>): Prisma__DeveloperClient<$Result.GetResult<Prisma.$DeveloperPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    versions<T extends App$versionsArgs<ExtArgs> = {}>(args?: Subset<T, App$versionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tags<T extends App$tagsArgs<ExtArgs> = {}>(args?: Subset<T, App$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the App model
   */
  interface AppFieldRefs {
    readonly id: FieldRef<"App", 'String'>
    readonly slug: FieldRef<"App", 'String'>
    readonly name: FieldRef<"App", 'String'>
    readonly bundleId: FieldRef<"App", 'String'>
    readonly developerId: FieldRef<"App", 'String'>
    readonly category: FieldRef<"App", 'Category'>
    readonly description: FieldRef<"App", 'String'>
    readonly shortDesc: FieldRef<"App", 'String'>
    readonly iconUrl: FieldRef<"App", 'String'>
    readonly screenshots: FieldRef<"App", 'String[]'>
    readonly status: FieldRef<"App", 'AppStatus'>
    readonly platform: FieldRef<"App", 'Platform'>
    readonly minAndroid: FieldRef<"App", 'String'>
    readonly minIos: FieldRef<"App", 'String'>
    readonly websiteUrl: FieldRef<"App", 'String'>
    readonly privacyUrl: FieldRef<"App", 'String'>
    readonly sourceUrl: FieldRef<"App", 'String'>
    readonly totalDownloads: FieldRef<"App", 'Int'>
    readonly createdAt: FieldRef<"App", 'DateTime'>
    readonly updatedAt: FieldRef<"App", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * App findUnique
   */
  export type AppFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * Filter, which App to fetch.
     */
    where: AppWhereUniqueInput
  }

  /**
   * App findUniqueOrThrow
   */
  export type AppFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * Filter, which App to fetch.
     */
    where: AppWhereUniqueInput
  }

  /**
   * App findFirst
   */
  export type AppFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * Filter, which App to fetch.
     */
    where?: AppWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Apps to fetch.
     */
    orderBy?: AppOrderByWithRelationInput | AppOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Apps.
     */
    cursor?: AppWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Apps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Apps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Apps.
     */
    distinct?: AppScalarFieldEnum | AppScalarFieldEnum[]
  }

  /**
   * App findFirstOrThrow
   */
  export type AppFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * Filter, which App to fetch.
     */
    where?: AppWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Apps to fetch.
     */
    orderBy?: AppOrderByWithRelationInput | AppOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Apps.
     */
    cursor?: AppWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Apps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Apps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Apps.
     */
    distinct?: AppScalarFieldEnum | AppScalarFieldEnum[]
  }

  /**
   * App findMany
   */
  export type AppFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * Filter, which Apps to fetch.
     */
    where?: AppWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Apps to fetch.
     */
    orderBy?: AppOrderByWithRelationInput | AppOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Apps.
     */
    cursor?: AppWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Apps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Apps.
     */
    skip?: number
    distinct?: AppScalarFieldEnum | AppScalarFieldEnum[]
  }

  /**
   * App create
   */
  export type AppCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * The data needed to create a App.
     */
    data: XOR<AppCreateInput, AppUncheckedCreateInput>
  }

  /**
   * App createMany
   */
  export type AppCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Apps.
     */
    data: AppCreateManyInput | AppCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * App createManyAndReturn
   */
  export type AppCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * The data used to create many Apps.
     */
    data: AppCreateManyInput | AppCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * App update
   */
  export type AppUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * The data needed to update a App.
     */
    data: XOR<AppUpdateInput, AppUncheckedUpdateInput>
    /**
     * Choose, which App to update.
     */
    where: AppWhereUniqueInput
  }

  /**
   * App updateMany
   */
  export type AppUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Apps.
     */
    data: XOR<AppUpdateManyMutationInput, AppUncheckedUpdateManyInput>
    /**
     * Filter which Apps to update
     */
    where?: AppWhereInput
    /**
     * Limit how many Apps to update.
     */
    limit?: number
  }

  /**
   * App updateManyAndReturn
   */
  export type AppUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * The data used to update Apps.
     */
    data: XOR<AppUpdateManyMutationInput, AppUncheckedUpdateManyInput>
    /**
     * Filter which Apps to update
     */
    where?: AppWhereInput
    /**
     * Limit how many Apps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * App upsert
   */
  export type AppUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * The filter to search for the App to update in case it exists.
     */
    where: AppWhereUniqueInput
    /**
     * In case the App found by the `where` argument doesn't exist, create a new App with this data.
     */
    create: XOR<AppCreateInput, AppUncheckedCreateInput>
    /**
     * In case the App was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppUpdateInput, AppUncheckedUpdateInput>
  }

  /**
   * App delete
   */
  export type AppDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * Filter which App to delete.
     */
    where: AppWhereUniqueInput
  }

  /**
   * App deleteMany
   */
  export type AppDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Apps to delete
     */
    where?: AppWhereInput
    /**
     * Limit how many Apps to delete.
     */
    limit?: number
  }

  /**
   * App.versions
   */
  export type App$versionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Version
     */
    omit?: VersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionInclude<ExtArgs> | null
    where?: VersionWhereInput
    orderBy?: VersionOrderByWithRelationInput | VersionOrderByWithRelationInput[]
    cursor?: VersionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VersionScalarFieldEnum | VersionScalarFieldEnum[]
  }

  /**
   * App.tags
   */
  export type App$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    where?: TagWhereInput
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    cursor?: TagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * App without action
   */
  export type AppDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
  }


  /**
   * Model Version
   */

  export type AggregateVersion = {
    _count: VersionCountAggregateOutputType | null
    _avg: VersionAvgAggregateOutputType | null
    _sum: VersionSumAggregateOutputType | null
    _min: VersionMinAggregateOutputType | null
    _max: VersionMaxAggregateOutputType | null
  }

  export type VersionAvgAggregateOutputType = {
    versionCode: number | null
    fileSize: number | null
  }

  export type VersionSumAggregateOutputType = {
    versionCode: number | null
    fileSize: bigint | null
  }

  export type VersionMinAggregateOutputType = {
    id: string | null
    appId: string | null
    versionName: string | null
    versionCode: number | null
    platform: $Enums.Platform | null
    fileKey: string | null
    fileSize: bigint | null
    fileSha256: string | null
    changelog: string | null
    minOs: string | null
    status: $Enums.VersionStatus | null
    virusTotalId: string | null
    scannedAt: Date | null
    publishedAt: Date | null
    createdAt: Date | null
  }

  export type VersionMaxAggregateOutputType = {
    id: string | null
    appId: string | null
    versionName: string | null
    versionCode: number | null
    platform: $Enums.Platform | null
    fileKey: string | null
    fileSize: bigint | null
    fileSha256: string | null
    changelog: string | null
    minOs: string | null
    status: $Enums.VersionStatus | null
    virusTotalId: string | null
    scannedAt: Date | null
    publishedAt: Date | null
    createdAt: Date | null
  }

  export type VersionCountAggregateOutputType = {
    id: number
    appId: number
    versionName: number
    versionCode: number
    platform: number
    fileKey: number
    fileSize: number
    fileSha256: number
    changelog: number
    minOs: number
    status: number
    virusTotalId: number
    virusTotalReport: number
    scannedAt: number
    publishedAt: number
    createdAt: number
    _all: number
  }


  export type VersionAvgAggregateInputType = {
    versionCode?: true
    fileSize?: true
  }

  export type VersionSumAggregateInputType = {
    versionCode?: true
    fileSize?: true
  }

  export type VersionMinAggregateInputType = {
    id?: true
    appId?: true
    versionName?: true
    versionCode?: true
    platform?: true
    fileKey?: true
    fileSize?: true
    fileSha256?: true
    changelog?: true
    minOs?: true
    status?: true
    virusTotalId?: true
    scannedAt?: true
    publishedAt?: true
    createdAt?: true
  }

  export type VersionMaxAggregateInputType = {
    id?: true
    appId?: true
    versionName?: true
    versionCode?: true
    platform?: true
    fileKey?: true
    fileSize?: true
    fileSha256?: true
    changelog?: true
    minOs?: true
    status?: true
    virusTotalId?: true
    scannedAt?: true
    publishedAt?: true
    createdAt?: true
  }

  export type VersionCountAggregateInputType = {
    id?: true
    appId?: true
    versionName?: true
    versionCode?: true
    platform?: true
    fileKey?: true
    fileSize?: true
    fileSha256?: true
    changelog?: true
    minOs?: true
    status?: true
    virusTotalId?: true
    virusTotalReport?: true
    scannedAt?: true
    publishedAt?: true
    createdAt?: true
    _all?: true
  }

  export type VersionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Version to aggregate.
     */
    where?: VersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Versions to fetch.
     */
    orderBy?: VersionOrderByWithRelationInput | VersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Versions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Versions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Versions
    **/
    _count?: true | VersionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VersionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VersionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VersionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VersionMaxAggregateInputType
  }

  export type GetVersionAggregateType<T extends VersionAggregateArgs> = {
        [P in keyof T & keyof AggregateVersion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVersion[P]>
      : GetScalarType<T[P], AggregateVersion[P]>
  }




  export type VersionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VersionWhereInput
    orderBy?: VersionOrderByWithAggregationInput | VersionOrderByWithAggregationInput[]
    by: VersionScalarFieldEnum[] | VersionScalarFieldEnum
    having?: VersionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VersionCountAggregateInputType | true
    _avg?: VersionAvgAggregateInputType
    _sum?: VersionSumAggregateInputType
    _min?: VersionMinAggregateInputType
    _max?: VersionMaxAggregateInputType
  }

  export type VersionGroupByOutputType = {
    id: string
    appId: string
    versionName: string
    versionCode: number
    platform: $Enums.Platform
    fileKey: string
    fileSize: bigint
    fileSha256: string
    changelog: string
    minOs: string
    status: $Enums.VersionStatus
    virusTotalId: string | null
    virusTotalReport: JsonValue | null
    scannedAt: Date | null
    publishedAt: Date | null
    createdAt: Date
    _count: VersionCountAggregateOutputType | null
    _avg: VersionAvgAggregateOutputType | null
    _sum: VersionSumAggregateOutputType | null
    _min: VersionMinAggregateOutputType | null
    _max: VersionMaxAggregateOutputType | null
  }

  type GetVersionGroupByPayload<T extends VersionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VersionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VersionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VersionGroupByOutputType[P]>
            : GetScalarType<T[P], VersionGroupByOutputType[P]>
        }
      >
    >


  export type VersionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    appId?: boolean
    versionName?: boolean
    versionCode?: boolean
    platform?: boolean
    fileKey?: boolean
    fileSize?: boolean
    fileSha256?: boolean
    changelog?: boolean
    minOs?: boolean
    status?: boolean
    virusTotalId?: boolean
    virusTotalReport?: boolean
    scannedAt?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    app?: boolean | AppDefaultArgs<ExtArgs>
    downloadLogs?: boolean | Version$downloadLogsArgs<ExtArgs>
    _count?: boolean | VersionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["version"]>

  export type VersionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    appId?: boolean
    versionName?: boolean
    versionCode?: boolean
    platform?: boolean
    fileKey?: boolean
    fileSize?: boolean
    fileSha256?: boolean
    changelog?: boolean
    minOs?: boolean
    status?: boolean
    virusTotalId?: boolean
    virusTotalReport?: boolean
    scannedAt?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    app?: boolean | AppDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["version"]>

  export type VersionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    appId?: boolean
    versionName?: boolean
    versionCode?: boolean
    platform?: boolean
    fileKey?: boolean
    fileSize?: boolean
    fileSha256?: boolean
    changelog?: boolean
    minOs?: boolean
    status?: boolean
    virusTotalId?: boolean
    virusTotalReport?: boolean
    scannedAt?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    app?: boolean | AppDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["version"]>

  export type VersionSelectScalar = {
    id?: boolean
    appId?: boolean
    versionName?: boolean
    versionCode?: boolean
    platform?: boolean
    fileKey?: boolean
    fileSize?: boolean
    fileSha256?: boolean
    changelog?: boolean
    minOs?: boolean
    status?: boolean
    virusTotalId?: boolean
    virusTotalReport?: boolean
    scannedAt?: boolean
    publishedAt?: boolean
    createdAt?: boolean
  }

  export type VersionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "appId" | "versionName" | "versionCode" | "platform" | "fileKey" | "fileSize" | "fileSha256" | "changelog" | "minOs" | "status" | "virusTotalId" | "virusTotalReport" | "scannedAt" | "publishedAt" | "createdAt", ExtArgs["result"]["version"]>
  export type VersionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    app?: boolean | AppDefaultArgs<ExtArgs>
    downloadLogs?: boolean | Version$downloadLogsArgs<ExtArgs>
    _count?: boolean | VersionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VersionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    app?: boolean | AppDefaultArgs<ExtArgs>
  }
  export type VersionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    app?: boolean | AppDefaultArgs<ExtArgs>
  }

  export type $VersionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Version"
    objects: {
      app: Prisma.$AppPayload<ExtArgs>
      downloadLogs: Prisma.$DownloadLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      appId: string
      versionName: string
      versionCode: number
      platform: $Enums.Platform
      fileKey: string
      fileSize: bigint
      fileSha256: string
      changelog: string
      minOs: string
      status: $Enums.VersionStatus
      virusTotalId: string | null
      virusTotalReport: Prisma.JsonValue | null
      scannedAt: Date | null
      publishedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["version"]>
    composites: {}
  }

  type VersionGetPayload<S extends boolean | null | undefined | VersionDefaultArgs> = $Result.GetResult<Prisma.$VersionPayload, S>

  type VersionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VersionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VersionCountAggregateInputType | true
    }

  export interface VersionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Version'], meta: { name: 'Version' } }
    /**
     * Find zero or one Version that matches the filter.
     * @param {VersionFindUniqueArgs} args - Arguments to find a Version
     * @example
     * // Get one Version
     * const version = await prisma.version.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VersionFindUniqueArgs>(args: SelectSubset<T, VersionFindUniqueArgs<ExtArgs>>): Prisma__VersionClient<$Result.GetResult<Prisma.$VersionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Version that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VersionFindUniqueOrThrowArgs} args - Arguments to find a Version
     * @example
     * // Get one Version
     * const version = await prisma.version.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VersionFindUniqueOrThrowArgs>(args: SelectSubset<T, VersionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VersionClient<$Result.GetResult<Prisma.$VersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Version that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionFindFirstArgs} args - Arguments to find a Version
     * @example
     * // Get one Version
     * const version = await prisma.version.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VersionFindFirstArgs>(args?: SelectSubset<T, VersionFindFirstArgs<ExtArgs>>): Prisma__VersionClient<$Result.GetResult<Prisma.$VersionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Version that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionFindFirstOrThrowArgs} args - Arguments to find a Version
     * @example
     * // Get one Version
     * const version = await prisma.version.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VersionFindFirstOrThrowArgs>(args?: SelectSubset<T, VersionFindFirstOrThrowArgs<ExtArgs>>): Prisma__VersionClient<$Result.GetResult<Prisma.$VersionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Versions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Versions
     * const versions = await prisma.version.findMany()
     * 
     * // Get first 10 Versions
     * const versions = await prisma.version.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const versionWithIdOnly = await prisma.version.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VersionFindManyArgs>(args?: SelectSubset<T, VersionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Version.
     * @param {VersionCreateArgs} args - Arguments to create a Version.
     * @example
     * // Create one Version
     * const Version = await prisma.version.create({
     *   data: {
     *     // ... data to create a Version
     *   }
     * })
     * 
     */
    create<T extends VersionCreateArgs>(args: SelectSubset<T, VersionCreateArgs<ExtArgs>>): Prisma__VersionClient<$Result.GetResult<Prisma.$VersionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Versions.
     * @param {VersionCreateManyArgs} args - Arguments to create many Versions.
     * @example
     * // Create many Versions
     * const version = await prisma.version.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VersionCreateManyArgs>(args?: SelectSubset<T, VersionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Versions and returns the data saved in the database.
     * @param {VersionCreateManyAndReturnArgs} args - Arguments to create many Versions.
     * @example
     * // Create many Versions
     * const version = await prisma.version.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Versions and only return the `id`
     * const versionWithIdOnly = await prisma.version.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VersionCreateManyAndReturnArgs>(args?: SelectSubset<T, VersionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VersionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Version.
     * @param {VersionDeleteArgs} args - Arguments to delete one Version.
     * @example
     * // Delete one Version
     * const Version = await prisma.version.delete({
     *   where: {
     *     // ... filter to delete one Version
     *   }
     * })
     * 
     */
    delete<T extends VersionDeleteArgs>(args: SelectSubset<T, VersionDeleteArgs<ExtArgs>>): Prisma__VersionClient<$Result.GetResult<Prisma.$VersionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Version.
     * @param {VersionUpdateArgs} args - Arguments to update one Version.
     * @example
     * // Update one Version
     * const version = await prisma.version.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VersionUpdateArgs>(args: SelectSubset<T, VersionUpdateArgs<ExtArgs>>): Prisma__VersionClient<$Result.GetResult<Prisma.$VersionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Versions.
     * @param {VersionDeleteManyArgs} args - Arguments to filter Versions to delete.
     * @example
     * // Delete a few Versions
     * const { count } = await prisma.version.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VersionDeleteManyArgs>(args?: SelectSubset<T, VersionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Versions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Versions
     * const version = await prisma.version.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VersionUpdateManyArgs>(args: SelectSubset<T, VersionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Versions and returns the data updated in the database.
     * @param {VersionUpdateManyAndReturnArgs} args - Arguments to update many Versions.
     * @example
     * // Update many Versions
     * const version = await prisma.version.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Versions and only return the `id`
     * const versionWithIdOnly = await prisma.version.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VersionUpdateManyAndReturnArgs>(args: SelectSubset<T, VersionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VersionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Version.
     * @param {VersionUpsertArgs} args - Arguments to update or create a Version.
     * @example
     * // Update or create a Version
     * const version = await prisma.version.upsert({
     *   create: {
     *     // ... data to create a Version
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Version we want to update
     *   }
     * })
     */
    upsert<T extends VersionUpsertArgs>(args: SelectSubset<T, VersionUpsertArgs<ExtArgs>>): Prisma__VersionClient<$Result.GetResult<Prisma.$VersionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Versions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionCountArgs} args - Arguments to filter Versions to count.
     * @example
     * // Count the number of Versions
     * const count = await prisma.version.count({
     *   where: {
     *     // ... the filter for the Versions we want to count
     *   }
     * })
    **/
    count<T extends VersionCountArgs>(
      args?: Subset<T, VersionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VersionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Version.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VersionAggregateArgs>(args: Subset<T, VersionAggregateArgs>): Prisma.PrismaPromise<GetVersionAggregateType<T>>

    /**
     * Group by Version.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VersionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VersionGroupByArgs['orderBy'] }
        : { orderBy?: VersionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VersionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVersionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Version model
   */
  readonly fields: VersionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Version.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VersionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    app<T extends AppDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AppDefaultArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    downloadLogs<T extends Version$downloadLogsArgs<ExtArgs> = {}>(args?: Subset<T, Version$downloadLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Version model
   */
  interface VersionFieldRefs {
    readonly id: FieldRef<"Version", 'String'>
    readonly appId: FieldRef<"Version", 'String'>
    readonly versionName: FieldRef<"Version", 'String'>
    readonly versionCode: FieldRef<"Version", 'Int'>
    readonly platform: FieldRef<"Version", 'Platform'>
    readonly fileKey: FieldRef<"Version", 'String'>
    readonly fileSize: FieldRef<"Version", 'BigInt'>
    readonly fileSha256: FieldRef<"Version", 'String'>
    readonly changelog: FieldRef<"Version", 'String'>
    readonly minOs: FieldRef<"Version", 'String'>
    readonly status: FieldRef<"Version", 'VersionStatus'>
    readonly virusTotalId: FieldRef<"Version", 'String'>
    readonly virusTotalReport: FieldRef<"Version", 'Json'>
    readonly scannedAt: FieldRef<"Version", 'DateTime'>
    readonly publishedAt: FieldRef<"Version", 'DateTime'>
    readonly createdAt: FieldRef<"Version", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Version findUnique
   */
  export type VersionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Version
     */
    omit?: VersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionInclude<ExtArgs> | null
    /**
     * Filter, which Version to fetch.
     */
    where: VersionWhereUniqueInput
  }

  /**
   * Version findUniqueOrThrow
   */
  export type VersionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Version
     */
    omit?: VersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionInclude<ExtArgs> | null
    /**
     * Filter, which Version to fetch.
     */
    where: VersionWhereUniqueInput
  }

  /**
   * Version findFirst
   */
  export type VersionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Version
     */
    omit?: VersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionInclude<ExtArgs> | null
    /**
     * Filter, which Version to fetch.
     */
    where?: VersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Versions to fetch.
     */
    orderBy?: VersionOrderByWithRelationInput | VersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Versions.
     */
    cursor?: VersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Versions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Versions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Versions.
     */
    distinct?: VersionScalarFieldEnum | VersionScalarFieldEnum[]
  }

  /**
   * Version findFirstOrThrow
   */
  export type VersionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Version
     */
    omit?: VersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionInclude<ExtArgs> | null
    /**
     * Filter, which Version to fetch.
     */
    where?: VersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Versions to fetch.
     */
    orderBy?: VersionOrderByWithRelationInput | VersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Versions.
     */
    cursor?: VersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Versions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Versions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Versions.
     */
    distinct?: VersionScalarFieldEnum | VersionScalarFieldEnum[]
  }

  /**
   * Version findMany
   */
  export type VersionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Version
     */
    omit?: VersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionInclude<ExtArgs> | null
    /**
     * Filter, which Versions to fetch.
     */
    where?: VersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Versions to fetch.
     */
    orderBy?: VersionOrderByWithRelationInput | VersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Versions.
     */
    cursor?: VersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Versions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Versions.
     */
    skip?: number
    distinct?: VersionScalarFieldEnum | VersionScalarFieldEnum[]
  }

  /**
   * Version create
   */
  export type VersionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Version
     */
    omit?: VersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionInclude<ExtArgs> | null
    /**
     * The data needed to create a Version.
     */
    data: XOR<VersionCreateInput, VersionUncheckedCreateInput>
  }

  /**
   * Version createMany
   */
  export type VersionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Versions.
     */
    data: VersionCreateManyInput | VersionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Version createManyAndReturn
   */
  export type VersionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Version
     */
    omit?: VersionOmit<ExtArgs> | null
    /**
     * The data used to create many Versions.
     */
    data: VersionCreateManyInput | VersionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Version update
   */
  export type VersionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Version
     */
    omit?: VersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionInclude<ExtArgs> | null
    /**
     * The data needed to update a Version.
     */
    data: XOR<VersionUpdateInput, VersionUncheckedUpdateInput>
    /**
     * Choose, which Version to update.
     */
    where: VersionWhereUniqueInput
  }

  /**
   * Version updateMany
   */
  export type VersionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Versions.
     */
    data: XOR<VersionUpdateManyMutationInput, VersionUncheckedUpdateManyInput>
    /**
     * Filter which Versions to update
     */
    where?: VersionWhereInput
    /**
     * Limit how many Versions to update.
     */
    limit?: number
  }

  /**
   * Version updateManyAndReturn
   */
  export type VersionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Version
     */
    omit?: VersionOmit<ExtArgs> | null
    /**
     * The data used to update Versions.
     */
    data: XOR<VersionUpdateManyMutationInput, VersionUncheckedUpdateManyInput>
    /**
     * Filter which Versions to update
     */
    where?: VersionWhereInput
    /**
     * Limit how many Versions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Version upsert
   */
  export type VersionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Version
     */
    omit?: VersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionInclude<ExtArgs> | null
    /**
     * The filter to search for the Version to update in case it exists.
     */
    where: VersionWhereUniqueInput
    /**
     * In case the Version found by the `where` argument doesn't exist, create a new Version with this data.
     */
    create: XOR<VersionCreateInput, VersionUncheckedCreateInput>
    /**
     * In case the Version was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VersionUpdateInput, VersionUncheckedUpdateInput>
  }

  /**
   * Version delete
   */
  export type VersionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Version
     */
    omit?: VersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionInclude<ExtArgs> | null
    /**
     * Filter which Version to delete.
     */
    where: VersionWhereUniqueInput
  }

  /**
   * Version deleteMany
   */
  export type VersionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Versions to delete
     */
    where?: VersionWhereInput
    /**
     * Limit how many Versions to delete.
     */
    limit?: number
  }

  /**
   * Version.downloadLogs
   */
  export type Version$downloadLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
    where?: DownloadLogWhereInput
    orderBy?: DownloadLogOrderByWithRelationInput | DownloadLogOrderByWithRelationInput[]
    cursor?: DownloadLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DownloadLogScalarFieldEnum | DownloadLogScalarFieldEnum[]
  }

  /**
   * Version without action
   */
  export type VersionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Version
     */
    select?: VersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Version
     */
    omit?: VersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VersionInclude<ExtArgs> | null
  }


  /**
   * Model DownloadLog
   */

  export type AggregateDownloadLog = {
    _count: DownloadLogCountAggregateOutputType | null
    _min: DownloadLogMinAggregateOutputType | null
    _max: DownloadLogMaxAggregateOutputType | null
  }

  export type DownloadLogMinAggregateOutputType = {
    id: string | null
    versionId: string | null
    userId: string | null
    ipHash: string | null
    userAgent: string | null
    country: string | null
    createdAt: Date | null
  }

  export type DownloadLogMaxAggregateOutputType = {
    id: string | null
    versionId: string | null
    userId: string | null
    ipHash: string | null
    userAgent: string | null
    country: string | null
    createdAt: Date | null
  }

  export type DownloadLogCountAggregateOutputType = {
    id: number
    versionId: number
    userId: number
    ipHash: number
    userAgent: number
    country: number
    createdAt: number
    _all: number
  }


  export type DownloadLogMinAggregateInputType = {
    id?: true
    versionId?: true
    userId?: true
    ipHash?: true
    userAgent?: true
    country?: true
    createdAt?: true
  }

  export type DownloadLogMaxAggregateInputType = {
    id?: true
    versionId?: true
    userId?: true
    ipHash?: true
    userAgent?: true
    country?: true
    createdAt?: true
  }

  export type DownloadLogCountAggregateInputType = {
    id?: true
    versionId?: true
    userId?: true
    ipHash?: true
    userAgent?: true
    country?: true
    createdAt?: true
    _all?: true
  }

  export type DownloadLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DownloadLog to aggregate.
     */
    where?: DownloadLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DownloadLogs to fetch.
     */
    orderBy?: DownloadLogOrderByWithRelationInput | DownloadLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DownloadLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DownloadLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DownloadLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DownloadLogs
    **/
    _count?: true | DownloadLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DownloadLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DownloadLogMaxAggregateInputType
  }

  export type GetDownloadLogAggregateType<T extends DownloadLogAggregateArgs> = {
        [P in keyof T & keyof AggregateDownloadLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDownloadLog[P]>
      : GetScalarType<T[P], AggregateDownloadLog[P]>
  }




  export type DownloadLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DownloadLogWhereInput
    orderBy?: DownloadLogOrderByWithAggregationInput | DownloadLogOrderByWithAggregationInput[]
    by: DownloadLogScalarFieldEnum[] | DownloadLogScalarFieldEnum
    having?: DownloadLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DownloadLogCountAggregateInputType | true
    _min?: DownloadLogMinAggregateInputType
    _max?: DownloadLogMaxAggregateInputType
  }

  export type DownloadLogGroupByOutputType = {
    id: string
    versionId: string
    userId: string | null
    ipHash: string
    userAgent: string
    country: string | null
    createdAt: Date
    _count: DownloadLogCountAggregateOutputType | null
    _min: DownloadLogMinAggregateOutputType | null
    _max: DownloadLogMaxAggregateOutputType | null
  }

  type GetDownloadLogGroupByPayload<T extends DownloadLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DownloadLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DownloadLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DownloadLogGroupByOutputType[P]>
            : GetScalarType<T[P], DownloadLogGroupByOutputType[P]>
        }
      >
    >


  export type DownloadLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    versionId?: boolean
    userId?: boolean
    ipHash?: boolean
    userAgent?: boolean
    country?: boolean
    createdAt?: boolean
    version?: boolean | VersionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["downloadLog"]>

  export type DownloadLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    versionId?: boolean
    userId?: boolean
    ipHash?: boolean
    userAgent?: boolean
    country?: boolean
    createdAt?: boolean
    version?: boolean | VersionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["downloadLog"]>

  export type DownloadLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    versionId?: boolean
    userId?: boolean
    ipHash?: boolean
    userAgent?: boolean
    country?: boolean
    createdAt?: boolean
    version?: boolean | VersionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["downloadLog"]>

  export type DownloadLogSelectScalar = {
    id?: boolean
    versionId?: boolean
    userId?: boolean
    ipHash?: boolean
    userAgent?: boolean
    country?: boolean
    createdAt?: boolean
  }

  export type DownloadLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "versionId" | "userId" | "ipHash" | "userAgent" | "country" | "createdAt", ExtArgs["result"]["downloadLog"]>
  export type DownloadLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    version?: boolean | VersionDefaultArgs<ExtArgs>
  }
  export type DownloadLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    version?: boolean | VersionDefaultArgs<ExtArgs>
  }
  export type DownloadLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    version?: boolean | VersionDefaultArgs<ExtArgs>
  }

  export type $DownloadLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DownloadLog"
    objects: {
      version: Prisma.$VersionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      versionId: string
      userId: string | null
      ipHash: string
      userAgent: string
      country: string | null
      createdAt: Date
    }, ExtArgs["result"]["downloadLog"]>
    composites: {}
  }

  type DownloadLogGetPayload<S extends boolean | null | undefined | DownloadLogDefaultArgs> = $Result.GetResult<Prisma.$DownloadLogPayload, S>

  type DownloadLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DownloadLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DownloadLogCountAggregateInputType | true
    }

  export interface DownloadLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DownloadLog'], meta: { name: 'DownloadLog' } }
    /**
     * Find zero or one DownloadLog that matches the filter.
     * @param {DownloadLogFindUniqueArgs} args - Arguments to find a DownloadLog
     * @example
     * // Get one DownloadLog
     * const downloadLog = await prisma.downloadLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DownloadLogFindUniqueArgs>(args: SelectSubset<T, DownloadLogFindUniqueArgs<ExtArgs>>): Prisma__DownloadLogClient<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DownloadLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DownloadLogFindUniqueOrThrowArgs} args - Arguments to find a DownloadLog
     * @example
     * // Get one DownloadLog
     * const downloadLog = await prisma.downloadLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DownloadLogFindUniqueOrThrowArgs>(args: SelectSubset<T, DownloadLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DownloadLogClient<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DownloadLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DownloadLogFindFirstArgs} args - Arguments to find a DownloadLog
     * @example
     * // Get one DownloadLog
     * const downloadLog = await prisma.downloadLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DownloadLogFindFirstArgs>(args?: SelectSubset<T, DownloadLogFindFirstArgs<ExtArgs>>): Prisma__DownloadLogClient<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DownloadLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DownloadLogFindFirstOrThrowArgs} args - Arguments to find a DownloadLog
     * @example
     * // Get one DownloadLog
     * const downloadLog = await prisma.downloadLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DownloadLogFindFirstOrThrowArgs>(args?: SelectSubset<T, DownloadLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__DownloadLogClient<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DownloadLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DownloadLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DownloadLogs
     * const downloadLogs = await prisma.downloadLog.findMany()
     * 
     * // Get first 10 DownloadLogs
     * const downloadLogs = await prisma.downloadLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const downloadLogWithIdOnly = await prisma.downloadLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DownloadLogFindManyArgs>(args?: SelectSubset<T, DownloadLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DownloadLog.
     * @param {DownloadLogCreateArgs} args - Arguments to create a DownloadLog.
     * @example
     * // Create one DownloadLog
     * const DownloadLog = await prisma.downloadLog.create({
     *   data: {
     *     // ... data to create a DownloadLog
     *   }
     * })
     * 
     */
    create<T extends DownloadLogCreateArgs>(args: SelectSubset<T, DownloadLogCreateArgs<ExtArgs>>): Prisma__DownloadLogClient<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DownloadLogs.
     * @param {DownloadLogCreateManyArgs} args - Arguments to create many DownloadLogs.
     * @example
     * // Create many DownloadLogs
     * const downloadLog = await prisma.downloadLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DownloadLogCreateManyArgs>(args?: SelectSubset<T, DownloadLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DownloadLogs and returns the data saved in the database.
     * @param {DownloadLogCreateManyAndReturnArgs} args - Arguments to create many DownloadLogs.
     * @example
     * // Create many DownloadLogs
     * const downloadLog = await prisma.downloadLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DownloadLogs and only return the `id`
     * const downloadLogWithIdOnly = await prisma.downloadLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DownloadLogCreateManyAndReturnArgs>(args?: SelectSubset<T, DownloadLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DownloadLog.
     * @param {DownloadLogDeleteArgs} args - Arguments to delete one DownloadLog.
     * @example
     * // Delete one DownloadLog
     * const DownloadLog = await prisma.downloadLog.delete({
     *   where: {
     *     // ... filter to delete one DownloadLog
     *   }
     * })
     * 
     */
    delete<T extends DownloadLogDeleteArgs>(args: SelectSubset<T, DownloadLogDeleteArgs<ExtArgs>>): Prisma__DownloadLogClient<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DownloadLog.
     * @param {DownloadLogUpdateArgs} args - Arguments to update one DownloadLog.
     * @example
     * // Update one DownloadLog
     * const downloadLog = await prisma.downloadLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DownloadLogUpdateArgs>(args: SelectSubset<T, DownloadLogUpdateArgs<ExtArgs>>): Prisma__DownloadLogClient<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DownloadLogs.
     * @param {DownloadLogDeleteManyArgs} args - Arguments to filter DownloadLogs to delete.
     * @example
     * // Delete a few DownloadLogs
     * const { count } = await prisma.downloadLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DownloadLogDeleteManyArgs>(args?: SelectSubset<T, DownloadLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DownloadLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DownloadLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DownloadLogs
     * const downloadLog = await prisma.downloadLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DownloadLogUpdateManyArgs>(args: SelectSubset<T, DownloadLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DownloadLogs and returns the data updated in the database.
     * @param {DownloadLogUpdateManyAndReturnArgs} args - Arguments to update many DownloadLogs.
     * @example
     * // Update many DownloadLogs
     * const downloadLog = await prisma.downloadLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DownloadLogs and only return the `id`
     * const downloadLogWithIdOnly = await prisma.downloadLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DownloadLogUpdateManyAndReturnArgs>(args: SelectSubset<T, DownloadLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DownloadLog.
     * @param {DownloadLogUpsertArgs} args - Arguments to update or create a DownloadLog.
     * @example
     * // Update or create a DownloadLog
     * const downloadLog = await prisma.downloadLog.upsert({
     *   create: {
     *     // ... data to create a DownloadLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DownloadLog we want to update
     *   }
     * })
     */
    upsert<T extends DownloadLogUpsertArgs>(args: SelectSubset<T, DownloadLogUpsertArgs<ExtArgs>>): Prisma__DownloadLogClient<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DownloadLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DownloadLogCountArgs} args - Arguments to filter DownloadLogs to count.
     * @example
     * // Count the number of DownloadLogs
     * const count = await prisma.downloadLog.count({
     *   where: {
     *     // ... the filter for the DownloadLogs we want to count
     *   }
     * })
    **/
    count<T extends DownloadLogCountArgs>(
      args?: Subset<T, DownloadLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DownloadLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DownloadLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DownloadLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DownloadLogAggregateArgs>(args: Subset<T, DownloadLogAggregateArgs>): Prisma.PrismaPromise<GetDownloadLogAggregateType<T>>

    /**
     * Group by DownloadLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DownloadLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DownloadLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DownloadLogGroupByArgs['orderBy'] }
        : { orderBy?: DownloadLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DownloadLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDownloadLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DownloadLog model
   */
  readonly fields: DownloadLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DownloadLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DownloadLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    version<T extends VersionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VersionDefaultArgs<ExtArgs>>): Prisma__VersionClient<$Result.GetResult<Prisma.$VersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DownloadLog model
   */
  interface DownloadLogFieldRefs {
    readonly id: FieldRef<"DownloadLog", 'String'>
    readonly versionId: FieldRef<"DownloadLog", 'String'>
    readonly userId: FieldRef<"DownloadLog", 'String'>
    readonly ipHash: FieldRef<"DownloadLog", 'String'>
    readonly userAgent: FieldRef<"DownloadLog", 'String'>
    readonly country: FieldRef<"DownloadLog", 'String'>
    readonly createdAt: FieldRef<"DownloadLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DownloadLog findUnique
   */
  export type DownloadLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
    /**
     * Filter, which DownloadLog to fetch.
     */
    where: DownloadLogWhereUniqueInput
  }

  /**
   * DownloadLog findUniqueOrThrow
   */
  export type DownloadLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
    /**
     * Filter, which DownloadLog to fetch.
     */
    where: DownloadLogWhereUniqueInput
  }

  /**
   * DownloadLog findFirst
   */
  export type DownloadLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
    /**
     * Filter, which DownloadLog to fetch.
     */
    where?: DownloadLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DownloadLogs to fetch.
     */
    orderBy?: DownloadLogOrderByWithRelationInput | DownloadLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DownloadLogs.
     */
    cursor?: DownloadLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DownloadLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DownloadLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DownloadLogs.
     */
    distinct?: DownloadLogScalarFieldEnum | DownloadLogScalarFieldEnum[]
  }

  /**
   * DownloadLog findFirstOrThrow
   */
  export type DownloadLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
    /**
     * Filter, which DownloadLog to fetch.
     */
    where?: DownloadLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DownloadLogs to fetch.
     */
    orderBy?: DownloadLogOrderByWithRelationInput | DownloadLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DownloadLogs.
     */
    cursor?: DownloadLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DownloadLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DownloadLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DownloadLogs.
     */
    distinct?: DownloadLogScalarFieldEnum | DownloadLogScalarFieldEnum[]
  }

  /**
   * DownloadLog findMany
   */
  export type DownloadLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
    /**
     * Filter, which DownloadLogs to fetch.
     */
    where?: DownloadLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DownloadLogs to fetch.
     */
    orderBy?: DownloadLogOrderByWithRelationInput | DownloadLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DownloadLogs.
     */
    cursor?: DownloadLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DownloadLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DownloadLogs.
     */
    skip?: number
    distinct?: DownloadLogScalarFieldEnum | DownloadLogScalarFieldEnum[]
  }

  /**
   * DownloadLog create
   */
  export type DownloadLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
    /**
     * The data needed to create a DownloadLog.
     */
    data: XOR<DownloadLogCreateInput, DownloadLogUncheckedCreateInput>
  }

  /**
   * DownloadLog createMany
   */
  export type DownloadLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DownloadLogs.
     */
    data: DownloadLogCreateManyInput | DownloadLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DownloadLog createManyAndReturn
   */
  export type DownloadLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * The data used to create many DownloadLogs.
     */
    data: DownloadLogCreateManyInput | DownloadLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DownloadLog update
   */
  export type DownloadLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
    /**
     * The data needed to update a DownloadLog.
     */
    data: XOR<DownloadLogUpdateInput, DownloadLogUncheckedUpdateInput>
    /**
     * Choose, which DownloadLog to update.
     */
    where: DownloadLogWhereUniqueInput
  }

  /**
   * DownloadLog updateMany
   */
  export type DownloadLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DownloadLogs.
     */
    data: XOR<DownloadLogUpdateManyMutationInput, DownloadLogUncheckedUpdateManyInput>
    /**
     * Filter which DownloadLogs to update
     */
    where?: DownloadLogWhereInput
    /**
     * Limit how many DownloadLogs to update.
     */
    limit?: number
  }

  /**
   * DownloadLog updateManyAndReturn
   */
  export type DownloadLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * The data used to update DownloadLogs.
     */
    data: XOR<DownloadLogUpdateManyMutationInput, DownloadLogUncheckedUpdateManyInput>
    /**
     * Filter which DownloadLogs to update
     */
    where?: DownloadLogWhereInput
    /**
     * Limit how many DownloadLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DownloadLog upsert
   */
  export type DownloadLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
    /**
     * The filter to search for the DownloadLog to update in case it exists.
     */
    where: DownloadLogWhereUniqueInput
    /**
     * In case the DownloadLog found by the `where` argument doesn't exist, create a new DownloadLog with this data.
     */
    create: XOR<DownloadLogCreateInput, DownloadLogUncheckedCreateInput>
    /**
     * In case the DownloadLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DownloadLogUpdateInput, DownloadLogUncheckedUpdateInput>
  }

  /**
   * DownloadLog delete
   */
  export type DownloadLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
    /**
     * Filter which DownloadLog to delete.
     */
    where: DownloadLogWhereUniqueInput
  }

  /**
   * DownloadLog deleteMany
   */
  export type DownloadLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DownloadLogs to delete
     */
    where?: DownloadLogWhereInput
    /**
     * Limit how many DownloadLogs to delete.
     */
    limit?: number
  }

  /**
   * DownloadLog without action
   */
  export type DownloadLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
  }


  /**
   * Model SecurityLog
   */

  export type AggregateSecurityLog = {
    _count: SecurityLogCountAggregateOutputType | null
    _min: SecurityLogMinAggregateOutputType | null
    _max: SecurityLogMaxAggregateOutputType | null
  }

  export type SecurityLogMinAggregateOutputType = {
    id: string | null
    entityType: string | null
    entityId: string | null
    action: string | null
    severity: $Enums.Severity | null
    performedBy: string | null
    createdAt: Date | null
  }

  export type SecurityLogMaxAggregateOutputType = {
    id: string | null
    entityType: string | null
    entityId: string | null
    action: string | null
    severity: $Enums.Severity | null
    performedBy: string | null
    createdAt: Date | null
  }

  export type SecurityLogCountAggregateOutputType = {
    id: number
    entityType: number
    entityId: number
    action: number
    severity: number
    metadata: number
    performedBy: number
    createdAt: number
    _all: number
  }


  export type SecurityLogMinAggregateInputType = {
    id?: true
    entityType?: true
    entityId?: true
    action?: true
    severity?: true
    performedBy?: true
    createdAt?: true
  }

  export type SecurityLogMaxAggregateInputType = {
    id?: true
    entityType?: true
    entityId?: true
    action?: true
    severity?: true
    performedBy?: true
    createdAt?: true
  }

  export type SecurityLogCountAggregateInputType = {
    id?: true
    entityType?: true
    entityId?: true
    action?: true
    severity?: true
    metadata?: true
    performedBy?: true
    createdAt?: true
    _all?: true
  }

  export type SecurityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SecurityLog to aggregate.
     */
    where?: SecurityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityLogs to fetch.
     */
    orderBy?: SecurityLogOrderByWithRelationInput | SecurityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SecurityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SecurityLogs
    **/
    _count?: true | SecurityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SecurityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SecurityLogMaxAggregateInputType
  }

  export type GetSecurityLogAggregateType<T extends SecurityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSecurityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSecurityLog[P]>
      : GetScalarType<T[P], AggregateSecurityLog[P]>
  }




  export type SecurityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SecurityLogWhereInput
    orderBy?: SecurityLogOrderByWithAggregationInput | SecurityLogOrderByWithAggregationInput[]
    by: SecurityLogScalarFieldEnum[] | SecurityLogScalarFieldEnum
    having?: SecurityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SecurityLogCountAggregateInputType | true
    _min?: SecurityLogMinAggregateInputType
    _max?: SecurityLogMaxAggregateInputType
  }

  export type SecurityLogGroupByOutputType = {
    id: string
    entityType: string
    entityId: string
    action: string
    severity: $Enums.Severity
    metadata: JsonValue | null
    performedBy: string | null
    createdAt: Date
    _count: SecurityLogCountAggregateOutputType | null
    _min: SecurityLogMinAggregateOutputType | null
    _max: SecurityLogMaxAggregateOutputType | null
  }

  type GetSecurityLogGroupByPayload<T extends SecurityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SecurityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SecurityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SecurityLogGroupByOutputType[P]>
            : GetScalarType<T[P], SecurityLogGroupByOutputType[P]>
        }
      >
    >


  export type SecurityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entityType?: boolean
    entityId?: boolean
    action?: boolean
    severity?: boolean
    metadata?: boolean
    performedBy?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["securityLog"]>

  export type SecurityLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entityType?: boolean
    entityId?: boolean
    action?: boolean
    severity?: boolean
    metadata?: boolean
    performedBy?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["securityLog"]>

  export type SecurityLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entityType?: boolean
    entityId?: boolean
    action?: boolean
    severity?: boolean
    metadata?: boolean
    performedBy?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["securityLog"]>

  export type SecurityLogSelectScalar = {
    id?: boolean
    entityType?: boolean
    entityId?: boolean
    action?: boolean
    severity?: boolean
    metadata?: boolean
    performedBy?: boolean
    createdAt?: boolean
  }

  export type SecurityLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "entityType" | "entityId" | "action" | "severity" | "metadata" | "performedBy" | "createdAt", ExtArgs["result"]["securityLog"]>

  export type $SecurityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SecurityLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      entityType: string
      entityId: string
      action: string
      severity: $Enums.Severity
      metadata: Prisma.JsonValue | null
      performedBy: string | null
      createdAt: Date
    }, ExtArgs["result"]["securityLog"]>
    composites: {}
  }

  type SecurityLogGetPayload<S extends boolean | null | undefined | SecurityLogDefaultArgs> = $Result.GetResult<Prisma.$SecurityLogPayload, S>

  type SecurityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SecurityLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SecurityLogCountAggregateInputType | true
    }

  export interface SecurityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SecurityLog'], meta: { name: 'SecurityLog' } }
    /**
     * Find zero or one SecurityLog that matches the filter.
     * @param {SecurityLogFindUniqueArgs} args - Arguments to find a SecurityLog
     * @example
     * // Get one SecurityLog
     * const securityLog = await prisma.securityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SecurityLogFindUniqueArgs>(args: SelectSubset<T, SecurityLogFindUniqueArgs<ExtArgs>>): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SecurityLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SecurityLogFindUniqueOrThrowArgs} args - Arguments to find a SecurityLog
     * @example
     * // Get one SecurityLog
     * const securityLog = await prisma.securityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SecurityLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SecurityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SecurityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityLogFindFirstArgs} args - Arguments to find a SecurityLog
     * @example
     * // Get one SecurityLog
     * const securityLog = await prisma.securityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SecurityLogFindFirstArgs>(args?: SelectSubset<T, SecurityLogFindFirstArgs<ExtArgs>>): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SecurityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityLogFindFirstOrThrowArgs} args - Arguments to find a SecurityLog
     * @example
     * // Get one SecurityLog
     * const securityLog = await prisma.securityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SecurityLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SecurityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SecurityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SecurityLogs
     * const securityLogs = await prisma.securityLog.findMany()
     * 
     * // Get first 10 SecurityLogs
     * const securityLogs = await prisma.securityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const securityLogWithIdOnly = await prisma.securityLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SecurityLogFindManyArgs>(args?: SelectSubset<T, SecurityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SecurityLog.
     * @param {SecurityLogCreateArgs} args - Arguments to create a SecurityLog.
     * @example
     * // Create one SecurityLog
     * const SecurityLog = await prisma.securityLog.create({
     *   data: {
     *     // ... data to create a SecurityLog
     *   }
     * })
     * 
     */
    create<T extends SecurityLogCreateArgs>(args: SelectSubset<T, SecurityLogCreateArgs<ExtArgs>>): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SecurityLogs.
     * @param {SecurityLogCreateManyArgs} args - Arguments to create many SecurityLogs.
     * @example
     * // Create many SecurityLogs
     * const securityLog = await prisma.securityLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SecurityLogCreateManyArgs>(args?: SelectSubset<T, SecurityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SecurityLogs and returns the data saved in the database.
     * @param {SecurityLogCreateManyAndReturnArgs} args - Arguments to create many SecurityLogs.
     * @example
     * // Create many SecurityLogs
     * const securityLog = await prisma.securityLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SecurityLogs and only return the `id`
     * const securityLogWithIdOnly = await prisma.securityLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SecurityLogCreateManyAndReturnArgs>(args?: SelectSubset<T, SecurityLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SecurityLog.
     * @param {SecurityLogDeleteArgs} args - Arguments to delete one SecurityLog.
     * @example
     * // Delete one SecurityLog
     * const SecurityLog = await prisma.securityLog.delete({
     *   where: {
     *     // ... filter to delete one SecurityLog
     *   }
     * })
     * 
     */
    delete<T extends SecurityLogDeleteArgs>(args: SelectSubset<T, SecurityLogDeleteArgs<ExtArgs>>): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SecurityLog.
     * @param {SecurityLogUpdateArgs} args - Arguments to update one SecurityLog.
     * @example
     * // Update one SecurityLog
     * const securityLog = await prisma.securityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SecurityLogUpdateArgs>(args: SelectSubset<T, SecurityLogUpdateArgs<ExtArgs>>): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SecurityLogs.
     * @param {SecurityLogDeleteManyArgs} args - Arguments to filter SecurityLogs to delete.
     * @example
     * // Delete a few SecurityLogs
     * const { count } = await prisma.securityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SecurityLogDeleteManyArgs>(args?: SelectSubset<T, SecurityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SecurityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SecurityLogs
     * const securityLog = await prisma.securityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SecurityLogUpdateManyArgs>(args: SelectSubset<T, SecurityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SecurityLogs and returns the data updated in the database.
     * @param {SecurityLogUpdateManyAndReturnArgs} args - Arguments to update many SecurityLogs.
     * @example
     * // Update many SecurityLogs
     * const securityLog = await prisma.securityLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SecurityLogs and only return the `id`
     * const securityLogWithIdOnly = await prisma.securityLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SecurityLogUpdateManyAndReturnArgs>(args: SelectSubset<T, SecurityLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SecurityLog.
     * @param {SecurityLogUpsertArgs} args - Arguments to update or create a SecurityLog.
     * @example
     * // Update or create a SecurityLog
     * const securityLog = await prisma.securityLog.upsert({
     *   create: {
     *     // ... data to create a SecurityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SecurityLog we want to update
     *   }
     * })
     */
    upsert<T extends SecurityLogUpsertArgs>(args: SelectSubset<T, SecurityLogUpsertArgs<ExtArgs>>): Prisma__SecurityLogClient<$Result.GetResult<Prisma.$SecurityLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SecurityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityLogCountArgs} args - Arguments to filter SecurityLogs to count.
     * @example
     * // Count the number of SecurityLogs
     * const count = await prisma.securityLog.count({
     *   where: {
     *     // ... the filter for the SecurityLogs we want to count
     *   }
     * })
    **/
    count<T extends SecurityLogCountArgs>(
      args?: Subset<T, SecurityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SecurityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SecurityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SecurityLogAggregateArgs>(args: Subset<T, SecurityLogAggregateArgs>): Prisma.PrismaPromise<GetSecurityLogAggregateType<T>>

    /**
     * Group by SecurityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SecurityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SecurityLogGroupByArgs['orderBy'] }
        : { orderBy?: SecurityLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SecurityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSecurityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SecurityLog model
   */
  readonly fields: SecurityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SecurityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SecurityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SecurityLog model
   */
  interface SecurityLogFieldRefs {
    readonly id: FieldRef<"SecurityLog", 'String'>
    readonly entityType: FieldRef<"SecurityLog", 'String'>
    readonly entityId: FieldRef<"SecurityLog", 'String'>
    readonly action: FieldRef<"SecurityLog", 'String'>
    readonly severity: FieldRef<"SecurityLog", 'Severity'>
    readonly metadata: FieldRef<"SecurityLog", 'Json'>
    readonly performedBy: FieldRef<"SecurityLog", 'String'>
    readonly createdAt: FieldRef<"SecurityLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SecurityLog findUnique
   */
  export type SecurityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * Filter, which SecurityLog to fetch.
     */
    where: SecurityLogWhereUniqueInput
  }

  /**
   * SecurityLog findUniqueOrThrow
   */
  export type SecurityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * Filter, which SecurityLog to fetch.
     */
    where: SecurityLogWhereUniqueInput
  }

  /**
   * SecurityLog findFirst
   */
  export type SecurityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * Filter, which SecurityLog to fetch.
     */
    where?: SecurityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityLogs to fetch.
     */
    orderBy?: SecurityLogOrderByWithRelationInput | SecurityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SecurityLogs.
     */
    cursor?: SecurityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SecurityLogs.
     */
    distinct?: SecurityLogScalarFieldEnum | SecurityLogScalarFieldEnum[]
  }

  /**
   * SecurityLog findFirstOrThrow
   */
  export type SecurityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * Filter, which SecurityLog to fetch.
     */
    where?: SecurityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityLogs to fetch.
     */
    orderBy?: SecurityLogOrderByWithRelationInput | SecurityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SecurityLogs.
     */
    cursor?: SecurityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SecurityLogs.
     */
    distinct?: SecurityLogScalarFieldEnum | SecurityLogScalarFieldEnum[]
  }

  /**
   * SecurityLog findMany
   */
  export type SecurityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * Filter, which SecurityLogs to fetch.
     */
    where?: SecurityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityLogs to fetch.
     */
    orderBy?: SecurityLogOrderByWithRelationInput | SecurityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SecurityLogs.
     */
    cursor?: SecurityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityLogs.
     */
    skip?: number
    distinct?: SecurityLogScalarFieldEnum | SecurityLogScalarFieldEnum[]
  }

  /**
   * SecurityLog create
   */
  export type SecurityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * The data needed to create a SecurityLog.
     */
    data: XOR<SecurityLogCreateInput, SecurityLogUncheckedCreateInput>
  }

  /**
   * SecurityLog createMany
   */
  export type SecurityLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SecurityLogs.
     */
    data: SecurityLogCreateManyInput | SecurityLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SecurityLog createManyAndReturn
   */
  export type SecurityLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * The data used to create many SecurityLogs.
     */
    data: SecurityLogCreateManyInput | SecurityLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SecurityLog update
   */
  export type SecurityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * The data needed to update a SecurityLog.
     */
    data: XOR<SecurityLogUpdateInput, SecurityLogUncheckedUpdateInput>
    /**
     * Choose, which SecurityLog to update.
     */
    where: SecurityLogWhereUniqueInput
  }

  /**
   * SecurityLog updateMany
   */
  export type SecurityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SecurityLogs.
     */
    data: XOR<SecurityLogUpdateManyMutationInput, SecurityLogUncheckedUpdateManyInput>
    /**
     * Filter which SecurityLogs to update
     */
    where?: SecurityLogWhereInput
    /**
     * Limit how many SecurityLogs to update.
     */
    limit?: number
  }

  /**
   * SecurityLog updateManyAndReturn
   */
  export type SecurityLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * The data used to update SecurityLogs.
     */
    data: XOR<SecurityLogUpdateManyMutationInput, SecurityLogUncheckedUpdateManyInput>
    /**
     * Filter which SecurityLogs to update
     */
    where?: SecurityLogWhereInput
    /**
     * Limit how many SecurityLogs to update.
     */
    limit?: number
  }

  /**
   * SecurityLog upsert
   */
  export type SecurityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * The filter to search for the SecurityLog to update in case it exists.
     */
    where: SecurityLogWhereUniqueInput
    /**
     * In case the SecurityLog found by the `where` argument doesn't exist, create a new SecurityLog with this data.
     */
    create: XOR<SecurityLogCreateInput, SecurityLogUncheckedCreateInput>
    /**
     * In case the SecurityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SecurityLogUpdateInput, SecurityLogUncheckedUpdateInput>
  }

  /**
   * SecurityLog delete
   */
  export type SecurityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
    /**
     * Filter which SecurityLog to delete.
     */
    where: SecurityLogWhereUniqueInput
  }

  /**
   * SecurityLog deleteMany
   */
  export type SecurityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SecurityLogs to delete
     */
    where?: SecurityLogWhereInput
    /**
     * Limit how many SecurityLogs to delete.
     */
    limit?: number
  }

  /**
   * SecurityLog without action
   */
  export type SecurityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityLog
     */
    select?: SecurityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SecurityLog
     */
    omit?: SecurityLogOmit<ExtArgs> | null
  }


  /**
   * Model Tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagMinAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type TagMaxAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type TagMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
    orderBy?: TagOrderByWithAggregationInput | TagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    id: string
    name: string
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    apps?: boolean | Tag$appsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type TagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type TagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["tag"]>
  export type TagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    apps?: boolean | Tag$appsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tag"
    objects: {
      apps: Prisma.$AppPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = $Result.GetResult<Prisma.$TagPayload, S>

  type TagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tag'], meta: { name: 'Tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagFindUniqueArgs>(args: SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagFindFirstArgs>(args?: SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TagFindManyArgs>(args?: SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends TagCreateArgs>(args: SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {TagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagCreateManyArgs>(args?: SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tags and returns the data saved in the database.
     * @param {TagCreateManyAndReturnArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TagCreateManyAndReturnArgs>(args?: SelectSubset<T, TagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends TagDeleteArgs>(args: SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagUpdateArgs>(args: SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagDeleteManyArgs>(args?: SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagUpdateManyArgs>(args: SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags and returns the data updated in the database.
     * @param {TagUpdateManyAndReturnArgs} args - Arguments to update many Tags.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TagUpdateManyAndReturnArgs>(args: SelectSubset<T, TagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends TagUpsertArgs>(args: SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tag model
   */
  readonly fields: TagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    apps<T extends Tag$appsArgs<ExtArgs> = {}>(args?: Subset<T, Tag$appsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tag model
   */
  interface TagFieldRefs {
    readonly id: FieldRef<"Tag", 'String'>
    readonly name: FieldRef<"Tag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findMany
   */
  export type TagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag create
   */
  export type TagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }

  /**
   * Tag createMany
   */
  export type TagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag createManyAndReturn
   */
  export type TagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag update
   */
  export type TagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag updateManyAndReturn
   */
  export type TagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag upsert
   */
  export type TagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }

  /**
   * Tag delete
   */
  export type TagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to delete.
     */
    limit?: number
  }

  /**
   * Tag.apps
   */
  export type Tag$appsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    where?: AppWhereInput
    orderBy?: AppOrderByWithRelationInput | AppOrderByWithRelationInput[]
    cursor?: AppWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppScalarFieldEnum | AppScalarFieldEnum[]
  }

  /**
   * Tag without action
   */
  export type TagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const DeveloperScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash',
    type: 'type',
    vatNumber: 'vatNumber',
    country: 'country',
    verified: 'verified',
    verifiedAt: 'verifiedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DeveloperScalarFieldEnum = (typeof DeveloperScalarFieldEnum)[keyof typeof DeveloperScalarFieldEnum]


  export const AppScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    name: 'name',
    bundleId: 'bundleId',
    developerId: 'developerId',
    category: 'category',
    description: 'description',
    shortDesc: 'shortDesc',
    iconUrl: 'iconUrl',
    screenshots: 'screenshots',
    status: 'status',
    platform: 'platform',
    minAndroid: 'minAndroid',
    minIos: 'minIos',
    websiteUrl: 'websiteUrl',
    privacyUrl: 'privacyUrl',
    sourceUrl: 'sourceUrl',
    totalDownloads: 'totalDownloads',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AppScalarFieldEnum = (typeof AppScalarFieldEnum)[keyof typeof AppScalarFieldEnum]


  export const VersionScalarFieldEnum: {
    id: 'id',
    appId: 'appId',
    versionName: 'versionName',
    versionCode: 'versionCode',
    platform: 'platform',
    fileKey: 'fileKey',
    fileSize: 'fileSize',
    fileSha256: 'fileSha256',
    changelog: 'changelog',
    minOs: 'minOs',
    status: 'status',
    virusTotalId: 'virusTotalId',
    virusTotalReport: 'virusTotalReport',
    scannedAt: 'scannedAt',
    publishedAt: 'publishedAt',
    createdAt: 'createdAt'
  };

  export type VersionScalarFieldEnum = (typeof VersionScalarFieldEnum)[keyof typeof VersionScalarFieldEnum]


  export const DownloadLogScalarFieldEnum: {
    id: 'id',
    versionId: 'versionId',
    userId: 'userId',
    ipHash: 'ipHash',
    userAgent: 'userAgent',
    country: 'country',
    createdAt: 'createdAt'
  };

  export type DownloadLogScalarFieldEnum = (typeof DownloadLogScalarFieldEnum)[keyof typeof DownloadLogScalarFieldEnum]


  export const SecurityLogScalarFieldEnum: {
    id: 'id',
    entityType: 'entityType',
    entityId: 'entityId',
    action: 'action',
    severity: 'severity',
    metadata: 'metadata',
    performedBy: 'performedBy',
    createdAt: 'createdAt'
  };

  export type SecurityLogScalarFieldEnum = (typeof SecurityLogScalarFieldEnum)[keyof typeof SecurityLogScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DeveloperType'
   */
  export type EnumDeveloperTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DeveloperType'>
    


  /**
   * Reference to a field of type 'DeveloperType[]'
   */
  export type ListEnumDeveloperTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DeveloperType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Category'
   */
  export type EnumCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Category'>
    


  /**
   * Reference to a field of type 'Category[]'
   */
  export type ListEnumCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Category[]'>
    


  /**
   * Reference to a field of type 'AppStatus'
   */
  export type EnumAppStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppStatus'>
    


  /**
   * Reference to a field of type 'AppStatus[]'
   */
  export type ListEnumAppStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppStatus[]'>
    


  /**
   * Reference to a field of type 'Platform'
   */
  export type EnumPlatformFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Platform'>
    


  /**
   * Reference to a field of type 'Platform[]'
   */
  export type ListEnumPlatformFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Platform[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'VersionStatus'
   */
  export type EnumVersionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VersionStatus'>
    


  /**
   * Reference to a field of type 'VersionStatus[]'
   */
  export type ListEnumVersionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VersionStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Severity'
   */
  export type EnumSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Severity'>
    


  /**
   * Reference to a field of type 'Severity[]'
   */
  export type ListEnumSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Severity[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type DeveloperWhereInput = {
    AND?: DeveloperWhereInput | DeveloperWhereInput[]
    OR?: DeveloperWhereInput[]
    NOT?: DeveloperWhereInput | DeveloperWhereInput[]
    id?: StringFilter<"Developer"> | string
    email?: StringFilter<"Developer"> | string
    name?: StringFilter<"Developer"> | string
    passwordHash?: StringNullableFilter<"Developer"> | string | null
    type?: EnumDeveloperTypeFilter<"Developer"> | $Enums.DeveloperType
    vatNumber?: StringNullableFilter<"Developer"> | string | null
    country?: StringFilter<"Developer"> | string
    verified?: BoolFilter<"Developer"> | boolean
    verifiedAt?: DateTimeNullableFilter<"Developer"> | Date | string | null
    createdAt?: DateTimeFilter<"Developer"> | Date | string
    updatedAt?: DateTimeFilter<"Developer"> | Date | string
    apps?: AppListRelationFilter
  }

  export type DeveloperOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrderInput | SortOrder
    type?: SortOrder
    vatNumber?: SortOrderInput | SortOrder
    country?: SortOrder
    verified?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    apps?: AppOrderByRelationAggregateInput
  }

  export type DeveloperWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: DeveloperWhereInput | DeveloperWhereInput[]
    OR?: DeveloperWhereInput[]
    NOT?: DeveloperWhereInput | DeveloperWhereInput[]
    name?: StringFilter<"Developer"> | string
    passwordHash?: StringNullableFilter<"Developer"> | string | null
    type?: EnumDeveloperTypeFilter<"Developer"> | $Enums.DeveloperType
    vatNumber?: StringNullableFilter<"Developer"> | string | null
    country?: StringFilter<"Developer"> | string
    verified?: BoolFilter<"Developer"> | boolean
    verifiedAt?: DateTimeNullableFilter<"Developer"> | Date | string | null
    createdAt?: DateTimeFilter<"Developer"> | Date | string
    updatedAt?: DateTimeFilter<"Developer"> | Date | string
    apps?: AppListRelationFilter
  }, "id" | "email">

  export type DeveloperOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrderInput | SortOrder
    type?: SortOrder
    vatNumber?: SortOrderInput | SortOrder
    country?: SortOrder
    verified?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DeveloperCountOrderByAggregateInput
    _max?: DeveloperMaxOrderByAggregateInput
    _min?: DeveloperMinOrderByAggregateInput
  }

  export type DeveloperScalarWhereWithAggregatesInput = {
    AND?: DeveloperScalarWhereWithAggregatesInput | DeveloperScalarWhereWithAggregatesInput[]
    OR?: DeveloperScalarWhereWithAggregatesInput[]
    NOT?: DeveloperScalarWhereWithAggregatesInput | DeveloperScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Developer"> | string
    email?: StringWithAggregatesFilter<"Developer"> | string
    name?: StringWithAggregatesFilter<"Developer"> | string
    passwordHash?: StringNullableWithAggregatesFilter<"Developer"> | string | null
    type?: EnumDeveloperTypeWithAggregatesFilter<"Developer"> | $Enums.DeveloperType
    vatNumber?: StringNullableWithAggregatesFilter<"Developer"> | string | null
    country?: StringWithAggregatesFilter<"Developer"> | string
    verified?: BoolWithAggregatesFilter<"Developer"> | boolean
    verifiedAt?: DateTimeNullableWithAggregatesFilter<"Developer"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Developer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Developer"> | Date | string
  }

  export type AppWhereInput = {
    AND?: AppWhereInput | AppWhereInput[]
    OR?: AppWhereInput[]
    NOT?: AppWhereInput | AppWhereInput[]
    id?: StringFilter<"App"> | string
    slug?: StringFilter<"App"> | string
    name?: StringFilter<"App"> | string
    bundleId?: StringFilter<"App"> | string
    developerId?: StringFilter<"App"> | string
    category?: EnumCategoryFilter<"App"> | $Enums.Category
    description?: StringFilter<"App"> | string
    shortDesc?: StringFilter<"App"> | string
    iconUrl?: StringFilter<"App"> | string
    screenshots?: StringNullableListFilter<"App">
    status?: EnumAppStatusFilter<"App"> | $Enums.AppStatus
    platform?: EnumPlatformFilter<"App"> | $Enums.Platform
    minAndroid?: StringNullableFilter<"App"> | string | null
    minIos?: StringNullableFilter<"App"> | string | null
    websiteUrl?: StringNullableFilter<"App"> | string | null
    privacyUrl?: StringFilter<"App"> | string
    sourceUrl?: StringNullableFilter<"App"> | string | null
    totalDownloads?: IntFilter<"App"> | number
    createdAt?: DateTimeFilter<"App"> | Date | string
    updatedAt?: DateTimeFilter<"App"> | Date | string
    developer?: XOR<DeveloperScalarRelationFilter, DeveloperWhereInput>
    versions?: VersionListRelationFilter
    tags?: TagListRelationFilter
  }

  export type AppOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    bundleId?: SortOrder
    developerId?: SortOrder
    category?: SortOrder
    description?: SortOrder
    shortDesc?: SortOrder
    iconUrl?: SortOrder
    screenshots?: SortOrder
    status?: SortOrder
    platform?: SortOrder
    minAndroid?: SortOrderInput | SortOrder
    minIos?: SortOrderInput | SortOrder
    websiteUrl?: SortOrderInput | SortOrder
    privacyUrl?: SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    totalDownloads?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    developer?: DeveloperOrderByWithRelationInput
    versions?: VersionOrderByRelationAggregateInput
    tags?: TagOrderByRelationAggregateInput
  }

  export type AppWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    bundleId?: string
    AND?: AppWhereInput | AppWhereInput[]
    OR?: AppWhereInput[]
    NOT?: AppWhereInput | AppWhereInput[]
    name?: StringFilter<"App"> | string
    developerId?: StringFilter<"App"> | string
    category?: EnumCategoryFilter<"App"> | $Enums.Category
    description?: StringFilter<"App"> | string
    shortDesc?: StringFilter<"App"> | string
    iconUrl?: StringFilter<"App"> | string
    screenshots?: StringNullableListFilter<"App">
    status?: EnumAppStatusFilter<"App"> | $Enums.AppStatus
    platform?: EnumPlatformFilter<"App"> | $Enums.Platform
    minAndroid?: StringNullableFilter<"App"> | string | null
    minIos?: StringNullableFilter<"App"> | string | null
    websiteUrl?: StringNullableFilter<"App"> | string | null
    privacyUrl?: StringFilter<"App"> | string
    sourceUrl?: StringNullableFilter<"App"> | string | null
    totalDownloads?: IntFilter<"App"> | number
    createdAt?: DateTimeFilter<"App"> | Date | string
    updatedAt?: DateTimeFilter<"App"> | Date | string
    developer?: XOR<DeveloperScalarRelationFilter, DeveloperWhereInput>
    versions?: VersionListRelationFilter
    tags?: TagListRelationFilter
  }, "id" | "slug" | "bundleId">

  export type AppOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    bundleId?: SortOrder
    developerId?: SortOrder
    category?: SortOrder
    description?: SortOrder
    shortDesc?: SortOrder
    iconUrl?: SortOrder
    screenshots?: SortOrder
    status?: SortOrder
    platform?: SortOrder
    minAndroid?: SortOrderInput | SortOrder
    minIos?: SortOrderInput | SortOrder
    websiteUrl?: SortOrderInput | SortOrder
    privacyUrl?: SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    totalDownloads?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AppCountOrderByAggregateInput
    _avg?: AppAvgOrderByAggregateInput
    _max?: AppMaxOrderByAggregateInput
    _min?: AppMinOrderByAggregateInput
    _sum?: AppSumOrderByAggregateInput
  }

  export type AppScalarWhereWithAggregatesInput = {
    AND?: AppScalarWhereWithAggregatesInput | AppScalarWhereWithAggregatesInput[]
    OR?: AppScalarWhereWithAggregatesInput[]
    NOT?: AppScalarWhereWithAggregatesInput | AppScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"App"> | string
    slug?: StringWithAggregatesFilter<"App"> | string
    name?: StringWithAggregatesFilter<"App"> | string
    bundleId?: StringWithAggregatesFilter<"App"> | string
    developerId?: StringWithAggregatesFilter<"App"> | string
    category?: EnumCategoryWithAggregatesFilter<"App"> | $Enums.Category
    description?: StringWithAggregatesFilter<"App"> | string
    shortDesc?: StringWithAggregatesFilter<"App"> | string
    iconUrl?: StringWithAggregatesFilter<"App"> | string
    screenshots?: StringNullableListFilter<"App">
    status?: EnumAppStatusWithAggregatesFilter<"App"> | $Enums.AppStatus
    platform?: EnumPlatformWithAggregatesFilter<"App"> | $Enums.Platform
    minAndroid?: StringNullableWithAggregatesFilter<"App"> | string | null
    minIos?: StringNullableWithAggregatesFilter<"App"> | string | null
    websiteUrl?: StringNullableWithAggregatesFilter<"App"> | string | null
    privacyUrl?: StringWithAggregatesFilter<"App"> | string
    sourceUrl?: StringNullableWithAggregatesFilter<"App"> | string | null
    totalDownloads?: IntWithAggregatesFilter<"App"> | number
    createdAt?: DateTimeWithAggregatesFilter<"App"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"App"> | Date | string
  }

  export type VersionWhereInput = {
    AND?: VersionWhereInput | VersionWhereInput[]
    OR?: VersionWhereInput[]
    NOT?: VersionWhereInput | VersionWhereInput[]
    id?: StringFilter<"Version"> | string
    appId?: StringFilter<"Version"> | string
    versionName?: StringFilter<"Version"> | string
    versionCode?: IntFilter<"Version"> | number
    platform?: EnumPlatformFilter<"Version"> | $Enums.Platform
    fileKey?: StringFilter<"Version"> | string
    fileSize?: BigIntFilter<"Version"> | bigint | number
    fileSha256?: StringFilter<"Version"> | string
    changelog?: StringFilter<"Version"> | string
    minOs?: StringFilter<"Version"> | string
    status?: EnumVersionStatusFilter<"Version"> | $Enums.VersionStatus
    virusTotalId?: StringNullableFilter<"Version"> | string | null
    virusTotalReport?: JsonNullableFilter<"Version">
    scannedAt?: DateTimeNullableFilter<"Version"> | Date | string | null
    publishedAt?: DateTimeNullableFilter<"Version"> | Date | string | null
    createdAt?: DateTimeFilter<"Version"> | Date | string
    app?: XOR<AppScalarRelationFilter, AppWhereInput>
    downloadLogs?: DownloadLogListRelationFilter
  }

  export type VersionOrderByWithRelationInput = {
    id?: SortOrder
    appId?: SortOrder
    versionName?: SortOrder
    versionCode?: SortOrder
    platform?: SortOrder
    fileKey?: SortOrder
    fileSize?: SortOrder
    fileSha256?: SortOrder
    changelog?: SortOrder
    minOs?: SortOrder
    status?: SortOrder
    virusTotalId?: SortOrderInput | SortOrder
    virusTotalReport?: SortOrderInput | SortOrder
    scannedAt?: SortOrderInput | SortOrder
    publishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    app?: AppOrderByWithRelationInput
    downloadLogs?: DownloadLogOrderByRelationAggregateInput
  }

  export type VersionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    appId_versionName_platform?: VersionAppIdVersionNamePlatformCompoundUniqueInput
    AND?: VersionWhereInput | VersionWhereInput[]
    OR?: VersionWhereInput[]
    NOT?: VersionWhereInput | VersionWhereInput[]
    appId?: StringFilter<"Version"> | string
    versionName?: StringFilter<"Version"> | string
    versionCode?: IntFilter<"Version"> | number
    platform?: EnumPlatformFilter<"Version"> | $Enums.Platform
    fileKey?: StringFilter<"Version"> | string
    fileSize?: BigIntFilter<"Version"> | bigint | number
    fileSha256?: StringFilter<"Version"> | string
    changelog?: StringFilter<"Version"> | string
    minOs?: StringFilter<"Version"> | string
    status?: EnumVersionStatusFilter<"Version"> | $Enums.VersionStatus
    virusTotalId?: StringNullableFilter<"Version"> | string | null
    virusTotalReport?: JsonNullableFilter<"Version">
    scannedAt?: DateTimeNullableFilter<"Version"> | Date | string | null
    publishedAt?: DateTimeNullableFilter<"Version"> | Date | string | null
    createdAt?: DateTimeFilter<"Version"> | Date | string
    app?: XOR<AppScalarRelationFilter, AppWhereInput>
    downloadLogs?: DownloadLogListRelationFilter
  }, "id" | "appId_versionName_platform">

  export type VersionOrderByWithAggregationInput = {
    id?: SortOrder
    appId?: SortOrder
    versionName?: SortOrder
    versionCode?: SortOrder
    platform?: SortOrder
    fileKey?: SortOrder
    fileSize?: SortOrder
    fileSha256?: SortOrder
    changelog?: SortOrder
    minOs?: SortOrder
    status?: SortOrder
    virusTotalId?: SortOrderInput | SortOrder
    virusTotalReport?: SortOrderInput | SortOrder
    scannedAt?: SortOrderInput | SortOrder
    publishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: VersionCountOrderByAggregateInput
    _avg?: VersionAvgOrderByAggregateInput
    _max?: VersionMaxOrderByAggregateInput
    _min?: VersionMinOrderByAggregateInput
    _sum?: VersionSumOrderByAggregateInput
  }

  export type VersionScalarWhereWithAggregatesInput = {
    AND?: VersionScalarWhereWithAggregatesInput | VersionScalarWhereWithAggregatesInput[]
    OR?: VersionScalarWhereWithAggregatesInput[]
    NOT?: VersionScalarWhereWithAggregatesInput | VersionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Version"> | string
    appId?: StringWithAggregatesFilter<"Version"> | string
    versionName?: StringWithAggregatesFilter<"Version"> | string
    versionCode?: IntWithAggregatesFilter<"Version"> | number
    platform?: EnumPlatformWithAggregatesFilter<"Version"> | $Enums.Platform
    fileKey?: StringWithAggregatesFilter<"Version"> | string
    fileSize?: BigIntWithAggregatesFilter<"Version"> | bigint | number
    fileSha256?: StringWithAggregatesFilter<"Version"> | string
    changelog?: StringWithAggregatesFilter<"Version"> | string
    minOs?: StringWithAggregatesFilter<"Version"> | string
    status?: EnumVersionStatusWithAggregatesFilter<"Version"> | $Enums.VersionStatus
    virusTotalId?: StringNullableWithAggregatesFilter<"Version"> | string | null
    virusTotalReport?: JsonNullableWithAggregatesFilter<"Version">
    scannedAt?: DateTimeNullableWithAggregatesFilter<"Version"> | Date | string | null
    publishedAt?: DateTimeNullableWithAggregatesFilter<"Version"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Version"> | Date | string
  }

  export type DownloadLogWhereInput = {
    AND?: DownloadLogWhereInput | DownloadLogWhereInput[]
    OR?: DownloadLogWhereInput[]
    NOT?: DownloadLogWhereInput | DownloadLogWhereInput[]
    id?: StringFilter<"DownloadLog"> | string
    versionId?: StringFilter<"DownloadLog"> | string
    userId?: StringNullableFilter<"DownloadLog"> | string | null
    ipHash?: StringFilter<"DownloadLog"> | string
    userAgent?: StringFilter<"DownloadLog"> | string
    country?: StringNullableFilter<"DownloadLog"> | string | null
    createdAt?: DateTimeFilter<"DownloadLog"> | Date | string
    version?: XOR<VersionScalarRelationFilter, VersionWhereInput>
  }

  export type DownloadLogOrderByWithRelationInput = {
    id?: SortOrder
    versionId?: SortOrder
    userId?: SortOrderInput | SortOrder
    ipHash?: SortOrder
    userAgent?: SortOrder
    country?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    version?: VersionOrderByWithRelationInput
  }

  export type DownloadLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DownloadLogWhereInput | DownloadLogWhereInput[]
    OR?: DownloadLogWhereInput[]
    NOT?: DownloadLogWhereInput | DownloadLogWhereInput[]
    versionId?: StringFilter<"DownloadLog"> | string
    userId?: StringNullableFilter<"DownloadLog"> | string | null
    ipHash?: StringFilter<"DownloadLog"> | string
    userAgent?: StringFilter<"DownloadLog"> | string
    country?: StringNullableFilter<"DownloadLog"> | string | null
    createdAt?: DateTimeFilter<"DownloadLog"> | Date | string
    version?: XOR<VersionScalarRelationFilter, VersionWhereInput>
  }, "id">

  export type DownloadLogOrderByWithAggregationInput = {
    id?: SortOrder
    versionId?: SortOrder
    userId?: SortOrderInput | SortOrder
    ipHash?: SortOrder
    userAgent?: SortOrder
    country?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DownloadLogCountOrderByAggregateInput
    _max?: DownloadLogMaxOrderByAggregateInput
    _min?: DownloadLogMinOrderByAggregateInput
  }

  export type DownloadLogScalarWhereWithAggregatesInput = {
    AND?: DownloadLogScalarWhereWithAggregatesInput | DownloadLogScalarWhereWithAggregatesInput[]
    OR?: DownloadLogScalarWhereWithAggregatesInput[]
    NOT?: DownloadLogScalarWhereWithAggregatesInput | DownloadLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DownloadLog"> | string
    versionId?: StringWithAggregatesFilter<"DownloadLog"> | string
    userId?: StringNullableWithAggregatesFilter<"DownloadLog"> | string | null
    ipHash?: StringWithAggregatesFilter<"DownloadLog"> | string
    userAgent?: StringWithAggregatesFilter<"DownloadLog"> | string
    country?: StringNullableWithAggregatesFilter<"DownloadLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DownloadLog"> | Date | string
  }

  export type SecurityLogWhereInput = {
    AND?: SecurityLogWhereInput | SecurityLogWhereInput[]
    OR?: SecurityLogWhereInput[]
    NOT?: SecurityLogWhereInput | SecurityLogWhereInput[]
    id?: StringFilter<"SecurityLog"> | string
    entityType?: StringFilter<"SecurityLog"> | string
    entityId?: StringFilter<"SecurityLog"> | string
    action?: StringFilter<"SecurityLog"> | string
    severity?: EnumSeverityFilter<"SecurityLog"> | $Enums.Severity
    metadata?: JsonNullableFilter<"SecurityLog">
    performedBy?: StringNullableFilter<"SecurityLog"> | string | null
    createdAt?: DateTimeFilter<"SecurityLog"> | Date | string
  }

  export type SecurityLogOrderByWithRelationInput = {
    id?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    severity?: SortOrder
    metadata?: SortOrderInput | SortOrder
    performedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type SecurityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SecurityLogWhereInput | SecurityLogWhereInput[]
    OR?: SecurityLogWhereInput[]
    NOT?: SecurityLogWhereInput | SecurityLogWhereInput[]
    entityType?: StringFilter<"SecurityLog"> | string
    entityId?: StringFilter<"SecurityLog"> | string
    action?: StringFilter<"SecurityLog"> | string
    severity?: EnumSeverityFilter<"SecurityLog"> | $Enums.Severity
    metadata?: JsonNullableFilter<"SecurityLog">
    performedBy?: StringNullableFilter<"SecurityLog"> | string | null
    createdAt?: DateTimeFilter<"SecurityLog"> | Date | string
  }, "id">

  export type SecurityLogOrderByWithAggregationInput = {
    id?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    severity?: SortOrder
    metadata?: SortOrderInput | SortOrder
    performedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SecurityLogCountOrderByAggregateInput
    _max?: SecurityLogMaxOrderByAggregateInput
    _min?: SecurityLogMinOrderByAggregateInput
  }

  export type SecurityLogScalarWhereWithAggregatesInput = {
    AND?: SecurityLogScalarWhereWithAggregatesInput | SecurityLogScalarWhereWithAggregatesInput[]
    OR?: SecurityLogScalarWhereWithAggregatesInput[]
    NOT?: SecurityLogScalarWhereWithAggregatesInput | SecurityLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SecurityLog"> | string
    entityType?: StringWithAggregatesFilter<"SecurityLog"> | string
    entityId?: StringWithAggregatesFilter<"SecurityLog"> | string
    action?: StringWithAggregatesFilter<"SecurityLog"> | string
    severity?: EnumSeverityWithAggregatesFilter<"SecurityLog"> | $Enums.Severity
    metadata?: JsonNullableWithAggregatesFilter<"SecurityLog">
    performedBy?: StringNullableWithAggregatesFilter<"SecurityLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SecurityLog"> | Date | string
  }

  export type TagWhereInput = {
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    id?: StringFilter<"Tag"> | string
    name?: StringFilter<"Tag"> | string
    apps?: AppListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    apps?: AppOrderByRelationAggregateInput
  }

  export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    apps?: AppListRelationFilter
  }, "id" | "name">

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    OR?: TagScalarWhereWithAggregatesInput[]
    NOT?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tag"> | string
    name?: StringWithAggregatesFilter<"Tag"> | string
  }

  export type DeveloperCreateInput = {
    id?: string
    email: string
    name: string
    passwordHash?: string | null
    type: $Enums.DeveloperType
    vatNumber?: string | null
    country: string
    verified?: boolean
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    apps?: AppCreateNestedManyWithoutDeveloperInput
  }

  export type DeveloperUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    passwordHash?: string | null
    type: $Enums.DeveloperType
    vatNumber?: string | null
    country: string
    verified?: boolean
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    apps?: AppUncheckedCreateNestedManyWithoutDeveloperInput
  }

  export type DeveloperUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumDeveloperTypeFieldUpdateOperationsInput | $Enums.DeveloperType
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    apps?: AppUpdateManyWithoutDeveloperNestedInput
  }

  export type DeveloperUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumDeveloperTypeFieldUpdateOperationsInput | $Enums.DeveloperType
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    apps?: AppUncheckedUpdateManyWithoutDeveloperNestedInput
  }

  export type DeveloperCreateManyInput = {
    id?: string
    email: string
    name: string
    passwordHash?: string | null
    type: $Enums.DeveloperType
    vatNumber?: string | null
    country: string
    verified?: boolean
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeveloperUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumDeveloperTypeFieldUpdateOperationsInput | $Enums.DeveloperType
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeveloperUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumDeveloperTypeFieldUpdateOperationsInput | $Enums.DeveloperType
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppCreateInput = {
    id?: string
    slug: string
    name: string
    bundleId: string
    category: $Enums.Category
    description: string
    shortDesc: string
    iconUrl: string
    screenshots?: AppCreatescreenshotsInput | string[]
    status?: $Enums.AppStatus
    platform?: $Enums.Platform
    minAndroid?: string | null
    minIos?: string | null
    websiteUrl?: string | null
    privacyUrl: string
    sourceUrl?: string | null
    totalDownloads?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    developer: DeveloperCreateNestedOneWithoutAppsInput
    versions?: VersionCreateNestedManyWithoutAppInput
    tags?: TagCreateNestedManyWithoutAppsInput
  }

  export type AppUncheckedCreateInput = {
    id?: string
    slug: string
    name: string
    bundleId: string
    developerId: string
    category: $Enums.Category
    description: string
    shortDesc: string
    iconUrl: string
    screenshots?: AppCreatescreenshotsInput | string[]
    status?: $Enums.AppStatus
    platform?: $Enums.Platform
    minAndroid?: string | null
    minIos?: string | null
    websiteUrl?: string | null
    privacyUrl: string
    sourceUrl?: string | null
    totalDownloads?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: VersionUncheckedCreateNestedManyWithoutAppInput
    tags?: TagUncheckedCreateNestedManyWithoutAppsInput
  }

  export type AppUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bundleId?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: StringFieldUpdateOperationsInput | string
    shortDesc?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    screenshots?: AppUpdatescreenshotsInput | string[]
    status?: EnumAppStatusFieldUpdateOperationsInput | $Enums.AppStatus
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    minAndroid?: NullableStringFieldUpdateOperationsInput | string | null
    minIos?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    privacyUrl?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    totalDownloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    developer?: DeveloperUpdateOneRequiredWithoutAppsNestedInput
    versions?: VersionUpdateManyWithoutAppNestedInput
    tags?: TagUpdateManyWithoutAppsNestedInput
  }

  export type AppUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bundleId?: StringFieldUpdateOperationsInput | string
    developerId?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: StringFieldUpdateOperationsInput | string
    shortDesc?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    screenshots?: AppUpdatescreenshotsInput | string[]
    status?: EnumAppStatusFieldUpdateOperationsInput | $Enums.AppStatus
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    minAndroid?: NullableStringFieldUpdateOperationsInput | string | null
    minIos?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    privacyUrl?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    totalDownloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: VersionUncheckedUpdateManyWithoutAppNestedInput
    tags?: TagUncheckedUpdateManyWithoutAppsNestedInput
  }

  export type AppCreateManyInput = {
    id?: string
    slug: string
    name: string
    bundleId: string
    developerId: string
    category: $Enums.Category
    description: string
    shortDesc: string
    iconUrl: string
    screenshots?: AppCreatescreenshotsInput | string[]
    status?: $Enums.AppStatus
    platform?: $Enums.Platform
    minAndroid?: string | null
    minIos?: string | null
    websiteUrl?: string | null
    privacyUrl: string
    sourceUrl?: string | null
    totalDownloads?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bundleId?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: StringFieldUpdateOperationsInput | string
    shortDesc?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    screenshots?: AppUpdatescreenshotsInput | string[]
    status?: EnumAppStatusFieldUpdateOperationsInput | $Enums.AppStatus
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    minAndroid?: NullableStringFieldUpdateOperationsInput | string | null
    minIos?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    privacyUrl?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    totalDownloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bundleId?: StringFieldUpdateOperationsInput | string
    developerId?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: StringFieldUpdateOperationsInput | string
    shortDesc?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    screenshots?: AppUpdatescreenshotsInput | string[]
    status?: EnumAppStatusFieldUpdateOperationsInput | $Enums.AppStatus
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    minAndroid?: NullableStringFieldUpdateOperationsInput | string | null
    minIos?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    privacyUrl?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    totalDownloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VersionCreateInput = {
    id?: string
    versionName: string
    versionCode: number
    platform: $Enums.Platform
    fileKey: string
    fileSize: bigint | number
    fileSha256: string
    changelog: string
    minOs: string
    status?: $Enums.VersionStatus
    virusTotalId?: string | null
    virusTotalReport?: NullableJsonNullValueInput | InputJsonValue
    scannedAt?: Date | string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    app: AppCreateNestedOneWithoutVersionsInput
    downloadLogs?: DownloadLogCreateNestedManyWithoutVersionInput
  }

  export type VersionUncheckedCreateInput = {
    id?: string
    appId: string
    versionName: string
    versionCode: number
    platform: $Enums.Platform
    fileKey: string
    fileSize: bigint | number
    fileSha256: string
    changelog: string
    minOs: string
    status?: $Enums.VersionStatus
    virusTotalId?: string | null
    virusTotalReport?: NullableJsonNullValueInput | InputJsonValue
    scannedAt?: Date | string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    downloadLogs?: DownloadLogUncheckedCreateNestedManyWithoutVersionInput
  }

  export type VersionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionName?: StringFieldUpdateOperationsInput | string
    versionCode?: IntFieldUpdateOperationsInput | number
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    fileSha256?: StringFieldUpdateOperationsInput | string
    changelog?: StringFieldUpdateOperationsInput | string
    minOs?: StringFieldUpdateOperationsInput | string
    status?: EnumVersionStatusFieldUpdateOperationsInput | $Enums.VersionStatus
    virusTotalId?: NullableStringFieldUpdateOperationsInput | string | null
    virusTotalReport?: NullableJsonNullValueInput | InputJsonValue
    scannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    app?: AppUpdateOneRequiredWithoutVersionsNestedInput
    downloadLogs?: DownloadLogUpdateManyWithoutVersionNestedInput
  }

  export type VersionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    appId?: StringFieldUpdateOperationsInput | string
    versionName?: StringFieldUpdateOperationsInput | string
    versionCode?: IntFieldUpdateOperationsInput | number
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    fileSha256?: StringFieldUpdateOperationsInput | string
    changelog?: StringFieldUpdateOperationsInput | string
    minOs?: StringFieldUpdateOperationsInput | string
    status?: EnumVersionStatusFieldUpdateOperationsInput | $Enums.VersionStatus
    virusTotalId?: NullableStringFieldUpdateOperationsInput | string | null
    virusTotalReport?: NullableJsonNullValueInput | InputJsonValue
    scannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    downloadLogs?: DownloadLogUncheckedUpdateManyWithoutVersionNestedInput
  }

  export type VersionCreateManyInput = {
    id?: string
    appId: string
    versionName: string
    versionCode: number
    platform: $Enums.Platform
    fileKey: string
    fileSize: bigint | number
    fileSha256: string
    changelog: string
    minOs: string
    status?: $Enums.VersionStatus
    virusTotalId?: string | null
    virusTotalReport?: NullableJsonNullValueInput | InputJsonValue
    scannedAt?: Date | string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type VersionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionName?: StringFieldUpdateOperationsInput | string
    versionCode?: IntFieldUpdateOperationsInput | number
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    fileSha256?: StringFieldUpdateOperationsInput | string
    changelog?: StringFieldUpdateOperationsInput | string
    minOs?: StringFieldUpdateOperationsInput | string
    status?: EnumVersionStatusFieldUpdateOperationsInput | $Enums.VersionStatus
    virusTotalId?: NullableStringFieldUpdateOperationsInput | string | null
    virusTotalReport?: NullableJsonNullValueInput | InputJsonValue
    scannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VersionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    appId?: StringFieldUpdateOperationsInput | string
    versionName?: StringFieldUpdateOperationsInput | string
    versionCode?: IntFieldUpdateOperationsInput | number
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    fileSha256?: StringFieldUpdateOperationsInput | string
    changelog?: StringFieldUpdateOperationsInput | string
    minOs?: StringFieldUpdateOperationsInput | string
    status?: EnumVersionStatusFieldUpdateOperationsInput | $Enums.VersionStatus
    virusTotalId?: NullableStringFieldUpdateOperationsInput | string | null
    virusTotalReport?: NullableJsonNullValueInput | InputJsonValue
    scannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DownloadLogCreateInput = {
    id?: string
    userId?: string | null
    ipHash: string
    userAgent: string
    country?: string | null
    createdAt?: Date | string
    version: VersionCreateNestedOneWithoutDownloadLogsInput
  }

  export type DownloadLogUncheckedCreateInput = {
    id?: string
    versionId: string
    userId?: string | null
    ipHash: string
    userAgent: string
    country?: string | null
    createdAt?: Date | string
  }

  export type DownloadLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    ipHash?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: VersionUpdateOneRequiredWithoutDownloadLogsNestedInput
  }

  export type DownloadLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    ipHash?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DownloadLogCreateManyInput = {
    id?: string
    versionId: string
    userId?: string | null
    ipHash: string
    userAgent: string
    country?: string | null
    createdAt?: Date | string
  }

  export type DownloadLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    ipHash?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DownloadLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    ipHash?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityLogCreateInput = {
    id?: string
    entityType: string
    entityId: string
    action: string
    severity?: $Enums.Severity
    metadata?: NullableJsonNullValueInput | InputJsonValue
    performedBy?: string | null
    createdAt?: Date | string
  }

  export type SecurityLogUncheckedCreateInput = {
    id?: string
    entityType: string
    entityId: string
    action: string
    severity?: $Enums.Severity
    metadata?: NullableJsonNullValueInput | InputJsonValue
    performedBy?: string | null
    createdAt?: Date | string
  }

  export type SecurityLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    metadata?: NullableJsonNullValueInput | InputJsonValue
    performedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    metadata?: NullableJsonNullValueInput | InputJsonValue
    performedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityLogCreateManyInput = {
    id?: string
    entityType: string
    entityId: string
    action: string
    severity?: $Enums.Severity
    metadata?: NullableJsonNullValueInput | InputJsonValue
    performedBy?: string | null
    createdAt?: Date | string
  }

  export type SecurityLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    metadata?: NullableJsonNullValueInput | InputJsonValue
    performedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    metadata?: NullableJsonNullValueInput | InputJsonValue
    performedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagCreateInput = {
    id?: string
    name: string
    apps?: AppCreateNestedManyWithoutTagsInput
  }

  export type TagUncheckedCreateInput = {
    id?: string
    name: string
    apps?: AppUncheckedCreateNestedManyWithoutTagsInput
  }

  export type TagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    apps?: AppUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    apps?: AppUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type TagCreateManyInput = {
    id?: string
    name: string
  }

  export type TagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumDeveloperTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DeveloperType | EnumDeveloperTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DeveloperType[] | ListEnumDeveloperTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DeveloperType[] | ListEnumDeveloperTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDeveloperTypeFilter<$PrismaModel> | $Enums.DeveloperType
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AppListRelationFilter = {
    every?: AppWhereInput
    some?: AppWhereInput
    none?: AppWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AppOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DeveloperCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    type?: SortOrder
    vatNumber?: SortOrder
    country?: SortOrder
    verified?: SortOrder
    verifiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeveloperMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    type?: SortOrder
    vatNumber?: SortOrder
    country?: SortOrder
    verified?: SortOrder
    verifiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeveloperMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    type?: SortOrder
    vatNumber?: SortOrder
    country?: SortOrder
    verified?: SortOrder
    verifiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumDeveloperTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeveloperType | EnumDeveloperTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DeveloperType[] | ListEnumDeveloperTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DeveloperType[] | ListEnumDeveloperTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDeveloperTypeWithAggregatesFilter<$PrismaModel> | $Enums.DeveloperType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDeveloperTypeFilter<$PrismaModel>
    _max?: NestedEnumDeveloperTypeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | EnumCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryFilter<$PrismaModel> | $Enums.Category
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumAppStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppStatus | EnumAppStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppStatus[] | ListEnumAppStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppStatus[] | ListEnumAppStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppStatusFilter<$PrismaModel> | $Enums.AppStatus
  }

  export type EnumPlatformFilter<$PrismaModel = never> = {
    equals?: $Enums.Platform | EnumPlatformFieldRefInput<$PrismaModel>
    in?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumPlatformFilter<$PrismaModel> | $Enums.Platform
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DeveloperScalarRelationFilter = {
    is?: DeveloperWhereInput
    isNot?: DeveloperWhereInput
  }

  export type VersionListRelationFilter = {
    every?: VersionWhereInput
    some?: VersionWhereInput
    none?: VersionWhereInput
  }

  export type TagListRelationFilter = {
    every?: TagWhereInput
    some?: TagWhereInput
    none?: TagWhereInput
  }

  export type VersionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    bundleId?: SortOrder
    developerId?: SortOrder
    category?: SortOrder
    description?: SortOrder
    shortDesc?: SortOrder
    iconUrl?: SortOrder
    screenshots?: SortOrder
    status?: SortOrder
    platform?: SortOrder
    minAndroid?: SortOrder
    minIos?: SortOrder
    websiteUrl?: SortOrder
    privacyUrl?: SortOrder
    sourceUrl?: SortOrder
    totalDownloads?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppAvgOrderByAggregateInput = {
    totalDownloads?: SortOrder
  }

  export type AppMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    bundleId?: SortOrder
    developerId?: SortOrder
    category?: SortOrder
    description?: SortOrder
    shortDesc?: SortOrder
    iconUrl?: SortOrder
    status?: SortOrder
    platform?: SortOrder
    minAndroid?: SortOrder
    minIos?: SortOrder
    websiteUrl?: SortOrder
    privacyUrl?: SortOrder
    sourceUrl?: SortOrder
    totalDownloads?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    bundleId?: SortOrder
    developerId?: SortOrder
    category?: SortOrder
    description?: SortOrder
    shortDesc?: SortOrder
    iconUrl?: SortOrder
    status?: SortOrder
    platform?: SortOrder
    minAndroid?: SortOrder
    minIos?: SortOrder
    websiteUrl?: SortOrder
    privacyUrl?: SortOrder
    sourceUrl?: SortOrder
    totalDownloads?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppSumOrderByAggregateInput = {
    totalDownloads?: SortOrder
  }

  export type EnumCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | EnumCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryWithAggregatesFilter<$PrismaModel> | $Enums.Category
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoryFilter<$PrismaModel>
    _max?: NestedEnumCategoryFilter<$PrismaModel>
  }

  export type EnumAppStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppStatus | EnumAppStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppStatus[] | ListEnumAppStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppStatus[] | ListEnumAppStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppStatusFilter<$PrismaModel>
    _max?: NestedEnumAppStatusFilter<$PrismaModel>
  }

  export type EnumPlatformWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Platform | EnumPlatformFieldRefInput<$PrismaModel>
    in?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumPlatformWithAggregatesFilter<$PrismaModel> | $Enums.Platform
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlatformFilter<$PrismaModel>
    _max?: NestedEnumPlatformFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type EnumVersionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VersionStatus | EnumVersionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VersionStatus[] | ListEnumVersionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VersionStatus[] | ListEnumVersionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVersionStatusFilter<$PrismaModel> | $Enums.VersionStatus
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AppScalarRelationFilter = {
    is?: AppWhereInput
    isNot?: AppWhereInput
  }

  export type DownloadLogListRelationFilter = {
    every?: DownloadLogWhereInput
    some?: DownloadLogWhereInput
    none?: DownloadLogWhereInput
  }

  export type DownloadLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VersionAppIdVersionNamePlatformCompoundUniqueInput = {
    appId: string
    versionName: string
    platform: $Enums.Platform
  }

  export type VersionCountOrderByAggregateInput = {
    id?: SortOrder
    appId?: SortOrder
    versionName?: SortOrder
    versionCode?: SortOrder
    platform?: SortOrder
    fileKey?: SortOrder
    fileSize?: SortOrder
    fileSha256?: SortOrder
    changelog?: SortOrder
    minOs?: SortOrder
    status?: SortOrder
    virusTotalId?: SortOrder
    virusTotalReport?: SortOrder
    scannedAt?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type VersionAvgOrderByAggregateInput = {
    versionCode?: SortOrder
    fileSize?: SortOrder
  }

  export type VersionMaxOrderByAggregateInput = {
    id?: SortOrder
    appId?: SortOrder
    versionName?: SortOrder
    versionCode?: SortOrder
    platform?: SortOrder
    fileKey?: SortOrder
    fileSize?: SortOrder
    fileSha256?: SortOrder
    changelog?: SortOrder
    minOs?: SortOrder
    status?: SortOrder
    virusTotalId?: SortOrder
    scannedAt?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type VersionMinOrderByAggregateInput = {
    id?: SortOrder
    appId?: SortOrder
    versionName?: SortOrder
    versionCode?: SortOrder
    platform?: SortOrder
    fileKey?: SortOrder
    fileSize?: SortOrder
    fileSha256?: SortOrder
    changelog?: SortOrder
    minOs?: SortOrder
    status?: SortOrder
    virusTotalId?: SortOrder
    scannedAt?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type VersionSumOrderByAggregateInput = {
    versionCode?: SortOrder
    fileSize?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type EnumVersionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VersionStatus | EnumVersionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VersionStatus[] | ListEnumVersionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VersionStatus[] | ListEnumVersionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVersionStatusWithAggregatesFilter<$PrismaModel> | $Enums.VersionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVersionStatusFilter<$PrismaModel>
    _max?: NestedEnumVersionStatusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type VersionScalarRelationFilter = {
    is?: VersionWhereInput
    isNot?: VersionWhereInput
  }

  export type DownloadLogCountOrderByAggregateInput = {
    id?: SortOrder
    versionId?: SortOrder
    userId?: SortOrder
    ipHash?: SortOrder
    userAgent?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
  }

  export type DownloadLogMaxOrderByAggregateInput = {
    id?: SortOrder
    versionId?: SortOrder
    userId?: SortOrder
    ipHash?: SortOrder
    userAgent?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
  }

  export type DownloadLogMinOrderByAggregateInput = {
    id?: SortOrder
    versionId?: SortOrder
    userId?: SortOrder
    ipHash?: SortOrder
    userAgent?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumSeverityFilter<$PrismaModel> | $Enums.Severity
  }

  export type SecurityLogCountOrderByAggregateInput = {
    id?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    severity?: SortOrder
    metadata?: SortOrder
    performedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type SecurityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    severity?: SortOrder
    performedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type SecurityLogMinOrderByAggregateInput = {
    id?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    action?: SortOrder
    severity?: SortOrder
    performedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumSeverityWithAggregatesFilter<$PrismaModel> | $Enums.Severity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSeverityFilter<$PrismaModel>
    _max?: NestedEnumSeverityFilter<$PrismaModel>
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type AppCreateNestedManyWithoutDeveloperInput = {
    create?: XOR<AppCreateWithoutDeveloperInput, AppUncheckedCreateWithoutDeveloperInput> | AppCreateWithoutDeveloperInput[] | AppUncheckedCreateWithoutDeveloperInput[]
    connectOrCreate?: AppCreateOrConnectWithoutDeveloperInput | AppCreateOrConnectWithoutDeveloperInput[]
    createMany?: AppCreateManyDeveloperInputEnvelope
    connect?: AppWhereUniqueInput | AppWhereUniqueInput[]
  }

  export type AppUncheckedCreateNestedManyWithoutDeveloperInput = {
    create?: XOR<AppCreateWithoutDeveloperInput, AppUncheckedCreateWithoutDeveloperInput> | AppCreateWithoutDeveloperInput[] | AppUncheckedCreateWithoutDeveloperInput[]
    connectOrCreate?: AppCreateOrConnectWithoutDeveloperInput | AppCreateOrConnectWithoutDeveloperInput[]
    createMany?: AppCreateManyDeveloperInputEnvelope
    connect?: AppWhereUniqueInput | AppWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumDeveloperTypeFieldUpdateOperationsInput = {
    set?: $Enums.DeveloperType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AppUpdateManyWithoutDeveloperNestedInput = {
    create?: XOR<AppCreateWithoutDeveloperInput, AppUncheckedCreateWithoutDeveloperInput> | AppCreateWithoutDeveloperInput[] | AppUncheckedCreateWithoutDeveloperInput[]
    connectOrCreate?: AppCreateOrConnectWithoutDeveloperInput | AppCreateOrConnectWithoutDeveloperInput[]
    upsert?: AppUpsertWithWhereUniqueWithoutDeveloperInput | AppUpsertWithWhereUniqueWithoutDeveloperInput[]
    createMany?: AppCreateManyDeveloperInputEnvelope
    set?: AppWhereUniqueInput | AppWhereUniqueInput[]
    disconnect?: AppWhereUniqueInput | AppWhereUniqueInput[]
    delete?: AppWhereUniqueInput | AppWhereUniqueInput[]
    connect?: AppWhereUniqueInput | AppWhereUniqueInput[]
    update?: AppUpdateWithWhereUniqueWithoutDeveloperInput | AppUpdateWithWhereUniqueWithoutDeveloperInput[]
    updateMany?: AppUpdateManyWithWhereWithoutDeveloperInput | AppUpdateManyWithWhereWithoutDeveloperInput[]
    deleteMany?: AppScalarWhereInput | AppScalarWhereInput[]
  }

  export type AppUncheckedUpdateManyWithoutDeveloperNestedInput = {
    create?: XOR<AppCreateWithoutDeveloperInput, AppUncheckedCreateWithoutDeveloperInput> | AppCreateWithoutDeveloperInput[] | AppUncheckedCreateWithoutDeveloperInput[]
    connectOrCreate?: AppCreateOrConnectWithoutDeveloperInput | AppCreateOrConnectWithoutDeveloperInput[]
    upsert?: AppUpsertWithWhereUniqueWithoutDeveloperInput | AppUpsertWithWhereUniqueWithoutDeveloperInput[]
    createMany?: AppCreateManyDeveloperInputEnvelope
    set?: AppWhereUniqueInput | AppWhereUniqueInput[]
    disconnect?: AppWhereUniqueInput | AppWhereUniqueInput[]
    delete?: AppWhereUniqueInput | AppWhereUniqueInput[]
    connect?: AppWhereUniqueInput | AppWhereUniqueInput[]
    update?: AppUpdateWithWhereUniqueWithoutDeveloperInput | AppUpdateWithWhereUniqueWithoutDeveloperInput[]
    updateMany?: AppUpdateManyWithWhereWithoutDeveloperInput | AppUpdateManyWithWhereWithoutDeveloperInput[]
    deleteMany?: AppScalarWhereInput | AppScalarWhereInput[]
  }

  export type AppCreatescreenshotsInput = {
    set: string[]
  }

  export type DeveloperCreateNestedOneWithoutAppsInput = {
    create?: XOR<DeveloperCreateWithoutAppsInput, DeveloperUncheckedCreateWithoutAppsInput>
    connectOrCreate?: DeveloperCreateOrConnectWithoutAppsInput
    connect?: DeveloperWhereUniqueInput
  }

  export type VersionCreateNestedManyWithoutAppInput = {
    create?: XOR<VersionCreateWithoutAppInput, VersionUncheckedCreateWithoutAppInput> | VersionCreateWithoutAppInput[] | VersionUncheckedCreateWithoutAppInput[]
    connectOrCreate?: VersionCreateOrConnectWithoutAppInput | VersionCreateOrConnectWithoutAppInput[]
    createMany?: VersionCreateManyAppInputEnvelope
    connect?: VersionWhereUniqueInput | VersionWhereUniqueInput[]
  }

  export type TagCreateNestedManyWithoutAppsInput = {
    create?: XOR<TagCreateWithoutAppsInput, TagUncheckedCreateWithoutAppsInput> | TagCreateWithoutAppsInput[] | TagUncheckedCreateWithoutAppsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutAppsInput | TagCreateOrConnectWithoutAppsInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type VersionUncheckedCreateNestedManyWithoutAppInput = {
    create?: XOR<VersionCreateWithoutAppInput, VersionUncheckedCreateWithoutAppInput> | VersionCreateWithoutAppInput[] | VersionUncheckedCreateWithoutAppInput[]
    connectOrCreate?: VersionCreateOrConnectWithoutAppInput | VersionCreateOrConnectWithoutAppInput[]
    createMany?: VersionCreateManyAppInputEnvelope
    connect?: VersionWhereUniqueInput | VersionWhereUniqueInput[]
  }

  export type TagUncheckedCreateNestedManyWithoutAppsInput = {
    create?: XOR<TagCreateWithoutAppsInput, TagUncheckedCreateWithoutAppsInput> | TagCreateWithoutAppsInput[] | TagUncheckedCreateWithoutAppsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutAppsInput | TagCreateOrConnectWithoutAppsInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type EnumCategoryFieldUpdateOperationsInput = {
    set?: $Enums.Category
  }

  export type AppUpdatescreenshotsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumAppStatusFieldUpdateOperationsInput = {
    set?: $Enums.AppStatus
  }

  export type EnumPlatformFieldUpdateOperationsInput = {
    set?: $Enums.Platform
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DeveloperUpdateOneRequiredWithoutAppsNestedInput = {
    create?: XOR<DeveloperCreateWithoutAppsInput, DeveloperUncheckedCreateWithoutAppsInput>
    connectOrCreate?: DeveloperCreateOrConnectWithoutAppsInput
    upsert?: DeveloperUpsertWithoutAppsInput
    connect?: DeveloperWhereUniqueInput
    update?: XOR<XOR<DeveloperUpdateToOneWithWhereWithoutAppsInput, DeveloperUpdateWithoutAppsInput>, DeveloperUncheckedUpdateWithoutAppsInput>
  }

  export type VersionUpdateManyWithoutAppNestedInput = {
    create?: XOR<VersionCreateWithoutAppInput, VersionUncheckedCreateWithoutAppInput> | VersionCreateWithoutAppInput[] | VersionUncheckedCreateWithoutAppInput[]
    connectOrCreate?: VersionCreateOrConnectWithoutAppInput | VersionCreateOrConnectWithoutAppInput[]
    upsert?: VersionUpsertWithWhereUniqueWithoutAppInput | VersionUpsertWithWhereUniqueWithoutAppInput[]
    createMany?: VersionCreateManyAppInputEnvelope
    set?: VersionWhereUniqueInput | VersionWhereUniqueInput[]
    disconnect?: VersionWhereUniqueInput | VersionWhereUniqueInput[]
    delete?: VersionWhereUniqueInput | VersionWhereUniqueInput[]
    connect?: VersionWhereUniqueInput | VersionWhereUniqueInput[]
    update?: VersionUpdateWithWhereUniqueWithoutAppInput | VersionUpdateWithWhereUniqueWithoutAppInput[]
    updateMany?: VersionUpdateManyWithWhereWithoutAppInput | VersionUpdateManyWithWhereWithoutAppInput[]
    deleteMany?: VersionScalarWhereInput | VersionScalarWhereInput[]
  }

  export type TagUpdateManyWithoutAppsNestedInput = {
    create?: XOR<TagCreateWithoutAppsInput, TagUncheckedCreateWithoutAppsInput> | TagCreateWithoutAppsInput[] | TagUncheckedCreateWithoutAppsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutAppsInput | TagCreateOrConnectWithoutAppsInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutAppsInput | TagUpsertWithWhereUniqueWithoutAppsInput[]
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutAppsInput | TagUpdateWithWhereUniqueWithoutAppsInput[]
    updateMany?: TagUpdateManyWithWhereWithoutAppsInput | TagUpdateManyWithWhereWithoutAppsInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type VersionUncheckedUpdateManyWithoutAppNestedInput = {
    create?: XOR<VersionCreateWithoutAppInput, VersionUncheckedCreateWithoutAppInput> | VersionCreateWithoutAppInput[] | VersionUncheckedCreateWithoutAppInput[]
    connectOrCreate?: VersionCreateOrConnectWithoutAppInput | VersionCreateOrConnectWithoutAppInput[]
    upsert?: VersionUpsertWithWhereUniqueWithoutAppInput | VersionUpsertWithWhereUniqueWithoutAppInput[]
    createMany?: VersionCreateManyAppInputEnvelope
    set?: VersionWhereUniqueInput | VersionWhereUniqueInput[]
    disconnect?: VersionWhereUniqueInput | VersionWhereUniqueInput[]
    delete?: VersionWhereUniqueInput | VersionWhereUniqueInput[]
    connect?: VersionWhereUniqueInput | VersionWhereUniqueInput[]
    update?: VersionUpdateWithWhereUniqueWithoutAppInput | VersionUpdateWithWhereUniqueWithoutAppInput[]
    updateMany?: VersionUpdateManyWithWhereWithoutAppInput | VersionUpdateManyWithWhereWithoutAppInput[]
    deleteMany?: VersionScalarWhereInput | VersionScalarWhereInput[]
  }

  export type TagUncheckedUpdateManyWithoutAppsNestedInput = {
    create?: XOR<TagCreateWithoutAppsInput, TagUncheckedCreateWithoutAppsInput> | TagCreateWithoutAppsInput[] | TagUncheckedCreateWithoutAppsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutAppsInput | TagCreateOrConnectWithoutAppsInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutAppsInput | TagUpsertWithWhereUniqueWithoutAppsInput[]
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutAppsInput | TagUpdateWithWhereUniqueWithoutAppsInput[]
    updateMany?: TagUpdateManyWithWhereWithoutAppsInput | TagUpdateManyWithWhereWithoutAppsInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type AppCreateNestedOneWithoutVersionsInput = {
    create?: XOR<AppCreateWithoutVersionsInput, AppUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: AppCreateOrConnectWithoutVersionsInput
    connect?: AppWhereUniqueInput
  }

  export type DownloadLogCreateNestedManyWithoutVersionInput = {
    create?: XOR<DownloadLogCreateWithoutVersionInput, DownloadLogUncheckedCreateWithoutVersionInput> | DownloadLogCreateWithoutVersionInput[] | DownloadLogUncheckedCreateWithoutVersionInput[]
    connectOrCreate?: DownloadLogCreateOrConnectWithoutVersionInput | DownloadLogCreateOrConnectWithoutVersionInput[]
    createMany?: DownloadLogCreateManyVersionInputEnvelope
    connect?: DownloadLogWhereUniqueInput | DownloadLogWhereUniqueInput[]
  }

  export type DownloadLogUncheckedCreateNestedManyWithoutVersionInput = {
    create?: XOR<DownloadLogCreateWithoutVersionInput, DownloadLogUncheckedCreateWithoutVersionInput> | DownloadLogCreateWithoutVersionInput[] | DownloadLogUncheckedCreateWithoutVersionInput[]
    connectOrCreate?: DownloadLogCreateOrConnectWithoutVersionInput | DownloadLogCreateOrConnectWithoutVersionInput[]
    createMany?: DownloadLogCreateManyVersionInputEnvelope
    connect?: DownloadLogWhereUniqueInput | DownloadLogWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EnumVersionStatusFieldUpdateOperationsInput = {
    set?: $Enums.VersionStatus
  }

  export type AppUpdateOneRequiredWithoutVersionsNestedInput = {
    create?: XOR<AppCreateWithoutVersionsInput, AppUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: AppCreateOrConnectWithoutVersionsInput
    upsert?: AppUpsertWithoutVersionsInput
    connect?: AppWhereUniqueInput
    update?: XOR<XOR<AppUpdateToOneWithWhereWithoutVersionsInput, AppUpdateWithoutVersionsInput>, AppUncheckedUpdateWithoutVersionsInput>
  }

  export type DownloadLogUpdateManyWithoutVersionNestedInput = {
    create?: XOR<DownloadLogCreateWithoutVersionInput, DownloadLogUncheckedCreateWithoutVersionInput> | DownloadLogCreateWithoutVersionInput[] | DownloadLogUncheckedCreateWithoutVersionInput[]
    connectOrCreate?: DownloadLogCreateOrConnectWithoutVersionInput | DownloadLogCreateOrConnectWithoutVersionInput[]
    upsert?: DownloadLogUpsertWithWhereUniqueWithoutVersionInput | DownloadLogUpsertWithWhereUniqueWithoutVersionInput[]
    createMany?: DownloadLogCreateManyVersionInputEnvelope
    set?: DownloadLogWhereUniqueInput | DownloadLogWhereUniqueInput[]
    disconnect?: DownloadLogWhereUniqueInput | DownloadLogWhereUniqueInput[]
    delete?: DownloadLogWhereUniqueInput | DownloadLogWhereUniqueInput[]
    connect?: DownloadLogWhereUniqueInput | DownloadLogWhereUniqueInput[]
    update?: DownloadLogUpdateWithWhereUniqueWithoutVersionInput | DownloadLogUpdateWithWhereUniqueWithoutVersionInput[]
    updateMany?: DownloadLogUpdateManyWithWhereWithoutVersionInput | DownloadLogUpdateManyWithWhereWithoutVersionInput[]
    deleteMany?: DownloadLogScalarWhereInput | DownloadLogScalarWhereInput[]
  }

  export type DownloadLogUncheckedUpdateManyWithoutVersionNestedInput = {
    create?: XOR<DownloadLogCreateWithoutVersionInput, DownloadLogUncheckedCreateWithoutVersionInput> | DownloadLogCreateWithoutVersionInput[] | DownloadLogUncheckedCreateWithoutVersionInput[]
    connectOrCreate?: DownloadLogCreateOrConnectWithoutVersionInput | DownloadLogCreateOrConnectWithoutVersionInput[]
    upsert?: DownloadLogUpsertWithWhereUniqueWithoutVersionInput | DownloadLogUpsertWithWhereUniqueWithoutVersionInput[]
    createMany?: DownloadLogCreateManyVersionInputEnvelope
    set?: DownloadLogWhereUniqueInput | DownloadLogWhereUniqueInput[]
    disconnect?: DownloadLogWhereUniqueInput | DownloadLogWhereUniqueInput[]
    delete?: DownloadLogWhereUniqueInput | DownloadLogWhereUniqueInput[]
    connect?: DownloadLogWhereUniqueInput | DownloadLogWhereUniqueInput[]
    update?: DownloadLogUpdateWithWhereUniqueWithoutVersionInput | DownloadLogUpdateWithWhereUniqueWithoutVersionInput[]
    updateMany?: DownloadLogUpdateManyWithWhereWithoutVersionInput | DownloadLogUpdateManyWithWhereWithoutVersionInput[]
    deleteMany?: DownloadLogScalarWhereInput | DownloadLogScalarWhereInput[]
  }

  export type VersionCreateNestedOneWithoutDownloadLogsInput = {
    create?: XOR<VersionCreateWithoutDownloadLogsInput, VersionUncheckedCreateWithoutDownloadLogsInput>
    connectOrCreate?: VersionCreateOrConnectWithoutDownloadLogsInput
    connect?: VersionWhereUniqueInput
  }

  export type VersionUpdateOneRequiredWithoutDownloadLogsNestedInput = {
    create?: XOR<VersionCreateWithoutDownloadLogsInput, VersionUncheckedCreateWithoutDownloadLogsInput>
    connectOrCreate?: VersionCreateOrConnectWithoutDownloadLogsInput
    upsert?: VersionUpsertWithoutDownloadLogsInput
    connect?: VersionWhereUniqueInput
    update?: XOR<XOR<VersionUpdateToOneWithWhereWithoutDownloadLogsInput, VersionUpdateWithoutDownloadLogsInput>, VersionUncheckedUpdateWithoutDownloadLogsInput>
  }

  export type EnumSeverityFieldUpdateOperationsInput = {
    set?: $Enums.Severity
  }

  export type AppCreateNestedManyWithoutTagsInput = {
    create?: XOR<AppCreateWithoutTagsInput, AppUncheckedCreateWithoutTagsInput> | AppCreateWithoutTagsInput[] | AppUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: AppCreateOrConnectWithoutTagsInput | AppCreateOrConnectWithoutTagsInput[]
    connect?: AppWhereUniqueInput | AppWhereUniqueInput[]
  }

  export type AppUncheckedCreateNestedManyWithoutTagsInput = {
    create?: XOR<AppCreateWithoutTagsInput, AppUncheckedCreateWithoutTagsInput> | AppCreateWithoutTagsInput[] | AppUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: AppCreateOrConnectWithoutTagsInput | AppCreateOrConnectWithoutTagsInput[]
    connect?: AppWhereUniqueInput | AppWhereUniqueInput[]
  }

  export type AppUpdateManyWithoutTagsNestedInput = {
    create?: XOR<AppCreateWithoutTagsInput, AppUncheckedCreateWithoutTagsInput> | AppCreateWithoutTagsInput[] | AppUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: AppCreateOrConnectWithoutTagsInput | AppCreateOrConnectWithoutTagsInput[]
    upsert?: AppUpsertWithWhereUniqueWithoutTagsInput | AppUpsertWithWhereUniqueWithoutTagsInput[]
    set?: AppWhereUniqueInput | AppWhereUniqueInput[]
    disconnect?: AppWhereUniqueInput | AppWhereUniqueInput[]
    delete?: AppWhereUniqueInput | AppWhereUniqueInput[]
    connect?: AppWhereUniqueInput | AppWhereUniqueInput[]
    update?: AppUpdateWithWhereUniqueWithoutTagsInput | AppUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: AppUpdateManyWithWhereWithoutTagsInput | AppUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: AppScalarWhereInput | AppScalarWhereInput[]
  }

  export type AppUncheckedUpdateManyWithoutTagsNestedInput = {
    create?: XOR<AppCreateWithoutTagsInput, AppUncheckedCreateWithoutTagsInput> | AppCreateWithoutTagsInput[] | AppUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: AppCreateOrConnectWithoutTagsInput | AppCreateOrConnectWithoutTagsInput[]
    upsert?: AppUpsertWithWhereUniqueWithoutTagsInput | AppUpsertWithWhereUniqueWithoutTagsInput[]
    set?: AppWhereUniqueInput | AppWhereUniqueInput[]
    disconnect?: AppWhereUniqueInput | AppWhereUniqueInput[]
    delete?: AppWhereUniqueInput | AppWhereUniqueInput[]
    connect?: AppWhereUniqueInput | AppWhereUniqueInput[]
    update?: AppUpdateWithWhereUniqueWithoutTagsInput | AppUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: AppUpdateManyWithWhereWithoutTagsInput | AppUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: AppScalarWhereInput | AppScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumDeveloperTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DeveloperType | EnumDeveloperTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DeveloperType[] | ListEnumDeveloperTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DeveloperType[] | ListEnumDeveloperTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDeveloperTypeFilter<$PrismaModel> | $Enums.DeveloperType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumDeveloperTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeveloperType | EnumDeveloperTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DeveloperType[] | ListEnumDeveloperTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DeveloperType[] | ListEnumDeveloperTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDeveloperTypeWithAggregatesFilter<$PrismaModel> | $Enums.DeveloperType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDeveloperTypeFilter<$PrismaModel>
    _max?: NestedEnumDeveloperTypeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | EnumCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryFilter<$PrismaModel> | $Enums.Category
  }

  export type NestedEnumAppStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppStatus | EnumAppStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppStatus[] | ListEnumAppStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppStatus[] | ListEnumAppStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppStatusFilter<$PrismaModel> | $Enums.AppStatus
  }

  export type NestedEnumPlatformFilter<$PrismaModel = never> = {
    equals?: $Enums.Platform | EnumPlatformFieldRefInput<$PrismaModel>
    in?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumPlatformFilter<$PrismaModel> | $Enums.Platform
  }

  export type NestedEnumCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | EnumCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryWithAggregatesFilter<$PrismaModel> | $Enums.Category
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoryFilter<$PrismaModel>
    _max?: NestedEnumCategoryFilter<$PrismaModel>
  }

  export type NestedEnumAppStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppStatus | EnumAppStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppStatus[] | ListEnumAppStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AppStatus[] | ListEnumAppStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAppStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppStatusFilter<$PrismaModel>
    _max?: NestedEnumAppStatusFilter<$PrismaModel>
  }

  export type NestedEnumPlatformWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Platform | EnumPlatformFieldRefInput<$PrismaModel>
    in?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    notIn?: $Enums.Platform[] | ListEnumPlatformFieldRefInput<$PrismaModel>
    not?: NestedEnumPlatformWithAggregatesFilter<$PrismaModel> | $Enums.Platform
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlatformFilter<$PrismaModel>
    _max?: NestedEnumPlatformFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedEnumVersionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VersionStatus | EnumVersionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VersionStatus[] | ListEnumVersionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VersionStatus[] | ListEnumVersionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVersionStatusFilter<$PrismaModel> | $Enums.VersionStatus
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedEnumVersionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VersionStatus | EnumVersionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VersionStatus[] | ListEnumVersionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VersionStatus[] | ListEnumVersionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVersionStatusWithAggregatesFilter<$PrismaModel> | $Enums.VersionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVersionStatusFilter<$PrismaModel>
    _max?: NestedEnumVersionStatusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumSeverityFilter<$PrismaModel> | $Enums.Severity
  }

  export type NestedEnumSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumSeverityWithAggregatesFilter<$PrismaModel> | $Enums.Severity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSeverityFilter<$PrismaModel>
    _max?: NestedEnumSeverityFilter<$PrismaModel>
  }

  export type AppCreateWithoutDeveloperInput = {
    id?: string
    slug: string
    name: string
    bundleId: string
    category: $Enums.Category
    description: string
    shortDesc: string
    iconUrl: string
    screenshots?: AppCreatescreenshotsInput | string[]
    status?: $Enums.AppStatus
    platform?: $Enums.Platform
    minAndroid?: string | null
    minIos?: string | null
    websiteUrl?: string | null
    privacyUrl: string
    sourceUrl?: string | null
    totalDownloads?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: VersionCreateNestedManyWithoutAppInput
    tags?: TagCreateNestedManyWithoutAppsInput
  }

  export type AppUncheckedCreateWithoutDeveloperInput = {
    id?: string
    slug: string
    name: string
    bundleId: string
    category: $Enums.Category
    description: string
    shortDesc: string
    iconUrl: string
    screenshots?: AppCreatescreenshotsInput | string[]
    status?: $Enums.AppStatus
    platform?: $Enums.Platform
    minAndroid?: string | null
    minIos?: string | null
    websiteUrl?: string | null
    privacyUrl: string
    sourceUrl?: string | null
    totalDownloads?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: VersionUncheckedCreateNestedManyWithoutAppInput
    tags?: TagUncheckedCreateNestedManyWithoutAppsInput
  }

  export type AppCreateOrConnectWithoutDeveloperInput = {
    where: AppWhereUniqueInput
    create: XOR<AppCreateWithoutDeveloperInput, AppUncheckedCreateWithoutDeveloperInput>
  }

  export type AppCreateManyDeveloperInputEnvelope = {
    data: AppCreateManyDeveloperInput | AppCreateManyDeveloperInput[]
    skipDuplicates?: boolean
  }

  export type AppUpsertWithWhereUniqueWithoutDeveloperInput = {
    where: AppWhereUniqueInput
    update: XOR<AppUpdateWithoutDeveloperInput, AppUncheckedUpdateWithoutDeveloperInput>
    create: XOR<AppCreateWithoutDeveloperInput, AppUncheckedCreateWithoutDeveloperInput>
  }

  export type AppUpdateWithWhereUniqueWithoutDeveloperInput = {
    where: AppWhereUniqueInput
    data: XOR<AppUpdateWithoutDeveloperInput, AppUncheckedUpdateWithoutDeveloperInput>
  }

  export type AppUpdateManyWithWhereWithoutDeveloperInput = {
    where: AppScalarWhereInput
    data: XOR<AppUpdateManyMutationInput, AppUncheckedUpdateManyWithoutDeveloperInput>
  }

  export type AppScalarWhereInput = {
    AND?: AppScalarWhereInput | AppScalarWhereInput[]
    OR?: AppScalarWhereInput[]
    NOT?: AppScalarWhereInput | AppScalarWhereInput[]
    id?: StringFilter<"App"> | string
    slug?: StringFilter<"App"> | string
    name?: StringFilter<"App"> | string
    bundleId?: StringFilter<"App"> | string
    developerId?: StringFilter<"App"> | string
    category?: EnumCategoryFilter<"App"> | $Enums.Category
    description?: StringFilter<"App"> | string
    shortDesc?: StringFilter<"App"> | string
    iconUrl?: StringFilter<"App"> | string
    screenshots?: StringNullableListFilter<"App">
    status?: EnumAppStatusFilter<"App"> | $Enums.AppStatus
    platform?: EnumPlatformFilter<"App"> | $Enums.Platform
    minAndroid?: StringNullableFilter<"App"> | string | null
    minIos?: StringNullableFilter<"App"> | string | null
    websiteUrl?: StringNullableFilter<"App"> | string | null
    privacyUrl?: StringFilter<"App"> | string
    sourceUrl?: StringNullableFilter<"App"> | string | null
    totalDownloads?: IntFilter<"App"> | number
    createdAt?: DateTimeFilter<"App"> | Date | string
    updatedAt?: DateTimeFilter<"App"> | Date | string
  }

  export type DeveloperCreateWithoutAppsInput = {
    id?: string
    email: string
    name: string
    passwordHash?: string | null
    type: $Enums.DeveloperType
    vatNumber?: string | null
    country: string
    verified?: boolean
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeveloperUncheckedCreateWithoutAppsInput = {
    id?: string
    email: string
    name: string
    passwordHash?: string | null
    type: $Enums.DeveloperType
    vatNumber?: string | null
    country: string
    verified?: boolean
    verifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeveloperCreateOrConnectWithoutAppsInput = {
    where: DeveloperWhereUniqueInput
    create: XOR<DeveloperCreateWithoutAppsInput, DeveloperUncheckedCreateWithoutAppsInput>
  }

  export type VersionCreateWithoutAppInput = {
    id?: string
    versionName: string
    versionCode: number
    platform: $Enums.Platform
    fileKey: string
    fileSize: bigint | number
    fileSha256: string
    changelog: string
    minOs: string
    status?: $Enums.VersionStatus
    virusTotalId?: string | null
    virusTotalReport?: NullableJsonNullValueInput | InputJsonValue
    scannedAt?: Date | string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    downloadLogs?: DownloadLogCreateNestedManyWithoutVersionInput
  }

  export type VersionUncheckedCreateWithoutAppInput = {
    id?: string
    versionName: string
    versionCode: number
    platform: $Enums.Platform
    fileKey: string
    fileSize: bigint | number
    fileSha256: string
    changelog: string
    minOs: string
    status?: $Enums.VersionStatus
    virusTotalId?: string | null
    virusTotalReport?: NullableJsonNullValueInput | InputJsonValue
    scannedAt?: Date | string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    downloadLogs?: DownloadLogUncheckedCreateNestedManyWithoutVersionInput
  }

  export type VersionCreateOrConnectWithoutAppInput = {
    where: VersionWhereUniqueInput
    create: XOR<VersionCreateWithoutAppInput, VersionUncheckedCreateWithoutAppInput>
  }

  export type VersionCreateManyAppInputEnvelope = {
    data: VersionCreateManyAppInput | VersionCreateManyAppInput[]
    skipDuplicates?: boolean
  }

  export type TagCreateWithoutAppsInput = {
    id?: string
    name: string
  }

  export type TagUncheckedCreateWithoutAppsInput = {
    id?: string
    name: string
  }

  export type TagCreateOrConnectWithoutAppsInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutAppsInput, TagUncheckedCreateWithoutAppsInput>
  }

  export type DeveloperUpsertWithoutAppsInput = {
    update: XOR<DeveloperUpdateWithoutAppsInput, DeveloperUncheckedUpdateWithoutAppsInput>
    create: XOR<DeveloperCreateWithoutAppsInput, DeveloperUncheckedCreateWithoutAppsInput>
    where?: DeveloperWhereInput
  }

  export type DeveloperUpdateToOneWithWhereWithoutAppsInput = {
    where?: DeveloperWhereInput
    data: XOR<DeveloperUpdateWithoutAppsInput, DeveloperUncheckedUpdateWithoutAppsInput>
  }

  export type DeveloperUpdateWithoutAppsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumDeveloperTypeFieldUpdateOperationsInput | $Enums.DeveloperType
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeveloperUncheckedUpdateWithoutAppsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumDeveloperTypeFieldUpdateOperationsInput | $Enums.DeveloperType
    vatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VersionUpsertWithWhereUniqueWithoutAppInput = {
    where: VersionWhereUniqueInput
    update: XOR<VersionUpdateWithoutAppInput, VersionUncheckedUpdateWithoutAppInput>
    create: XOR<VersionCreateWithoutAppInput, VersionUncheckedCreateWithoutAppInput>
  }

  export type VersionUpdateWithWhereUniqueWithoutAppInput = {
    where: VersionWhereUniqueInput
    data: XOR<VersionUpdateWithoutAppInput, VersionUncheckedUpdateWithoutAppInput>
  }

  export type VersionUpdateManyWithWhereWithoutAppInput = {
    where: VersionScalarWhereInput
    data: XOR<VersionUpdateManyMutationInput, VersionUncheckedUpdateManyWithoutAppInput>
  }

  export type VersionScalarWhereInput = {
    AND?: VersionScalarWhereInput | VersionScalarWhereInput[]
    OR?: VersionScalarWhereInput[]
    NOT?: VersionScalarWhereInput | VersionScalarWhereInput[]
    id?: StringFilter<"Version"> | string
    appId?: StringFilter<"Version"> | string
    versionName?: StringFilter<"Version"> | string
    versionCode?: IntFilter<"Version"> | number
    platform?: EnumPlatformFilter<"Version"> | $Enums.Platform
    fileKey?: StringFilter<"Version"> | string
    fileSize?: BigIntFilter<"Version"> | bigint | number
    fileSha256?: StringFilter<"Version"> | string
    changelog?: StringFilter<"Version"> | string
    minOs?: StringFilter<"Version"> | string
    status?: EnumVersionStatusFilter<"Version"> | $Enums.VersionStatus
    virusTotalId?: StringNullableFilter<"Version"> | string | null
    virusTotalReport?: JsonNullableFilter<"Version">
    scannedAt?: DateTimeNullableFilter<"Version"> | Date | string | null
    publishedAt?: DateTimeNullableFilter<"Version"> | Date | string | null
    createdAt?: DateTimeFilter<"Version"> | Date | string
  }

  export type TagUpsertWithWhereUniqueWithoutAppsInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutAppsInput, TagUncheckedUpdateWithoutAppsInput>
    create: XOR<TagCreateWithoutAppsInput, TagUncheckedCreateWithoutAppsInput>
  }

  export type TagUpdateWithWhereUniqueWithoutAppsInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutAppsInput, TagUncheckedUpdateWithoutAppsInput>
  }

  export type TagUpdateManyWithWhereWithoutAppsInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutAppsInput>
  }

  export type TagScalarWhereInput = {
    AND?: TagScalarWhereInput | TagScalarWhereInput[]
    OR?: TagScalarWhereInput[]
    NOT?: TagScalarWhereInput | TagScalarWhereInput[]
    id?: StringFilter<"Tag"> | string
    name?: StringFilter<"Tag"> | string
  }

  export type AppCreateWithoutVersionsInput = {
    id?: string
    slug: string
    name: string
    bundleId: string
    category: $Enums.Category
    description: string
    shortDesc: string
    iconUrl: string
    screenshots?: AppCreatescreenshotsInput | string[]
    status?: $Enums.AppStatus
    platform?: $Enums.Platform
    minAndroid?: string | null
    minIos?: string | null
    websiteUrl?: string | null
    privacyUrl: string
    sourceUrl?: string | null
    totalDownloads?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    developer: DeveloperCreateNestedOneWithoutAppsInput
    tags?: TagCreateNestedManyWithoutAppsInput
  }

  export type AppUncheckedCreateWithoutVersionsInput = {
    id?: string
    slug: string
    name: string
    bundleId: string
    developerId: string
    category: $Enums.Category
    description: string
    shortDesc: string
    iconUrl: string
    screenshots?: AppCreatescreenshotsInput | string[]
    status?: $Enums.AppStatus
    platform?: $Enums.Platform
    minAndroid?: string | null
    minIos?: string | null
    websiteUrl?: string | null
    privacyUrl: string
    sourceUrl?: string | null
    totalDownloads?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagUncheckedCreateNestedManyWithoutAppsInput
  }

  export type AppCreateOrConnectWithoutVersionsInput = {
    where: AppWhereUniqueInput
    create: XOR<AppCreateWithoutVersionsInput, AppUncheckedCreateWithoutVersionsInput>
  }

  export type DownloadLogCreateWithoutVersionInput = {
    id?: string
    userId?: string | null
    ipHash: string
    userAgent: string
    country?: string | null
    createdAt?: Date | string
  }

  export type DownloadLogUncheckedCreateWithoutVersionInput = {
    id?: string
    userId?: string | null
    ipHash: string
    userAgent: string
    country?: string | null
    createdAt?: Date | string
  }

  export type DownloadLogCreateOrConnectWithoutVersionInput = {
    where: DownloadLogWhereUniqueInput
    create: XOR<DownloadLogCreateWithoutVersionInput, DownloadLogUncheckedCreateWithoutVersionInput>
  }

  export type DownloadLogCreateManyVersionInputEnvelope = {
    data: DownloadLogCreateManyVersionInput | DownloadLogCreateManyVersionInput[]
    skipDuplicates?: boolean
  }

  export type AppUpsertWithoutVersionsInput = {
    update: XOR<AppUpdateWithoutVersionsInput, AppUncheckedUpdateWithoutVersionsInput>
    create: XOR<AppCreateWithoutVersionsInput, AppUncheckedCreateWithoutVersionsInput>
    where?: AppWhereInput
  }

  export type AppUpdateToOneWithWhereWithoutVersionsInput = {
    where?: AppWhereInput
    data: XOR<AppUpdateWithoutVersionsInput, AppUncheckedUpdateWithoutVersionsInput>
  }

  export type AppUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bundleId?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: StringFieldUpdateOperationsInput | string
    shortDesc?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    screenshots?: AppUpdatescreenshotsInput | string[]
    status?: EnumAppStatusFieldUpdateOperationsInput | $Enums.AppStatus
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    minAndroid?: NullableStringFieldUpdateOperationsInput | string | null
    minIos?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    privacyUrl?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    totalDownloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    developer?: DeveloperUpdateOneRequiredWithoutAppsNestedInput
    tags?: TagUpdateManyWithoutAppsNestedInput
  }

  export type AppUncheckedUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bundleId?: StringFieldUpdateOperationsInput | string
    developerId?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: StringFieldUpdateOperationsInput | string
    shortDesc?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    screenshots?: AppUpdatescreenshotsInput | string[]
    status?: EnumAppStatusFieldUpdateOperationsInput | $Enums.AppStatus
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    minAndroid?: NullableStringFieldUpdateOperationsInput | string | null
    minIos?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    privacyUrl?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    totalDownloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUncheckedUpdateManyWithoutAppsNestedInput
  }

  export type DownloadLogUpsertWithWhereUniqueWithoutVersionInput = {
    where: DownloadLogWhereUniqueInput
    update: XOR<DownloadLogUpdateWithoutVersionInput, DownloadLogUncheckedUpdateWithoutVersionInput>
    create: XOR<DownloadLogCreateWithoutVersionInput, DownloadLogUncheckedCreateWithoutVersionInput>
  }

  export type DownloadLogUpdateWithWhereUniqueWithoutVersionInput = {
    where: DownloadLogWhereUniqueInput
    data: XOR<DownloadLogUpdateWithoutVersionInput, DownloadLogUncheckedUpdateWithoutVersionInput>
  }

  export type DownloadLogUpdateManyWithWhereWithoutVersionInput = {
    where: DownloadLogScalarWhereInput
    data: XOR<DownloadLogUpdateManyMutationInput, DownloadLogUncheckedUpdateManyWithoutVersionInput>
  }

  export type DownloadLogScalarWhereInput = {
    AND?: DownloadLogScalarWhereInput | DownloadLogScalarWhereInput[]
    OR?: DownloadLogScalarWhereInput[]
    NOT?: DownloadLogScalarWhereInput | DownloadLogScalarWhereInput[]
    id?: StringFilter<"DownloadLog"> | string
    versionId?: StringFilter<"DownloadLog"> | string
    userId?: StringNullableFilter<"DownloadLog"> | string | null
    ipHash?: StringFilter<"DownloadLog"> | string
    userAgent?: StringFilter<"DownloadLog"> | string
    country?: StringNullableFilter<"DownloadLog"> | string | null
    createdAt?: DateTimeFilter<"DownloadLog"> | Date | string
  }

  export type VersionCreateWithoutDownloadLogsInput = {
    id?: string
    versionName: string
    versionCode: number
    platform: $Enums.Platform
    fileKey: string
    fileSize: bigint | number
    fileSha256: string
    changelog: string
    minOs: string
    status?: $Enums.VersionStatus
    virusTotalId?: string | null
    virusTotalReport?: NullableJsonNullValueInput | InputJsonValue
    scannedAt?: Date | string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
    app: AppCreateNestedOneWithoutVersionsInput
  }

  export type VersionUncheckedCreateWithoutDownloadLogsInput = {
    id?: string
    appId: string
    versionName: string
    versionCode: number
    platform: $Enums.Platform
    fileKey: string
    fileSize: bigint | number
    fileSha256: string
    changelog: string
    minOs: string
    status?: $Enums.VersionStatus
    virusTotalId?: string | null
    virusTotalReport?: NullableJsonNullValueInput | InputJsonValue
    scannedAt?: Date | string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type VersionCreateOrConnectWithoutDownloadLogsInput = {
    where: VersionWhereUniqueInput
    create: XOR<VersionCreateWithoutDownloadLogsInput, VersionUncheckedCreateWithoutDownloadLogsInput>
  }

  export type VersionUpsertWithoutDownloadLogsInput = {
    update: XOR<VersionUpdateWithoutDownloadLogsInput, VersionUncheckedUpdateWithoutDownloadLogsInput>
    create: XOR<VersionCreateWithoutDownloadLogsInput, VersionUncheckedCreateWithoutDownloadLogsInput>
    where?: VersionWhereInput
  }

  export type VersionUpdateToOneWithWhereWithoutDownloadLogsInput = {
    where?: VersionWhereInput
    data: XOR<VersionUpdateWithoutDownloadLogsInput, VersionUncheckedUpdateWithoutDownloadLogsInput>
  }

  export type VersionUpdateWithoutDownloadLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionName?: StringFieldUpdateOperationsInput | string
    versionCode?: IntFieldUpdateOperationsInput | number
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    fileSha256?: StringFieldUpdateOperationsInput | string
    changelog?: StringFieldUpdateOperationsInput | string
    minOs?: StringFieldUpdateOperationsInput | string
    status?: EnumVersionStatusFieldUpdateOperationsInput | $Enums.VersionStatus
    virusTotalId?: NullableStringFieldUpdateOperationsInput | string | null
    virusTotalReport?: NullableJsonNullValueInput | InputJsonValue
    scannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    app?: AppUpdateOneRequiredWithoutVersionsNestedInput
  }

  export type VersionUncheckedUpdateWithoutDownloadLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    appId?: StringFieldUpdateOperationsInput | string
    versionName?: StringFieldUpdateOperationsInput | string
    versionCode?: IntFieldUpdateOperationsInput | number
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    fileSha256?: StringFieldUpdateOperationsInput | string
    changelog?: StringFieldUpdateOperationsInput | string
    minOs?: StringFieldUpdateOperationsInput | string
    status?: EnumVersionStatusFieldUpdateOperationsInput | $Enums.VersionStatus
    virusTotalId?: NullableStringFieldUpdateOperationsInput | string | null
    virusTotalReport?: NullableJsonNullValueInput | InputJsonValue
    scannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppCreateWithoutTagsInput = {
    id?: string
    slug: string
    name: string
    bundleId: string
    category: $Enums.Category
    description: string
    shortDesc: string
    iconUrl: string
    screenshots?: AppCreatescreenshotsInput | string[]
    status?: $Enums.AppStatus
    platform?: $Enums.Platform
    minAndroid?: string | null
    minIos?: string | null
    websiteUrl?: string | null
    privacyUrl: string
    sourceUrl?: string | null
    totalDownloads?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    developer: DeveloperCreateNestedOneWithoutAppsInput
    versions?: VersionCreateNestedManyWithoutAppInput
  }

  export type AppUncheckedCreateWithoutTagsInput = {
    id?: string
    slug: string
    name: string
    bundleId: string
    developerId: string
    category: $Enums.Category
    description: string
    shortDesc: string
    iconUrl: string
    screenshots?: AppCreatescreenshotsInput | string[]
    status?: $Enums.AppStatus
    platform?: $Enums.Platform
    minAndroid?: string | null
    minIos?: string | null
    websiteUrl?: string | null
    privacyUrl: string
    sourceUrl?: string | null
    totalDownloads?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    versions?: VersionUncheckedCreateNestedManyWithoutAppInput
  }

  export type AppCreateOrConnectWithoutTagsInput = {
    where: AppWhereUniqueInput
    create: XOR<AppCreateWithoutTagsInput, AppUncheckedCreateWithoutTagsInput>
  }

  export type AppUpsertWithWhereUniqueWithoutTagsInput = {
    where: AppWhereUniqueInput
    update: XOR<AppUpdateWithoutTagsInput, AppUncheckedUpdateWithoutTagsInput>
    create: XOR<AppCreateWithoutTagsInput, AppUncheckedCreateWithoutTagsInput>
  }

  export type AppUpdateWithWhereUniqueWithoutTagsInput = {
    where: AppWhereUniqueInput
    data: XOR<AppUpdateWithoutTagsInput, AppUncheckedUpdateWithoutTagsInput>
  }

  export type AppUpdateManyWithWhereWithoutTagsInput = {
    where: AppScalarWhereInput
    data: XOR<AppUpdateManyMutationInput, AppUncheckedUpdateManyWithoutTagsInput>
  }

  export type AppCreateManyDeveloperInput = {
    id?: string
    slug: string
    name: string
    bundleId: string
    category: $Enums.Category
    description: string
    shortDesc: string
    iconUrl: string
    screenshots?: AppCreatescreenshotsInput | string[]
    status?: $Enums.AppStatus
    platform?: $Enums.Platform
    minAndroid?: string | null
    minIos?: string | null
    websiteUrl?: string | null
    privacyUrl: string
    sourceUrl?: string | null
    totalDownloads?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppUpdateWithoutDeveloperInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bundleId?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: StringFieldUpdateOperationsInput | string
    shortDesc?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    screenshots?: AppUpdatescreenshotsInput | string[]
    status?: EnumAppStatusFieldUpdateOperationsInput | $Enums.AppStatus
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    minAndroid?: NullableStringFieldUpdateOperationsInput | string | null
    minIos?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    privacyUrl?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    totalDownloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: VersionUpdateManyWithoutAppNestedInput
    tags?: TagUpdateManyWithoutAppsNestedInput
  }

  export type AppUncheckedUpdateWithoutDeveloperInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bundleId?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: StringFieldUpdateOperationsInput | string
    shortDesc?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    screenshots?: AppUpdatescreenshotsInput | string[]
    status?: EnumAppStatusFieldUpdateOperationsInput | $Enums.AppStatus
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    minAndroid?: NullableStringFieldUpdateOperationsInput | string | null
    minIos?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    privacyUrl?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    totalDownloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: VersionUncheckedUpdateManyWithoutAppNestedInput
    tags?: TagUncheckedUpdateManyWithoutAppsNestedInput
  }

  export type AppUncheckedUpdateManyWithoutDeveloperInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bundleId?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: StringFieldUpdateOperationsInput | string
    shortDesc?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    screenshots?: AppUpdatescreenshotsInput | string[]
    status?: EnumAppStatusFieldUpdateOperationsInput | $Enums.AppStatus
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    minAndroid?: NullableStringFieldUpdateOperationsInput | string | null
    minIos?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    privacyUrl?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    totalDownloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VersionCreateManyAppInput = {
    id?: string
    versionName: string
    versionCode: number
    platform: $Enums.Platform
    fileKey: string
    fileSize: bigint | number
    fileSha256: string
    changelog: string
    minOs: string
    status?: $Enums.VersionStatus
    virusTotalId?: string | null
    virusTotalReport?: NullableJsonNullValueInput | InputJsonValue
    scannedAt?: Date | string | null
    publishedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type VersionUpdateWithoutAppInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionName?: StringFieldUpdateOperationsInput | string
    versionCode?: IntFieldUpdateOperationsInput | number
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    fileSha256?: StringFieldUpdateOperationsInput | string
    changelog?: StringFieldUpdateOperationsInput | string
    minOs?: StringFieldUpdateOperationsInput | string
    status?: EnumVersionStatusFieldUpdateOperationsInput | $Enums.VersionStatus
    virusTotalId?: NullableStringFieldUpdateOperationsInput | string | null
    virusTotalReport?: NullableJsonNullValueInput | InputJsonValue
    scannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    downloadLogs?: DownloadLogUpdateManyWithoutVersionNestedInput
  }

  export type VersionUncheckedUpdateWithoutAppInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionName?: StringFieldUpdateOperationsInput | string
    versionCode?: IntFieldUpdateOperationsInput | number
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    fileSha256?: StringFieldUpdateOperationsInput | string
    changelog?: StringFieldUpdateOperationsInput | string
    minOs?: StringFieldUpdateOperationsInput | string
    status?: EnumVersionStatusFieldUpdateOperationsInput | $Enums.VersionStatus
    virusTotalId?: NullableStringFieldUpdateOperationsInput | string | null
    virusTotalReport?: NullableJsonNullValueInput | InputJsonValue
    scannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    downloadLogs?: DownloadLogUncheckedUpdateManyWithoutVersionNestedInput
  }

  export type VersionUncheckedUpdateManyWithoutAppInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionName?: StringFieldUpdateOperationsInput | string
    versionCode?: IntFieldUpdateOperationsInput | number
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    fileKey?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    fileSha256?: StringFieldUpdateOperationsInput | string
    changelog?: StringFieldUpdateOperationsInput | string
    minOs?: StringFieldUpdateOperationsInput | string
    status?: EnumVersionStatusFieldUpdateOperationsInput | $Enums.VersionStatus
    virusTotalId?: NullableStringFieldUpdateOperationsInput | string | null
    virusTotalReport?: NullableJsonNullValueInput | InputJsonValue
    scannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUpdateWithoutAppsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateWithoutAppsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyWithoutAppsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type DownloadLogCreateManyVersionInput = {
    id?: string
    userId?: string | null
    ipHash: string
    userAgent: string
    country?: string | null
    createdAt?: Date | string
  }

  export type DownloadLogUpdateWithoutVersionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    ipHash?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DownloadLogUncheckedUpdateWithoutVersionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    ipHash?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DownloadLogUncheckedUpdateManyWithoutVersionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    ipHash?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bundleId?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: StringFieldUpdateOperationsInput | string
    shortDesc?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    screenshots?: AppUpdatescreenshotsInput | string[]
    status?: EnumAppStatusFieldUpdateOperationsInput | $Enums.AppStatus
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    minAndroid?: NullableStringFieldUpdateOperationsInput | string | null
    minIos?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    privacyUrl?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    totalDownloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    developer?: DeveloperUpdateOneRequiredWithoutAppsNestedInput
    versions?: VersionUpdateManyWithoutAppNestedInput
  }

  export type AppUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bundleId?: StringFieldUpdateOperationsInput | string
    developerId?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: StringFieldUpdateOperationsInput | string
    shortDesc?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    screenshots?: AppUpdatescreenshotsInput | string[]
    status?: EnumAppStatusFieldUpdateOperationsInput | $Enums.AppStatus
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    minAndroid?: NullableStringFieldUpdateOperationsInput | string | null
    minIos?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    privacyUrl?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    totalDownloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    versions?: VersionUncheckedUpdateManyWithoutAppNestedInput
  }

  export type AppUncheckedUpdateManyWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bundleId?: StringFieldUpdateOperationsInput | string
    developerId?: StringFieldUpdateOperationsInput | string
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    description?: StringFieldUpdateOperationsInput | string
    shortDesc?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    screenshots?: AppUpdatescreenshotsInput | string[]
    status?: EnumAppStatusFieldUpdateOperationsInput | $Enums.AppStatus
    platform?: EnumPlatformFieldUpdateOperationsInput | $Enums.Platform
    minAndroid?: NullableStringFieldUpdateOperationsInput | string | null
    minIos?: NullableStringFieldUpdateOperationsInput | string | null
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    privacyUrl?: StringFieldUpdateOperationsInput | string
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    totalDownloads?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}