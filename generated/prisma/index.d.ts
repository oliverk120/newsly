
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
 * Model Article
 * 
 */
export type Article = $Result.DefaultSelection<Prisma.$ArticlePayload>
/**
 * Model Filter
 * 
 */
export type Filter = $Result.DefaultSelection<Prisma.$FilterPayload>
/**
 * Model ArticleFilterMatch
 * 
 */
export type ArticleFilterMatch = $Result.DefaultSelection<Prisma.$ArticleFilterMatchPayload>
/**
 * Model ArticleEnrichment
 * 
 */
export type ArticleEnrichment = $Result.DefaultSelection<Prisma.$ArticleEnrichmentPayload>
/**
 * Model ArticleEnrichmentStep
 * 
 */
export type ArticleEnrichmentStep = $Result.DefaultSelection<Prisma.$ArticleEnrichmentStepPayload>
/**
 * Model Prompt
 * 
 */
export type Prompt = $Result.DefaultSelection<Prisma.$PromptPayload>
/**
 * Model Source
 * 
 */
export type Source = $Result.DefaultSelection<Prisma.$SourcePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Articles
 * const articles = await prisma.article.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Articles
   * const articles = await prisma.article.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.article`: Exposes CRUD operations for the **Article** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Articles
    * const articles = await prisma.article.findMany()
    * ```
    */
  get article(): Prisma.ArticleDelegate<ExtArgs>;

  /**
   * `prisma.filter`: Exposes CRUD operations for the **Filter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Filters
    * const filters = await prisma.filter.findMany()
    * ```
    */
  get filter(): Prisma.FilterDelegate<ExtArgs>;

  /**
   * `prisma.articleFilterMatch`: Exposes CRUD operations for the **ArticleFilterMatch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArticleFilterMatches
    * const articleFilterMatches = await prisma.articleFilterMatch.findMany()
    * ```
    */
  get articleFilterMatch(): Prisma.ArticleFilterMatchDelegate<ExtArgs>;

  /**
   * `prisma.articleEnrichment`: Exposes CRUD operations for the **ArticleEnrichment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArticleEnrichments
    * const articleEnrichments = await prisma.articleEnrichment.findMany()
    * ```
    */
  get articleEnrichment(): Prisma.ArticleEnrichmentDelegate<ExtArgs>;

  /**
   * `prisma.articleEnrichmentStep`: Exposes CRUD operations for the **ArticleEnrichmentStep** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArticleEnrichmentSteps
    * const articleEnrichmentSteps = await prisma.articleEnrichmentStep.findMany()
    * ```
    */
  get articleEnrichmentStep(): Prisma.ArticleEnrichmentStepDelegate<ExtArgs>;

  /**
   * `prisma.prompt`: Exposes CRUD operations for the **Prompt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prompts
    * const prompts = await prisma.prompt.findMany()
    * ```
    */
  get prompt(): Prisma.PromptDelegate<ExtArgs>;

  /**
   * `prisma.source`: Exposes CRUD operations for the **Source** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sources
    * const sources = await prisma.source.findMany()
    * ```
    */
  get source(): Prisma.SourceDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    Article: 'Article',
    Filter: 'Filter',
    ArticleFilterMatch: 'ArticleFilterMatch',
    ArticleEnrichment: 'ArticleEnrichment',
    ArticleEnrichmentStep: 'ArticleEnrichmentStep',
    Prompt: 'Prompt',
    Source: 'Source'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "article" | "filter" | "articleFilterMatch" | "articleEnrichment" | "articleEnrichmentStep" | "prompt" | "source"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Article: {
        payload: Prisma.$ArticlePayload<ExtArgs>
        fields: Prisma.ArticleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findFirst: {
            args: Prisma.ArticleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findMany: {
            args: Prisma.ArticleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          create: {
            args: Prisma.ArticleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          createMany: {
            args: Prisma.ArticleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArticleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          delete: {
            args: Prisma.ArticleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          update: {
            args: Prisma.ArticleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          deleteMany: {
            args: Prisma.ArticleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ArticleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          aggregate: {
            args: Prisma.ArticleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticle>
          }
          groupBy: {
            args: Prisma.ArticleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleCountAggregateOutputType> | number
          }
        }
      }
      Filter: {
        payload: Prisma.$FilterPayload<ExtArgs>
        fields: Prisma.FilterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FilterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FilterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterPayload>
          }
          findFirst: {
            args: Prisma.FilterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FilterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterPayload>
          }
          findMany: {
            args: Prisma.FilterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterPayload>[]
          }
          create: {
            args: Prisma.FilterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterPayload>
          }
          createMany: {
            args: Prisma.FilterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FilterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterPayload>[]
          }
          delete: {
            args: Prisma.FilterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterPayload>
          }
          update: {
            args: Prisma.FilterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterPayload>
          }
          deleteMany: {
            args: Prisma.FilterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FilterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FilterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterPayload>
          }
          aggregate: {
            args: Prisma.FilterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFilter>
          }
          groupBy: {
            args: Prisma.FilterGroupByArgs<ExtArgs>
            result: $Utils.Optional<FilterGroupByOutputType>[]
          }
          count: {
            args: Prisma.FilterCountArgs<ExtArgs>
            result: $Utils.Optional<FilterCountAggregateOutputType> | number
          }
        }
      }
      ArticleFilterMatch: {
        payload: Prisma.$ArticleFilterMatchPayload<ExtArgs>
        fields: Prisma.ArticleFilterMatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleFilterMatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleFilterMatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleFilterMatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleFilterMatchPayload>
          }
          findFirst: {
            args: Prisma.ArticleFilterMatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleFilterMatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleFilterMatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleFilterMatchPayload>
          }
          findMany: {
            args: Prisma.ArticleFilterMatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleFilterMatchPayload>[]
          }
          create: {
            args: Prisma.ArticleFilterMatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleFilterMatchPayload>
          }
          createMany: {
            args: Prisma.ArticleFilterMatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArticleFilterMatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleFilterMatchPayload>[]
          }
          delete: {
            args: Prisma.ArticleFilterMatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleFilterMatchPayload>
          }
          update: {
            args: Prisma.ArticleFilterMatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleFilterMatchPayload>
          }
          deleteMany: {
            args: Prisma.ArticleFilterMatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleFilterMatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ArticleFilterMatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleFilterMatchPayload>
          }
          aggregate: {
            args: Prisma.ArticleFilterMatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticleFilterMatch>
          }
          groupBy: {
            args: Prisma.ArticleFilterMatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleFilterMatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleFilterMatchCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleFilterMatchCountAggregateOutputType> | number
          }
        }
      }
      ArticleEnrichment: {
        payload: Prisma.$ArticleEnrichmentPayload<ExtArgs>
        fields: Prisma.ArticleEnrichmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleEnrichmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleEnrichmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleEnrichmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleEnrichmentPayload>
          }
          findFirst: {
            args: Prisma.ArticleEnrichmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleEnrichmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleEnrichmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleEnrichmentPayload>
          }
          findMany: {
            args: Prisma.ArticleEnrichmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleEnrichmentPayload>[]
          }
          create: {
            args: Prisma.ArticleEnrichmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleEnrichmentPayload>
          }
          createMany: {
            args: Prisma.ArticleEnrichmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArticleEnrichmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleEnrichmentPayload>[]
          }
          delete: {
            args: Prisma.ArticleEnrichmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleEnrichmentPayload>
          }
          update: {
            args: Prisma.ArticleEnrichmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleEnrichmentPayload>
          }
          deleteMany: {
            args: Prisma.ArticleEnrichmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleEnrichmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ArticleEnrichmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleEnrichmentPayload>
          }
          aggregate: {
            args: Prisma.ArticleEnrichmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticleEnrichment>
          }
          groupBy: {
            args: Prisma.ArticleEnrichmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleEnrichmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleEnrichmentCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleEnrichmentCountAggregateOutputType> | number
          }
        }
      }
      ArticleEnrichmentStep: {
        payload: Prisma.$ArticleEnrichmentStepPayload<ExtArgs>
        fields: Prisma.ArticleEnrichmentStepFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleEnrichmentStepFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleEnrichmentStepPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleEnrichmentStepFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleEnrichmentStepPayload>
          }
          findFirst: {
            args: Prisma.ArticleEnrichmentStepFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleEnrichmentStepPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleEnrichmentStepFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleEnrichmentStepPayload>
          }
          findMany: {
            args: Prisma.ArticleEnrichmentStepFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleEnrichmentStepPayload>[]
          }
          create: {
            args: Prisma.ArticleEnrichmentStepCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleEnrichmentStepPayload>
          }
          createMany: {
            args: Prisma.ArticleEnrichmentStepCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArticleEnrichmentStepCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleEnrichmentStepPayload>[]
          }
          delete: {
            args: Prisma.ArticleEnrichmentStepDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleEnrichmentStepPayload>
          }
          update: {
            args: Prisma.ArticleEnrichmentStepUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleEnrichmentStepPayload>
          }
          deleteMany: {
            args: Prisma.ArticleEnrichmentStepDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleEnrichmentStepUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ArticleEnrichmentStepUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleEnrichmentStepPayload>
          }
          aggregate: {
            args: Prisma.ArticleEnrichmentStepAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticleEnrichmentStep>
          }
          groupBy: {
            args: Prisma.ArticleEnrichmentStepGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleEnrichmentStepGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleEnrichmentStepCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleEnrichmentStepCountAggregateOutputType> | number
          }
        }
      }
      Prompt: {
        payload: Prisma.$PromptPayload<ExtArgs>
        fields: Prisma.PromptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PromptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PromptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptPayload>
          }
          findFirst: {
            args: Prisma.PromptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PromptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptPayload>
          }
          findMany: {
            args: Prisma.PromptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptPayload>[]
          }
          create: {
            args: Prisma.PromptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptPayload>
          }
          createMany: {
            args: Prisma.PromptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PromptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptPayload>[]
          }
          delete: {
            args: Prisma.PromptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptPayload>
          }
          update: {
            args: Prisma.PromptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptPayload>
          }
          deleteMany: {
            args: Prisma.PromptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PromptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PromptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromptPayload>
          }
          aggregate: {
            args: Prisma.PromptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrompt>
          }
          groupBy: {
            args: Prisma.PromptGroupByArgs<ExtArgs>
            result: $Utils.Optional<PromptGroupByOutputType>[]
          }
          count: {
            args: Prisma.PromptCountArgs<ExtArgs>
            result: $Utils.Optional<PromptCountAggregateOutputType> | number
          }
        }
      }
      Source: {
        payload: Prisma.$SourcePayload<ExtArgs>
        fields: Prisma.SourceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SourceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SourceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          findFirst: {
            args: Prisma.SourceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SourceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          findMany: {
            args: Prisma.SourceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>[]
          }
          create: {
            args: Prisma.SourceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          createMany: {
            args: Prisma.SourceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SourceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>[]
          }
          delete: {
            args: Prisma.SourceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          update: {
            args: Prisma.SourceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          deleteMany: {
            args: Prisma.SourceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SourceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SourceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          aggregate: {
            args: Prisma.SourceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSource>
          }
          groupBy: {
            args: Prisma.SourceGroupByArgs<ExtArgs>
            result: $Utils.Optional<SourceGroupByOutputType>[]
          }
          count: {
            args: Prisma.SourceCountArgs<ExtArgs>
            result: $Utils.Optional<SourceCountAggregateOutputType> | number
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
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
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
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type ArticleCountOutputType
   */

  export type ArticleCountOutputType = {
    ArticleFilterMatch: number
    ArticleEnrichmentStep: number
  }

  export type ArticleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ArticleFilterMatch?: boolean | ArticleCountOutputTypeCountArticleFilterMatchArgs
    ArticleEnrichmentStep?: boolean | ArticleCountOutputTypeCountArticleEnrichmentStepArgs
  }

  // Custom InputTypes
  /**
   * ArticleCountOutputType without action
   */
  export type ArticleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCountOutputType
     */
    select?: ArticleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ArticleCountOutputType without action
   */
  export type ArticleCountOutputTypeCountArticleFilterMatchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleFilterMatchWhereInput
  }

  /**
   * ArticleCountOutputType without action
   */
  export type ArticleCountOutputTypeCountArticleEnrichmentStepArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleEnrichmentStepWhereInput
  }


  /**
   * Count Type FilterCountOutputType
   */

  export type FilterCountOutputType = {
    ArticleFilterMatch: number
  }

  export type FilterCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ArticleFilterMatch?: boolean | FilterCountOutputTypeCountArticleFilterMatchArgs
  }

  // Custom InputTypes
  /**
   * FilterCountOutputType without action
   */
  export type FilterCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FilterCountOutputType
     */
    select?: FilterCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FilterCountOutputType without action
   */
  export type FilterCountOutputTypeCountArticleFilterMatchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleFilterMatchWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Article
   */

  export type AggregateArticle = {
    _count: ArticleCountAggregateOutputType | null
    _avg: ArticleAvgAggregateOutputType | null
    _sum: ArticleSumAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  export type ArticleAvgAggregateOutputType = {
    id: number | null
  }

  export type ArticleSumAggregateOutputType = {
    id: number | null
  }

  export type ArticleMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    time: string | null
    link: string | null
    image: string | null
    created_at: Date | null
  }

  export type ArticleMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    time: string | null
    link: string | null
    image: string | null
    created_at: Date | null
  }

  export type ArticleCountAggregateOutputType = {
    id: number
    title: number
    description: number
    time: number
    link: number
    image: number
    created_at: number
    _all: number
  }


  export type ArticleAvgAggregateInputType = {
    id?: true
  }

  export type ArticleSumAggregateInputType = {
    id?: true
  }

  export type ArticleMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    time?: true
    link?: true
    image?: true
    created_at?: true
  }

  export type ArticleMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    time?: true
    link?: true
    image?: true
    created_at?: true
  }

  export type ArticleCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    time?: true
    link?: true
    image?: true
    created_at?: true
    _all?: true
  }

  export type ArticleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Article to aggregate.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Articles
    **/
    _count?: true | ArticleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArticleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArticleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleMaxAggregateInputType
  }

  export type GetArticleAggregateType<T extends ArticleAggregateArgs> = {
        [P in keyof T & keyof AggregateArticle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticle[P]>
      : GetScalarType<T[P], AggregateArticle[P]>
  }




  export type ArticleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleWhereInput
    orderBy?: ArticleOrderByWithAggregationInput | ArticleOrderByWithAggregationInput[]
    by: ArticleScalarFieldEnum[] | ArticleScalarFieldEnum
    having?: ArticleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleCountAggregateInputType | true
    _avg?: ArticleAvgAggregateInputType
    _sum?: ArticleSumAggregateInputType
    _min?: ArticleMinAggregateInputType
    _max?: ArticleMaxAggregateInputType
  }

  export type ArticleGroupByOutputType = {
    id: number
    title: string | null
    description: string | null
    time: string | null
    link: string
    image: string | null
    created_at: Date
    _count: ArticleCountAggregateOutputType | null
    _avg: ArticleAvgAggregateOutputType | null
    _sum: ArticleSumAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  type GetArticleGroupByPayload<T extends ArticleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleGroupByOutputType[P]>
        }
      >
    >


  export type ArticleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    time?: boolean
    link?: boolean
    image?: boolean
    created_at?: boolean
    ArticleFilterMatch?: boolean | Article$ArticleFilterMatchArgs<ExtArgs>
    ArticleEnrichment?: boolean | Article$ArticleEnrichmentArgs<ExtArgs>
    ArticleEnrichmentStep?: boolean | Article$ArticleEnrichmentStepArgs<ExtArgs>
    _count?: boolean | ArticleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    time?: boolean
    link?: boolean
    image?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    time?: boolean
    link?: boolean
    image?: boolean
    created_at?: boolean
  }

  export type ArticleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ArticleFilterMatch?: boolean | Article$ArticleFilterMatchArgs<ExtArgs>
    ArticleEnrichment?: boolean | Article$ArticleEnrichmentArgs<ExtArgs>
    ArticleEnrichmentStep?: boolean | Article$ArticleEnrichmentStepArgs<ExtArgs>
    _count?: boolean | ArticleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ArticleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ArticlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Article"
    objects: {
      ArticleFilterMatch: Prisma.$ArticleFilterMatchPayload<ExtArgs>[]
      ArticleEnrichment: Prisma.$ArticleEnrichmentPayload<ExtArgs> | null
      ArticleEnrichmentStep: Prisma.$ArticleEnrichmentStepPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string | null
      description: string | null
      time: string | null
      link: string
      image: string | null
      created_at: Date
    }, ExtArgs["result"]["article"]>
    composites: {}
  }

  type ArticleGetPayload<S extends boolean | null | undefined | ArticleDefaultArgs> = $Result.GetResult<Prisma.$ArticlePayload, S>

  type ArticleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ArticleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ArticleCountAggregateInputType | true
    }

  export interface ArticleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Article'], meta: { name: 'Article' } }
    /**
     * Find zero or one Article that matches the filter.
     * @param {ArticleFindUniqueArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleFindUniqueArgs>(args: SelectSubset<T, ArticleFindUniqueArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Article that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ArticleFindUniqueOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Article that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleFindFirstArgs>(args?: SelectSubset<T, ArticleFindFirstArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Article that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Articles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Articles
     * const articles = await prisma.article.findMany()
     * 
     * // Get first 10 Articles
     * const articles = await prisma.article.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const articleWithIdOnly = await prisma.article.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArticleFindManyArgs>(args?: SelectSubset<T, ArticleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Article.
     * @param {ArticleCreateArgs} args - Arguments to create a Article.
     * @example
     * // Create one Article
     * const Article = await prisma.article.create({
     *   data: {
     *     // ... data to create a Article
     *   }
     * })
     * 
     */
    create<T extends ArticleCreateArgs>(args: SelectSubset<T, ArticleCreateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Articles.
     * @param {ArticleCreateManyArgs} args - Arguments to create many Articles.
     * @example
     * // Create many Articles
     * const article = await prisma.article.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleCreateManyArgs>(args?: SelectSubset<T, ArticleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Articles and returns the data saved in the database.
     * @param {ArticleCreateManyAndReturnArgs} args - Arguments to create many Articles.
     * @example
     * // Create many Articles
     * const article = await prisma.article.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Articles and only return the `id`
     * const articleWithIdOnly = await prisma.article.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArticleCreateManyAndReturnArgs>(args?: SelectSubset<T, ArticleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Article.
     * @param {ArticleDeleteArgs} args - Arguments to delete one Article.
     * @example
     * // Delete one Article
     * const Article = await prisma.article.delete({
     *   where: {
     *     // ... filter to delete one Article
     *   }
     * })
     * 
     */
    delete<T extends ArticleDeleteArgs>(args: SelectSubset<T, ArticleDeleteArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Article.
     * @param {ArticleUpdateArgs} args - Arguments to update one Article.
     * @example
     * // Update one Article
     * const article = await prisma.article.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleUpdateArgs>(args: SelectSubset<T, ArticleUpdateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Articles.
     * @param {ArticleDeleteManyArgs} args - Arguments to filter Articles to delete.
     * @example
     * // Delete a few Articles
     * const { count } = await prisma.article.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleDeleteManyArgs>(args?: SelectSubset<T, ArticleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Articles
     * const article = await prisma.article.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleUpdateManyArgs>(args: SelectSubset<T, ArticleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Article.
     * @param {ArticleUpsertArgs} args - Arguments to update or create a Article.
     * @example
     * // Update or create a Article
     * const article = await prisma.article.upsert({
     *   create: {
     *     // ... data to create a Article
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Article we want to update
     *   }
     * })
     */
    upsert<T extends ArticleUpsertArgs>(args: SelectSubset<T, ArticleUpsertArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCountArgs} args - Arguments to filter Articles to count.
     * @example
     * // Count the number of Articles
     * const count = await prisma.article.count({
     *   where: {
     *     // ... the filter for the Articles we want to count
     *   }
     * })
    **/
    count<T extends ArticleCountArgs>(
      args?: Subset<T, ArticleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ArticleAggregateArgs>(args: Subset<T, ArticleAggregateArgs>): Prisma.PrismaPromise<GetArticleAggregateType<T>>

    /**
     * Group by Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleGroupByArgs} args - Group by arguments.
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
      T extends ArticleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleGroupByArgs['orderBy'] }
        : { orderBy?: ArticleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Article model
   */
  readonly fields: ArticleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Article.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ArticleFilterMatch<T extends Article$ArticleFilterMatchArgs<ExtArgs> = {}>(args?: Subset<T, Article$ArticleFilterMatchArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleFilterMatchPayload<ExtArgs>, T, "findMany"> | Null>
    ArticleEnrichment<T extends Article$ArticleEnrichmentArgs<ExtArgs> = {}>(args?: Subset<T, Article$ArticleEnrichmentArgs<ExtArgs>>): Prisma__ArticleEnrichmentClient<$Result.GetResult<Prisma.$ArticleEnrichmentPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    ArticleEnrichmentStep<T extends Article$ArticleEnrichmentStepArgs<ExtArgs> = {}>(args?: Subset<T, Article$ArticleEnrichmentStepArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleEnrichmentStepPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Article model
   */ 
  interface ArticleFieldRefs {
    readonly id: FieldRef<"Article", 'Int'>
    readonly title: FieldRef<"Article", 'String'>
    readonly description: FieldRef<"Article", 'String'>
    readonly time: FieldRef<"Article", 'String'>
    readonly link: FieldRef<"Article", 'String'>
    readonly image: FieldRef<"Article", 'String'>
    readonly created_at: FieldRef<"Article", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Article findUnique
   */
  export type ArticleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findUniqueOrThrow
   */
  export type ArticleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findFirst
   */
  export type ArticleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findFirstOrThrow
   */
  export type ArticleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findMany
   */
  export type ArticleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Articles to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article create
   */
  export type ArticleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The data needed to create a Article.
     */
    data: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
  }

  /**
   * Article createMany
   */
  export type ArticleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Articles.
     */
    data: ArticleCreateManyInput | ArticleCreateManyInput[]
  }

  /**
   * Article createManyAndReturn
   */
  export type ArticleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Articles.
     */
    data: ArticleCreateManyInput | ArticleCreateManyInput[]
  }

  /**
   * Article update
   */
  export type ArticleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The data needed to update a Article.
     */
    data: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
    /**
     * Choose, which Article to update.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article updateMany
   */
  export type ArticleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Articles.
     */
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
    /**
     * Filter which Articles to update
     */
    where?: ArticleWhereInput
  }

  /**
   * Article upsert
   */
  export type ArticleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The filter to search for the Article to update in case it exists.
     */
    where: ArticleWhereUniqueInput
    /**
     * In case the Article found by the `where` argument doesn't exist, create a new Article with this data.
     */
    create: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
    /**
     * In case the Article was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
  }

  /**
   * Article delete
   */
  export type ArticleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter which Article to delete.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article deleteMany
   */
  export type ArticleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Articles to delete
     */
    where?: ArticleWhereInput
  }

  /**
   * Article.ArticleFilterMatch
   */
  export type Article$ArticleFilterMatchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFilterMatch
     */
    select?: ArticleFilterMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFilterMatchInclude<ExtArgs> | null
    where?: ArticleFilterMatchWhereInput
    orderBy?: ArticleFilterMatchOrderByWithRelationInput | ArticleFilterMatchOrderByWithRelationInput[]
    cursor?: ArticleFilterMatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleFilterMatchScalarFieldEnum | ArticleFilterMatchScalarFieldEnum[]
  }

  /**
   * Article.ArticleEnrichment
   */
  export type Article$ArticleEnrichmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichment
     */
    select?: ArticleEnrichmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentInclude<ExtArgs> | null
    where?: ArticleEnrichmentWhereInput
  }

  /**
   * Article.ArticleEnrichmentStep
   */
  export type Article$ArticleEnrichmentStepArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichmentStep
     */
    select?: ArticleEnrichmentStepSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentStepInclude<ExtArgs> | null
    where?: ArticleEnrichmentStepWhereInput
    orderBy?: ArticleEnrichmentStepOrderByWithRelationInput | ArticleEnrichmentStepOrderByWithRelationInput[]
    cursor?: ArticleEnrichmentStepWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleEnrichmentStepScalarFieldEnum | ArticleEnrichmentStepScalarFieldEnum[]
  }

  /**
   * Article without action
   */
  export type ArticleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
  }


  /**
   * Model Filter
   */

  export type AggregateFilter = {
    _count: FilterCountAggregateOutputType | null
    _avg: FilterAvgAggregateOutputType | null
    _sum: FilterSumAggregateOutputType | null
    _min: FilterMinAggregateOutputType | null
    _max: FilterMaxAggregateOutputType | null
  }

  export type FilterAvgAggregateOutputType = {
    id: number | null
    active: number | null
  }

  export type FilterSumAggregateOutputType = {
    id: number | null
    active: number | null
  }

  export type FilterMinAggregateOutputType = {
    id: number | null
    name: string | null
    type: string | null
    value: string | null
    active: number | null
    created_at: Date | null
  }

  export type FilterMaxAggregateOutputType = {
    id: number | null
    name: string | null
    type: string | null
    value: string | null
    active: number | null
    created_at: Date | null
  }

  export type FilterCountAggregateOutputType = {
    id: number
    name: number
    type: number
    value: number
    active: number
    created_at: number
    _all: number
  }


  export type FilterAvgAggregateInputType = {
    id?: true
    active?: true
  }

  export type FilterSumAggregateInputType = {
    id?: true
    active?: true
  }

  export type FilterMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    value?: true
    active?: true
    created_at?: true
  }

  export type FilterMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    value?: true
    active?: true
    created_at?: true
  }

  export type FilterCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    value?: true
    active?: true
    created_at?: true
    _all?: true
  }

  export type FilterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Filter to aggregate.
     */
    where?: FilterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Filters to fetch.
     */
    orderBy?: FilterOrderByWithRelationInput | FilterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FilterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Filters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Filters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Filters
    **/
    _count?: true | FilterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FilterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FilterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FilterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FilterMaxAggregateInputType
  }

  export type GetFilterAggregateType<T extends FilterAggregateArgs> = {
        [P in keyof T & keyof AggregateFilter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFilter[P]>
      : GetScalarType<T[P], AggregateFilter[P]>
  }




  export type FilterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FilterWhereInput
    orderBy?: FilterOrderByWithAggregationInput | FilterOrderByWithAggregationInput[]
    by: FilterScalarFieldEnum[] | FilterScalarFieldEnum
    having?: FilterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FilterCountAggregateInputType | true
    _avg?: FilterAvgAggregateInputType
    _sum?: FilterSumAggregateInputType
    _min?: FilterMinAggregateInputType
    _max?: FilterMaxAggregateInputType
  }

  export type FilterGroupByOutputType = {
    id: number
    name: string | null
    type: string
    value: string | null
    active: number
    created_at: Date
    _count: FilterCountAggregateOutputType | null
    _avg: FilterAvgAggregateOutputType | null
    _sum: FilterSumAggregateOutputType | null
    _min: FilterMinAggregateOutputType | null
    _max: FilterMaxAggregateOutputType | null
  }

  type GetFilterGroupByPayload<T extends FilterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FilterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FilterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FilterGroupByOutputType[P]>
            : GetScalarType<T[P], FilterGroupByOutputType[P]>
        }
      >
    >


  export type FilterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    value?: boolean
    active?: boolean
    created_at?: boolean
    ArticleFilterMatch?: boolean | Filter$ArticleFilterMatchArgs<ExtArgs>
    _count?: boolean | FilterCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["filter"]>

  export type FilterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    value?: boolean
    active?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["filter"]>

  export type FilterSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    value?: boolean
    active?: boolean
    created_at?: boolean
  }

  export type FilterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ArticleFilterMatch?: boolean | Filter$ArticleFilterMatchArgs<ExtArgs>
    _count?: boolean | FilterCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FilterIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FilterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Filter"
    objects: {
      ArticleFilterMatch: Prisma.$ArticleFilterMatchPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
      type: string
      value: string | null
      active: number
      created_at: Date
    }, ExtArgs["result"]["filter"]>
    composites: {}
  }

  type FilterGetPayload<S extends boolean | null | undefined | FilterDefaultArgs> = $Result.GetResult<Prisma.$FilterPayload, S>

  type FilterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FilterFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FilterCountAggregateInputType | true
    }

  export interface FilterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Filter'], meta: { name: 'Filter' } }
    /**
     * Find zero or one Filter that matches the filter.
     * @param {FilterFindUniqueArgs} args - Arguments to find a Filter
     * @example
     * // Get one Filter
     * const filter = await prisma.filter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FilterFindUniqueArgs>(args: SelectSubset<T, FilterFindUniqueArgs<ExtArgs>>): Prisma__FilterClient<$Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Filter that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FilterFindUniqueOrThrowArgs} args - Arguments to find a Filter
     * @example
     * // Get one Filter
     * const filter = await prisma.filter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FilterFindUniqueOrThrowArgs>(args: SelectSubset<T, FilterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FilterClient<$Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Filter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilterFindFirstArgs} args - Arguments to find a Filter
     * @example
     * // Get one Filter
     * const filter = await prisma.filter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FilterFindFirstArgs>(args?: SelectSubset<T, FilterFindFirstArgs<ExtArgs>>): Prisma__FilterClient<$Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Filter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilterFindFirstOrThrowArgs} args - Arguments to find a Filter
     * @example
     * // Get one Filter
     * const filter = await prisma.filter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FilterFindFirstOrThrowArgs>(args?: SelectSubset<T, FilterFindFirstOrThrowArgs<ExtArgs>>): Prisma__FilterClient<$Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Filters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Filters
     * const filters = await prisma.filter.findMany()
     * 
     * // Get first 10 Filters
     * const filters = await prisma.filter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const filterWithIdOnly = await prisma.filter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FilterFindManyArgs>(args?: SelectSubset<T, FilterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Filter.
     * @param {FilterCreateArgs} args - Arguments to create a Filter.
     * @example
     * // Create one Filter
     * const Filter = await prisma.filter.create({
     *   data: {
     *     // ... data to create a Filter
     *   }
     * })
     * 
     */
    create<T extends FilterCreateArgs>(args: SelectSubset<T, FilterCreateArgs<ExtArgs>>): Prisma__FilterClient<$Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Filters.
     * @param {FilterCreateManyArgs} args - Arguments to create many Filters.
     * @example
     * // Create many Filters
     * const filter = await prisma.filter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FilterCreateManyArgs>(args?: SelectSubset<T, FilterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Filters and returns the data saved in the database.
     * @param {FilterCreateManyAndReturnArgs} args - Arguments to create many Filters.
     * @example
     * // Create many Filters
     * const filter = await prisma.filter.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Filters and only return the `id`
     * const filterWithIdOnly = await prisma.filter.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FilterCreateManyAndReturnArgs>(args?: SelectSubset<T, FilterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Filter.
     * @param {FilterDeleteArgs} args - Arguments to delete one Filter.
     * @example
     * // Delete one Filter
     * const Filter = await prisma.filter.delete({
     *   where: {
     *     // ... filter to delete one Filter
     *   }
     * })
     * 
     */
    delete<T extends FilterDeleteArgs>(args: SelectSubset<T, FilterDeleteArgs<ExtArgs>>): Prisma__FilterClient<$Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Filter.
     * @param {FilterUpdateArgs} args - Arguments to update one Filter.
     * @example
     * // Update one Filter
     * const filter = await prisma.filter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FilterUpdateArgs>(args: SelectSubset<T, FilterUpdateArgs<ExtArgs>>): Prisma__FilterClient<$Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Filters.
     * @param {FilterDeleteManyArgs} args - Arguments to filter Filters to delete.
     * @example
     * // Delete a few Filters
     * const { count } = await prisma.filter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FilterDeleteManyArgs>(args?: SelectSubset<T, FilterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Filters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Filters
     * const filter = await prisma.filter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FilterUpdateManyArgs>(args: SelectSubset<T, FilterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Filter.
     * @param {FilterUpsertArgs} args - Arguments to update or create a Filter.
     * @example
     * // Update or create a Filter
     * const filter = await prisma.filter.upsert({
     *   create: {
     *     // ... data to create a Filter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Filter we want to update
     *   }
     * })
     */
    upsert<T extends FilterUpsertArgs>(args: SelectSubset<T, FilterUpsertArgs<ExtArgs>>): Prisma__FilterClient<$Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Filters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilterCountArgs} args - Arguments to filter Filters to count.
     * @example
     * // Count the number of Filters
     * const count = await prisma.filter.count({
     *   where: {
     *     // ... the filter for the Filters we want to count
     *   }
     * })
    **/
    count<T extends FilterCountArgs>(
      args?: Subset<T, FilterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FilterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FilterAggregateArgs>(args: Subset<T, FilterAggregateArgs>): Prisma.PrismaPromise<GetFilterAggregateType<T>>

    /**
     * Group by Filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilterGroupByArgs} args - Group by arguments.
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
      T extends FilterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FilterGroupByArgs['orderBy'] }
        : { orderBy?: FilterGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FilterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFilterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Filter model
   */
  readonly fields: FilterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Filter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FilterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ArticleFilterMatch<T extends Filter$ArticleFilterMatchArgs<ExtArgs> = {}>(args?: Subset<T, Filter$ArticleFilterMatchArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleFilterMatchPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Filter model
   */ 
  interface FilterFieldRefs {
    readonly id: FieldRef<"Filter", 'Int'>
    readonly name: FieldRef<"Filter", 'String'>
    readonly type: FieldRef<"Filter", 'String'>
    readonly value: FieldRef<"Filter", 'String'>
    readonly active: FieldRef<"Filter", 'Int'>
    readonly created_at: FieldRef<"Filter", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Filter findUnique
   */
  export type FilterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Filter
     */
    select?: FilterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FilterInclude<ExtArgs> | null
    /**
     * Filter, which Filter to fetch.
     */
    where: FilterWhereUniqueInput
  }

  /**
   * Filter findUniqueOrThrow
   */
  export type FilterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Filter
     */
    select?: FilterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FilterInclude<ExtArgs> | null
    /**
     * Filter, which Filter to fetch.
     */
    where: FilterWhereUniqueInput
  }

  /**
   * Filter findFirst
   */
  export type FilterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Filter
     */
    select?: FilterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FilterInclude<ExtArgs> | null
    /**
     * Filter, which Filter to fetch.
     */
    where?: FilterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Filters to fetch.
     */
    orderBy?: FilterOrderByWithRelationInput | FilterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Filters.
     */
    cursor?: FilterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Filters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Filters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Filters.
     */
    distinct?: FilterScalarFieldEnum | FilterScalarFieldEnum[]
  }

  /**
   * Filter findFirstOrThrow
   */
  export type FilterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Filter
     */
    select?: FilterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FilterInclude<ExtArgs> | null
    /**
     * Filter, which Filter to fetch.
     */
    where?: FilterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Filters to fetch.
     */
    orderBy?: FilterOrderByWithRelationInput | FilterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Filters.
     */
    cursor?: FilterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Filters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Filters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Filters.
     */
    distinct?: FilterScalarFieldEnum | FilterScalarFieldEnum[]
  }

  /**
   * Filter findMany
   */
  export type FilterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Filter
     */
    select?: FilterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FilterInclude<ExtArgs> | null
    /**
     * Filter, which Filters to fetch.
     */
    where?: FilterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Filters to fetch.
     */
    orderBy?: FilterOrderByWithRelationInput | FilterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Filters.
     */
    cursor?: FilterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Filters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Filters.
     */
    skip?: number
    distinct?: FilterScalarFieldEnum | FilterScalarFieldEnum[]
  }

  /**
   * Filter create
   */
  export type FilterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Filter
     */
    select?: FilterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FilterInclude<ExtArgs> | null
    /**
     * The data needed to create a Filter.
     */
    data: XOR<FilterCreateInput, FilterUncheckedCreateInput>
  }

  /**
   * Filter createMany
   */
  export type FilterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Filters.
     */
    data: FilterCreateManyInput | FilterCreateManyInput[]
  }

  /**
   * Filter createManyAndReturn
   */
  export type FilterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Filter
     */
    select?: FilterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Filters.
     */
    data: FilterCreateManyInput | FilterCreateManyInput[]
  }

  /**
   * Filter update
   */
  export type FilterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Filter
     */
    select?: FilterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FilterInclude<ExtArgs> | null
    /**
     * The data needed to update a Filter.
     */
    data: XOR<FilterUpdateInput, FilterUncheckedUpdateInput>
    /**
     * Choose, which Filter to update.
     */
    where: FilterWhereUniqueInput
  }

  /**
   * Filter updateMany
   */
  export type FilterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Filters.
     */
    data: XOR<FilterUpdateManyMutationInput, FilterUncheckedUpdateManyInput>
    /**
     * Filter which Filters to update
     */
    where?: FilterWhereInput
  }

  /**
   * Filter upsert
   */
  export type FilterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Filter
     */
    select?: FilterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FilterInclude<ExtArgs> | null
    /**
     * The filter to search for the Filter to update in case it exists.
     */
    where: FilterWhereUniqueInput
    /**
     * In case the Filter found by the `where` argument doesn't exist, create a new Filter with this data.
     */
    create: XOR<FilterCreateInput, FilterUncheckedCreateInput>
    /**
     * In case the Filter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FilterUpdateInput, FilterUncheckedUpdateInput>
  }

  /**
   * Filter delete
   */
  export type FilterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Filter
     */
    select?: FilterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FilterInclude<ExtArgs> | null
    /**
     * Filter which Filter to delete.
     */
    where: FilterWhereUniqueInput
  }

  /**
   * Filter deleteMany
   */
  export type FilterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Filters to delete
     */
    where?: FilterWhereInput
  }

  /**
   * Filter.ArticleFilterMatch
   */
  export type Filter$ArticleFilterMatchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFilterMatch
     */
    select?: ArticleFilterMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFilterMatchInclude<ExtArgs> | null
    where?: ArticleFilterMatchWhereInput
    orderBy?: ArticleFilterMatchOrderByWithRelationInput | ArticleFilterMatchOrderByWithRelationInput[]
    cursor?: ArticleFilterMatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleFilterMatchScalarFieldEnum | ArticleFilterMatchScalarFieldEnum[]
  }

  /**
   * Filter without action
   */
  export type FilterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Filter
     */
    select?: FilterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FilterInclude<ExtArgs> | null
  }


  /**
   * Model ArticleFilterMatch
   */

  export type AggregateArticleFilterMatch = {
    _count: ArticleFilterMatchCountAggregateOutputType | null
    _avg: ArticleFilterMatchAvgAggregateOutputType | null
    _sum: ArticleFilterMatchSumAggregateOutputType | null
    _min: ArticleFilterMatchMinAggregateOutputType | null
    _max: ArticleFilterMatchMaxAggregateOutputType | null
  }

  export type ArticleFilterMatchAvgAggregateOutputType = {
    id: number | null
    article_id: number | null
    filter_id: number | null
  }

  export type ArticleFilterMatchSumAggregateOutputType = {
    id: number | null
    article_id: number | null
    filter_id: number | null
  }

  export type ArticleFilterMatchMinAggregateOutputType = {
    id: number | null
    article_id: number | null
    filter_id: number | null
    matched_at: Date | null
  }

  export type ArticleFilterMatchMaxAggregateOutputType = {
    id: number | null
    article_id: number | null
    filter_id: number | null
    matched_at: Date | null
  }

  export type ArticleFilterMatchCountAggregateOutputType = {
    id: number
    article_id: number
    filter_id: number
    matched_at: number
    _all: number
  }


  export type ArticleFilterMatchAvgAggregateInputType = {
    id?: true
    article_id?: true
    filter_id?: true
  }

  export type ArticleFilterMatchSumAggregateInputType = {
    id?: true
    article_id?: true
    filter_id?: true
  }

  export type ArticleFilterMatchMinAggregateInputType = {
    id?: true
    article_id?: true
    filter_id?: true
    matched_at?: true
  }

  export type ArticleFilterMatchMaxAggregateInputType = {
    id?: true
    article_id?: true
    filter_id?: true
    matched_at?: true
  }

  export type ArticleFilterMatchCountAggregateInputType = {
    id?: true
    article_id?: true
    filter_id?: true
    matched_at?: true
    _all?: true
  }

  export type ArticleFilterMatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleFilterMatch to aggregate.
     */
    where?: ArticleFilterMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleFilterMatches to fetch.
     */
    orderBy?: ArticleFilterMatchOrderByWithRelationInput | ArticleFilterMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleFilterMatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleFilterMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleFilterMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArticleFilterMatches
    **/
    _count?: true | ArticleFilterMatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArticleFilterMatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArticleFilterMatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleFilterMatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleFilterMatchMaxAggregateInputType
  }

  export type GetArticleFilterMatchAggregateType<T extends ArticleFilterMatchAggregateArgs> = {
        [P in keyof T & keyof AggregateArticleFilterMatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticleFilterMatch[P]>
      : GetScalarType<T[P], AggregateArticleFilterMatch[P]>
  }




  export type ArticleFilterMatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleFilterMatchWhereInput
    orderBy?: ArticleFilterMatchOrderByWithAggregationInput | ArticleFilterMatchOrderByWithAggregationInput[]
    by: ArticleFilterMatchScalarFieldEnum[] | ArticleFilterMatchScalarFieldEnum
    having?: ArticleFilterMatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleFilterMatchCountAggregateInputType | true
    _avg?: ArticleFilterMatchAvgAggregateInputType
    _sum?: ArticleFilterMatchSumAggregateInputType
    _min?: ArticleFilterMatchMinAggregateInputType
    _max?: ArticleFilterMatchMaxAggregateInputType
  }

  export type ArticleFilterMatchGroupByOutputType = {
    id: number
    article_id: number
    filter_id: number
    matched_at: Date
    _count: ArticleFilterMatchCountAggregateOutputType | null
    _avg: ArticleFilterMatchAvgAggregateOutputType | null
    _sum: ArticleFilterMatchSumAggregateOutputType | null
    _min: ArticleFilterMatchMinAggregateOutputType | null
    _max: ArticleFilterMatchMaxAggregateOutputType | null
  }

  type GetArticleFilterMatchGroupByPayload<T extends ArticleFilterMatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleFilterMatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleFilterMatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleFilterMatchGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleFilterMatchGroupByOutputType[P]>
        }
      >
    >


  export type ArticleFilterMatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    article_id?: boolean
    filter_id?: boolean
    matched_at?: boolean
    Article?: boolean | ArticleDefaultArgs<ExtArgs>
    Filter?: boolean | FilterDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleFilterMatch"]>

  export type ArticleFilterMatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    article_id?: boolean
    filter_id?: boolean
    matched_at?: boolean
    Article?: boolean | ArticleDefaultArgs<ExtArgs>
    Filter?: boolean | FilterDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleFilterMatch"]>

  export type ArticleFilterMatchSelectScalar = {
    id?: boolean
    article_id?: boolean
    filter_id?: boolean
    matched_at?: boolean
  }

  export type ArticleFilterMatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Article?: boolean | ArticleDefaultArgs<ExtArgs>
    Filter?: boolean | FilterDefaultArgs<ExtArgs>
  }
  export type ArticleFilterMatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Article?: boolean | ArticleDefaultArgs<ExtArgs>
    Filter?: boolean | FilterDefaultArgs<ExtArgs>
  }

  export type $ArticleFilterMatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArticleFilterMatch"
    objects: {
      Article: Prisma.$ArticlePayload<ExtArgs>
      Filter: Prisma.$FilterPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      article_id: number
      filter_id: number
      matched_at: Date
    }, ExtArgs["result"]["articleFilterMatch"]>
    composites: {}
  }

  type ArticleFilterMatchGetPayload<S extends boolean | null | undefined | ArticleFilterMatchDefaultArgs> = $Result.GetResult<Prisma.$ArticleFilterMatchPayload, S>

  type ArticleFilterMatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ArticleFilterMatchFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ArticleFilterMatchCountAggregateInputType | true
    }

  export interface ArticleFilterMatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArticleFilterMatch'], meta: { name: 'ArticleFilterMatch' } }
    /**
     * Find zero or one ArticleFilterMatch that matches the filter.
     * @param {ArticleFilterMatchFindUniqueArgs} args - Arguments to find a ArticleFilterMatch
     * @example
     * // Get one ArticleFilterMatch
     * const articleFilterMatch = await prisma.articleFilterMatch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleFilterMatchFindUniqueArgs>(args: SelectSubset<T, ArticleFilterMatchFindUniqueArgs<ExtArgs>>): Prisma__ArticleFilterMatchClient<$Result.GetResult<Prisma.$ArticleFilterMatchPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ArticleFilterMatch that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ArticleFilterMatchFindUniqueOrThrowArgs} args - Arguments to find a ArticleFilterMatch
     * @example
     * // Get one ArticleFilterMatch
     * const articleFilterMatch = await prisma.articleFilterMatch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleFilterMatchFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleFilterMatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleFilterMatchClient<$Result.GetResult<Prisma.$ArticleFilterMatchPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ArticleFilterMatch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFilterMatchFindFirstArgs} args - Arguments to find a ArticleFilterMatch
     * @example
     * // Get one ArticleFilterMatch
     * const articleFilterMatch = await prisma.articleFilterMatch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleFilterMatchFindFirstArgs>(args?: SelectSubset<T, ArticleFilterMatchFindFirstArgs<ExtArgs>>): Prisma__ArticleFilterMatchClient<$Result.GetResult<Prisma.$ArticleFilterMatchPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ArticleFilterMatch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFilterMatchFindFirstOrThrowArgs} args - Arguments to find a ArticleFilterMatch
     * @example
     * // Get one ArticleFilterMatch
     * const articleFilterMatch = await prisma.articleFilterMatch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleFilterMatchFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleFilterMatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleFilterMatchClient<$Result.GetResult<Prisma.$ArticleFilterMatchPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ArticleFilterMatches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFilterMatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArticleFilterMatches
     * const articleFilterMatches = await prisma.articleFilterMatch.findMany()
     * 
     * // Get first 10 ArticleFilterMatches
     * const articleFilterMatches = await prisma.articleFilterMatch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const articleFilterMatchWithIdOnly = await prisma.articleFilterMatch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArticleFilterMatchFindManyArgs>(args?: SelectSubset<T, ArticleFilterMatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleFilterMatchPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ArticleFilterMatch.
     * @param {ArticleFilterMatchCreateArgs} args - Arguments to create a ArticleFilterMatch.
     * @example
     * // Create one ArticleFilterMatch
     * const ArticleFilterMatch = await prisma.articleFilterMatch.create({
     *   data: {
     *     // ... data to create a ArticleFilterMatch
     *   }
     * })
     * 
     */
    create<T extends ArticleFilterMatchCreateArgs>(args: SelectSubset<T, ArticleFilterMatchCreateArgs<ExtArgs>>): Prisma__ArticleFilterMatchClient<$Result.GetResult<Prisma.$ArticleFilterMatchPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ArticleFilterMatches.
     * @param {ArticleFilterMatchCreateManyArgs} args - Arguments to create many ArticleFilterMatches.
     * @example
     * // Create many ArticleFilterMatches
     * const articleFilterMatch = await prisma.articleFilterMatch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleFilterMatchCreateManyArgs>(args?: SelectSubset<T, ArticleFilterMatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ArticleFilterMatches and returns the data saved in the database.
     * @param {ArticleFilterMatchCreateManyAndReturnArgs} args - Arguments to create many ArticleFilterMatches.
     * @example
     * // Create many ArticleFilterMatches
     * const articleFilterMatch = await prisma.articleFilterMatch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ArticleFilterMatches and only return the `id`
     * const articleFilterMatchWithIdOnly = await prisma.articleFilterMatch.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArticleFilterMatchCreateManyAndReturnArgs>(args?: SelectSubset<T, ArticleFilterMatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleFilterMatchPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ArticleFilterMatch.
     * @param {ArticleFilterMatchDeleteArgs} args - Arguments to delete one ArticleFilterMatch.
     * @example
     * // Delete one ArticleFilterMatch
     * const ArticleFilterMatch = await prisma.articleFilterMatch.delete({
     *   where: {
     *     // ... filter to delete one ArticleFilterMatch
     *   }
     * })
     * 
     */
    delete<T extends ArticleFilterMatchDeleteArgs>(args: SelectSubset<T, ArticleFilterMatchDeleteArgs<ExtArgs>>): Prisma__ArticleFilterMatchClient<$Result.GetResult<Prisma.$ArticleFilterMatchPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ArticleFilterMatch.
     * @param {ArticleFilterMatchUpdateArgs} args - Arguments to update one ArticleFilterMatch.
     * @example
     * // Update one ArticleFilterMatch
     * const articleFilterMatch = await prisma.articleFilterMatch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleFilterMatchUpdateArgs>(args: SelectSubset<T, ArticleFilterMatchUpdateArgs<ExtArgs>>): Prisma__ArticleFilterMatchClient<$Result.GetResult<Prisma.$ArticleFilterMatchPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ArticleFilterMatches.
     * @param {ArticleFilterMatchDeleteManyArgs} args - Arguments to filter ArticleFilterMatches to delete.
     * @example
     * // Delete a few ArticleFilterMatches
     * const { count } = await prisma.articleFilterMatch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleFilterMatchDeleteManyArgs>(args?: SelectSubset<T, ArticleFilterMatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArticleFilterMatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFilterMatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArticleFilterMatches
     * const articleFilterMatch = await prisma.articleFilterMatch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleFilterMatchUpdateManyArgs>(args: SelectSubset<T, ArticleFilterMatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ArticleFilterMatch.
     * @param {ArticleFilterMatchUpsertArgs} args - Arguments to update or create a ArticleFilterMatch.
     * @example
     * // Update or create a ArticleFilterMatch
     * const articleFilterMatch = await prisma.articleFilterMatch.upsert({
     *   create: {
     *     // ... data to create a ArticleFilterMatch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArticleFilterMatch we want to update
     *   }
     * })
     */
    upsert<T extends ArticleFilterMatchUpsertArgs>(args: SelectSubset<T, ArticleFilterMatchUpsertArgs<ExtArgs>>): Prisma__ArticleFilterMatchClient<$Result.GetResult<Prisma.$ArticleFilterMatchPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ArticleFilterMatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFilterMatchCountArgs} args - Arguments to filter ArticleFilterMatches to count.
     * @example
     * // Count the number of ArticleFilterMatches
     * const count = await prisma.articleFilterMatch.count({
     *   where: {
     *     // ... the filter for the ArticleFilterMatches we want to count
     *   }
     * })
    **/
    count<T extends ArticleFilterMatchCountArgs>(
      args?: Subset<T, ArticleFilterMatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleFilterMatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArticleFilterMatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFilterMatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ArticleFilterMatchAggregateArgs>(args: Subset<T, ArticleFilterMatchAggregateArgs>): Prisma.PrismaPromise<GetArticleFilterMatchAggregateType<T>>

    /**
     * Group by ArticleFilterMatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFilterMatchGroupByArgs} args - Group by arguments.
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
      T extends ArticleFilterMatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleFilterMatchGroupByArgs['orderBy'] }
        : { orderBy?: ArticleFilterMatchGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ArticleFilterMatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleFilterMatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArticleFilterMatch model
   */
  readonly fields: ArticleFilterMatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArticleFilterMatch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleFilterMatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Article<T extends ArticleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArticleDefaultArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    Filter<T extends FilterDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FilterDefaultArgs<ExtArgs>>): Prisma__FilterClient<$Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ArticleFilterMatch model
   */ 
  interface ArticleFilterMatchFieldRefs {
    readonly id: FieldRef<"ArticleFilterMatch", 'Int'>
    readonly article_id: FieldRef<"ArticleFilterMatch", 'Int'>
    readonly filter_id: FieldRef<"ArticleFilterMatch", 'Int'>
    readonly matched_at: FieldRef<"ArticleFilterMatch", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ArticleFilterMatch findUnique
   */
  export type ArticleFilterMatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFilterMatch
     */
    select?: ArticleFilterMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFilterMatchInclude<ExtArgs> | null
    /**
     * Filter, which ArticleFilterMatch to fetch.
     */
    where: ArticleFilterMatchWhereUniqueInput
  }

  /**
   * ArticleFilterMatch findUniqueOrThrow
   */
  export type ArticleFilterMatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFilterMatch
     */
    select?: ArticleFilterMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFilterMatchInclude<ExtArgs> | null
    /**
     * Filter, which ArticleFilterMatch to fetch.
     */
    where: ArticleFilterMatchWhereUniqueInput
  }

  /**
   * ArticleFilterMatch findFirst
   */
  export type ArticleFilterMatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFilterMatch
     */
    select?: ArticleFilterMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFilterMatchInclude<ExtArgs> | null
    /**
     * Filter, which ArticleFilterMatch to fetch.
     */
    where?: ArticleFilterMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleFilterMatches to fetch.
     */
    orderBy?: ArticleFilterMatchOrderByWithRelationInput | ArticleFilterMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleFilterMatches.
     */
    cursor?: ArticleFilterMatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleFilterMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleFilterMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleFilterMatches.
     */
    distinct?: ArticleFilterMatchScalarFieldEnum | ArticleFilterMatchScalarFieldEnum[]
  }

  /**
   * ArticleFilterMatch findFirstOrThrow
   */
  export type ArticleFilterMatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFilterMatch
     */
    select?: ArticleFilterMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFilterMatchInclude<ExtArgs> | null
    /**
     * Filter, which ArticleFilterMatch to fetch.
     */
    where?: ArticleFilterMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleFilterMatches to fetch.
     */
    orderBy?: ArticleFilterMatchOrderByWithRelationInput | ArticleFilterMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleFilterMatches.
     */
    cursor?: ArticleFilterMatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleFilterMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleFilterMatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleFilterMatches.
     */
    distinct?: ArticleFilterMatchScalarFieldEnum | ArticleFilterMatchScalarFieldEnum[]
  }

  /**
   * ArticleFilterMatch findMany
   */
  export type ArticleFilterMatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFilterMatch
     */
    select?: ArticleFilterMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFilterMatchInclude<ExtArgs> | null
    /**
     * Filter, which ArticleFilterMatches to fetch.
     */
    where?: ArticleFilterMatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleFilterMatches to fetch.
     */
    orderBy?: ArticleFilterMatchOrderByWithRelationInput | ArticleFilterMatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArticleFilterMatches.
     */
    cursor?: ArticleFilterMatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleFilterMatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleFilterMatches.
     */
    skip?: number
    distinct?: ArticleFilterMatchScalarFieldEnum | ArticleFilterMatchScalarFieldEnum[]
  }

  /**
   * ArticleFilterMatch create
   */
  export type ArticleFilterMatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFilterMatch
     */
    select?: ArticleFilterMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFilterMatchInclude<ExtArgs> | null
    /**
     * The data needed to create a ArticleFilterMatch.
     */
    data: XOR<ArticleFilterMatchCreateInput, ArticleFilterMatchUncheckedCreateInput>
  }

  /**
   * ArticleFilterMatch createMany
   */
  export type ArticleFilterMatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArticleFilterMatches.
     */
    data: ArticleFilterMatchCreateManyInput | ArticleFilterMatchCreateManyInput[]
  }

  /**
   * ArticleFilterMatch createManyAndReturn
   */
  export type ArticleFilterMatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFilterMatch
     */
    select?: ArticleFilterMatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ArticleFilterMatches.
     */
    data: ArticleFilterMatchCreateManyInput | ArticleFilterMatchCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFilterMatchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArticleFilterMatch update
   */
  export type ArticleFilterMatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFilterMatch
     */
    select?: ArticleFilterMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFilterMatchInclude<ExtArgs> | null
    /**
     * The data needed to update a ArticleFilterMatch.
     */
    data: XOR<ArticleFilterMatchUpdateInput, ArticleFilterMatchUncheckedUpdateInput>
    /**
     * Choose, which ArticleFilterMatch to update.
     */
    where: ArticleFilterMatchWhereUniqueInput
  }

  /**
   * ArticleFilterMatch updateMany
   */
  export type ArticleFilterMatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArticleFilterMatches.
     */
    data: XOR<ArticleFilterMatchUpdateManyMutationInput, ArticleFilterMatchUncheckedUpdateManyInput>
    /**
     * Filter which ArticleFilterMatches to update
     */
    where?: ArticleFilterMatchWhereInput
  }

  /**
   * ArticleFilterMatch upsert
   */
  export type ArticleFilterMatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFilterMatch
     */
    select?: ArticleFilterMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFilterMatchInclude<ExtArgs> | null
    /**
     * The filter to search for the ArticleFilterMatch to update in case it exists.
     */
    where: ArticleFilterMatchWhereUniqueInput
    /**
     * In case the ArticleFilterMatch found by the `where` argument doesn't exist, create a new ArticleFilterMatch with this data.
     */
    create: XOR<ArticleFilterMatchCreateInput, ArticleFilterMatchUncheckedCreateInput>
    /**
     * In case the ArticleFilterMatch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleFilterMatchUpdateInput, ArticleFilterMatchUncheckedUpdateInput>
  }

  /**
   * ArticleFilterMatch delete
   */
  export type ArticleFilterMatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFilterMatch
     */
    select?: ArticleFilterMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFilterMatchInclude<ExtArgs> | null
    /**
     * Filter which ArticleFilterMatch to delete.
     */
    where: ArticleFilterMatchWhereUniqueInput
  }

  /**
   * ArticleFilterMatch deleteMany
   */
  export type ArticleFilterMatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleFilterMatches to delete
     */
    where?: ArticleFilterMatchWhereInput
  }

  /**
   * ArticleFilterMatch without action
   */
  export type ArticleFilterMatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFilterMatch
     */
    select?: ArticleFilterMatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFilterMatchInclude<ExtArgs> | null
  }


  /**
   * Model ArticleEnrichment
   */

  export type AggregateArticleEnrichment = {
    _count: ArticleEnrichmentCountAggregateOutputType | null
    _avg: ArticleEnrichmentAvgAggregateOutputType | null
    _sum: ArticleEnrichmentSumAggregateOutputType | null
    _min: ArticleEnrichmentMinAggregateOutputType | null
    _max: ArticleEnrichmentMaxAggregateOutputType | null
  }

  export type ArticleEnrichmentAvgAggregateOutputType = {
    article_id: number | null
    is_mna: number | null
  }

  export type ArticleEnrichmentSumAggregateOutputType = {
    article_id: number | null
    is_mna: number | null
  }

  export type ArticleEnrichmentMinAggregateOutputType = {
    article_id: number | null
    embedding: string | null
    is_mna: number | null
    acquiror: string | null
    seller: string | null
    target: string | null
    deal_value: string | null
    industry: string | null
    extra: string | null
    article_date: string | null
    location: string | null
    body: string | null
    transaction_type: string | null
    completed: string | null
    log: string | null
    summary: string | null
    sector: string | null
  }

  export type ArticleEnrichmentMaxAggregateOutputType = {
    article_id: number | null
    embedding: string | null
    is_mna: number | null
    acquiror: string | null
    seller: string | null
    target: string | null
    deal_value: string | null
    industry: string | null
    extra: string | null
    article_date: string | null
    location: string | null
    body: string | null
    transaction_type: string | null
    completed: string | null
    log: string | null
    summary: string | null
    sector: string | null
  }

  export type ArticleEnrichmentCountAggregateOutputType = {
    article_id: number
    embedding: number
    is_mna: number
    acquiror: number
    seller: number
    target: number
    deal_value: number
    industry: number
    extra: number
    article_date: number
    location: number
    body: number
    transaction_type: number
    completed: number
    log: number
    summary: number
    sector: number
    _all: number
  }


  export type ArticleEnrichmentAvgAggregateInputType = {
    article_id?: true
    is_mna?: true
  }

  export type ArticleEnrichmentSumAggregateInputType = {
    article_id?: true
    is_mna?: true
  }

  export type ArticleEnrichmentMinAggregateInputType = {
    article_id?: true
    embedding?: true
    is_mna?: true
    acquiror?: true
    seller?: true
    target?: true
    deal_value?: true
    industry?: true
    extra?: true
    article_date?: true
    location?: true
    body?: true
    transaction_type?: true
    completed?: true
    log?: true
    summary?: true
    sector?: true
  }

  export type ArticleEnrichmentMaxAggregateInputType = {
    article_id?: true
    embedding?: true
    is_mna?: true
    acquiror?: true
    seller?: true
    target?: true
    deal_value?: true
    industry?: true
    extra?: true
    article_date?: true
    location?: true
    body?: true
    transaction_type?: true
    completed?: true
    log?: true
    summary?: true
    sector?: true
  }

  export type ArticleEnrichmentCountAggregateInputType = {
    article_id?: true
    embedding?: true
    is_mna?: true
    acquiror?: true
    seller?: true
    target?: true
    deal_value?: true
    industry?: true
    extra?: true
    article_date?: true
    location?: true
    body?: true
    transaction_type?: true
    completed?: true
    log?: true
    summary?: true
    sector?: true
    _all?: true
  }

  export type ArticleEnrichmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleEnrichment to aggregate.
     */
    where?: ArticleEnrichmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleEnrichments to fetch.
     */
    orderBy?: ArticleEnrichmentOrderByWithRelationInput | ArticleEnrichmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleEnrichmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleEnrichments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleEnrichments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArticleEnrichments
    **/
    _count?: true | ArticleEnrichmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArticleEnrichmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArticleEnrichmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleEnrichmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleEnrichmentMaxAggregateInputType
  }

  export type GetArticleEnrichmentAggregateType<T extends ArticleEnrichmentAggregateArgs> = {
        [P in keyof T & keyof AggregateArticleEnrichment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticleEnrichment[P]>
      : GetScalarType<T[P], AggregateArticleEnrichment[P]>
  }




  export type ArticleEnrichmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleEnrichmentWhereInput
    orderBy?: ArticleEnrichmentOrderByWithAggregationInput | ArticleEnrichmentOrderByWithAggregationInput[]
    by: ArticleEnrichmentScalarFieldEnum[] | ArticleEnrichmentScalarFieldEnum
    having?: ArticleEnrichmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleEnrichmentCountAggregateInputType | true
    _avg?: ArticleEnrichmentAvgAggregateInputType
    _sum?: ArticleEnrichmentSumAggregateInputType
    _min?: ArticleEnrichmentMinAggregateInputType
    _max?: ArticleEnrichmentMaxAggregateInputType
  }

  export type ArticleEnrichmentGroupByOutputType = {
    article_id: number
    embedding: string | null
    is_mna: number | null
    acquiror: string | null
    seller: string | null
    target: string | null
    deal_value: string | null
    industry: string | null
    extra: string | null
    article_date: string | null
    location: string | null
    body: string | null
    transaction_type: string | null
    completed: string | null
    log: string | null
    summary: string | null
    sector: string | null
    _count: ArticleEnrichmentCountAggregateOutputType | null
    _avg: ArticleEnrichmentAvgAggregateOutputType | null
    _sum: ArticleEnrichmentSumAggregateOutputType | null
    _min: ArticleEnrichmentMinAggregateOutputType | null
    _max: ArticleEnrichmentMaxAggregateOutputType | null
  }

  type GetArticleEnrichmentGroupByPayload<T extends ArticleEnrichmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleEnrichmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleEnrichmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleEnrichmentGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleEnrichmentGroupByOutputType[P]>
        }
      >
    >


  export type ArticleEnrichmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    article_id?: boolean
    embedding?: boolean
    is_mna?: boolean
    acquiror?: boolean
    seller?: boolean
    target?: boolean
    deal_value?: boolean
    industry?: boolean
    extra?: boolean
    article_date?: boolean
    location?: boolean
    body?: boolean
    transaction_type?: boolean
    completed?: boolean
    log?: boolean
    summary?: boolean
    sector?: boolean
    Article?: boolean | ArticleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleEnrichment"]>

  export type ArticleEnrichmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    article_id?: boolean
    embedding?: boolean
    is_mna?: boolean
    acquiror?: boolean
    seller?: boolean
    target?: boolean
    deal_value?: boolean
    industry?: boolean
    extra?: boolean
    article_date?: boolean
    location?: boolean
    body?: boolean
    transaction_type?: boolean
    completed?: boolean
    log?: boolean
    summary?: boolean
    sector?: boolean
    Article?: boolean | ArticleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleEnrichment"]>

  export type ArticleEnrichmentSelectScalar = {
    article_id?: boolean
    embedding?: boolean
    is_mna?: boolean
    acquiror?: boolean
    seller?: boolean
    target?: boolean
    deal_value?: boolean
    industry?: boolean
    extra?: boolean
    article_date?: boolean
    location?: boolean
    body?: boolean
    transaction_type?: boolean
    completed?: boolean
    log?: boolean
    summary?: boolean
    sector?: boolean
  }

  export type ArticleEnrichmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Article?: boolean | ArticleDefaultArgs<ExtArgs>
  }
  export type ArticleEnrichmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Article?: boolean | ArticleDefaultArgs<ExtArgs>
  }

  export type $ArticleEnrichmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArticleEnrichment"
    objects: {
      Article: Prisma.$ArticlePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      article_id: number
      embedding: string | null
      is_mna: number | null
      acquiror: string | null
      seller: string | null
      target: string | null
      deal_value: string | null
      industry: string | null
      extra: string | null
      article_date: string | null
      location: string | null
      body: string | null
      transaction_type: string | null
      completed: string | null
      log: string | null
      summary: string | null
      sector: string | null
    }, ExtArgs["result"]["articleEnrichment"]>
    composites: {}
  }

  type ArticleEnrichmentGetPayload<S extends boolean | null | undefined | ArticleEnrichmentDefaultArgs> = $Result.GetResult<Prisma.$ArticleEnrichmentPayload, S>

  type ArticleEnrichmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ArticleEnrichmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ArticleEnrichmentCountAggregateInputType | true
    }

  export interface ArticleEnrichmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArticleEnrichment'], meta: { name: 'ArticleEnrichment' } }
    /**
     * Find zero or one ArticleEnrichment that matches the filter.
     * @param {ArticleEnrichmentFindUniqueArgs} args - Arguments to find a ArticleEnrichment
     * @example
     * // Get one ArticleEnrichment
     * const articleEnrichment = await prisma.articleEnrichment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleEnrichmentFindUniqueArgs>(args: SelectSubset<T, ArticleEnrichmentFindUniqueArgs<ExtArgs>>): Prisma__ArticleEnrichmentClient<$Result.GetResult<Prisma.$ArticleEnrichmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ArticleEnrichment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ArticleEnrichmentFindUniqueOrThrowArgs} args - Arguments to find a ArticleEnrichment
     * @example
     * // Get one ArticleEnrichment
     * const articleEnrichment = await prisma.articleEnrichment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleEnrichmentFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleEnrichmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleEnrichmentClient<$Result.GetResult<Prisma.$ArticleEnrichmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ArticleEnrichment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleEnrichmentFindFirstArgs} args - Arguments to find a ArticleEnrichment
     * @example
     * // Get one ArticleEnrichment
     * const articleEnrichment = await prisma.articleEnrichment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleEnrichmentFindFirstArgs>(args?: SelectSubset<T, ArticleEnrichmentFindFirstArgs<ExtArgs>>): Prisma__ArticleEnrichmentClient<$Result.GetResult<Prisma.$ArticleEnrichmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ArticleEnrichment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleEnrichmentFindFirstOrThrowArgs} args - Arguments to find a ArticleEnrichment
     * @example
     * // Get one ArticleEnrichment
     * const articleEnrichment = await prisma.articleEnrichment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleEnrichmentFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleEnrichmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleEnrichmentClient<$Result.GetResult<Prisma.$ArticleEnrichmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ArticleEnrichments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleEnrichmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArticleEnrichments
     * const articleEnrichments = await prisma.articleEnrichment.findMany()
     * 
     * // Get first 10 ArticleEnrichments
     * const articleEnrichments = await prisma.articleEnrichment.findMany({ take: 10 })
     * 
     * // Only select the `article_id`
     * const articleEnrichmentWithArticle_idOnly = await prisma.articleEnrichment.findMany({ select: { article_id: true } })
     * 
     */
    findMany<T extends ArticleEnrichmentFindManyArgs>(args?: SelectSubset<T, ArticleEnrichmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleEnrichmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ArticleEnrichment.
     * @param {ArticleEnrichmentCreateArgs} args - Arguments to create a ArticleEnrichment.
     * @example
     * // Create one ArticleEnrichment
     * const ArticleEnrichment = await prisma.articleEnrichment.create({
     *   data: {
     *     // ... data to create a ArticleEnrichment
     *   }
     * })
     * 
     */
    create<T extends ArticleEnrichmentCreateArgs>(args: SelectSubset<T, ArticleEnrichmentCreateArgs<ExtArgs>>): Prisma__ArticleEnrichmentClient<$Result.GetResult<Prisma.$ArticleEnrichmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ArticleEnrichments.
     * @param {ArticleEnrichmentCreateManyArgs} args - Arguments to create many ArticleEnrichments.
     * @example
     * // Create many ArticleEnrichments
     * const articleEnrichment = await prisma.articleEnrichment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleEnrichmentCreateManyArgs>(args?: SelectSubset<T, ArticleEnrichmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ArticleEnrichments and returns the data saved in the database.
     * @param {ArticleEnrichmentCreateManyAndReturnArgs} args - Arguments to create many ArticleEnrichments.
     * @example
     * // Create many ArticleEnrichments
     * const articleEnrichment = await prisma.articleEnrichment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ArticleEnrichments and only return the `article_id`
     * const articleEnrichmentWithArticle_idOnly = await prisma.articleEnrichment.createManyAndReturn({ 
     *   select: { article_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArticleEnrichmentCreateManyAndReturnArgs>(args?: SelectSubset<T, ArticleEnrichmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleEnrichmentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ArticleEnrichment.
     * @param {ArticleEnrichmentDeleteArgs} args - Arguments to delete one ArticleEnrichment.
     * @example
     * // Delete one ArticleEnrichment
     * const ArticleEnrichment = await prisma.articleEnrichment.delete({
     *   where: {
     *     // ... filter to delete one ArticleEnrichment
     *   }
     * })
     * 
     */
    delete<T extends ArticleEnrichmentDeleteArgs>(args: SelectSubset<T, ArticleEnrichmentDeleteArgs<ExtArgs>>): Prisma__ArticleEnrichmentClient<$Result.GetResult<Prisma.$ArticleEnrichmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ArticleEnrichment.
     * @param {ArticleEnrichmentUpdateArgs} args - Arguments to update one ArticleEnrichment.
     * @example
     * // Update one ArticleEnrichment
     * const articleEnrichment = await prisma.articleEnrichment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleEnrichmentUpdateArgs>(args: SelectSubset<T, ArticleEnrichmentUpdateArgs<ExtArgs>>): Prisma__ArticleEnrichmentClient<$Result.GetResult<Prisma.$ArticleEnrichmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ArticleEnrichments.
     * @param {ArticleEnrichmentDeleteManyArgs} args - Arguments to filter ArticleEnrichments to delete.
     * @example
     * // Delete a few ArticleEnrichments
     * const { count } = await prisma.articleEnrichment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleEnrichmentDeleteManyArgs>(args?: SelectSubset<T, ArticleEnrichmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArticleEnrichments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleEnrichmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArticleEnrichments
     * const articleEnrichment = await prisma.articleEnrichment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleEnrichmentUpdateManyArgs>(args: SelectSubset<T, ArticleEnrichmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ArticleEnrichment.
     * @param {ArticleEnrichmentUpsertArgs} args - Arguments to update or create a ArticleEnrichment.
     * @example
     * // Update or create a ArticleEnrichment
     * const articleEnrichment = await prisma.articleEnrichment.upsert({
     *   create: {
     *     // ... data to create a ArticleEnrichment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArticleEnrichment we want to update
     *   }
     * })
     */
    upsert<T extends ArticleEnrichmentUpsertArgs>(args: SelectSubset<T, ArticleEnrichmentUpsertArgs<ExtArgs>>): Prisma__ArticleEnrichmentClient<$Result.GetResult<Prisma.$ArticleEnrichmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ArticleEnrichments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleEnrichmentCountArgs} args - Arguments to filter ArticleEnrichments to count.
     * @example
     * // Count the number of ArticleEnrichments
     * const count = await prisma.articleEnrichment.count({
     *   where: {
     *     // ... the filter for the ArticleEnrichments we want to count
     *   }
     * })
    **/
    count<T extends ArticleEnrichmentCountArgs>(
      args?: Subset<T, ArticleEnrichmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleEnrichmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArticleEnrichment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleEnrichmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ArticleEnrichmentAggregateArgs>(args: Subset<T, ArticleEnrichmentAggregateArgs>): Prisma.PrismaPromise<GetArticleEnrichmentAggregateType<T>>

    /**
     * Group by ArticleEnrichment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleEnrichmentGroupByArgs} args - Group by arguments.
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
      T extends ArticleEnrichmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleEnrichmentGroupByArgs['orderBy'] }
        : { orderBy?: ArticleEnrichmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ArticleEnrichmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleEnrichmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArticleEnrichment model
   */
  readonly fields: ArticleEnrichmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArticleEnrichment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleEnrichmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Article<T extends ArticleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArticleDefaultArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ArticleEnrichment model
   */ 
  interface ArticleEnrichmentFieldRefs {
    readonly article_id: FieldRef<"ArticleEnrichment", 'Int'>
    readonly embedding: FieldRef<"ArticleEnrichment", 'String'>
    readonly is_mna: FieldRef<"ArticleEnrichment", 'Int'>
    readonly acquiror: FieldRef<"ArticleEnrichment", 'String'>
    readonly seller: FieldRef<"ArticleEnrichment", 'String'>
    readonly target: FieldRef<"ArticleEnrichment", 'String'>
    readonly deal_value: FieldRef<"ArticleEnrichment", 'String'>
    readonly industry: FieldRef<"ArticleEnrichment", 'String'>
    readonly extra: FieldRef<"ArticleEnrichment", 'String'>
    readonly article_date: FieldRef<"ArticleEnrichment", 'String'>
    readonly location: FieldRef<"ArticleEnrichment", 'String'>
    readonly body: FieldRef<"ArticleEnrichment", 'String'>
    readonly transaction_type: FieldRef<"ArticleEnrichment", 'String'>
    readonly completed: FieldRef<"ArticleEnrichment", 'String'>
    readonly log: FieldRef<"ArticleEnrichment", 'String'>
    readonly summary: FieldRef<"ArticleEnrichment", 'String'>
    readonly sector: FieldRef<"ArticleEnrichment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ArticleEnrichment findUnique
   */
  export type ArticleEnrichmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichment
     */
    select?: ArticleEnrichmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentInclude<ExtArgs> | null
    /**
     * Filter, which ArticleEnrichment to fetch.
     */
    where: ArticleEnrichmentWhereUniqueInput
  }

  /**
   * ArticleEnrichment findUniqueOrThrow
   */
  export type ArticleEnrichmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichment
     */
    select?: ArticleEnrichmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentInclude<ExtArgs> | null
    /**
     * Filter, which ArticleEnrichment to fetch.
     */
    where: ArticleEnrichmentWhereUniqueInput
  }

  /**
   * ArticleEnrichment findFirst
   */
  export type ArticleEnrichmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichment
     */
    select?: ArticleEnrichmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentInclude<ExtArgs> | null
    /**
     * Filter, which ArticleEnrichment to fetch.
     */
    where?: ArticleEnrichmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleEnrichments to fetch.
     */
    orderBy?: ArticleEnrichmentOrderByWithRelationInput | ArticleEnrichmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleEnrichments.
     */
    cursor?: ArticleEnrichmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleEnrichments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleEnrichments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleEnrichments.
     */
    distinct?: ArticleEnrichmentScalarFieldEnum | ArticleEnrichmentScalarFieldEnum[]
  }

  /**
   * ArticleEnrichment findFirstOrThrow
   */
  export type ArticleEnrichmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichment
     */
    select?: ArticleEnrichmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentInclude<ExtArgs> | null
    /**
     * Filter, which ArticleEnrichment to fetch.
     */
    where?: ArticleEnrichmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleEnrichments to fetch.
     */
    orderBy?: ArticleEnrichmentOrderByWithRelationInput | ArticleEnrichmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleEnrichments.
     */
    cursor?: ArticleEnrichmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleEnrichments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleEnrichments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleEnrichments.
     */
    distinct?: ArticleEnrichmentScalarFieldEnum | ArticleEnrichmentScalarFieldEnum[]
  }

  /**
   * ArticleEnrichment findMany
   */
  export type ArticleEnrichmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichment
     */
    select?: ArticleEnrichmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentInclude<ExtArgs> | null
    /**
     * Filter, which ArticleEnrichments to fetch.
     */
    where?: ArticleEnrichmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleEnrichments to fetch.
     */
    orderBy?: ArticleEnrichmentOrderByWithRelationInput | ArticleEnrichmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArticleEnrichments.
     */
    cursor?: ArticleEnrichmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleEnrichments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleEnrichments.
     */
    skip?: number
    distinct?: ArticleEnrichmentScalarFieldEnum | ArticleEnrichmentScalarFieldEnum[]
  }

  /**
   * ArticleEnrichment create
   */
  export type ArticleEnrichmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichment
     */
    select?: ArticleEnrichmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentInclude<ExtArgs> | null
    /**
     * The data needed to create a ArticleEnrichment.
     */
    data: XOR<ArticleEnrichmentCreateInput, ArticleEnrichmentUncheckedCreateInput>
  }

  /**
   * ArticleEnrichment createMany
   */
  export type ArticleEnrichmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArticleEnrichments.
     */
    data: ArticleEnrichmentCreateManyInput | ArticleEnrichmentCreateManyInput[]
  }

  /**
   * ArticleEnrichment createManyAndReturn
   */
  export type ArticleEnrichmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichment
     */
    select?: ArticleEnrichmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ArticleEnrichments.
     */
    data: ArticleEnrichmentCreateManyInput | ArticleEnrichmentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArticleEnrichment update
   */
  export type ArticleEnrichmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichment
     */
    select?: ArticleEnrichmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentInclude<ExtArgs> | null
    /**
     * The data needed to update a ArticleEnrichment.
     */
    data: XOR<ArticleEnrichmentUpdateInput, ArticleEnrichmentUncheckedUpdateInput>
    /**
     * Choose, which ArticleEnrichment to update.
     */
    where: ArticleEnrichmentWhereUniqueInput
  }

  /**
   * ArticleEnrichment updateMany
   */
  export type ArticleEnrichmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArticleEnrichments.
     */
    data: XOR<ArticleEnrichmentUpdateManyMutationInput, ArticleEnrichmentUncheckedUpdateManyInput>
    /**
     * Filter which ArticleEnrichments to update
     */
    where?: ArticleEnrichmentWhereInput
  }

  /**
   * ArticleEnrichment upsert
   */
  export type ArticleEnrichmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichment
     */
    select?: ArticleEnrichmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentInclude<ExtArgs> | null
    /**
     * The filter to search for the ArticleEnrichment to update in case it exists.
     */
    where: ArticleEnrichmentWhereUniqueInput
    /**
     * In case the ArticleEnrichment found by the `where` argument doesn't exist, create a new ArticleEnrichment with this data.
     */
    create: XOR<ArticleEnrichmentCreateInput, ArticleEnrichmentUncheckedCreateInput>
    /**
     * In case the ArticleEnrichment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleEnrichmentUpdateInput, ArticleEnrichmentUncheckedUpdateInput>
  }

  /**
   * ArticleEnrichment delete
   */
  export type ArticleEnrichmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichment
     */
    select?: ArticleEnrichmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentInclude<ExtArgs> | null
    /**
     * Filter which ArticleEnrichment to delete.
     */
    where: ArticleEnrichmentWhereUniqueInput
  }

  /**
   * ArticleEnrichment deleteMany
   */
  export type ArticleEnrichmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleEnrichments to delete
     */
    where?: ArticleEnrichmentWhereInput
  }

  /**
   * ArticleEnrichment without action
   */
  export type ArticleEnrichmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichment
     */
    select?: ArticleEnrichmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentInclude<ExtArgs> | null
  }


  /**
   * Model ArticleEnrichmentStep
   */

  export type AggregateArticleEnrichmentStep = {
    _count: ArticleEnrichmentStepCountAggregateOutputType | null
    _avg: ArticleEnrichmentStepAvgAggregateOutputType | null
    _sum: ArticleEnrichmentStepSumAggregateOutputType | null
    _min: ArticleEnrichmentStepMinAggregateOutputType | null
    _max: ArticleEnrichmentStepMaxAggregateOutputType | null
  }

  export type ArticleEnrichmentStepAvgAggregateOutputType = {
    article_id: number | null
  }

  export type ArticleEnrichmentStepSumAggregateOutputType = {
    article_id: number | null
  }

  export type ArticleEnrichmentStepMinAggregateOutputType = {
    article_id: number | null
    step_name: string | null
    completed_at: Date | null
  }

  export type ArticleEnrichmentStepMaxAggregateOutputType = {
    article_id: number | null
    step_name: string | null
    completed_at: Date | null
  }

  export type ArticleEnrichmentStepCountAggregateOutputType = {
    article_id: number
    step_name: number
    completed_at: number
    _all: number
  }


  export type ArticleEnrichmentStepAvgAggregateInputType = {
    article_id?: true
  }

  export type ArticleEnrichmentStepSumAggregateInputType = {
    article_id?: true
  }

  export type ArticleEnrichmentStepMinAggregateInputType = {
    article_id?: true
    step_name?: true
    completed_at?: true
  }

  export type ArticleEnrichmentStepMaxAggregateInputType = {
    article_id?: true
    step_name?: true
    completed_at?: true
  }

  export type ArticleEnrichmentStepCountAggregateInputType = {
    article_id?: true
    step_name?: true
    completed_at?: true
    _all?: true
  }

  export type ArticleEnrichmentStepAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleEnrichmentStep to aggregate.
     */
    where?: ArticleEnrichmentStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleEnrichmentSteps to fetch.
     */
    orderBy?: ArticleEnrichmentStepOrderByWithRelationInput | ArticleEnrichmentStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleEnrichmentStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleEnrichmentSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleEnrichmentSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArticleEnrichmentSteps
    **/
    _count?: true | ArticleEnrichmentStepCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArticleEnrichmentStepAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArticleEnrichmentStepSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleEnrichmentStepMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleEnrichmentStepMaxAggregateInputType
  }

  export type GetArticleEnrichmentStepAggregateType<T extends ArticleEnrichmentStepAggregateArgs> = {
        [P in keyof T & keyof AggregateArticleEnrichmentStep]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticleEnrichmentStep[P]>
      : GetScalarType<T[P], AggregateArticleEnrichmentStep[P]>
  }




  export type ArticleEnrichmentStepGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleEnrichmentStepWhereInput
    orderBy?: ArticleEnrichmentStepOrderByWithAggregationInput | ArticleEnrichmentStepOrderByWithAggregationInput[]
    by: ArticleEnrichmentStepScalarFieldEnum[] | ArticleEnrichmentStepScalarFieldEnum
    having?: ArticleEnrichmentStepScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleEnrichmentStepCountAggregateInputType | true
    _avg?: ArticleEnrichmentStepAvgAggregateInputType
    _sum?: ArticleEnrichmentStepSumAggregateInputType
    _min?: ArticleEnrichmentStepMinAggregateInputType
    _max?: ArticleEnrichmentStepMaxAggregateInputType
  }

  export type ArticleEnrichmentStepGroupByOutputType = {
    article_id: number
    step_name: string
    completed_at: Date
    _count: ArticleEnrichmentStepCountAggregateOutputType | null
    _avg: ArticleEnrichmentStepAvgAggregateOutputType | null
    _sum: ArticleEnrichmentStepSumAggregateOutputType | null
    _min: ArticleEnrichmentStepMinAggregateOutputType | null
    _max: ArticleEnrichmentStepMaxAggregateOutputType | null
  }

  type GetArticleEnrichmentStepGroupByPayload<T extends ArticleEnrichmentStepGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleEnrichmentStepGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleEnrichmentStepGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleEnrichmentStepGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleEnrichmentStepGroupByOutputType[P]>
        }
      >
    >


  export type ArticleEnrichmentStepSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    article_id?: boolean
    step_name?: boolean
    completed_at?: boolean
    Article?: boolean | ArticleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleEnrichmentStep"]>

  export type ArticleEnrichmentStepSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    article_id?: boolean
    step_name?: boolean
    completed_at?: boolean
    Article?: boolean | ArticleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleEnrichmentStep"]>

  export type ArticleEnrichmentStepSelectScalar = {
    article_id?: boolean
    step_name?: boolean
    completed_at?: boolean
  }

  export type ArticleEnrichmentStepInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Article?: boolean | ArticleDefaultArgs<ExtArgs>
  }
  export type ArticleEnrichmentStepIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Article?: boolean | ArticleDefaultArgs<ExtArgs>
  }

  export type $ArticleEnrichmentStepPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArticleEnrichmentStep"
    objects: {
      Article: Prisma.$ArticlePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      article_id: number
      step_name: string
      completed_at: Date
    }, ExtArgs["result"]["articleEnrichmentStep"]>
    composites: {}
  }

  type ArticleEnrichmentStepGetPayload<S extends boolean | null | undefined | ArticleEnrichmentStepDefaultArgs> = $Result.GetResult<Prisma.$ArticleEnrichmentStepPayload, S>

  type ArticleEnrichmentStepCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ArticleEnrichmentStepFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ArticleEnrichmentStepCountAggregateInputType | true
    }

  export interface ArticleEnrichmentStepDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArticleEnrichmentStep'], meta: { name: 'ArticleEnrichmentStep' } }
    /**
     * Find zero or one ArticleEnrichmentStep that matches the filter.
     * @param {ArticleEnrichmentStepFindUniqueArgs} args - Arguments to find a ArticleEnrichmentStep
     * @example
     * // Get one ArticleEnrichmentStep
     * const articleEnrichmentStep = await prisma.articleEnrichmentStep.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleEnrichmentStepFindUniqueArgs>(args: SelectSubset<T, ArticleEnrichmentStepFindUniqueArgs<ExtArgs>>): Prisma__ArticleEnrichmentStepClient<$Result.GetResult<Prisma.$ArticleEnrichmentStepPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ArticleEnrichmentStep that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ArticleEnrichmentStepFindUniqueOrThrowArgs} args - Arguments to find a ArticleEnrichmentStep
     * @example
     * // Get one ArticleEnrichmentStep
     * const articleEnrichmentStep = await prisma.articleEnrichmentStep.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleEnrichmentStepFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleEnrichmentStepFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleEnrichmentStepClient<$Result.GetResult<Prisma.$ArticleEnrichmentStepPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ArticleEnrichmentStep that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleEnrichmentStepFindFirstArgs} args - Arguments to find a ArticleEnrichmentStep
     * @example
     * // Get one ArticleEnrichmentStep
     * const articleEnrichmentStep = await prisma.articleEnrichmentStep.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleEnrichmentStepFindFirstArgs>(args?: SelectSubset<T, ArticleEnrichmentStepFindFirstArgs<ExtArgs>>): Prisma__ArticleEnrichmentStepClient<$Result.GetResult<Prisma.$ArticleEnrichmentStepPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ArticleEnrichmentStep that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleEnrichmentStepFindFirstOrThrowArgs} args - Arguments to find a ArticleEnrichmentStep
     * @example
     * // Get one ArticleEnrichmentStep
     * const articleEnrichmentStep = await prisma.articleEnrichmentStep.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleEnrichmentStepFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleEnrichmentStepFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleEnrichmentStepClient<$Result.GetResult<Prisma.$ArticleEnrichmentStepPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ArticleEnrichmentSteps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleEnrichmentStepFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArticleEnrichmentSteps
     * const articleEnrichmentSteps = await prisma.articleEnrichmentStep.findMany()
     * 
     * // Get first 10 ArticleEnrichmentSteps
     * const articleEnrichmentSteps = await prisma.articleEnrichmentStep.findMany({ take: 10 })
     * 
     * // Only select the `article_id`
     * const articleEnrichmentStepWithArticle_idOnly = await prisma.articleEnrichmentStep.findMany({ select: { article_id: true } })
     * 
     */
    findMany<T extends ArticleEnrichmentStepFindManyArgs>(args?: SelectSubset<T, ArticleEnrichmentStepFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleEnrichmentStepPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ArticleEnrichmentStep.
     * @param {ArticleEnrichmentStepCreateArgs} args - Arguments to create a ArticleEnrichmentStep.
     * @example
     * // Create one ArticleEnrichmentStep
     * const ArticleEnrichmentStep = await prisma.articleEnrichmentStep.create({
     *   data: {
     *     // ... data to create a ArticleEnrichmentStep
     *   }
     * })
     * 
     */
    create<T extends ArticleEnrichmentStepCreateArgs>(args: SelectSubset<T, ArticleEnrichmentStepCreateArgs<ExtArgs>>): Prisma__ArticleEnrichmentStepClient<$Result.GetResult<Prisma.$ArticleEnrichmentStepPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ArticleEnrichmentSteps.
     * @param {ArticleEnrichmentStepCreateManyArgs} args - Arguments to create many ArticleEnrichmentSteps.
     * @example
     * // Create many ArticleEnrichmentSteps
     * const articleEnrichmentStep = await prisma.articleEnrichmentStep.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleEnrichmentStepCreateManyArgs>(args?: SelectSubset<T, ArticleEnrichmentStepCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ArticleEnrichmentSteps and returns the data saved in the database.
     * @param {ArticleEnrichmentStepCreateManyAndReturnArgs} args - Arguments to create many ArticleEnrichmentSteps.
     * @example
     * // Create many ArticleEnrichmentSteps
     * const articleEnrichmentStep = await prisma.articleEnrichmentStep.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ArticleEnrichmentSteps and only return the `article_id`
     * const articleEnrichmentStepWithArticle_idOnly = await prisma.articleEnrichmentStep.createManyAndReturn({ 
     *   select: { article_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArticleEnrichmentStepCreateManyAndReturnArgs>(args?: SelectSubset<T, ArticleEnrichmentStepCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleEnrichmentStepPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ArticleEnrichmentStep.
     * @param {ArticleEnrichmentStepDeleteArgs} args - Arguments to delete one ArticleEnrichmentStep.
     * @example
     * // Delete one ArticleEnrichmentStep
     * const ArticleEnrichmentStep = await prisma.articleEnrichmentStep.delete({
     *   where: {
     *     // ... filter to delete one ArticleEnrichmentStep
     *   }
     * })
     * 
     */
    delete<T extends ArticleEnrichmentStepDeleteArgs>(args: SelectSubset<T, ArticleEnrichmentStepDeleteArgs<ExtArgs>>): Prisma__ArticleEnrichmentStepClient<$Result.GetResult<Prisma.$ArticleEnrichmentStepPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ArticleEnrichmentStep.
     * @param {ArticleEnrichmentStepUpdateArgs} args - Arguments to update one ArticleEnrichmentStep.
     * @example
     * // Update one ArticleEnrichmentStep
     * const articleEnrichmentStep = await prisma.articleEnrichmentStep.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleEnrichmentStepUpdateArgs>(args: SelectSubset<T, ArticleEnrichmentStepUpdateArgs<ExtArgs>>): Prisma__ArticleEnrichmentStepClient<$Result.GetResult<Prisma.$ArticleEnrichmentStepPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ArticleEnrichmentSteps.
     * @param {ArticleEnrichmentStepDeleteManyArgs} args - Arguments to filter ArticleEnrichmentSteps to delete.
     * @example
     * // Delete a few ArticleEnrichmentSteps
     * const { count } = await prisma.articleEnrichmentStep.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleEnrichmentStepDeleteManyArgs>(args?: SelectSubset<T, ArticleEnrichmentStepDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArticleEnrichmentSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleEnrichmentStepUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArticleEnrichmentSteps
     * const articleEnrichmentStep = await prisma.articleEnrichmentStep.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleEnrichmentStepUpdateManyArgs>(args: SelectSubset<T, ArticleEnrichmentStepUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ArticleEnrichmentStep.
     * @param {ArticleEnrichmentStepUpsertArgs} args - Arguments to update or create a ArticleEnrichmentStep.
     * @example
     * // Update or create a ArticleEnrichmentStep
     * const articleEnrichmentStep = await prisma.articleEnrichmentStep.upsert({
     *   create: {
     *     // ... data to create a ArticleEnrichmentStep
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArticleEnrichmentStep we want to update
     *   }
     * })
     */
    upsert<T extends ArticleEnrichmentStepUpsertArgs>(args: SelectSubset<T, ArticleEnrichmentStepUpsertArgs<ExtArgs>>): Prisma__ArticleEnrichmentStepClient<$Result.GetResult<Prisma.$ArticleEnrichmentStepPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ArticleEnrichmentSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleEnrichmentStepCountArgs} args - Arguments to filter ArticleEnrichmentSteps to count.
     * @example
     * // Count the number of ArticleEnrichmentSteps
     * const count = await prisma.articleEnrichmentStep.count({
     *   where: {
     *     // ... the filter for the ArticleEnrichmentSteps we want to count
     *   }
     * })
    **/
    count<T extends ArticleEnrichmentStepCountArgs>(
      args?: Subset<T, ArticleEnrichmentStepCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleEnrichmentStepCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArticleEnrichmentStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleEnrichmentStepAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ArticleEnrichmentStepAggregateArgs>(args: Subset<T, ArticleEnrichmentStepAggregateArgs>): Prisma.PrismaPromise<GetArticleEnrichmentStepAggregateType<T>>

    /**
     * Group by ArticleEnrichmentStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleEnrichmentStepGroupByArgs} args - Group by arguments.
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
      T extends ArticleEnrichmentStepGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleEnrichmentStepGroupByArgs['orderBy'] }
        : { orderBy?: ArticleEnrichmentStepGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ArticleEnrichmentStepGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleEnrichmentStepGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArticleEnrichmentStep model
   */
  readonly fields: ArticleEnrichmentStepFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArticleEnrichmentStep.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleEnrichmentStepClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Article<T extends ArticleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArticleDefaultArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ArticleEnrichmentStep model
   */ 
  interface ArticleEnrichmentStepFieldRefs {
    readonly article_id: FieldRef<"ArticleEnrichmentStep", 'Int'>
    readonly step_name: FieldRef<"ArticleEnrichmentStep", 'String'>
    readonly completed_at: FieldRef<"ArticleEnrichmentStep", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ArticleEnrichmentStep findUnique
   */
  export type ArticleEnrichmentStepFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichmentStep
     */
    select?: ArticleEnrichmentStepSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentStepInclude<ExtArgs> | null
    /**
     * Filter, which ArticleEnrichmentStep to fetch.
     */
    where: ArticleEnrichmentStepWhereUniqueInput
  }

  /**
   * ArticleEnrichmentStep findUniqueOrThrow
   */
  export type ArticleEnrichmentStepFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichmentStep
     */
    select?: ArticleEnrichmentStepSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentStepInclude<ExtArgs> | null
    /**
     * Filter, which ArticleEnrichmentStep to fetch.
     */
    where: ArticleEnrichmentStepWhereUniqueInput
  }

  /**
   * ArticleEnrichmentStep findFirst
   */
  export type ArticleEnrichmentStepFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichmentStep
     */
    select?: ArticleEnrichmentStepSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentStepInclude<ExtArgs> | null
    /**
     * Filter, which ArticleEnrichmentStep to fetch.
     */
    where?: ArticleEnrichmentStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleEnrichmentSteps to fetch.
     */
    orderBy?: ArticleEnrichmentStepOrderByWithRelationInput | ArticleEnrichmentStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleEnrichmentSteps.
     */
    cursor?: ArticleEnrichmentStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleEnrichmentSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleEnrichmentSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleEnrichmentSteps.
     */
    distinct?: ArticleEnrichmentStepScalarFieldEnum | ArticleEnrichmentStepScalarFieldEnum[]
  }

  /**
   * ArticleEnrichmentStep findFirstOrThrow
   */
  export type ArticleEnrichmentStepFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichmentStep
     */
    select?: ArticleEnrichmentStepSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentStepInclude<ExtArgs> | null
    /**
     * Filter, which ArticleEnrichmentStep to fetch.
     */
    where?: ArticleEnrichmentStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleEnrichmentSteps to fetch.
     */
    orderBy?: ArticleEnrichmentStepOrderByWithRelationInput | ArticleEnrichmentStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleEnrichmentSteps.
     */
    cursor?: ArticleEnrichmentStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleEnrichmentSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleEnrichmentSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleEnrichmentSteps.
     */
    distinct?: ArticleEnrichmentStepScalarFieldEnum | ArticleEnrichmentStepScalarFieldEnum[]
  }

  /**
   * ArticleEnrichmentStep findMany
   */
  export type ArticleEnrichmentStepFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichmentStep
     */
    select?: ArticleEnrichmentStepSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentStepInclude<ExtArgs> | null
    /**
     * Filter, which ArticleEnrichmentSteps to fetch.
     */
    where?: ArticleEnrichmentStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleEnrichmentSteps to fetch.
     */
    orderBy?: ArticleEnrichmentStepOrderByWithRelationInput | ArticleEnrichmentStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArticleEnrichmentSteps.
     */
    cursor?: ArticleEnrichmentStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleEnrichmentSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleEnrichmentSteps.
     */
    skip?: number
    distinct?: ArticleEnrichmentStepScalarFieldEnum | ArticleEnrichmentStepScalarFieldEnum[]
  }

  /**
   * ArticleEnrichmentStep create
   */
  export type ArticleEnrichmentStepCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichmentStep
     */
    select?: ArticleEnrichmentStepSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentStepInclude<ExtArgs> | null
    /**
     * The data needed to create a ArticleEnrichmentStep.
     */
    data: XOR<ArticleEnrichmentStepCreateInput, ArticleEnrichmentStepUncheckedCreateInput>
  }

  /**
   * ArticleEnrichmentStep createMany
   */
  export type ArticleEnrichmentStepCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArticleEnrichmentSteps.
     */
    data: ArticleEnrichmentStepCreateManyInput | ArticleEnrichmentStepCreateManyInput[]
  }

  /**
   * ArticleEnrichmentStep createManyAndReturn
   */
  export type ArticleEnrichmentStepCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichmentStep
     */
    select?: ArticleEnrichmentStepSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ArticleEnrichmentSteps.
     */
    data: ArticleEnrichmentStepCreateManyInput | ArticleEnrichmentStepCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentStepIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArticleEnrichmentStep update
   */
  export type ArticleEnrichmentStepUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichmentStep
     */
    select?: ArticleEnrichmentStepSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentStepInclude<ExtArgs> | null
    /**
     * The data needed to update a ArticleEnrichmentStep.
     */
    data: XOR<ArticleEnrichmentStepUpdateInput, ArticleEnrichmentStepUncheckedUpdateInput>
    /**
     * Choose, which ArticleEnrichmentStep to update.
     */
    where: ArticleEnrichmentStepWhereUniqueInput
  }

  /**
   * ArticleEnrichmentStep updateMany
   */
  export type ArticleEnrichmentStepUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArticleEnrichmentSteps.
     */
    data: XOR<ArticleEnrichmentStepUpdateManyMutationInput, ArticleEnrichmentStepUncheckedUpdateManyInput>
    /**
     * Filter which ArticleEnrichmentSteps to update
     */
    where?: ArticleEnrichmentStepWhereInput
  }

  /**
   * ArticleEnrichmentStep upsert
   */
  export type ArticleEnrichmentStepUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichmentStep
     */
    select?: ArticleEnrichmentStepSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentStepInclude<ExtArgs> | null
    /**
     * The filter to search for the ArticleEnrichmentStep to update in case it exists.
     */
    where: ArticleEnrichmentStepWhereUniqueInput
    /**
     * In case the ArticleEnrichmentStep found by the `where` argument doesn't exist, create a new ArticleEnrichmentStep with this data.
     */
    create: XOR<ArticleEnrichmentStepCreateInput, ArticleEnrichmentStepUncheckedCreateInput>
    /**
     * In case the ArticleEnrichmentStep was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleEnrichmentStepUpdateInput, ArticleEnrichmentStepUncheckedUpdateInput>
  }

  /**
   * ArticleEnrichmentStep delete
   */
  export type ArticleEnrichmentStepDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichmentStep
     */
    select?: ArticleEnrichmentStepSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentStepInclude<ExtArgs> | null
    /**
     * Filter which ArticleEnrichmentStep to delete.
     */
    where: ArticleEnrichmentStepWhereUniqueInput
  }

  /**
   * ArticleEnrichmentStep deleteMany
   */
  export type ArticleEnrichmentStepDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleEnrichmentSteps to delete
     */
    where?: ArticleEnrichmentStepWhereInput
  }

  /**
   * ArticleEnrichmentStep without action
   */
  export type ArticleEnrichmentStepDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleEnrichmentStep
     */
    select?: ArticleEnrichmentStepSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleEnrichmentStepInclude<ExtArgs> | null
  }


  /**
   * Model Prompt
   */

  export type AggregatePrompt = {
    _count: PromptCountAggregateOutputType | null
    _min: PromptMinAggregateOutputType | null
    _max: PromptMaxAggregateOutputType | null
  }

  export type PromptMinAggregateOutputType = {
    name: string | null
    template: string | null
  }

  export type PromptMaxAggregateOutputType = {
    name: string | null
    template: string | null
  }

  export type PromptCountAggregateOutputType = {
    name: number
    template: number
    _all: number
  }


  export type PromptMinAggregateInputType = {
    name?: true
    template?: true
  }

  export type PromptMaxAggregateInputType = {
    name?: true
    template?: true
  }

  export type PromptCountAggregateInputType = {
    name?: true
    template?: true
    _all?: true
  }

  export type PromptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prompt to aggregate.
     */
    where?: PromptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prompts to fetch.
     */
    orderBy?: PromptOrderByWithRelationInput | PromptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PromptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prompts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prompts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Prompts
    **/
    _count?: true | PromptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PromptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PromptMaxAggregateInputType
  }

  export type GetPromptAggregateType<T extends PromptAggregateArgs> = {
        [P in keyof T & keyof AggregatePrompt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrompt[P]>
      : GetScalarType<T[P], AggregatePrompt[P]>
  }




  export type PromptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromptWhereInput
    orderBy?: PromptOrderByWithAggregationInput | PromptOrderByWithAggregationInput[]
    by: PromptScalarFieldEnum[] | PromptScalarFieldEnum
    having?: PromptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PromptCountAggregateInputType | true
    _min?: PromptMinAggregateInputType
    _max?: PromptMaxAggregateInputType
  }

  export type PromptGroupByOutputType = {
    name: string
    template: string
    _count: PromptCountAggregateOutputType | null
    _min: PromptMinAggregateOutputType | null
    _max: PromptMaxAggregateOutputType | null
  }

  type GetPromptGroupByPayload<T extends PromptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PromptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PromptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PromptGroupByOutputType[P]>
            : GetScalarType<T[P], PromptGroupByOutputType[P]>
        }
      >
    >


  export type PromptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
    template?: boolean
  }, ExtArgs["result"]["prompt"]>

  export type PromptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
    template?: boolean
  }, ExtArgs["result"]["prompt"]>

  export type PromptSelectScalar = {
    name?: boolean
    template?: boolean
  }


  export type $PromptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Prompt"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      name: string
      template: string
    }, ExtArgs["result"]["prompt"]>
    composites: {}
  }

  type PromptGetPayload<S extends boolean | null | undefined | PromptDefaultArgs> = $Result.GetResult<Prisma.$PromptPayload, S>

  type PromptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PromptFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PromptCountAggregateInputType | true
    }

  export interface PromptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Prompt'], meta: { name: 'Prompt' } }
    /**
     * Find zero or one Prompt that matches the filter.
     * @param {PromptFindUniqueArgs} args - Arguments to find a Prompt
     * @example
     * // Get one Prompt
     * const prompt = await prisma.prompt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PromptFindUniqueArgs>(args: SelectSubset<T, PromptFindUniqueArgs<ExtArgs>>): Prisma__PromptClient<$Result.GetResult<Prisma.$PromptPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Prompt that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PromptFindUniqueOrThrowArgs} args - Arguments to find a Prompt
     * @example
     * // Get one Prompt
     * const prompt = await prisma.prompt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PromptFindUniqueOrThrowArgs>(args: SelectSubset<T, PromptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PromptClient<$Result.GetResult<Prisma.$PromptPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Prompt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptFindFirstArgs} args - Arguments to find a Prompt
     * @example
     * // Get one Prompt
     * const prompt = await prisma.prompt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PromptFindFirstArgs>(args?: SelectSubset<T, PromptFindFirstArgs<ExtArgs>>): Prisma__PromptClient<$Result.GetResult<Prisma.$PromptPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Prompt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptFindFirstOrThrowArgs} args - Arguments to find a Prompt
     * @example
     * // Get one Prompt
     * const prompt = await prisma.prompt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PromptFindFirstOrThrowArgs>(args?: SelectSubset<T, PromptFindFirstOrThrowArgs<ExtArgs>>): Prisma__PromptClient<$Result.GetResult<Prisma.$PromptPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Prompts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prompts
     * const prompts = await prisma.prompt.findMany()
     * 
     * // Get first 10 Prompts
     * const prompts = await prisma.prompt.findMany({ take: 10 })
     * 
     * // Only select the `name`
     * const promptWithNameOnly = await prisma.prompt.findMany({ select: { name: true } })
     * 
     */
    findMany<T extends PromptFindManyArgs>(args?: SelectSubset<T, PromptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromptPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Prompt.
     * @param {PromptCreateArgs} args - Arguments to create a Prompt.
     * @example
     * // Create one Prompt
     * const Prompt = await prisma.prompt.create({
     *   data: {
     *     // ... data to create a Prompt
     *   }
     * })
     * 
     */
    create<T extends PromptCreateArgs>(args: SelectSubset<T, PromptCreateArgs<ExtArgs>>): Prisma__PromptClient<$Result.GetResult<Prisma.$PromptPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Prompts.
     * @param {PromptCreateManyArgs} args - Arguments to create many Prompts.
     * @example
     * // Create many Prompts
     * const prompt = await prisma.prompt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PromptCreateManyArgs>(args?: SelectSubset<T, PromptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Prompts and returns the data saved in the database.
     * @param {PromptCreateManyAndReturnArgs} args - Arguments to create many Prompts.
     * @example
     * // Create many Prompts
     * const prompt = await prisma.prompt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Prompts and only return the `name`
     * const promptWithNameOnly = await prisma.prompt.createManyAndReturn({ 
     *   select: { name: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PromptCreateManyAndReturnArgs>(args?: SelectSubset<T, PromptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromptPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Prompt.
     * @param {PromptDeleteArgs} args - Arguments to delete one Prompt.
     * @example
     * // Delete one Prompt
     * const Prompt = await prisma.prompt.delete({
     *   where: {
     *     // ... filter to delete one Prompt
     *   }
     * })
     * 
     */
    delete<T extends PromptDeleteArgs>(args: SelectSubset<T, PromptDeleteArgs<ExtArgs>>): Prisma__PromptClient<$Result.GetResult<Prisma.$PromptPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Prompt.
     * @param {PromptUpdateArgs} args - Arguments to update one Prompt.
     * @example
     * // Update one Prompt
     * const prompt = await prisma.prompt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PromptUpdateArgs>(args: SelectSubset<T, PromptUpdateArgs<ExtArgs>>): Prisma__PromptClient<$Result.GetResult<Prisma.$PromptPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Prompts.
     * @param {PromptDeleteManyArgs} args - Arguments to filter Prompts to delete.
     * @example
     * // Delete a few Prompts
     * const { count } = await prisma.prompt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PromptDeleteManyArgs>(args?: SelectSubset<T, PromptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prompts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prompts
     * const prompt = await prisma.prompt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PromptUpdateManyArgs>(args: SelectSubset<T, PromptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Prompt.
     * @param {PromptUpsertArgs} args - Arguments to update or create a Prompt.
     * @example
     * // Update or create a Prompt
     * const prompt = await prisma.prompt.upsert({
     *   create: {
     *     // ... data to create a Prompt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Prompt we want to update
     *   }
     * })
     */
    upsert<T extends PromptUpsertArgs>(args: SelectSubset<T, PromptUpsertArgs<ExtArgs>>): Prisma__PromptClient<$Result.GetResult<Prisma.$PromptPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Prompts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptCountArgs} args - Arguments to filter Prompts to count.
     * @example
     * // Count the number of Prompts
     * const count = await prisma.prompt.count({
     *   where: {
     *     // ... the filter for the Prompts we want to count
     *   }
     * })
    **/
    count<T extends PromptCountArgs>(
      args?: Subset<T, PromptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PromptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Prompt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PromptAggregateArgs>(args: Subset<T, PromptAggregateArgs>): Prisma.PrismaPromise<GetPromptAggregateType<T>>

    /**
     * Group by Prompt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromptGroupByArgs} args - Group by arguments.
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
      T extends PromptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PromptGroupByArgs['orderBy'] }
        : { orderBy?: PromptGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PromptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPromptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Prompt model
   */
  readonly fields: PromptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Prompt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PromptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Prompt model
   */ 
  interface PromptFieldRefs {
    readonly name: FieldRef<"Prompt", 'String'>
    readonly template: FieldRef<"Prompt", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Prompt findUnique
   */
  export type PromptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelect<ExtArgs> | null
    /**
     * Filter, which Prompt to fetch.
     */
    where: PromptWhereUniqueInput
  }

  /**
   * Prompt findUniqueOrThrow
   */
  export type PromptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelect<ExtArgs> | null
    /**
     * Filter, which Prompt to fetch.
     */
    where: PromptWhereUniqueInput
  }

  /**
   * Prompt findFirst
   */
  export type PromptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelect<ExtArgs> | null
    /**
     * Filter, which Prompt to fetch.
     */
    where?: PromptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prompts to fetch.
     */
    orderBy?: PromptOrderByWithRelationInput | PromptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prompts.
     */
    cursor?: PromptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prompts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prompts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prompts.
     */
    distinct?: PromptScalarFieldEnum | PromptScalarFieldEnum[]
  }

  /**
   * Prompt findFirstOrThrow
   */
  export type PromptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelect<ExtArgs> | null
    /**
     * Filter, which Prompt to fetch.
     */
    where?: PromptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prompts to fetch.
     */
    orderBy?: PromptOrderByWithRelationInput | PromptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prompts.
     */
    cursor?: PromptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prompts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prompts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prompts.
     */
    distinct?: PromptScalarFieldEnum | PromptScalarFieldEnum[]
  }

  /**
   * Prompt findMany
   */
  export type PromptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelect<ExtArgs> | null
    /**
     * Filter, which Prompts to fetch.
     */
    where?: PromptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prompts to fetch.
     */
    orderBy?: PromptOrderByWithRelationInput | PromptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Prompts.
     */
    cursor?: PromptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prompts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prompts.
     */
    skip?: number
    distinct?: PromptScalarFieldEnum | PromptScalarFieldEnum[]
  }

  /**
   * Prompt create
   */
  export type PromptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelect<ExtArgs> | null
    /**
     * The data needed to create a Prompt.
     */
    data: XOR<PromptCreateInput, PromptUncheckedCreateInput>
  }

  /**
   * Prompt createMany
   */
  export type PromptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Prompts.
     */
    data: PromptCreateManyInput | PromptCreateManyInput[]
  }

  /**
   * Prompt createManyAndReturn
   */
  export type PromptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Prompts.
     */
    data: PromptCreateManyInput | PromptCreateManyInput[]
  }

  /**
   * Prompt update
   */
  export type PromptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelect<ExtArgs> | null
    /**
     * The data needed to update a Prompt.
     */
    data: XOR<PromptUpdateInput, PromptUncheckedUpdateInput>
    /**
     * Choose, which Prompt to update.
     */
    where: PromptWhereUniqueInput
  }

  /**
   * Prompt updateMany
   */
  export type PromptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Prompts.
     */
    data: XOR<PromptUpdateManyMutationInput, PromptUncheckedUpdateManyInput>
    /**
     * Filter which Prompts to update
     */
    where?: PromptWhereInput
  }

  /**
   * Prompt upsert
   */
  export type PromptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelect<ExtArgs> | null
    /**
     * The filter to search for the Prompt to update in case it exists.
     */
    where: PromptWhereUniqueInput
    /**
     * In case the Prompt found by the `where` argument doesn't exist, create a new Prompt with this data.
     */
    create: XOR<PromptCreateInput, PromptUncheckedCreateInput>
    /**
     * In case the Prompt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PromptUpdateInput, PromptUncheckedUpdateInput>
  }

  /**
   * Prompt delete
   */
  export type PromptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelect<ExtArgs> | null
    /**
     * Filter which Prompt to delete.
     */
    where: PromptWhereUniqueInput
  }

  /**
   * Prompt deleteMany
   */
  export type PromptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prompts to delete
     */
    where?: PromptWhereInput
  }

  /**
   * Prompt without action
   */
  export type PromptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prompt
     */
    select?: PromptSelect<ExtArgs> | null
  }


  /**
   * Model Source
   */

  export type AggregateSource = {
    _count: SourceCountAggregateOutputType | null
    _avg: SourceAvgAggregateOutputType | null
    _sum: SourceSumAggregateOutputType | null
    _min: SourceMinAggregateOutputType | null
    _max: SourceMaxAggregateOutputType | null
  }

  export type SourceAvgAggregateOutputType = {
    id: number | null
  }

  export type SourceSumAggregateOutputType = {
    id: number | null
  }

  export type SourceMinAggregateOutputType = {
    id: number | null
    base_url: string | null
    article_selector: string | null
    title_selector: string | null
    description_selector: string | null
    time_selector: string | null
    link_selector: string | null
    image_selector: string | null
    body_selector: string | null
    location_selector: string | null
    date_selector: string | null
  }

  export type SourceMaxAggregateOutputType = {
    id: number | null
    base_url: string | null
    article_selector: string | null
    title_selector: string | null
    description_selector: string | null
    time_selector: string | null
    link_selector: string | null
    image_selector: string | null
    body_selector: string | null
    location_selector: string | null
    date_selector: string | null
  }

  export type SourceCountAggregateOutputType = {
    id: number
    base_url: number
    article_selector: number
    title_selector: number
    description_selector: number
    time_selector: number
    link_selector: number
    image_selector: number
    body_selector: number
    location_selector: number
    date_selector: number
    _all: number
  }


  export type SourceAvgAggregateInputType = {
    id?: true
  }

  export type SourceSumAggregateInputType = {
    id?: true
  }

  export type SourceMinAggregateInputType = {
    id?: true
    base_url?: true
    article_selector?: true
    title_selector?: true
    description_selector?: true
    time_selector?: true
    link_selector?: true
    image_selector?: true
    body_selector?: true
    location_selector?: true
    date_selector?: true
  }

  export type SourceMaxAggregateInputType = {
    id?: true
    base_url?: true
    article_selector?: true
    title_selector?: true
    description_selector?: true
    time_selector?: true
    link_selector?: true
    image_selector?: true
    body_selector?: true
    location_selector?: true
    date_selector?: true
  }

  export type SourceCountAggregateInputType = {
    id?: true
    base_url?: true
    article_selector?: true
    title_selector?: true
    description_selector?: true
    time_selector?: true
    link_selector?: true
    image_selector?: true
    body_selector?: true
    location_selector?: true
    date_selector?: true
    _all?: true
  }

  export type SourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Source to aggregate.
     */
    where?: SourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sources to fetch.
     */
    orderBy?: SourceOrderByWithRelationInput | SourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sources
    **/
    _count?: true | SourceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SourceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SourceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SourceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SourceMaxAggregateInputType
  }

  export type GetSourceAggregateType<T extends SourceAggregateArgs> = {
        [P in keyof T & keyof AggregateSource]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSource[P]>
      : GetScalarType<T[P], AggregateSource[P]>
  }




  export type SourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SourceWhereInput
    orderBy?: SourceOrderByWithAggregationInput | SourceOrderByWithAggregationInput[]
    by: SourceScalarFieldEnum[] | SourceScalarFieldEnum
    having?: SourceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SourceCountAggregateInputType | true
    _avg?: SourceAvgAggregateInputType
    _sum?: SourceSumAggregateInputType
    _min?: SourceMinAggregateInputType
    _max?: SourceMaxAggregateInputType
  }

  export type SourceGroupByOutputType = {
    id: number
    base_url: string | null
    article_selector: string | null
    title_selector: string | null
    description_selector: string | null
    time_selector: string | null
    link_selector: string | null
    image_selector: string | null
    body_selector: string | null
    location_selector: string | null
    date_selector: string | null
    _count: SourceCountAggregateOutputType | null
    _avg: SourceAvgAggregateOutputType | null
    _sum: SourceSumAggregateOutputType | null
    _min: SourceMinAggregateOutputType | null
    _max: SourceMaxAggregateOutputType | null
  }

  type GetSourceGroupByPayload<T extends SourceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SourceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SourceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SourceGroupByOutputType[P]>
            : GetScalarType<T[P], SourceGroupByOutputType[P]>
        }
      >
    >


  export type SourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    base_url?: boolean
    article_selector?: boolean
    title_selector?: boolean
    description_selector?: boolean
    time_selector?: boolean
    link_selector?: boolean
    image_selector?: boolean
    body_selector?: boolean
    location_selector?: boolean
    date_selector?: boolean
  }, ExtArgs["result"]["source"]>

  export type SourceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    base_url?: boolean
    article_selector?: boolean
    title_selector?: boolean
    description_selector?: boolean
    time_selector?: boolean
    link_selector?: boolean
    image_selector?: boolean
    body_selector?: boolean
    location_selector?: boolean
    date_selector?: boolean
  }, ExtArgs["result"]["source"]>

  export type SourceSelectScalar = {
    id?: boolean
    base_url?: boolean
    article_selector?: boolean
    title_selector?: boolean
    description_selector?: boolean
    time_selector?: boolean
    link_selector?: boolean
    image_selector?: boolean
    body_selector?: boolean
    location_selector?: boolean
    date_selector?: boolean
  }


  export type $SourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Source"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      base_url: string | null
      article_selector: string | null
      title_selector: string | null
      description_selector: string | null
      time_selector: string | null
      link_selector: string | null
      image_selector: string | null
      body_selector: string | null
      location_selector: string | null
      date_selector: string | null
    }, ExtArgs["result"]["source"]>
    composites: {}
  }

  type SourceGetPayload<S extends boolean | null | undefined | SourceDefaultArgs> = $Result.GetResult<Prisma.$SourcePayload, S>

  type SourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SourceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SourceCountAggregateInputType | true
    }

  export interface SourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Source'], meta: { name: 'Source' } }
    /**
     * Find zero or one Source that matches the filter.
     * @param {SourceFindUniqueArgs} args - Arguments to find a Source
     * @example
     * // Get one Source
     * const source = await prisma.source.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SourceFindUniqueArgs>(args: SelectSubset<T, SourceFindUniqueArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Source that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SourceFindUniqueOrThrowArgs} args - Arguments to find a Source
     * @example
     * // Get one Source
     * const source = await prisma.source.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SourceFindUniqueOrThrowArgs>(args: SelectSubset<T, SourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Source that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceFindFirstArgs} args - Arguments to find a Source
     * @example
     * // Get one Source
     * const source = await prisma.source.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SourceFindFirstArgs>(args?: SelectSubset<T, SourceFindFirstArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Source that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceFindFirstOrThrowArgs} args - Arguments to find a Source
     * @example
     * // Get one Source
     * const source = await prisma.source.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SourceFindFirstOrThrowArgs>(args?: SelectSubset<T, SourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sources
     * const sources = await prisma.source.findMany()
     * 
     * // Get first 10 Sources
     * const sources = await prisma.source.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sourceWithIdOnly = await prisma.source.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SourceFindManyArgs>(args?: SelectSubset<T, SourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Source.
     * @param {SourceCreateArgs} args - Arguments to create a Source.
     * @example
     * // Create one Source
     * const Source = await prisma.source.create({
     *   data: {
     *     // ... data to create a Source
     *   }
     * })
     * 
     */
    create<T extends SourceCreateArgs>(args: SelectSubset<T, SourceCreateArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sources.
     * @param {SourceCreateManyArgs} args - Arguments to create many Sources.
     * @example
     * // Create many Sources
     * const source = await prisma.source.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SourceCreateManyArgs>(args?: SelectSubset<T, SourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sources and returns the data saved in the database.
     * @param {SourceCreateManyAndReturnArgs} args - Arguments to create many Sources.
     * @example
     * // Create many Sources
     * const source = await prisma.source.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sources and only return the `id`
     * const sourceWithIdOnly = await prisma.source.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SourceCreateManyAndReturnArgs>(args?: SelectSubset<T, SourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Source.
     * @param {SourceDeleteArgs} args - Arguments to delete one Source.
     * @example
     * // Delete one Source
     * const Source = await prisma.source.delete({
     *   where: {
     *     // ... filter to delete one Source
     *   }
     * })
     * 
     */
    delete<T extends SourceDeleteArgs>(args: SelectSubset<T, SourceDeleteArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Source.
     * @param {SourceUpdateArgs} args - Arguments to update one Source.
     * @example
     * // Update one Source
     * const source = await prisma.source.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SourceUpdateArgs>(args: SelectSubset<T, SourceUpdateArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sources.
     * @param {SourceDeleteManyArgs} args - Arguments to filter Sources to delete.
     * @example
     * // Delete a few Sources
     * const { count } = await prisma.source.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SourceDeleteManyArgs>(args?: SelectSubset<T, SourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sources
     * const source = await prisma.source.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SourceUpdateManyArgs>(args: SelectSubset<T, SourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Source.
     * @param {SourceUpsertArgs} args - Arguments to update or create a Source.
     * @example
     * // Update or create a Source
     * const source = await prisma.source.upsert({
     *   create: {
     *     // ... data to create a Source
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Source we want to update
     *   }
     * })
     */
    upsert<T extends SourceUpsertArgs>(args: SelectSubset<T, SourceUpsertArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceCountArgs} args - Arguments to filter Sources to count.
     * @example
     * // Count the number of Sources
     * const count = await prisma.source.count({
     *   where: {
     *     // ... the filter for the Sources we want to count
     *   }
     * })
    **/
    count<T extends SourceCountArgs>(
      args?: Subset<T, SourceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SourceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Source.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SourceAggregateArgs>(args: Subset<T, SourceAggregateArgs>): Prisma.PrismaPromise<GetSourceAggregateType<T>>

    /**
     * Group by Source.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceGroupByArgs} args - Group by arguments.
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
      T extends SourceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SourceGroupByArgs['orderBy'] }
        : { orderBy?: SourceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Source model
   */
  readonly fields: SourceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Source.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Source model
   */ 
  interface SourceFieldRefs {
    readonly id: FieldRef<"Source", 'Int'>
    readonly base_url: FieldRef<"Source", 'String'>
    readonly article_selector: FieldRef<"Source", 'String'>
    readonly title_selector: FieldRef<"Source", 'String'>
    readonly description_selector: FieldRef<"Source", 'String'>
    readonly time_selector: FieldRef<"Source", 'String'>
    readonly link_selector: FieldRef<"Source", 'String'>
    readonly image_selector: FieldRef<"Source", 'String'>
    readonly body_selector: FieldRef<"Source", 'String'>
    readonly location_selector: FieldRef<"Source", 'String'>
    readonly date_selector: FieldRef<"Source", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Source findUnique
   */
  export type SourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Filter, which Source to fetch.
     */
    where: SourceWhereUniqueInput
  }

  /**
   * Source findUniqueOrThrow
   */
  export type SourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Filter, which Source to fetch.
     */
    where: SourceWhereUniqueInput
  }

  /**
   * Source findFirst
   */
  export type SourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Filter, which Source to fetch.
     */
    where?: SourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sources to fetch.
     */
    orderBy?: SourceOrderByWithRelationInput | SourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sources.
     */
    cursor?: SourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sources.
     */
    distinct?: SourceScalarFieldEnum | SourceScalarFieldEnum[]
  }

  /**
   * Source findFirstOrThrow
   */
  export type SourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Filter, which Source to fetch.
     */
    where?: SourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sources to fetch.
     */
    orderBy?: SourceOrderByWithRelationInput | SourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sources.
     */
    cursor?: SourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sources.
     */
    distinct?: SourceScalarFieldEnum | SourceScalarFieldEnum[]
  }

  /**
   * Source findMany
   */
  export type SourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Filter, which Sources to fetch.
     */
    where?: SourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sources to fetch.
     */
    orderBy?: SourceOrderByWithRelationInput | SourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sources.
     */
    cursor?: SourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sources.
     */
    skip?: number
    distinct?: SourceScalarFieldEnum | SourceScalarFieldEnum[]
  }

  /**
   * Source create
   */
  export type SourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * The data needed to create a Source.
     */
    data?: XOR<SourceCreateInput, SourceUncheckedCreateInput>
  }

  /**
   * Source createMany
   */
  export type SourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sources.
     */
    data: SourceCreateManyInput | SourceCreateManyInput[]
  }

  /**
   * Source createManyAndReturn
   */
  export type SourceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Sources.
     */
    data: SourceCreateManyInput | SourceCreateManyInput[]
  }

  /**
   * Source update
   */
  export type SourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * The data needed to update a Source.
     */
    data: XOR<SourceUpdateInput, SourceUncheckedUpdateInput>
    /**
     * Choose, which Source to update.
     */
    where: SourceWhereUniqueInput
  }

  /**
   * Source updateMany
   */
  export type SourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sources.
     */
    data: XOR<SourceUpdateManyMutationInput, SourceUncheckedUpdateManyInput>
    /**
     * Filter which Sources to update
     */
    where?: SourceWhereInput
  }

  /**
   * Source upsert
   */
  export type SourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * The filter to search for the Source to update in case it exists.
     */
    where: SourceWhereUniqueInput
    /**
     * In case the Source found by the `where` argument doesn't exist, create a new Source with this data.
     */
    create: XOR<SourceCreateInput, SourceUncheckedCreateInput>
    /**
     * In case the Source was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SourceUpdateInput, SourceUncheckedUpdateInput>
  }

  /**
   * Source delete
   */
  export type SourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Filter which Source to delete.
     */
    where: SourceWhereUniqueInput
  }

  /**
   * Source deleteMany
   */
  export type SourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sources to delete
     */
    where?: SourceWhereInput
  }

  /**
   * Source without action
   */
  export type SourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ArticleScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    time: 'time',
    link: 'link',
    image: 'image',
    created_at: 'created_at'
  };

  export type ArticleScalarFieldEnum = (typeof ArticleScalarFieldEnum)[keyof typeof ArticleScalarFieldEnum]


  export const FilterScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    value: 'value',
    active: 'active',
    created_at: 'created_at'
  };

  export type FilterScalarFieldEnum = (typeof FilterScalarFieldEnum)[keyof typeof FilterScalarFieldEnum]


  export const ArticleFilterMatchScalarFieldEnum: {
    id: 'id',
    article_id: 'article_id',
    filter_id: 'filter_id',
    matched_at: 'matched_at'
  };

  export type ArticleFilterMatchScalarFieldEnum = (typeof ArticleFilterMatchScalarFieldEnum)[keyof typeof ArticleFilterMatchScalarFieldEnum]


  export const ArticleEnrichmentScalarFieldEnum: {
    article_id: 'article_id',
    embedding: 'embedding',
    is_mna: 'is_mna',
    acquiror: 'acquiror',
    seller: 'seller',
    target: 'target',
    deal_value: 'deal_value',
    industry: 'industry',
    extra: 'extra',
    article_date: 'article_date',
    location: 'location',
    body: 'body',
    transaction_type: 'transaction_type',
    completed: 'completed',
    log: 'log',
    summary: 'summary',
    sector: 'sector'
  };

  export type ArticleEnrichmentScalarFieldEnum = (typeof ArticleEnrichmentScalarFieldEnum)[keyof typeof ArticleEnrichmentScalarFieldEnum]


  export const ArticleEnrichmentStepScalarFieldEnum: {
    article_id: 'article_id',
    step_name: 'step_name',
    completed_at: 'completed_at'
  };

  export type ArticleEnrichmentStepScalarFieldEnum = (typeof ArticleEnrichmentStepScalarFieldEnum)[keyof typeof ArticleEnrichmentStepScalarFieldEnum]


  export const PromptScalarFieldEnum: {
    name: 'name',
    template: 'template'
  };

  export type PromptScalarFieldEnum = (typeof PromptScalarFieldEnum)[keyof typeof PromptScalarFieldEnum]


  export const SourceScalarFieldEnum: {
    id: 'id',
    base_url: 'base_url',
    article_selector: 'article_selector',
    title_selector: 'title_selector',
    description_selector: 'description_selector',
    time_selector: 'time_selector',
    link_selector: 'link_selector',
    image_selector: 'image_selector',
    body_selector: 'body_selector',
    location_selector: 'location_selector',
    date_selector: 'date_selector'
  };

  export type SourceScalarFieldEnum = (typeof SourceScalarFieldEnum)[keyof typeof SourceScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ArticleWhereInput = {
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    id?: IntFilter<"Article"> | number
    title?: StringNullableFilter<"Article"> | string | null
    description?: StringNullableFilter<"Article"> | string | null
    time?: StringNullableFilter<"Article"> | string | null
    link?: StringFilter<"Article"> | string
    image?: StringNullableFilter<"Article"> | string | null
    created_at?: DateTimeFilter<"Article"> | Date | string
    ArticleFilterMatch?: ArticleFilterMatchListRelationFilter
    ArticleEnrichment?: XOR<ArticleEnrichmentNullableRelationFilter, ArticleEnrichmentWhereInput> | null
    ArticleEnrichmentStep?: ArticleEnrichmentStepListRelationFilter
  }

  export type ArticleOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    time?: SortOrderInput | SortOrder
    link?: SortOrder
    image?: SortOrderInput | SortOrder
    created_at?: SortOrder
    ArticleFilterMatch?: ArticleFilterMatchOrderByRelationAggregateInput
    ArticleEnrichment?: ArticleEnrichmentOrderByWithRelationInput
    ArticleEnrichmentStep?: ArticleEnrichmentStepOrderByRelationAggregateInput
  }

  export type ArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    link?: string
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    title?: StringNullableFilter<"Article"> | string | null
    description?: StringNullableFilter<"Article"> | string | null
    time?: StringNullableFilter<"Article"> | string | null
    image?: StringNullableFilter<"Article"> | string | null
    created_at?: DateTimeFilter<"Article"> | Date | string
    ArticleFilterMatch?: ArticleFilterMatchListRelationFilter
    ArticleEnrichment?: XOR<ArticleEnrichmentNullableRelationFilter, ArticleEnrichmentWhereInput> | null
    ArticleEnrichmentStep?: ArticleEnrichmentStepListRelationFilter
  }, "id" | "link">

  export type ArticleOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    time?: SortOrderInput | SortOrder
    link?: SortOrder
    image?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: ArticleCountOrderByAggregateInput
    _avg?: ArticleAvgOrderByAggregateInput
    _max?: ArticleMaxOrderByAggregateInput
    _min?: ArticleMinOrderByAggregateInput
    _sum?: ArticleSumOrderByAggregateInput
  }

  export type ArticleScalarWhereWithAggregatesInput = {
    AND?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    OR?: ArticleScalarWhereWithAggregatesInput[]
    NOT?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Article"> | number
    title?: StringNullableWithAggregatesFilter<"Article"> | string | null
    description?: StringNullableWithAggregatesFilter<"Article"> | string | null
    time?: StringNullableWithAggregatesFilter<"Article"> | string | null
    link?: StringWithAggregatesFilter<"Article"> | string
    image?: StringNullableWithAggregatesFilter<"Article"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Article"> | Date | string
  }

  export type FilterWhereInput = {
    AND?: FilterWhereInput | FilterWhereInput[]
    OR?: FilterWhereInput[]
    NOT?: FilterWhereInput | FilterWhereInput[]
    id?: IntFilter<"Filter"> | number
    name?: StringNullableFilter<"Filter"> | string | null
    type?: StringFilter<"Filter"> | string
    value?: StringNullableFilter<"Filter"> | string | null
    active?: IntFilter<"Filter"> | number
    created_at?: DateTimeFilter<"Filter"> | Date | string
    ArticleFilterMatch?: ArticleFilterMatchListRelationFilter
  }

  export type FilterOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    type?: SortOrder
    value?: SortOrderInput | SortOrder
    active?: SortOrder
    created_at?: SortOrder
    ArticleFilterMatch?: ArticleFilterMatchOrderByRelationAggregateInput
  }

  export type FilterWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FilterWhereInput | FilterWhereInput[]
    OR?: FilterWhereInput[]
    NOT?: FilterWhereInput | FilterWhereInput[]
    name?: StringNullableFilter<"Filter"> | string | null
    type?: StringFilter<"Filter"> | string
    value?: StringNullableFilter<"Filter"> | string | null
    active?: IntFilter<"Filter"> | number
    created_at?: DateTimeFilter<"Filter"> | Date | string
    ArticleFilterMatch?: ArticleFilterMatchListRelationFilter
  }, "id">

  export type FilterOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    type?: SortOrder
    value?: SortOrderInput | SortOrder
    active?: SortOrder
    created_at?: SortOrder
    _count?: FilterCountOrderByAggregateInput
    _avg?: FilterAvgOrderByAggregateInput
    _max?: FilterMaxOrderByAggregateInput
    _min?: FilterMinOrderByAggregateInput
    _sum?: FilterSumOrderByAggregateInput
  }

  export type FilterScalarWhereWithAggregatesInput = {
    AND?: FilterScalarWhereWithAggregatesInput | FilterScalarWhereWithAggregatesInput[]
    OR?: FilterScalarWhereWithAggregatesInput[]
    NOT?: FilterScalarWhereWithAggregatesInput | FilterScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Filter"> | number
    name?: StringNullableWithAggregatesFilter<"Filter"> | string | null
    type?: StringWithAggregatesFilter<"Filter"> | string
    value?: StringNullableWithAggregatesFilter<"Filter"> | string | null
    active?: IntWithAggregatesFilter<"Filter"> | number
    created_at?: DateTimeWithAggregatesFilter<"Filter"> | Date | string
  }

  export type ArticleFilterMatchWhereInput = {
    AND?: ArticleFilterMatchWhereInput | ArticleFilterMatchWhereInput[]
    OR?: ArticleFilterMatchWhereInput[]
    NOT?: ArticleFilterMatchWhereInput | ArticleFilterMatchWhereInput[]
    id?: IntFilter<"ArticleFilterMatch"> | number
    article_id?: IntFilter<"ArticleFilterMatch"> | number
    filter_id?: IntFilter<"ArticleFilterMatch"> | number
    matched_at?: DateTimeFilter<"ArticleFilterMatch"> | Date | string
    Article?: XOR<ArticleRelationFilter, ArticleWhereInput>
    Filter?: XOR<FilterRelationFilter, FilterWhereInput>
  }

  export type ArticleFilterMatchOrderByWithRelationInput = {
    id?: SortOrder
    article_id?: SortOrder
    filter_id?: SortOrder
    matched_at?: SortOrder
    Article?: ArticleOrderByWithRelationInput
    Filter?: FilterOrderByWithRelationInput
  }

  export type ArticleFilterMatchWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ArticleFilterMatchWhereInput | ArticleFilterMatchWhereInput[]
    OR?: ArticleFilterMatchWhereInput[]
    NOT?: ArticleFilterMatchWhereInput | ArticleFilterMatchWhereInput[]
    article_id?: IntFilter<"ArticleFilterMatch"> | number
    filter_id?: IntFilter<"ArticleFilterMatch"> | number
    matched_at?: DateTimeFilter<"ArticleFilterMatch"> | Date | string
    Article?: XOR<ArticleRelationFilter, ArticleWhereInput>
    Filter?: XOR<FilterRelationFilter, FilterWhereInput>
  }, "id">

  export type ArticleFilterMatchOrderByWithAggregationInput = {
    id?: SortOrder
    article_id?: SortOrder
    filter_id?: SortOrder
    matched_at?: SortOrder
    _count?: ArticleFilterMatchCountOrderByAggregateInput
    _avg?: ArticleFilterMatchAvgOrderByAggregateInput
    _max?: ArticleFilterMatchMaxOrderByAggregateInput
    _min?: ArticleFilterMatchMinOrderByAggregateInput
    _sum?: ArticleFilterMatchSumOrderByAggregateInput
  }

  export type ArticleFilterMatchScalarWhereWithAggregatesInput = {
    AND?: ArticleFilterMatchScalarWhereWithAggregatesInput | ArticleFilterMatchScalarWhereWithAggregatesInput[]
    OR?: ArticleFilterMatchScalarWhereWithAggregatesInput[]
    NOT?: ArticleFilterMatchScalarWhereWithAggregatesInput | ArticleFilterMatchScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ArticleFilterMatch"> | number
    article_id?: IntWithAggregatesFilter<"ArticleFilterMatch"> | number
    filter_id?: IntWithAggregatesFilter<"ArticleFilterMatch"> | number
    matched_at?: DateTimeWithAggregatesFilter<"ArticleFilterMatch"> | Date | string
  }

  export type ArticleEnrichmentWhereInput = {
    AND?: ArticleEnrichmentWhereInput | ArticleEnrichmentWhereInput[]
    OR?: ArticleEnrichmentWhereInput[]
    NOT?: ArticleEnrichmentWhereInput | ArticleEnrichmentWhereInput[]
    article_id?: IntFilter<"ArticleEnrichment"> | number
    embedding?: StringNullableFilter<"ArticleEnrichment"> | string | null
    is_mna?: IntNullableFilter<"ArticleEnrichment"> | number | null
    acquiror?: StringNullableFilter<"ArticleEnrichment"> | string | null
    seller?: StringNullableFilter<"ArticleEnrichment"> | string | null
    target?: StringNullableFilter<"ArticleEnrichment"> | string | null
    deal_value?: StringNullableFilter<"ArticleEnrichment"> | string | null
    industry?: StringNullableFilter<"ArticleEnrichment"> | string | null
    extra?: StringNullableFilter<"ArticleEnrichment"> | string | null
    article_date?: StringNullableFilter<"ArticleEnrichment"> | string | null
    location?: StringNullableFilter<"ArticleEnrichment"> | string | null
    body?: StringNullableFilter<"ArticleEnrichment"> | string | null
    transaction_type?: StringNullableFilter<"ArticleEnrichment"> | string | null
    completed?: StringNullableFilter<"ArticleEnrichment"> | string | null
    log?: StringNullableFilter<"ArticleEnrichment"> | string | null
    summary?: StringNullableFilter<"ArticleEnrichment"> | string | null
    sector?: StringNullableFilter<"ArticleEnrichment"> | string | null
    Article?: XOR<ArticleRelationFilter, ArticleWhereInput>
  }

  export type ArticleEnrichmentOrderByWithRelationInput = {
    article_id?: SortOrder
    embedding?: SortOrderInput | SortOrder
    is_mna?: SortOrderInput | SortOrder
    acquiror?: SortOrderInput | SortOrder
    seller?: SortOrderInput | SortOrder
    target?: SortOrderInput | SortOrder
    deal_value?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    extra?: SortOrderInput | SortOrder
    article_date?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    body?: SortOrderInput | SortOrder
    transaction_type?: SortOrderInput | SortOrder
    completed?: SortOrderInput | SortOrder
    log?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    sector?: SortOrderInput | SortOrder
    Article?: ArticleOrderByWithRelationInput
  }

  export type ArticleEnrichmentWhereUniqueInput = Prisma.AtLeast<{
    article_id?: number
    AND?: ArticleEnrichmentWhereInput | ArticleEnrichmentWhereInput[]
    OR?: ArticleEnrichmentWhereInput[]
    NOT?: ArticleEnrichmentWhereInput | ArticleEnrichmentWhereInput[]
    embedding?: StringNullableFilter<"ArticleEnrichment"> | string | null
    is_mna?: IntNullableFilter<"ArticleEnrichment"> | number | null
    acquiror?: StringNullableFilter<"ArticleEnrichment"> | string | null
    seller?: StringNullableFilter<"ArticleEnrichment"> | string | null
    target?: StringNullableFilter<"ArticleEnrichment"> | string | null
    deal_value?: StringNullableFilter<"ArticleEnrichment"> | string | null
    industry?: StringNullableFilter<"ArticleEnrichment"> | string | null
    extra?: StringNullableFilter<"ArticleEnrichment"> | string | null
    article_date?: StringNullableFilter<"ArticleEnrichment"> | string | null
    location?: StringNullableFilter<"ArticleEnrichment"> | string | null
    body?: StringNullableFilter<"ArticleEnrichment"> | string | null
    transaction_type?: StringNullableFilter<"ArticleEnrichment"> | string | null
    completed?: StringNullableFilter<"ArticleEnrichment"> | string | null
    log?: StringNullableFilter<"ArticleEnrichment"> | string | null
    summary?: StringNullableFilter<"ArticleEnrichment"> | string | null
    sector?: StringNullableFilter<"ArticleEnrichment"> | string | null
    Article?: XOR<ArticleRelationFilter, ArticleWhereInput>
  }, "article_id">

  export type ArticleEnrichmentOrderByWithAggregationInput = {
    article_id?: SortOrder
    embedding?: SortOrderInput | SortOrder
    is_mna?: SortOrderInput | SortOrder
    acquiror?: SortOrderInput | SortOrder
    seller?: SortOrderInput | SortOrder
    target?: SortOrderInput | SortOrder
    deal_value?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    extra?: SortOrderInput | SortOrder
    article_date?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    body?: SortOrderInput | SortOrder
    transaction_type?: SortOrderInput | SortOrder
    completed?: SortOrderInput | SortOrder
    log?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    sector?: SortOrderInput | SortOrder
    _count?: ArticleEnrichmentCountOrderByAggregateInput
    _avg?: ArticleEnrichmentAvgOrderByAggregateInput
    _max?: ArticleEnrichmentMaxOrderByAggregateInput
    _min?: ArticleEnrichmentMinOrderByAggregateInput
    _sum?: ArticleEnrichmentSumOrderByAggregateInput
  }

  export type ArticleEnrichmentScalarWhereWithAggregatesInput = {
    AND?: ArticleEnrichmentScalarWhereWithAggregatesInput | ArticleEnrichmentScalarWhereWithAggregatesInput[]
    OR?: ArticleEnrichmentScalarWhereWithAggregatesInput[]
    NOT?: ArticleEnrichmentScalarWhereWithAggregatesInput | ArticleEnrichmentScalarWhereWithAggregatesInput[]
    article_id?: IntWithAggregatesFilter<"ArticleEnrichment"> | number
    embedding?: StringNullableWithAggregatesFilter<"ArticleEnrichment"> | string | null
    is_mna?: IntNullableWithAggregatesFilter<"ArticleEnrichment"> | number | null
    acquiror?: StringNullableWithAggregatesFilter<"ArticleEnrichment"> | string | null
    seller?: StringNullableWithAggregatesFilter<"ArticleEnrichment"> | string | null
    target?: StringNullableWithAggregatesFilter<"ArticleEnrichment"> | string | null
    deal_value?: StringNullableWithAggregatesFilter<"ArticleEnrichment"> | string | null
    industry?: StringNullableWithAggregatesFilter<"ArticleEnrichment"> | string | null
    extra?: StringNullableWithAggregatesFilter<"ArticleEnrichment"> | string | null
    article_date?: StringNullableWithAggregatesFilter<"ArticleEnrichment"> | string | null
    location?: StringNullableWithAggregatesFilter<"ArticleEnrichment"> | string | null
    body?: StringNullableWithAggregatesFilter<"ArticleEnrichment"> | string | null
    transaction_type?: StringNullableWithAggregatesFilter<"ArticleEnrichment"> | string | null
    completed?: StringNullableWithAggregatesFilter<"ArticleEnrichment"> | string | null
    log?: StringNullableWithAggregatesFilter<"ArticleEnrichment"> | string | null
    summary?: StringNullableWithAggregatesFilter<"ArticleEnrichment"> | string | null
    sector?: StringNullableWithAggregatesFilter<"ArticleEnrichment"> | string | null
  }

  export type ArticleEnrichmentStepWhereInput = {
    AND?: ArticleEnrichmentStepWhereInput | ArticleEnrichmentStepWhereInput[]
    OR?: ArticleEnrichmentStepWhereInput[]
    NOT?: ArticleEnrichmentStepWhereInput | ArticleEnrichmentStepWhereInput[]
    article_id?: IntFilter<"ArticleEnrichmentStep"> | number
    step_name?: StringFilter<"ArticleEnrichmentStep"> | string
    completed_at?: DateTimeFilter<"ArticleEnrichmentStep"> | Date | string
    Article?: XOR<ArticleRelationFilter, ArticleWhereInput>
  }

  export type ArticleEnrichmentStepOrderByWithRelationInput = {
    article_id?: SortOrder
    step_name?: SortOrder
    completed_at?: SortOrder
    Article?: ArticleOrderByWithRelationInput
  }

  export type ArticleEnrichmentStepWhereUniqueInput = Prisma.AtLeast<{
    article_id_step_name?: ArticleEnrichmentStepArticle_idStep_nameCompoundUniqueInput
    AND?: ArticleEnrichmentStepWhereInput | ArticleEnrichmentStepWhereInput[]
    OR?: ArticleEnrichmentStepWhereInput[]
    NOT?: ArticleEnrichmentStepWhereInput | ArticleEnrichmentStepWhereInput[]
    article_id?: IntFilter<"ArticleEnrichmentStep"> | number
    step_name?: StringFilter<"ArticleEnrichmentStep"> | string
    completed_at?: DateTimeFilter<"ArticleEnrichmentStep"> | Date | string
    Article?: XOR<ArticleRelationFilter, ArticleWhereInput>
  }, "article_id_step_name">

  export type ArticleEnrichmentStepOrderByWithAggregationInput = {
    article_id?: SortOrder
    step_name?: SortOrder
    completed_at?: SortOrder
    _count?: ArticleEnrichmentStepCountOrderByAggregateInput
    _avg?: ArticleEnrichmentStepAvgOrderByAggregateInput
    _max?: ArticleEnrichmentStepMaxOrderByAggregateInput
    _min?: ArticleEnrichmentStepMinOrderByAggregateInput
    _sum?: ArticleEnrichmentStepSumOrderByAggregateInput
  }

  export type ArticleEnrichmentStepScalarWhereWithAggregatesInput = {
    AND?: ArticleEnrichmentStepScalarWhereWithAggregatesInput | ArticleEnrichmentStepScalarWhereWithAggregatesInput[]
    OR?: ArticleEnrichmentStepScalarWhereWithAggregatesInput[]
    NOT?: ArticleEnrichmentStepScalarWhereWithAggregatesInput | ArticleEnrichmentStepScalarWhereWithAggregatesInput[]
    article_id?: IntWithAggregatesFilter<"ArticleEnrichmentStep"> | number
    step_name?: StringWithAggregatesFilter<"ArticleEnrichmentStep"> | string
    completed_at?: DateTimeWithAggregatesFilter<"ArticleEnrichmentStep"> | Date | string
  }

  export type PromptWhereInput = {
    AND?: PromptWhereInput | PromptWhereInput[]
    OR?: PromptWhereInput[]
    NOT?: PromptWhereInput | PromptWhereInput[]
    name?: StringFilter<"Prompt"> | string
    template?: StringFilter<"Prompt"> | string
  }

  export type PromptOrderByWithRelationInput = {
    name?: SortOrder
    template?: SortOrder
  }

  export type PromptWhereUniqueInput = Prisma.AtLeast<{
    name?: string
    AND?: PromptWhereInput | PromptWhereInput[]
    OR?: PromptWhereInput[]
    NOT?: PromptWhereInput | PromptWhereInput[]
    template?: StringFilter<"Prompt"> | string
  }, "name">

  export type PromptOrderByWithAggregationInput = {
    name?: SortOrder
    template?: SortOrder
    _count?: PromptCountOrderByAggregateInput
    _max?: PromptMaxOrderByAggregateInput
    _min?: PromptMinOrderByAggregateInput
  }

  export type PromptScalarWhereWithAggregatesInput = {
    AND?: PromptScalarWhereWithAggregatesInput | PromptScalarWhereWithAggregatesInput[]
    OR?: PromptScalarWhereWithAggregatesInput[]
    NOT?: PromptScalarWhereWithAggregatesInput | PromptScalarWhereWithAggregatesInput[]
    name?: StringWithAggregatesFilter<"Prompt"> | string
    template?: StringWithAggregatesFilter<"Prompt"> | string
  }

  export type SourceWhereInput = {
    AND?: SourceWhereInput | SourceWhereInput[]
    OR?: SourceWhereInput[]
    NOT?: SourceWhereInput | SourceWhereInput[]
    id?: IntFilter<"Source"> | number
    base_url?: StringNullableFilter<"Source"> | string | null
    article_selector?: StringNullableFilter<"Source"> | string | null
    title_selector?: StringNullableFilter<"Source"> | string | null
    description_selector?: StringNullableFilter<"Source"> | string | null
    time_selector?: StringNullableFilter<"Source"> | string | null
    link_selector?: StringNullableFilter<"Source"> | string | null
    image_selector?: StringNullableFilter<"Source"> | string | null
    body_selector?: StringNullableFilter<"Source"> | string | null
    location_selector?: StringNullableFilter<"Source"> | string | null
    date_selector?: StringNullableFilter<"Source"> | string | null
  }

  export type SourceOrderByWithRelationInput = {
    id?: SortOrder
    base_url?: SortOrderInput | SortOrder
    article_selector?: SortOrderInput | SortOrder
    title_selector?: SortOrderInput | SortOrder
    description_selector?: SortOrderInput | SortOrder
    time_selector?: SortOrderInput | SortOrder
    link_selector?: SortOrderInput | SortOrder
    image_selector?: SortOrderInput | SortOrder
    body_selector?: SortOrderInput | SortOrder
    location_selector?: SortOrderInput | SortOrder
    date_selector?: SortOrderInput | SortOrder
  }

  export type SourceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SourceWhereInput | SourceWhereInput[]
    OR?: SourceWhereInput[]
    NOT?: SourceWhereInput | SourceWhereInput[]
    base_url?: StringNullableFilter<"Source"> | string | null
    article_selector?: StringNullableFilter<"Source"> | string | null
    title_selector?: StringNullableFilter<"Source"> | string | null
    description_selector?: StringNullableFilter<"Source"> | string | null
    time_selector?: StringNullableFilter<"Source"> | string | null
    link_selector?: StringNullableFilter<"Source"> | string | null
    image_selector?: StringNullableFilter<"Source"> | string | null
    body_selector?: StringNullableFilter<"Source"> | string | null
    location_selector?: StringNullableFilter<"Source"> | string | null
    date_selector?: StringNullableFilter<"Source"> | string | null
  }, "id">

  export type SourceOrderByWithAggregationInput = {
    id?: SortOrder
    base_url?: SortOrderInput | SortOrder
    article_selector?: SortOrderInput | SortOrder
    title_selector?: SortOrderInput | SortOrder
    description_selector?: SortOrderInput | SortOrder
    time_selector?: SortOrderInput | SortOrder
    link_selector?: SortOrderInput | SortOrder
    image_selector?: SortOrderInput | SortOrder
    body_selector?: SortOrderInput | SortOrder
    location_selector?: SortOrderInput | SortOrder
    date_selector?: SortOrderInput | SortOrder
    _count?: SourceCountOrderByAggregateInput
    _avg?: SourceAvgOrderByAggregateInput
    _max?: SourceMaxOrderByAggregateInput
    _min?: SourceMinOrderByAggregateInput
    _sum?: SourceSumOrderByAggregateInput
  }

  export type SourceScalarWhereWithAggregatesInput = {
    AND?: SourceScalarWhereWithAggregatesInput | SourceScalarWhereWithAggregatesInput[]
    OR?: SourceScalarWhereWithAggregatesInput[]
    NOT?: SourceScalarWhereWithAggregatesInput | SourceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Source"> | number
    base_url?: StringNullableWithAggregatesFilter<"Source"> | string | null
    article_selector?: StringNullableWithAggregatesFilter<"Source"> | string | null
    title_selector?: StringNullableWithAggregatesFilter<"Source"> | string | null
    description_selector?: StringNullableWithAggregatesFilter<"Source"> | string | null
    time_selector?: StringNullableWithAggregatesFilter<"Source"> | string | null
    link_selector?: StringNullableWithAggregatesFilter<"Source"> | string | null
    image_selector?: StringNullableWithAggregatesFilter<"Source"> | string | null
    body_selector?: StringNullableWithAggregatesFilter<"Source"> | string | null
    location_selector?: StringNullableWithAggregatesFilter<"Source"> | string | null
    date_selector?: StringNullableWithAggregatesFilter<"Source"> | string | null
  }

  export type ArticleCreateInput = {
    title?: string | null
    description?: string | null
    time?: string | null
    link: string
    image?: string | null
    created_at?: Date | string
    ArticleFilterMatch?: ArticleFilterMatchCreateNestedManyWithoutArticleInput
    ArticleEnrichment?: ArticleEnrichmentCreateNestedOneWithoutArticleInput
    ArticleEnrichmentStep?: ArticleEnrichmentStepCreateNestedManyWithoutArticleInput
  }

  export type ArticleUncheckedCreateInput = {
    id?: number
    title?: string | null
    description?: string | null
    time?: string | null
    link: string
    image?: string | null
    created_at?: Date | string
    ArticleFilterMatch?: ArticleFilterMatchUncheckedCreateNestedManyWithoutArticleInput
    ArticleEnrichment?: ArticleEnrichmentUncheckedCreateNestedOneWithoutArticleInput
    ArticleEnrichmentStep?: ArticleEnrichmentStepUncheckedCreateNestedManyWithoutArticleInput
  }

  export type ArticleUpdateInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    link?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ArticleFilterMatch?: ArticleFilterMatchUpdateManyWithoutArticleNestedInput
    ArticleEnrichment?: ArticleEnrichmentUpdateOneWithoutArticleNestedInput
    ArticleEnrichmentStep?: ArticleEnrichmentStepUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    link?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ArticleFilterMatch?: ArticleFilterMatchUncheckedUpdateManyWithoutArticleNestedInput
    ArticleEnrichment?: ArticleEnrichmentUncheckedUpdateOneWithoutArticleNestedInput
    ArticleEnrichmentStep?: ArticleEnrichmentStepUncheckedUpdateManyWithoutArticleNestedInput
  }

  export type ArticleCreateManyInput = {
    id?: number
    title?: string | null
    description?: string | null
    time?: string | null
    link: string
    image?: string | null
    created_at?: Date | string
  }

  export type ArticleUpdateManyMutationInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    link?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    link?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FilterCreateInput = {
    name?: string | null
    type: string
    value?: string | null
    active?: number
    created_at?: Date | string
    ArticleFilterMatch?: ArticleFilterMatchCreateNestedManyWithoutFilterInput
  }

  export type FilterUncheckedCreateInput = {
    id?: number
    name?: string | null
    type: string
    value?: string | null
    active?: number
    created_at?: Date | string
    ArticleFilterMatch?: ArticleFilterMatchUncheckedCreateNestedManyWithoutFilterInput
  }

  export type FilterUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    value?: NullableStringFieldUpdateOperationsInput | string | null
    active?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ArticleFilterMatch?: ArticleFilterMatchUpdateManyWithoutFilterNestedInput
  }

  export type FilterUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    value?: NullableStringFieldUpdateOperationsInput | string | null
    active?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ArticleFilterMatch?: ArticleFilterMatchUncheckedUpdateManyWithoutFilterNestedInput
  }

  export type FilterCreateManyInput = {
    id?: number
    name?: string | null
    type: string
    value?: string | null
    active?: number
    created_at?: Date | string
  }

  export type FilterUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    value?: NullableStringFieldUpdateOperationsInput | string | null
    active?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FilterUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    value?: NullableStringFieldUpdateOperationsInput | string | null
    active?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleFilterMatchCreateInput = {
    matched_at?: Date | string
    Article: ArticleCreateNestedOneWithoutArticleFilterMatchInput
    Filter: FilterCreateNestedOneWithoutArticleFilterMatchInput
  }

  export type ArticleFilterMatchUncheckedCreateInput = {
    id?: number
    article_id: number
    filter_id: number
    matched_at?: Date | string
  }

  export type ArticleFilterMatchUpdateInput = {
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    Article?: ArticleUpdateOneRequiredWithoutArticleFilterMatchNestedInput
    Filter?: FilterUpdateOneRequiredWithoutArticleFilterMatchNestedInput
  }

  export type ArticleFilterMatchUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    article_id?: IntFieldUpdateOperationsInput | number
    filter_id?: IntFieldUpdateOperationsInput | number
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleFilterMatchCreateManyInput = {
    id?: number
    article_id: number
    filter_id: number
    matched_at?: Date | string
  }

  export type ArticleFilterMatchUpdateManyMutationInput = {
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleFilterMatchUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    article_id?: IntFieldUpdateOperationsInput | number
    filter_id?: IntFieldUpdateOperationsInput | number
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleEnrichmentCreateInput = {
    embedding?: string | null
    is_mna?: number | null
    acquiror?: string | null
    seller?: string | null
    target?: string | null
    deal_value?: string | null
    industry?: string | null
    extra?: string | null
    article_date?: string | null
    location?: string | null
    body?: string | null
    transaction_type?: string | null
    completed?: string | null
    log?: string | null
    summary?: string | null
    sector?: string | null
    Article: ArticleCreateNestedOneWithoutArticleEnrichmentInput
  }

  export type ArticleEnrichmentUncheckedCreateInput = {
    article_id: number
    embedding?: string | null
    is_mna?: number | null
    acquiror?: string | null
    seller?: string | null
    target?: string | null
    deal_value?: string | null
    industry?: string | null
    extra?: string | null
    article_date?: string | null
    location?: string | null
    body?: string | null
    transaction_type?: string | null
    completed?: string | null
    log?: string | null
    summary?: string | null
    sector?: string | null
  }

  export type ArticleEnrichmentUpdateInput = {
    embedding?: NullableStringFieldUpdateOperationsInput | string | null
    is_mna?: NullableIntFieldUpdateOperationsInput | number | null
    acquiror?: NullableStringFieldUpdateOperationsInput | string | null
    seller?: NullableStringFieldUpdateOperationsInput | string | null
    target?: NullableStringFieldUpdateOperationsInput | string | null
    deal_value?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    extra?: NullableStringFieldUpdateOperationsInput | string | null
    article_date?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    transaction_type?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: NullableStringFieldUpdateOperationsInput | string | null
    log?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    Article?: ArticleUpdateOneRequiredWithoutArticleEnrichmentNestedInput
  }

  export type ArticleEnrichmentUncheckedUpdateInput = {
    article_id?: IntFieldUpdateOperationsInput | number
    embedding?: NullableStringFieldUpdateOperationsInput | string | null
    is_mna?: NullableIntFieldUpdateOperationsInput | number | null
    acquiror?: NullableStringFieldUpdateOperationsInput | string | null
    seller?: NullableStringFieldUpdateOperationsInput | string | null
    target?: NullableStringFieldUpdateOperationsInput | string | null
    deal_value?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    extra?: NullableStringFieldUpdateOperationsInput | string | null
    article_date?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    transaction_type?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: NullableStringFieldUpdateOperationsInput | string | null
    log?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArticleEnrichmentCreateManyInput = {
    article_id: number
    embedding?: string | null
    is_mna?: number | null
    acquiror?: string | null
    seller?: string | null
    target?: string | null
    deal_value?: string | null
    industry?: string | null
    extra?: string | null
    article_date?: string | null
    location?: string | null
    body?: string | null
    transaction_type?: string | null
    completed?: string | null
    log?: string | null
    summary?: string | null
    sector?: string | null
  }

  export type ArticleEnrichmentUpdateManyMutationInput = {
    embedding?: NullableStringFieldUpdateOperationsInput | string | null
    is_mna?: NullableIntFieldUpdateOperationsInput | number | null
    acquiror?: NullableStringFieldUpdateOperationsInput | string | null
    seller?: NullableStringFieldUpdateOperationsInput | string | null
    target?: NullableStringFieldUpdateOperationsInput | string | null
    deal_value?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    extra?: NullableStringFieldUpdateOperationsInput | string | null
    article_date?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    transaction_type?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: NullableStringFieldUpdateOperationsInput | string | null
    log?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArticleEnrichmentUncheckedUpdateManyInput = {
    article_id?: IntFieldUpdateOperationsInput | number
    embedding?: NullableStringFieldUpdateOperationsInput | string | null
    is_mna?: NullableIntFieldUpdateOperationsInput | number | null
    acquiror?: NullableStringFieldUpdateOperationsInput | string | null
    seller?: NullableStringFieldUpdateOperationsInput | string | null
    target?: NullableStringFieldUpdateOperationsInput | string | null
    deal_value?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    extra?: NullableStringFieldUpdateOperationsInput | string | null
    article_date?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    transaction_type?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: NullableStringFieldUpdateOperationsInput | string | null
    log?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArticleEnrichmentStepCreateInput = {
    step_name: string
    completed_at?: Date | string
    Article: ArticleCreateNestedOneWithoutArticleEnrichmentStepInput
  }

  export type ArticleEnrichmentStepUncheckedCreateInput = {
    article_id: number
    step_name: string
    completed_at?: Date | string
  }

  export type ArticleEnrichmentStepUpdateInput = {
    step_name?: StringFieldUpdateOperationsInput | string
    completed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    Article?: ArticleUpdateOneRequiredWithoutArticleEnrichmentStepNestedInput
  }

  export type ArticleEnrichmentStepUncheckedUpdateInput = {
    article_id?: IntFieldUpdateOperationsInput | number
    step_name?: StringFieldUpdateOperationsInput | string
    completed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleEnrichmentStepCreateManyInput = {
    article_id: number
    step_name: string
    completed_at?: Date | string
  }

  export type ArticleEnrichmentStepUpdateManyMutationInput = {
    step_name?: StringFieldUpdateOperationsInput | string
    completed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleEnrichmentStepUncheckedUpdateManyInput = {
    article_id?: IntFieldUpdateOperationsInput | number
    step_name?: StringFieldUpdateOperationsInput | string
    completed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromptCreateInput = {
    name: string
    template: string
  }

  export type PromptUncheckedCreateInput = {
    name: string
    template: string
  }

  export type PromptUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
  }

  export type PromptUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
  }

  export type PromptCreateManyInput = {
    name: string
    template: string
  }

  export type PromptUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
  }

  export type PromptUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
  }

  export type SourceCreateInput = {
    base_url?: string | null
    article_selector?: string | null
    title_selector?: string | null
    description_selector?: string | null
    time_selector?: string | null
    link_selector?: string | null
    image_selector?: string | null
    body_selector?: string | null
    location_selector?: string | null
    date_selector?: string | null
  }

  export type SourceUncheckedCreateInput = {
    id?: number
    base_url?: string | null
    article_selector?: string | null
    title_selector?: string | null
    description_selector?: string | null
    time_selector?: string | null
    link_selector?: string | null
    image_selector?: string | null
    body_selector?: string | null
    location_selector?: string | null
    date_selector?: string | null
  }

  export type SourceUpdateInput = {
    base_url?: NullableStringFieldUpdateOperationsInput | string | null
    article_selector?: NullableStringFieldUpdateOperationsInput | string | null
    title_selector?: NullableStringFieldUpdateOperationsInput | string | null
    description_selector?: NullableStringFieldUpdateOperationsInput | string | null
    time_selector?: NullableStringFieldUpdateOperationsInput | string | null
    link_selector?: NullableStringFieldUpdateOperationsInput | string | null
    image_selector?: NullableStringFieldUpdateOperationsInput | string | null
    body_selector?: NullableStringFieldUpdateOperationsInput | string | null
    location_selector?: NullableStringFieldUpdateOperationsInput | string | null
    date_selector?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SourceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    base_url?: NullableStringFieldUpdateOperationsInput | string | null
    article_selector?: NullableStringFieldUpdateOperationsInput | string | null
    title_selector?: NullableStringFieldUpdateOperationsInput | string | null
    description_selector?: NullableStringFieldUpdateOperationsInput | string | null
    time_selector?: NullableStringFieldUpdateOperationsInput | string | null
    link_selector?: NullableStringFieldUpdateOperationsInput | string | null
    image_selector?: NullableStringFieldUpdateOperationsInput | string | null
    body_selector?: NullableStringFieldUpdateOperationsInput | string | null
    location_selector?: NullableStringFieldUpdateOperationsInput | string | null
    date_selector?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SourceCreateManyInput = {
    id?: number
    base_url?: string | null
    article_selector?: string | null
    title_selector?: string | null
    description_selector?: string | null
    time_selector?: string | null
    link_selector?: string | null
    image_selector?: string | null
    body_selector?: string | null
    location_selector?: string | null
    date_selector?: string | null
  }

  export type SourceUpdateManyMutationInput = {
    base_url?: NullableStringFieldUpdateOperationsInput | string | null
    article_selector?: NullableStringFieldUpdateOperationsInput | string | null
    title_selector?: NullableStringFieldUpdateOperationsInput | string | null
    description_selector?: NullableStringFieldUpdateOperationsInput | string | null
    time_selector?: NullableStringFieldUpdateOperationsInput | string | null
    link_selector?: NullableStringFieldUpdateOperationsInput | string | null
    image_selector?: NullableStringFieldUpdateOperationsInput | string | null
    body_selector?: NullableStringFieldUpdateOperationsInput | string | null
    location_selector?: NullableStringFieldUpdateOperationsInput | string | null
    date_selector?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SourceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    base_url?: NullableStringFieldUpdateOperationsInput | string | null
    article_selector?: NullableStringFieldUpdateOperationsInput | string | null
    title_selector?: NullableStringFieldUpdateOperationsInput | string | null
    description_selector?: NullableStringFieldUpdateOperationsInput | string | null
    time_selector?: NullableStringFieldUpdateOperationsInput | string | null
    link_selector?: NullableStringFieldUpdateOperationsInput | string | null
    image_selector?: NullableStringFieldUpdateOperationsInput | string | null
    body_selector?: NullableStringFieldUpdateOperationsInput | string | null
    location_selector?: NullableStringFieldUpdateOperationsInput | string | null
    date_selector?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ArticleFilterMatchListRelationFilter = {
    every?: ArticleFilterMatchWhereInput
    some?: ArticleFilterMatchWhereInput
    none?: ArticleFilterMatchWhereInput
  }

  export type ArticleEnrichmentNullableRelationFilter = {
    is?: ArticleEnrichmentWhereInput | null
    isNot?: ArticleEnrichmentWhereInput | null
  }

  export type ArticleEnrichmentStepListRelationFilter = {
    every?: ArticleEnrichmentStepWhereInput
    some?: ArticleEnrichmentStepWhereInput
    none?: ArticleEnrichmentStepWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ArticleFilterMatchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ArticleEnrichmentStepOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ArticleCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    time?: SortOrder
    link?: SortOrder
    image?: SortOrder
    created_at?: SortOrder
  }

  export type ArticleAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ArticleMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    time?: SortOrder
    link?: SortOrder
    image?: SortOrder
    created_at?: SortOrder
  }

  export type ArticleMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    time?: SortOrder
    link?: SortOrder
    image?: SortOrder
    created_at?: SortOrder
  }

  export type ArticleSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FilterCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    value?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
  }

  export type FilterAvgOrderByAggregateInput = {
    id?: SortOrder
    active?: SortOrder
  }

  export type FilterMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    value?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
  }

  export type FilterMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    value?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
  }

  export type FilterSumOrderByAggregateInput = {
    id?: SortOrder
    active?: SortOrder
  }

  export type ArticleRelationFilter = {
    is?: ArticleWhereInput
    isNot?: ArticleWhereInput
  }

  export type FilterRelationFilter = {
    is?: FilterWhereInput
    isNot?: FilterWhereInput
  }

  export type ArticleFilterMatchCountOrderByAggregateInput = {
    id?: SortOrder
    article_id?: SortOrder
    filter_id?: SortOrder
    matched_at?: SortOrder
  }

  export type ArticleFilterMatchAvgOrderByAggregateInput = {
    id?: SortOrder
    article_id?: SortOrder
    filter_id?: SortOrder
  }

  export type ArticleFilterMatchMaxOrderByAggregateInput = {
    id?: SortOrder
    article_id?: SortOrder
    filter_id?: SortOrder
    matched_at?: SortOrder
  }

  export type ArticleFilterMatchMinOrderByAggregateInput = {
    id?: SortOrder
    article_id?: SortOrder
    filter_id?: SortOrder
    matched_at?: SortOrder
  }

  export type ArticleFilterMatchSumOrderByAggregateInput = {
    id?: SortOrder
    article_id?: SortOrder
    filter_id?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ArticleEnrichmentCountOrderByAggregateInput = {
    article_id?: SortOrder
    embedding?: SortOrder
    is_mna?: SortOrder
    acquiror?: SortOrder
    seller?: SortOrder
    target?: SortOrder
    deal_value?: SortOrder
    industry?: SortOrder
    extra?: SortOrder
    article_date?: SortOrder
    location?: SortOrder
    body?: SortOrder
    transaction_type?: SortOrder
    completed?: SortOrder
    log?: SortOrder
    summary?: SortOrder
    sector?: SortOrder
  }

  export type ArticleEnrichmentAvgOrderByAggregateInput = {
    article_id?: SortOrder
    is_mna?: SortOrder
  }

  export type ArticleEnrichmentMaxOrderByAggregateInput = {
    article_id?: SortOrder
    embedding?: SortOrder
    is_mna?: SortOrder
    acquiror?: SortOrder
    seller?: SortOrder
    target?: SortOrder
    deal_value?: SortOrder
    industry?: SortOrder
    extra?: SortOrder
    article_date?: SortOrder
    location?: SortOrder
    body?: SortOrder
    transaction_type?: SortOrder
    completed?: SortOrder
    log?: SortOrder
    summary?: SortOrder
    sector?: SortOrder
  }

  export type ArticleEnrichmentMinOrderByAggregateInput = {
    article_id?: SortOrder
    embedding?: SortOrder
    is_mna?: SortOrder
    acquiror?: SortOrder
    seller?: SortOrder
    target?: SortOrder
    deal_value?: SortOrder
    industry?: SortOrder
    extra?: SortOrder
    article_date?: SortOrder
    location?: SortOrder
    body?: SortOrder
    transaction_type?: SortOrder
    completed?: SortOrder
    log?: SortOrder
    summary?: SortOrder
    sector?: SortOrder
  }

  export type ArticleEnrichmentSumOrderByAggregateInput = {
    article_id?: SortOrder
    is_mna?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ArticleEnrichmentStepArticle_idStep_nameCompoundUniqueInput = {
    article_id: number
    step_name: string
  }

  export type ArticleEnrichmentStepCountOrderByAggregateInput = {
    article_id?: SortOrder
    step_name?: SortOrder
    completed_at?: SortOrder
  }

  export type ArticleEnrichmentStepAvgOrderByAggregateInput = {
    article_id?: SortOrder
  }

  export type ArticleEnrichmentStepMaxOrderByAggregateInput = {
    article_id?: SortOrder
    step_name?: SortOrder
    completed_at?: SortOrder
  }

  export type ArticleEnrichmentStepMinOrderByAggregateInput = {
    article_id?: SortOrder
    step_name?: SortOrder
    completed_at?: SortOrder
  }

  export type ArticleEnrichmentStepSumOrderByAggregateInput = {
    article_id?: SortOrder
  }

  export type PromptCountOrderByAggregateInput = {
    name?: SortOrder
    template?: SortOrder
  }

  export type PromptMaxOrderByAggregateInput = {
    name?: SortOrder
    template?: SortOrder
  }

  export type PromptMinOrderByAggregateInput = {
    name?: SortOrder
    template?: SortOrder
  }

  export type SourceCountOrderByAggregateInput = {
    id?: SortOrder
    base_url?: SortOrder
    article_selector?: SortOrder
    title_selector?: SortOrder
    description_selector?: SortOrder
    time_selector?: SortOrder
    link_selector?: SortOrder
    image_selector?: SortOrder
    body_selector?: SortOrder
    location_selector?: SortOrder
    date_selector?: SortOrder
  }

  export type SourceAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SourceMaxOrderByAggregateInput = {
    id?: SortOrder
    base_url?: SortOrder
    article_selector?: SortOrder
    title_selector?: SortOrder
    description_selector?: SortOrder
    time_selector?: SortOrder
    link_selector?: SortOrder
    image_selector?: SortOrder
    body_selector?: SortOrder
    location_selector?: SortOrder
    date_selector?: SortOrder
  }

  export type SourceMinOrderByAggregateInput = {
    id?: SortOrder
    base_url?: SortOrder
    article_selector?: SortOrder
    title_selector?: SortOrder
    description_selector?: SortOrder
    time_selector?: SortOrder
    link_selector?: SortOrder
    image_selector?: SortOrder
    body_selector?: SortOrder
    location_selector?: SortOrder
    date_selector?: SortOrder
  }

  export type SourceSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ArticleFilterMatchCreateNestedManyWithoutArticleInput = {
    create?: XOR<ArticleFilterMatchCreateWithoutArticleInput, ArticleFilterMatchUncheckedCreateWithoutArticleInput> | ArticleFilterMatchCreateWithoutArticleInput[] | ArticleFilterMatchUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleFilterMatchCreateOrConnectWithoutArticleInput | ArticleFilterMatchCreateOrConnectWithoutArticleInput[]
    createMany?: ArticleFilterMatchCreateManyArticleInputEnvelope
    connect?: ArticleFilterMatchWhereUniqueInput | ArticleFilterMatchWhereUniqueInput[]
  }

  export type ArticleEnrichmentCreateNestedOneWithoutArticleInput = {
    create?: XOR<ArticleEnrichmentCreateWithoutArticleInput, ArticleEnrichmentUncheckedCreateWithoutArticleInput>
    connectOrCreate?: ArticleEnrichmentCreateOrConnectWithoutArticleInput
    connect?: ArticleEnrichmentWhereUniqueInput
  }

  export type ArticleEnrichmentStepCreateNestedManyWithoutArticleInput = {
    create?: XOR<ArticleEnrichmentStepCreateWithoutArticleInput, ArticleEnrichmentStepUncheckedCreateWithoutArticleInput> | ArticleEnrichmentStepCreateWithoutArticleInput[] | ArticleEnrichmentStepUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleEnrichmentStepCreateOrConnectWithoutArticleInput | ArticleEnrichmentStepCreateOrConnectWithoutArticleInput[]
    createMany?: ArticleEnrichmentStepCreateManyArticleInputEnvelope
    connect?: ArticleEnrichmentStepWhereUniqueInput | ArticleEnrichmentStepWhereUniqueInput[]
  }

  export type ArticleFilterMatchUncheckedCreateNestedManyWithoutArticleInput = {
    create?: XOR<ArticleFilterMatchCreateWithoutArticleInput, ArticleFilterMatchUncheckedCreateWithoutArticleInput> | ArticleFilterMatchCreateWithoutArticleInput[] | ArticleFilterMatchUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleFilterMatchCreateOrConnectWithoutArticleInput | ArticleFilterMatchCreateOrConnectWithoutArticleInput[]
    createMany?: ArticleFilterMatchCreateManyArticleInputEnvelope
    connect?: ArticleFilterMatchWhereUniqueInput | ArticleFilterMatchWhereUniqueInput[]
  }

  export type ArticleEnrichmentUncheckedCreateNestedOneWithoutArticleInput = {
    create?: XOR<ArticleEnrichmentCreateWithoutArticleInput, ArticleEnrichmentUncheckedCreateWithoutArticleInput>
    connectOrCreate?: ArticleEnrichmentCreateOrConnectWithoutArticleInput
    connect?: ArticleEnrichmentWhereUniqueInput
  }

  export type ArticleEnrichmentStepUncheckedCreateNestedManyWithoutArticleInput = {
    create?: XOR<ArticleEnrichmentStepCreateWithoutArticleInput, ArticleEnrichmentStepUncheckedCreateWithoutArticleInput> | ArticleEnrichmentStepCreateWithoutArticleInput[] | ArticleEnrichmentStepUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleEnrichmentStepCreateOrConnectWithoutArticleInput | ArticleEnrichmentStepCreateOrConnectWithoutArticleInput[]
    createMany?: ArticleEnrichmentStepCreateManyArticleInputEnvelope
    connect?: ArticleEnrichmentStepWhereUniqueInput | ArticleEnrichmentStepWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ArticleFilterMatchUpdateManyWithoutArticleNestedInput = {
    create?: XOR<ArticleFilterMatchCreateWithoutArticleInput, ArticleFilterMatchUncheckedCreateWithoutArticleInput> | ArticleFilterMatchCreateWithoutArticleInput[] | ArticleFilterMatchUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleFilterMatchCreateOrConnectWithoutArticleInput | ArticleFilterMatchCreateOrConnectWithoutArticleInput[]
    upsert?: ArticleFilterMatchUpsertWithWhereUniqueWithoutArticleInput | ArticleFilterMatchUpsertWithWhereUniqueWithoutArticleInput[]
    createMany?: ArticleFilterMatchCreateManyArticleInputEnvelope
    set?: ArticleFilterMatchWhereUniqueInput | ArticleFilterMatchWhereUniqueInput[]
    disconnect?: ArticleFilterMatchWhereUniqueInput | ArticleFilterMatchWhereUniqueInput[]
    delete?: ArticleFilterMatchWhereUniqueInput | ArticleFilterMatchWhereUniqueInput[]
    connect?: ArticleFilterMatchWhereUniqueInput | ArticleFilterMatchWhereUniqueInput[]
    update?: ArticleFilterMatchUpdateWithWhereUniqueWithoutArticleInput | ArticleFilterMatchUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: ArticleFilterMatchUpdateManyWithWhereWithoutArticleInput | ArticleFilterMatchUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: ArticleFilterMatchScalarWhereInput | ArticleFilterMatchScalarWhereInput[]
  }

  export type ArticleEnrichmentUpdateOneWithoutArticleNestedInput = {
    create?: XOR<ArticleEnrichmentCreateWithoutArticleInput, ArticleEnrichmentUncheckedCreateWithoutArticleInput>
    connectOrCreate?: ArticleEnrichmentCreateOrConnectWithoutArticleInput
    upsert?: ArticleEnrichmentUpsertWithoutArticleInput
    disconnect?: ArticleEnrichmentWhereInput | boolean
    delete?: ArticleEnrichmentWhereInput | boolean
    connect?: ArticleEnrichmentWhereUniqueInput
    update?: XOR<XOR<ArticleEnrichmentUpdateToOneWithWhereWithoutArticleInput, ArticleEnrichmentUpdateWithoutArticleInput>, ArticleEnrichmentUncheckedUpdateWithoutArticleInput>
  }

  export type ArticleEnrichmentStepUpdateManyWithoutArticleNestedInput = {
    create?: XOR<ArticleEnrichmentStepCreateWithoutArticleInput, ArticleEnrichmentStepUncheckedCreateWithoutArticleInput> | ArticleEnrichmentStepCreateWithoutArticleInput[] | ArticleEnrichmentStepUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleEnrichmentStepCreateOrConnectWithoutArticleInput | ArticleEnrichmentStepCreateOrConnectWithoutArticleInput[]
    upsert?: ArticleEnrichmentStepUpsertWithWhereUniqueWithoutArticleInput | ArticleEnrichmentStepUpsertWithWhereUniqueWithoutArticleInput[]
    createMany?: ArticleEnrichmentStepCreateManyArticleInputEnvelope
    set?: ArticleEnrichmentStepWhereUniqueInput | ArticleEnrichmentStepWhereUniqueInput[]
    disconnect?: ArticleEnrichmentStepWhereUniqueInput | ArticleEnrichmentStepWhereUniqueInput[]
    delete?: ArticleEnrichmentStepWhereUniqueInput | ArticleEnrichmentStepWhereUniqueInput[]
    connect?: ArticleEnrichmentStepWhereUniqueInput | ArticleEnrichmentStepWhereUniqueInput[]
    update?: ArticleEnrichmentStepUpdateWithWhereUniqueWithoutArticleInput | ArticleEnrichmentStepUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: ArticleEnrichmentStepUpdateManyWithWhereWithoutArticleInput | ArticleEnrichmentStepUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: ArticleEnrichmentStepScalarWhereInput | ArticleEnrichmentStepScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ArticleFilterMatchUncheckedUpdateManyWithoutArticleNestedInput = {
    create?: XOR<ArticleFilterMatchCreateWithoutArticleInput, ArticleFilterMatchUncheckedCreateWithoutArticleInput> | ArticleFilterMatchCreateWithoutArticleInput[] | ArticleFilterMatchUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleFilterMatchCreateOrConnectWithoutArticleInput | ArticleFilterMatchCreateOrConnectWithoutArticleInput[]
    upsert?: ArticleFilterMatchUpsertWithWhereUniqueWithoutArticleInput | ArticleFilterMatchUpsertWithWhereUniqueWithoutArticleInput[]
    createMany?: ArticleFilterMatchCreateManyArticleInputEnvelope
    set?: ArticleFilterMatchWhereUniqueInput | ArticleFilterMatchWhereUniqueInput[]
    disconnect?: ArticleFilterMatchWhereUniqueInput | ArticleFilterMatchWhereUniqueInput[]
    delete?: ArticleFilterMatchWhereUniqueInput | ArticleFilterMatchWhereUniqueInput[]
    connect?: ArticleFilterMatchWhereUniqueInput | ArticleFilterMatchWhereUniqueInput[]
    update?: ArticleFilterMatchUpdateWithWhereUniqueWithoutArticleInput | ArticleFilterMatchUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: ArticleFilterMatchUpdateManyWithWhereWithoutArticleInput | ArticleFilterMatchUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: ArticleFilterMatchScalarWhereInput | ArticleFilterMatchScalarWhereInput[]
  }

  export type ArticleEnrichmentUncheckedUpdateOneWithoutArticleNestedInput = {
    create?: XOR<ArticleEnrichmentCreateWithoutArticleInput, ArticleEnrichmentUncheckedCreateWithoutArticleInput>
    connectOrCreate?: ArticleEnrichmentCreateOrConnectWithoutArticleInput
    upsert?: ArticleEnrichmentUpsertWithoutArticleInput
    disconnect?: ArticleEnrichmentWhereInput | boolean
    delete?: ArticleEnrichmentWhereInput | boolean
    connect?: ArticleEnrichmentWhereUniqueInput
    update?: XOR<XOR<ArticleEnrichmentUpdateToOneWithWhereWithoutArticleInput, ArticleEnrichmentUpdateWithoutArticleInput>, ArticleEnrichmentUncheckedUpdateWithoutArticleInput>
  }

  export type ArticleEnrichmentStepUncheckedUpdateManyWithoutArticleNestedInput = {
    create?: XOR<ArticleEnrichmentStepCreateWithoutArticleInput, ArticleEnrichmentStepUncheckedCreateWithoutArticleInput> | ArticleEnrichmentStepCreateWithoutArticleInput[] | ArticleEnrichmentStepUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleEnrichmentStepCreateOrConnectWithoutArticleInput | ArticleEnrichmentStepCreateOrConnectWithoutArticleInput[]
    upsert?: ArticleEnrichmentStepUpsertWithWhereUniqueWithoutArticleInput | ArticleEnrichmentStepUpsertWithWhereUniqueWithoutArticleInput[]
    createMany?: ArticleEnrichmentStepCreateManyArticleInputEnvelope
    set?: ArticleEnrichmentStepWhereUniqueInput | ArticleEnrichmentStepWhereUniqueInput[]
    disconnect?: ArticleEnrichmentStepWhereUniqueInput | ArticleEnrichmentStepWhereUniqueInput[]
    delete?: ArticleEnrichmentStepWhereUniqueInput | ArticleEnrichmentStepWhereUniqueInput[]
    connect?: ArticleEnrichmentStepWhereUniqueInput | ArticleEnrichmentStepWhereUniqueInput[]
    update?: ArticleEnrichmentStepUpdateWithWhereUniqueWithoutArticleInput | ArticleEnrichmentStepUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: ArticleEnrichmentStepUpdateManyWithWhereWithoutArticleInput | ArticleEnrichmentStepUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: ArticleEnrichmentStepScalarWhereInput | ArticleEnrichmentStepScalarWhereInput[]
  }

  export type ArticleFilterMatchCreateNestedManyWithoutFilterInput = {
    create?: XOR<ArticleFilterMatchCreateWithoutFilterInput, ArticleFilterMatchUncheckedCreateWithoutFilterInput> | ArticleFilterMatchCreateWithoutFilterInput[] | ArticleFilterMatchUncheckedCreateWithoutFilterInput[]
    connectOrCreate?: ArticleFilterMatchCreateOrConnectWithoutFilterInput | ArticleFilterMatchCreateOrConnectWithoutFilterInput[]
    createMany?: ArticleFilterMatchCreateManyFilterInputEnvelope
    connect?: ArticleFilterMatchWhereUniqueInput | ArticleFilterMatchWhereUniqueInput[]
  }

  export type ArticleFilterMatchUncheckedCreateNestedManyWithoutFilterInput = {
    create?: XOR<ArticleFilterMatchCreateWithoutFilterInput, ArticleFilterMatchUncheckedCreateWithoutFilterInput> | ArticleFilterMatchCreateWithoutFilterInput[] | ArticleFilterMatchUncheckedCreateWithoutFilterInput[]
    connectOrCreate?: ArticleFilterMatchCreateOrConnectWithoutFilterInput | ArticleFilterMatchCreateOrConnectWithoutFilterInput[]
    createMany?: ArticleFilterMatchCreateManyFilterInputEnvelope
    connect?: ArticleFilterMatchWhereUniqueInput | ArticleFilterMatchWhereUniqueInput[]
  }

  export type ArticleFilterMatchUpdateManyWithoutFilterNestedInput = {
    create?: XOR<ArticleFilterMatchCreateWithoutFilterInput, ArticleFilterMatchUncheckedCreateWithoutFilterInput> | ArticleFilterMatchCreateWithoutFilterInput[] | ArticleFilterMatchUncheckedCreateWithoutFilterInput[]
    connectOrCreate?: ArticleFilterMatchCreateOrConnectWithoutFilterInput | ArticleFilterMatchCreateOrConnectWithoutFilterInput[]
    upsert?: ArticleFilterMatchUpsertWithWhereUniqueWithoutFilterInput | ArticleFilterMatchUpsertWithWhereUniqueWithoutFilterInput[]
    createMany?: ArticleFilterMatchCreateManyFilterInputEnvelope
    set?: ArticleFilterMatchWhereUniqueInput | ArticleFilterMatchWhereUniqueInput[]
    disconnect?: ArticleFilterMatchWhereUniqueInput | ArticleFilterMatchWhereUniqueInput[]
    delete?: ArticleFilterMatchWhereUniqueInput | ArticleFilterMatchWhereUniqueInput[]
    connect?: ArticleFilterMatchWhereUniqueInput | ArticleFilterMatchWhereUniqueInput[]
    update?: ArticleFilterMatchUpdateWithWhereUniqueWithoutFilterInput | ArticleFilterMatchUpdateWithWhereUniqueWithoutFilterInput[]
    updateMany?: ArticleFilterMatchUpdateManyWithWhereWithoutFilterInput | ArticleFilterMatchUpdateManyWithWhereWithoutFilterInput[]
    deleteMany?: ArticleFilterMatchScalarWhereInput | ArticleFilterMatchScalarWhereInput[]
  }

  export type ArticleFilterMatchUncheckedUpdateManyWithoutFilterNestedInput = {
    create?: XOR<ArticleFilterMatchCreateWithoutFilterInput, ArticleFilterMatchUncheckedCreateWithoutFilterInput> | ArticleFilterMatchCreateWithoutFilterInput[] | ArticleFilterMatchUncheckedCreateWithoutFilterInput[]
    connectOrCreate?: ArticleFilterMatchCreateOrConnectWithoutFilterInput | ArticleFilterMatchCreateOrConnectWithoutFilterInput[]
    upsert?: ArticleFilterMatchUpsertWithWhereUniqueWithoutFilterInput | ArticleFilterMatchUpsertWithWhereUniqueWithoutFilterInput[]
    createMany?: ArticleFilterMatchCreateManyFilterInputEnvelope
    set?: ArticleFilterMatchWhereUniqueInput | ArticleFilterMatchWhereUniqueInput[]
    disconnect?: ArticleFilterMatchWhereUniqueInput | ArticleFilterMatchWhereUniqueInput[]
    delete?: ArticleFilterMatchWhereUniqueInput | ArticleFilterMatchWhereUniqueInput[]
    connect?: ArticleFilterMatchWhereUniqueInput | ArticleFilterMatchWhereUniqueInput[]
    update?: ArticleFilterMatchUpdateWithWhereUniqueWithoutFilterInput | ArticleFilterMatchUpdateWithWhereUniqueWithoutFilterInput[]
    updateMany?: ArticleFilterMatchUpdateManyWithWhereWithoutFilterInput | ArticleFilterMatchUpdateManyWithWhereWithoutFilterInput[]
    deleteMany?: ArticleFilterMatchScalarWhereInput | ArticleFilterMatchScalarWhereInput[]
  }

  export type ArticleCreateNestedOneWithoutArticleFilterMatchInput = {
    create?: XOR<ArticleCreateWithoutArticleFilterMatchInput, ArticleUncheckedCreateWithoutArticleFilterMatchInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutArticleFilterMatchInput
    connect?: ArticleWhereUniqueInput
  }

  export type FilterCreateNestedOneWithoutArticleFilterMatchInput = {
    create?: XOR<FilterCreateWithoutArticleFilterMatchInput, FilterUncheckedCreateWithoutArticleFilterMatchInput>
    connectOrCreate?: FilterCreateOrConnectWithoutArticleFilterMatchInput
    connect?: FilterWhereUniqueInput
  }

  export type ArticleUpdateOneRequiredWithoutArticleFilterMatchNestedInput = {
    create?: XOR<ArticleCreateWithoutArticleFilterMatchInput, ArticleUncheckedCreateWithoutArticleFilterMatchInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutArticleFilterMatchInput
    upsert?: ArticleUpsertWithoutArticleFilterMatchInput
    connect?: ArticleWhereUniqueInput
    update?: XOR<XOR<ArticleUpdateToOneWithWhereWithoutArticleFilterMatchInput, ArticleUpdateWithoutArticleFilterMatchInput>, ArticleUncheckedUpdateWithoutArticleFilterMatchInput>
  }

  export type FilterUpdateOneRequiredWithoutArticleFilterMatchNestedInput = {
    create?: XOR<FilterCreateWithoutArticleFilterMatchInput, FilterUncheckedCreateWithoutArticleFilterMatchInput>
    connectOrCreate?: FilterCreateOrConnectWithoutArticleFilterMatchInput
    upsert?: FilterUpsertWithoutArticleFilterMatchInput
    connect?: FilterWhereUniqueInput
    update?: XOR<XOR<FilterUpdateToOneWithWhereWithoutArticleFilterMatchInput, FilterUpdateWithoutArticleFilterMatchInput>, FilterUncheckedUpdateWithoutArticleFilterMatchInput>
  }

  export type ArticleCreateNestedOneWithoutArticleEnrichmentInput = {
    create?: XOR<ArticleCreateWithoutArticleEnrichmentInput, ArticleUncheckedCreateWithoutArticleEnrichmentInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutArticleEnrichmentInput
    connect?: ArticleWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ArticleUpdateOneRequiredWithoutArticleEnrichmentNestedInput = {
    create?: XOR<ArticleCreateWithoutArticleEnrichmentInput, ArticleUncheckedCreateWithoutArticleEnrichmentInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutArticleEnrichmentInput
    upsert?: ArticleUpsertWithoutArticleEnrichmentInput
    connect?: ArticleWhereUniqueInput
    update?: XOR<XOR<ArticleUpdateToOneWithWhereWithoutArticleEnrichmentInput, ArticleUpdateWithoutArticleEnrichmentInput>, ArticleUncheckedUpdateWithoutArticleEnrichmentInput>
  }

  export type ArticleCreateNestedOneWithoutArticleEnrichmentStepInput = {
    create?: XOR<ArticleCreateWithoutArticleEnrichmentStepInput, ArticleUncheckedCreateWithoutArticleEnrichmentStepInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutArticleEnrichmentStepInput
    connect?: ArticleWhereUniqueInput
  }

  export type ArticleUpdateOneRequiredWithoutArticleEnrichmentStepNestedInput = {
    create?: XOR<ArticleCreateWithoutArticleEnrichmentStepInput, ArticleUncheckedCreateWithoutArticleEnrichmentStepInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutArticleEnrichmentStepInput
    upsert?: ArticleUpsertWithoutArticleEnrichmentStepInput
    connect?: ArticleWhereUniqueInput
    update?: XOR<XOR<ArticleUpdateToOneWithWhereWithoutArticleEnrichmentStepInput, ArticleUpdateWithoutArticleEnrichmentStepInput>, ArticleUncheckedUpdateWithoutArticleEnrichmentStepInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ArticleFilterMatchCreateWithoutArticleInput = {
    matched_at?: Date | string
    Filter: FilterCreateNestedOneWithoutArticleFilterMatchInput
  }

  export type ArticleFilterMatchUncheckedCreateWithoutArticleInput = {
    id?: number
    filter_id: number
    matched_at?: Date | string
  }

  export type ArticleFilterMatchCreateOrConnectWithoutArticleInput = {
    where: ArticleFilterMatchWhereUniqueInput
    create: XOR<ArticleFilterMatchCreateWithoutArticleInput, ArticleFilterMatchUncheckedCreateWithoutArticleInput>
  }

  export type ArticleFilterMatchCreateManyArticleInputEnvelope = {
    data: ArticleFilterMatchCreateManyArticleInput | ArticleFilterMatchCreateManyArticleInput[]
  }

  export type ArticleEnrichmentCreateWithoutArticleInput = {
    embedding?: string | null
    is_mna?: number | null
    acquiror?: string | null
    seller?: string | null
    target?: string | null
    deal_value?: string | null
    industry?: string | null
    extra?: string | null
    article_date?: string | null
    location?: string | null
    body?: string | null
    transaction_type?: string | null
    completed?: string | null
    log?: string | null
    summary?: string | null
    sector?: string | null
  }

  export type ArticleEnrichmentUncheckedCreateWithoutArticleInput = {
    embedding?: string | null
    is_mna?: number | null
    acquiror?: string | null
    seller?: string | null
    target?: string | null
    deal_value?: string | null
    industry?: string | null
    extra?: string | null
    article_date?: string | null
    location?: string | null
    body?: string | null
    transaction_type?: string | null
    completed?: string | null
    log?: string | null
    summary?: string | null
    sector?: string | null
  }

  export type ArticleEnrichmentCreateOrConnectWithoutArticleInput = {
    where: ArticleEnrichmentWhereUniqueInput
    create: XOR<ArticleEnrichmentCreateWithoutArticleInput, ArticleEnrichmentUncheckedCreateWithoutArticleInput>
  }

  export type ArticleEnrichmentStepCreateWithoutArticleInput = {
    step_name: string
    completed_at?: Date | string
  }

  export type ArticleEnrichmentStepUncheckedCreateWithoutArticleInput = {
    step_name: string
    completed_at?: Date | string
  }

  export type ArticleEnrichmentStepCreateOrConnectWithoutArticleInput = {
    where: ArticleEnrichmentStepWhereUniqueInput
    create: XOR<ArticleEnrichmentStepCreateWithoutArticleInput, ArticleEnrichmentStepUncheckedCreateWithoutArticleInput>
  }

  export type ArticleEnrichmentStepCreateManyArticleInputEnvelope = {
    data: ArticleEnrichmentStepCreateManyArticleInput | ArticleEnrichmentStepCreateManyArticleInput[]
  }

  export type ArticleFilterMatchUpsertWithWhereUniqueWithoutArticleInput = {
    where: ArticleFilterMatchWhereUniqueInput
    update: XOR<ArticleFilterMatchUpdateWithoutArticleInput, ArticleFilterMatchUncheckedUpdateWithoutArticleInput>
    create: XOR<ArticleFilterMatchCreateWithoutArticleInput, ArticleFilterMatchUncheckedCreateWithoutArticleInput>
  }

  export type ArticleFilterMatchUpdateWithWhereUniqueWithoutArticleInput = {
    where: ArticleFilterMatchWhereUniqueInput
    data: XOR<ArticleFilterMatchUpdateWithoutArticleInput, ArticleFilterMatchUncheckedUpdateWithoutArticleInput>
  }

  export type ArticleFilterMatchUpdateManyWithWhereWithoutArticleInput = {
    where: ArticleFilterMatchScalarWhereInput
    data: XOR<ArticleFilterMatchUpdateManyMutationInput, ArticleFilterMatchUncheckedUpdateManyWithoutArticleInput>
  }

  export type ArticleFilterMatchScalarWhereInput = {
    AND?: ArticleFilterMatchScalarWhereInput | ArticleFilterMatchScalarWhereInput[]
    OR?: ArticleFilterMatchScalarWhereInput[]
    NOT?: ArticleFilterMatchScalarWhereInput | ArticleFilterMatchScalarWhereInput[]
    id?: IntFilter<"ArticleFilterMatch"> | number
    article_id?: IntFilter<"ArticleFilterMatch"> | number
    filter_id?: IntFilter<"ArticleFilterMatch"> | number
    matched_at?: DateTimeFilter<"ArticleFilterMatch"> | Date | string
  }

  export type ArticleEnrichmentUpsertWithoutArticleInput = {
    update: XOR<ArticleEnrichmentUpdateWithoutArticleInput, ArticleEnrichmentUncheckedUpdateWithoutArticleInput>
    create: XOR<ArticleEnrichmentCreateWithoutArticleInput, ArticleEnrichmentUncheckedCreateWithoutArticleInput>
    where?: ArticleEnrichmentWhereInput
  }

  export type ArticleEnrichmentUpdateToOneWithWhereWithoutArticleInput = {
    where?: ArticleEnrichmentWhereInput
    data: XOR<ArticleEnrichmentUpdateWithoutArticleInput, ArticleEnrichmentUncheckedUpdateWithoutArticleInput>
  }

  export type ArticleEnrichmentUpdateWithoutArticleInput = {
    embedding?: NullableStringFieldUpdateOperationsInput | string | null
    is_mna?: NullableIntFieldUpdateOperationsInput | number | null
    acquiror?: NullableStringFieldUpdateOperationsInput | string | null
    seller?: NullableStringFieldUpdateOperationsInput | string | null
    target?: NullableStringFieldUpdateOperationsInput | string | null
    deal_value?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    extra?: NullableStringFieldUpdateOperationsInput | string | null
    article_date?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    transaction_type?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: NullableStringFieldUpdateOperationsInput | string | null
    log?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArticleEnrichmentUncheckedUpdateWithoutArticleInput = {
    embedding?: NullableStringFieldUpdateOperationsInput | string | null
    is_mna?: NullableIntFieldUpdateOperationsInput | number | null
    acquiror?: NullableStringFieldUpdateOperationsInput | string | null
    seller?: NullableStringFieldUpdateOperationsInput | string | null
    target?: NullableStringFieldUpdateOperationsInput | string | null
    deal_value?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    extra?: NullableStringFieldUpdateOperationsInput | string | null
    article_date?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    body?: NullableStringFieldUpdateOperationsInput | string | null
    transaction_type?: NullableStringFieldUpdateOperationsInput | string | null
    completed?: NullableStringFieldUpdateOperationsInput | string | null
    log?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArticleEnrichmentStepUpsertWithWhereUniqueWithoutArticleInput = {
    where: ArticleEnrichmentStepWhereUniqueInput
    update: XOR<ArticleEnrichmentStepUpdateWithoutArticleInput, ArticleEnrichmentStepUncheckedUpdateWithoutArticleInput>
    create: XOR<ArticleEnrichmentStepCreateWithoutArticleInput, ArticleEnrichmentStepUncheckedCreateWithoutArticleInput>
  }

  export type ArticleEnrichmentStepUpdateWithWhereUniqueWithoutArticleInput = {
    where: ArticleEnrichmentStepWhereUniqueInput
    data: XOR<ArticleEnrichmentStepUpdateWithoutArticleInput, ArticleEnrichmentStepUncheckedUpdateWithoutArticleInput>
  }

  export type ArticleEnrichmentStepUpdateManyWithWhereWithoutArticleInput = {
    where: ArticleEnrichmentStepScalarWhereInput
    data: XOR<ArticleEnrichmentStepUpdateManyMutationInput, ArticleEnrichmentStepUncheckedUpdateManyWithoutArticleInput>
  }

  export type ArticleEnrichmentStepScalarWhereInput = {
    AND?: ArticleEnrichmentStepScalarWhereInput | ArticleEnrichmentStepScalarWhereInput[]
    OR?: ArticleEnrichmentStepScalarWhereInput[]
    NOT?: ArticleEnrichmentStepScalarWhereInput | ArticleEnrichmentStepScalarWhereInput[]
    article_id?: IntFilter<"ArticleEnrichmentStep"> | number
    step_name?: StringFilter<"ArticleEnrichmentStep"> | string
    completed_at?: DateTimeFilter<"ArticleEnrichmentStep"> | Date | string
  }

  export type ArticleFilterMatchCreateWithoutFilterInput = {
    matched_at?: Date | string
    Article: ArticleCreateNestedOneWithoutArticleFilterMatchInput
  }

  export type ArticleFilterMatchUncheckedCreateWithoutFilterInput = {
    id?: number
    article_id: number
    matched_at?: Date | string
  }

  export type ArticleFilterMatchCreateOrConnectWithoutFilterInput = {
    where: ArticleFilterMatchWhereUniqueInput
    create: XOR<ArticleFilterMatchCreateWithoutFilterInput, ArticleFilterMatchUncheckedCreateWithoutFilterInput>
  }

  export type ArticleFilterMatchCreateManyFilterInputEnvelope = {
    data: ArticleFilterMatchCreateManyFilterInput | ArticleFilterMatchCreateManyFilterInput[]
  }

  export type ArticleFilterMatchUpsertWithWhereUniqueWithoutFilterInput = {
    where: ArticleFilterMatchWhereUniqueInput
    update: XOR<ArticleFilterMatchUpdateWithoutFilterInput, ArticleFilterMatchUncheckedUpdateWithoutFilterInput>
    create: XOR<ArticleFilterMatchCreateWithoutFilterInput, ArticleFilterMatchUncheckedCreateWithoutFilterInput>
  }

  export type ArticleFilterMatchUpdateWithWhereUniqueWithoutFilterInput = {
    where: ArticleFilterMatchWhereUniqueInput
    data: XOR<ArticleFilterMatchUpdateWithoutFilterInput, ArticleFilterMatchUncheckedUpdateWithoutFilterInput>
  }

  export type ArticleFilterMatchUpdateManyWithWhereWithoutFilterInput = {
    where: ArticleFilterMatchScalarWhereInput
    data: XOR<ArticleFilterMatchUpdateManyMutationInput, ArticleFilterMatchUncheckedUpdateManyWithoutFilterInput>
  }

  export type ArticleCreateWithoutArticleFilterMatchInput = {
    title?: string | null
    description?: string | null
    time?: string | null
    link: string
    image?: string | null
    created_at?: Date | string
    ArticleEnrichment?: ArticleEnrichmentCreateNestedOneWithoutArticleInput
    ArticleEnrichmentStep?: ArticleEnrichmentStepCreateNestedManyWithoutArticleInput
  }

  export type ArticleUncheckedCreateWithoutArticleFilterMatchInput = {
    id?: number
    title?: string | null
    description?: string | null
    time?: string | null
    link: string
    image?: string | null
    created_at?: Date | string
    ArticleEnrichment?: ArticleEnrichmentUncheckedCreateNestedOneWithoutArticleInput
    ArticleEnrichmentStep?: ArticleEnrichmentStepUncheckedCreateNestedManyWithoutArticleInput
  }

  export type ArticleCreateOrConnectWithoutArticleFilterMatchInput = {
    where: ArticleWhereUniqueInput
    create: XOR<ArticleCreateWithoutArticleFilterMatchInput, ArticleUncheckedCreateWithoutArticleFilterMatchInput>
  }

  export type FilterCreateWithoutArticleFilterMatchInput = {
    name?: string | null
    type: string
    value?: string | null
    active?: number
    created_at?: Date | string
  }

  export type FilterUncheckedCreateWithoutArticleFilterMatchInput = {
    id?: number
    name?: string | null
    type: string
    value?: string | null
    active?: number
    created_at?: Date | string
  }

  export type FilterCreateOrConnectWithoutArticleFilterMatchInput = {
    where: FilterWhereUniqueInput
    create: XOR<FilterCreateWithoutArticleFilterMatchInput, FilterUncheckedCreateWithoutArticleFilterMatchInput>
  }

  export type ArticleUpsertWithoutArticleFilterMatchInput = {
    update: XOR<ArticleUpdateWithoutArticleFilterMatchInput, ArticleUncheckedUpdateWithoutArticleFilterMatchInput>
    create: XOR<ArticleCreateWithoutArticleFilterMatchInput, ArticleUncheckedCreateWithoutArticleFilterMatchInput>
    where?: ArticleWhereInput
  }

  export type ArticleUpdateToOneWithWhereWithoutArticleFilterMatchInput = {
    where?: ArticleWhereInput
    data: XOR<ArticleUpdateWithoutArticleFilterMatchInput, ArticleUncheckedUpdateWithoutArticleFilterMatchInput>
  }

  export type ArticleUpdateWithoutArticleFilterMatchInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    link?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ArticleEnrichment?: ArticleEnrichmentUpdateOneWithoutArticleNestedInput
    ArticleEnrichmentStep?: ArticleEnrichmentStepUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateWithoutArticleFilterMatchInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    link?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ArticleEnrichment?: ArticleEnrichmentUncheckedUpdateOneWithoutArticleNestedInput
    ArticleEnrichmentStep?: ArticleEnrichmentStepUncheckedUpdateManyWithoutArticleNestedInput
  }

  export type FilterUpsertWithoutArticleFilterMatchInput = {
    update: XOR<FilterUpdateWithoutArticleFilterMatchInput, FilterUncheckedUpdateWithoutArticleFilterMatchInput>
    create: XOR<FilterCreateWithoutArticleFilterMatchInput, FilterUncheckedCreateWithoutArticleFilterMatchInput>
    where?: FilterWhereInput
  }

  export type FilterUpdateToOneWithWhereWithoutArticleFilterMatchInput = {
    where?: FilterWhereInput
    data: XOR<FilterUpdateWithoutArticleFilterMatchInput, FilterUncheckedUpdateWithoutArticleFilterMatchInput>
  }

  export type FilterUpdateWithoutArticleFilterMatchInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    value?: NullableStringFieldUpdateOperationsInput | string | null
    active?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FilterUncheckedUpdateWithoutArticleFilterMatchInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    value?: NullableStringFieldUpdateOperationsInput | string | null
    active?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCreateWithoutArticleEnrichmentInput = {
    title?: string | null
    description?: string | null
    time?: string | null
    link: string
    image?: string | null
    created_at?: Date | string
    ArticleFilterMatch?: ArticleFilterMatchCreateNestedManyWithoutArticleInput
    ArticleEnrichmentStep?: ArticleEnrichmentStepCreateNestedManyWithoutArticleInput
  }

  export type ArticleUncheckedCreateWithoutArticleEnrichmentInput = {
    id?: number
    title?: string | null
    description?: string | null
    time?: string | null
    link: string
    image?: string | null
    created_at?: Date | string
    ArticleFilterMatch?: ArticleFilterMatchUncheckedCreateNestedManyWithoutArticleInput
    ArticleEnrichmentStep?: ArticleEnrichmentStepUncheckedCreateNestedManyWithoutArticleInput
  }

  export type ArticleCreateOrConnectWithoutArticleEnrichmentInput = {
    where: ArticleWhereUniqueInput
    create: XOR<ArticleCreateWithoutArticleEnrichmentInput, ArticleUncheckedCreateWithoutArticleEnrichmentInput>
  }

  export type ArticleUpsertWithoutArticleEnrichmentInput = {
    update: XOR<ArticleUpdateWithoutArticleEnrichmentInput, ArticleUncheckedUpdateWithoutArticleEnrichmentInput>
    create: XOR<ArticleCreateWithoutArticleEnrichmentInput, ArticleUncheckedCreateWithoutArticleEnrichmentInput>
    where?: ArticleWhereInput
  }

  export type ArticleUpdateToOneWithWhereWithoutArticleEnrichmentInput = {
    where?: ArticleWhereInput
    data: XOR<ArticleUpdateWithoutArticleEnrichmentInput, ArticleUncheckedUpdateWithoutArticleEnrichmentInput>
  }

  export type ArticleUpdateWithoutArticleEnrichmentInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    link?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ArticleFilterMatch?: ArticleFilterMatchUpdateManyWithoutArticleNestedInput
    ArticleEnrichmentStep?: ArticleEnrichmentStepUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateWithoutArticleEnrichmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    link?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ArticleFilterMatch?: ArticleFilterMatchUncheckedUpdateManyWithoutArticleNestedInput
    ArticleEnrichmentStep?: ArticleEnrichmentStepUncheckedUpdateManyWithoutArticleNestedInput
  }

  export type ArticleCreateWithoutArticleEnrichmentStepInput = {
    title?: string | null
    description?: string | null
    time?: string | null
    link: string
    image?: string | null
    created_at?: Date | string
    ArticleFilterMatch?: ArticleFilterMatchCreateNestedManyWithoutArticleInput
    ArticleEnrichment?: ArticleEnrichmentCreateNestedOneWithoutArticleInput
  }

  export type ArticleUncheckedCreateWithoutArticleEnrichmentStepInput = {
    id?: number
    title?: string | null
    description?: string | null
    time?: string | null
    link: string
    image?: string | null
    created_at?: Date | string
    ArticleFilterMatch?: ArticleFilterMatchUncheckedCreateNestedManyWithoutArticleInput
    ArticleEnrichment?: ArticleEnrichmentUncheckedCreateNestedOneWithoutArticleInput
  }

  export type ArticleCreateOrConnectWithoutArticleEnrichmentStepInput = {
    where: ArticleWhereUniqueInput
    create: XOR<ArticleCreateWithoutArticleEnrichmentStepInput, ArticleUncheckedCreateWithoutArticleEnrichmentStepInput>
  }

  export type ArticleUpsertWithoutArticleEnrichmentStepInput = {
    update: XOR<ArticleUpdateWithoutArticleEnrichmentStepInput, ArticleUncheckedUpdateWithoutArticleEnrichmentStepInput>
    create: XOR<ArticleCreateWithoutArticleEnrichmentStepInput, ArticleUncheckedCreateWithoutArticleEnrichmentStepInput>
    where?: ArticleWhereInput
  }

  export type ArticleUpdateToOneWithWhereWithoutArticleEnrichmentStepInput = {
    where?: ArticleWhereInput
    data: XOR<ArticleUpdateWithoutArticleEnrichmentStepInput, ArticleUncheckedUpdateWithoutArticleEnrichmentStepInput>
  }

  export type ArticleUpdateWithoutArticleEnrichmentStepInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    link?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ArticleFilterMatch?: ArticleFilterMatchUpdateManyWithoutArticleNestedInput
    ArticleEnrichment?: ArticleEnrichmentUpdateOneWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateWithoutArticleEnrichmentStepInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableStringFieldUpdateOperationsInput | string | null
    link?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ArticleFilterMatch?: ArticleFilterMatchUncheckedUpdateManyWithoutArticleNestedInput
    ArticleEnrichment?: ArticleEnrichmentUncheckedUpdateOneWithoutArticleNestedInput
  }

  export type ArticleFilterMatchCreateManyArticleInput = {
    id?: number
    filter_id: number
    matched_at?: Date | string
  }

  export type ArticleEnrichmentStepCreateManyArticleInput = {
    step_name: string
    completed_at?: Date | string
  }

  export type ArticleFilterMatchUpdateWithoutArticleInput = {
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    Filter?: FilterUpdateOneRequiredWithoutArticleFilterMatchNestedInput
  }

  export type ArticleFilterMatchUncheckedUpdateWithoutArticleInput = {
    id?: IntFieldUpdateOperationsInput | number
    filter_id?: IntFieldUpdateOperationsInput | number
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleFilterMatchUncheckedUpdateManyWithoutArticleInput = {
    id?: IntFieldUpdateOperationsInput | number
    filter_id?: IntFieldUpdateOperationsInput | number
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleEnrichmentStepUpdateWithoutArticleInput = {
    step_name?: StringFieldUpdateOperationsInput | string
    completed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleEnrichmentStepUncheckedUpdateWithoutArticleInput = {
    step_name?: StringFieldUpdateOperationsInput | string
    completed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleEnrichmentStepUncheckedUpdateManyWithoutArticleInput = {
    step_name?: StringFieldUpdateOperationsInput | string
    completed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleFilterMatchCreateManyFilterInput = {
    id?: number
    article_id: number
    matched_at?: Date | string
  }

  export type ArticleFilterMatchUpdateWithoutFilterInput = {
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
    Article?: ArticleUpdateOneRequiredWithoutArticleFilterMatchNestedInput
  }

  export type ArticleFilterMatchUncheckedUpdateWithoutFilterInput = {
    id?: IntFieldUpdateOperationsInput | number
    article_id?: IntFieldUpdateOperationsInput | number
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleFilterMatchUncheckedUpdateManyWithoutFilterInput = {
    id?: IntFieldUpdateOperationsInput | number
    article_id?: IntFieldUpdateOperationsInput | number
    matched_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ArticleCountOutputTypeDefaultArgs instead
     */
    export type ArticleCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ArticleCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FilterCountOutputTypeDefaultArgs instead
     */
    export type FilterCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FilterCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ArticleDefaultArgs instead
     */
    export type ArticleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ArticleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FilterDefaultArgs instead
     */
    export type FilterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FilterDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ArticleFilterMatchDefaultArgs instead
     */
    export type ArticleFilterMatchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ArticleFilterMatchDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ArticleEnrichmentDefaultArgs instead
     */
    export type ArticleEnrichmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ArticleEnrichmentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ArticleEnrichmentStepDefaultArgs instead
     */
    export type ArticleEnrichmentStepArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ArticleEnrichmentStepDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PromptDefaultArgs instead
     */
    export type PromptArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PromptDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SourceDefaultArgs instead
     */
    export type SourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SourceDefaultArgs<ExtArgs>

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