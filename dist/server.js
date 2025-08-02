#!/usr/bin/env node
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/server/SvgMcpServer.ts
import { FastMCP } from "fastmcp";

// node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});

// node_modules/zod/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class _ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// node_modules/zod/v3/locales/en.js
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var en_default = errorMap;

// node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}

// node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

// node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {
      } else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new _ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
var NEVER = INVALID;

// src/utils/logger.ts
var Logger = class {
  logLevel;
  constructor(logLevel = "info") {
    this.logLevel = logLevel;
  }
  shouldLog(level) {
    const levels = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3
    };
    return levels[level] >= levels[this.logLevel];
  }
  formatMessage(level, message, data) {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const prefix = `[${timestamp}] ${level.toUpperCase()}:`;
    if (data !== void 0) {
      return `${prefix} ${message} ${JSON.stringify(data, null, 2)}`;
    }
    return `${prefix} ${message}`;
  }
  writeLog(level, message, data) {
    if (!this.shouldLog(level)) {
      return;
    }
    const formattedMessage = this.formatMessage(level, message, data);
    switch (level) {
      case "debug":
        console.debug(formattedMessage);
        break;
      case "info":
        console.info(formattedMessage);
        break;
      case "warn":
        console.warn(formattedMessage);
        break;
      case "error":
        console.error(formattedMessage);
        break;
    }
  }
  debug(message, data) {
    this.writeLog("debug", message, data);
  }
  info(message, data) {
    this.writeLog("info", message, data);
  }
  warn(message, data) {
    this.writeLog("warn", message, data);
  }
  error(message, data) {
    this.writeLog("error", message, data);
  }
  setLogLevel(level) {
    this.logLevel = level;
  }
  getLogLevel() {
    return this.logLevel;
  }
};
var logger = new Logger(
  process.env.LOG_LEVEL || "info"
);

// src/types/svg.ts
var PointSchema = external_exports.object({
  x: external_exports.number(),
  y: external_exports.number()
});
var SizeSchema = external_exports.object({
  width: external_exports.number().positive(),
  height: external_exports.number().positive()
});
var ViewBoxSchema = external_exports.object({
  x: external_exports.number(),
  y: external_exports.number(),
  width: external_exports.number().positive(),
  height: external_exports.number().positive()
});
var SvgStyleSchema = external_exports.object({
  fill: external_exports.string().optional(),
  stroke: external_exports.string().optional(),
  strokeWidth: external_exports.number().positive().optional(),
  strokeLinecap: external_exports.enum(["butt", "round", "square"]).optional(),
  strokeLinejoin: external_exports.enum(["miter", "round", "bevel"]).optional(),
  strokeDasharray: external_exports.string().optional(),
  opacity: external_exports.number().min(0).max(1).optional(),
  fillOpacity: external_exports.number().min(0).max(1).optional(),
  strokeOpacity: external_exports.number().min(0).max(1).optional()
});
var TextStyleSchema = SvgStyleSchema.extend({
  fontFamily: external_exports.string().optional(),
  fontSize: external_exports.number().positive().optional(),
  fontWeight: external_exports.union([
    external_exports.enum(["normal", "bold", "bolder", "lighter"]),
    external_exports.number()
  ]).optional(),
  fontStyle: external_exports.enum(["normal", "italic", "oblique"]).optional(),
  textAnchor: external_exports.enum(["start", "middle", "end"]).optional(),
  dominantBaseline: external_exports.string().optional()
});
var SvgValidationError = class extends Error {
  constructor(message, details) {
    super(message);
    this.details = details;
    this.name = "SvgValidationError";
  }
};
var SvgRenderError = class extends Error {
  constructor(message, element) {
    super(message);
    this.element = element;
    this.name = "SvgRenderError";
  }
};

// src/core/SvgRenderer.ts
var SvgRenderer = class {
  supportedElements = [
    "circle",
    "rect",
    "line",
    "path",
    "text",
    "group"
  ];
  getSupportedElements() {
    return [...this.supportedElements];
  }
  getCapabilities() {
    return {
      basicShapes: true,
      paths: true,
      text: true,
      groups: true,
      styling: true,
      transforms: true,
      optimization: true
    };
  }
  async render(document, options = {}) {
    const {
      optimize = true,
      indent = false,
      minify = false
    } = options;
    try {
      logger.debug("Starting SVG rendering", { document, options });
      let svg = this.renderDocument(document, { indent, minify });
      if (optimize) {
        svg = this.optimizeSvg(svg);
      }
      logger.debug("SVG rendering completed", {
        size: svg.length,
        optimized: optimize
      });
      return svg;
    } catch (error) {
      logger.error("SVG rendering failed", error);
      throw new SvgRenderError(
        `Failed to render SVG: ${error instanceof Error ? error.message : "Unknown error"}`,
        document.elements[0]
      );
    }
  }
  renderDocument(document, options) {
    const { indent, minify } = options;
    const newline = minify ? "" : "\n";
    const indentStr = indent && !minify ? "  " : "";
    const { viewBox, width, height } = document;
    const viewBoxAttr = `viewBox="${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}"`;
    const widthAttr = width ? ` width="${width}"` : "";
    const heightAttr = height ? ` height="${height}"` : "";
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" ${viewBoxAttr}${widthAttr}${heightAttr}>`;
    if (document.title) {
      svg += `${newline}${indentStr}<title>${this.escapeXml(document.title)}</title>`;
    }
    if (document.description) {
      svg += `${newline}${indentStr}<desc>${this.escapeXml(document.description)}</desc>`;
    }
    if (document.defs && document.defs.length > 0) {
      svg += `${newline}${indentStr}<defs>`;
      document.defs.forEach((def) => {
        svg += `${newline}${indentStr}${indentStr}${def.content}`;
      });
      svg += `${newline}${indentStr}</defs>`;
    }
    if (document.style) {
      svg += `${newline}${indentStr}<style>${document.style}</style>`;
    }
    document.elements.forEach((element) => {
      svg += newline + this.renderElement(element, indentStr, { indent, minify });
    });
    svg += `${newline}</svg>`;
    return svg;
  }
  renderElement(element, baseIndent, options) {
    const { indent, minify } = options;
    const indentStr = indent && !minify ? baseIndent + "  " : baseIndent;
    try {
      switch (element.type) {
        case "circle":
          return this.renderCircle(element, indentStr);
        case "rect":
          return this.renderRect(element, indentStr);
        case "line":
          return this.renderLine(element, indentStr);
        case "path":
          return this.renderPath(element, indentStr);
        case "text":
          return this.renderText(element, indentStr);
        case "group":
          return this.renderGroup(element, indentStr, options);
        default:
          throw new SvgRenderError(`Unsupported element type: ${element.type}`, element);
      }
    } catch (error) {
      logger.error(`Failed to render element`, { element, error });
      throw error;
    }
  }
  renderCircle(element, indent) {
    const { cx, cy, r } = element;
    const attrs = this.buildCommonAttributes(element);
    return `${indent}<circle cx="${cx}" cy="${cy}" r="${r}"${attrs} />`;
  }
  renderRect(element, indent) {
    const { x, y, width, height, rx, ry } = element;
    let attrs = this.buildCommonAttributes(element);
    if (rx !== void 0)
      attrs += ` rx="${rx}"`;
    if (ry !== void 0)
      attrs += ` ry="${ry}"`;
    return `${indent}<rect x="${x}" y="${y}" width="${width}" height="${height}"${attrs} />`;
  }
  renderLine(element, indent) {
    const { x1, y1, x2, y2 } = element;
    const attrs = this.buildCommonAttributes(element);
    return `${indent}<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${attrs} />`;
  }
  renderPath(element, indent) {
    const { d } = element;
    const attrs = this.buildCommonAttributes(element);
    return `${indent}<path d="${d}"${attrs} />`;
  }
  renderText(element, indent) {
    const { x, y, content } = element;
    const attrs = this.buildCommonAttributes(element);
    const escapedContent = this.escapeXml(content);
    return `${indent}<text x="${x}" y="${y}"${attrs}>${escapedContent}</text>`;
  }
  renderGroup(element, indent, options) {
    const { children } = element;
    const { minify } = options;
    const newline = minify ? "" : "\n";
    const attrs = this.buildCommonAttributes(element);
    let result = `${indent}<g${attrs}>`;
    children.forEach((child) => {
      result += newline + this.renderElement(child, indent, options);
    });
    result += `${newline}${indent}</g>`;
    return result;
  }
  buildCommonAttributes(element) {
    let attrs = "";
    if (element.id) {
      attrs += ` id="${this.escapeAttribute(element.id)}"`;
    }
    if (element.className) {
      attrs += ` class="${this.escapeAttribute(element.className)}"`;
    }
    if (element.transform) {
      attrs += ` transform="${this.escapeAttribute(element.transform)}"`;
    }
    if (element.clipPath) {
      attrs += ` clip-path="${this.escapeAttribute(element.clipPath)}"`;
    }
    if (element.mask) {
      attrs += ` mask="${this.escapeAttribute(element.mask)}"`;
    }
    if (element.style) {
      const styleStr = this.buildStyleString(element.style);
      if (styleStr) {
        attrs += ` style="${styleStr}"`;
      }
    }
    return attrs;
  }
  buildStyleString(style) {
    const parts = [];
    Object.entries(style).forEach(([key, value]) => {
      if (value !== void 0 && value !== null) {
        const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        parts.push(`${kebabKey}:${value}`);
      }
    });
    return parts.join(";");
  }
  optimizeSvg(svg) {
    let optimized = svg;
    optimized = optimized.replace(/>\s+</g, "><");
    optimized = optimized.replace(/\s+style=""/g, "");
    optimized = optimized.replace(/\s+([a-z-]+)="/g, ' $1="');
    logger.debug("SVG optimization completed", {
      originalSize: svg.length,
      optimizedSize: optimized.length,
      reduction: svg.length - optimized.length
    });
    return optimized;
  }
  escapeXml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  escapeAttribute(value) {
    return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  }
};

// src/core/validation/ElementValidators.ts
var BaseElementValidator = class {
  errors = [];
  warnings = [];
  suggestions = [];
  addError(code, message, element, property, value) {
    const error = {
      code,
      message,
      severity: "error"
    };
    if (element !== void 0)
      error.element = element;
    if (property !== void 0)
      error.property = property;
    if (value !== void 0)
      error.value = value;
    this.errors.push(error);
  }
  addWarning(code, message, element, property, value) {
    const warning = {
      code,
      message,
      severity: "warning"
    };
    if (element !== void 0)
      warning.element = element;
    if (property !== void 0)
      warning.property = property;
    if (value !== void 0)
      warning.value = value;
    this.warnings.push(warning);
  }
  addSuggestion(code, message, suggestion, element, property) {
    const sug = {
      code,
      message,
      suggestion,
      severity: "info"
    };
    if (element !== void 0)
      sug.element = element;
    if (property !== void 0)
      sug.property = property;
    this.suggestions.push(sug);
  }
  reset() {
    this.errors = [];
    this.warnings = [];
    this.suggestions = [];
  }
  validateCommonProperties(element) {
    if (element.id && element.id.trim() === "") {
      this.addError("INVALID_ID", "Element ID cannot be empty", element, "id", element.id);
    }
    if (element.className && !this.isValidClassName(element.className)) {
      this.addWarning("INVALID_CLASS_NAME", "Class name contains invalid characters", element, "className", element.className);
    }
    if (element.transform && !this.isValidTransform(element.transform)) {
      this.addError("INVALID_TRANSFORM", "Transform contains invalid syntax", element, "transform", element.transform);
    }
    if (element.style) {
      this.validateStyleProperties(element);
    }
  }
  isValidClassName(className) {
    return /^[a-zA-Z][\w\-]*$/.test(className);
  }
  isValidTransform(transform) {
    const transformFunctions = /^(matrix|translate|scale|rotate|skewX|skewY)\s*\([^)]*\)(\s+(matrix|translate|scale|rotate|skewX|skewY)\s*\([^)]*\))*\s*$/;
    return transformFunctions.test(transform.trim());
  }
  validateStyleProperties(element) {
    const style = element.style;
    if (style.opacity !== void 0 && (style.opacity < 0 || style.opacity > 1)) {
      this.addError("INVALID_OPACITY", "Opacity must be between 0 and 1", element, "style.opacity", style.opacity);
    }
    if (style.fillOpacity !== void 0 && (style.fillOpacity < 0 || style.fillOpacity > 1)) {
      this.addError("INVALID_FILL_OPACITY", "Fill opacity must be between 0 and 1", element, "style.fillOpacity", style.fillOpacity);
    }
    if (style.strokeOpacity !== void 0 && (style.strokeOpacity < 0 || style.strokeOpacity > 1)) {
      this.addError("INVALID_STROKE_OPACITY", "Stroke opacity must be between 0 and 1", element, "style.strokeOpacity", style.strokeOpacity);
    }
    if (style.strokeWidth !== void 0 && style.strokeWidth < 0) {
      this.addError("INVALID_STROKE_WIDTH", "Stroke width cannot be negative", element, "style.strokeWidth", style.strokeWidth);
    }
    if (style.fill && !this.isValidColor(style.fill)) {
      this.addWarning("INVALID_COLOR_FORMAT", "Fill color format may not be valid", element, "style.fill", style.fill);
    }
    if (style.stroke && !this.isValidColor(style.stroke)) {
      this.addWarning("INVALID_COLOR_FORMAT", "Stroke color format may not be valid", element, "style.stroke", style.stroke);
    }
  }
  isValidColor(color) {
    const colorPatterns = [
      /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/,
      // hex
      /^rgb\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/,
      // rgb
      /^rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0|1|0?\.\d+)\s*\)$/,
      // rgba
      /^hsl\s*\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/,
      // hsl
      /^hsla\s*\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*(0|1|0?\.\d+)\s*\)$/
      // hsla
    ];
    if (["none", "transparent", "currentColor"].includes(color)) {
      return true;
    }
    const namedColors = ["red", "green", "blue", "black", "white", "yellow", "orange", "purple", "pink", "brown", "gray", "grey"];
    if (namedColors.includes(color.toLowerCase())) {
      return true;
    }
    return colorPatterns.some((pattern) => pattern.test(color));
  }
};
var CircleValidator = class extends BaseElementValidator {
  validate(element, _context) {
    this.reset();
    if (element.type !== "circle") {
      this.addError("WRONG_ELEMENT_TYPE", `Expected circle element, got ${element.type}`, element);
      return this.getResult();
    }
    const circle = element;
    this.validateCommonProperties(circle);
    this.validateRadius(circle);
    this.validateCenter(circle);
    this.checkVisibility(circle);
    this.checkPerformance(circle);
    return this.getResult();
  }
  validateRadius(circle) {
    if (circle.r < 0) {
      this.addError("NEGATIVE_RADIUS", "Circle radius cannot be negative", circle, "r", circle.r);
    } else if (circle.r === 0) {
      this.addWarning("ZERO_RADIUS", "Circle with zero radius will not be visible", circle, "r", circle.r);
    } else if (circle.r > 1e4) {
      this.addWarning("LARGE_RADIUS", "Very large radius may impact performance", circle, "r", circle.r);
    }
  }
  validateCenter(circle) {
    if (!Number.isFinite(circle.cx) || !Number.isFinite(circle.cy)) {
      this.addError("INVALID_CENTER", "Circle center coordinates must be finite numbers", circle, "cx,cy", { cx: circle.cx, cy: circle.cy });
    }
    if (Math.abs(circle.cx) > 1e6 || Math.abs(circle.cy) > 1e6) {
      this.addWarning("EXTREME_COORDINATES", "Circle center coordinates are very large", circle, "cx,cy", { cx: circle.cx, cy: circle.cy });
    }
  }
  checkVisibility(circle) {
    const style = circle.style;
    if (style?.fill === "none" && (!style?.stroke || style.stroke === "none")) {
      this.addWarning("INVISIBLE_ELEMENT", "Circle has no fill or stroke and will not be visible", circle);
    }
  }
  checkPerformance(circle) {
    if (circle.r > 1e3 && circle.style?.strokeDasharray) {
      this.addSuggestion("PERFORMANCE_OPTIMIZATION", "Large circle with stroke dash array may impact performance", "Consider simplifying the stroke pattern or reducing the radius", circle);
    }
  }
  getResult() {
    return {
      valid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      suggestions: this.suggestions
    };
  }
};
var RectValidator = class extends BaseElementValidator {
  validate(element, _context) {
    this.reset();
    if (element.type !== "rect") {
      this.addError("WRONG_ELEMENT_TYPE", `Expected rect element, got ${element.type}`, element);
      return this.getResult();
    }
    const rect = element;
    this.validateCommonProperties(rect);
    this.validateDimensions(rect);
    this.validatePosition(rect);
    this.validateCornerRadius(rect);
    this.checkVisibility(rect);
    return this.getResult();
  }
  validateDimensions(rect) {
    if (rect.width < 0) {
      this.addError("NEGATIVE_WIDTH", "Rectangle width cannot be negative", rect, "width", rect.width);
    } else if (rect.width === 0) {
      this.addWarning("ZERO_WIDTH", "Rectangle with zero width will not be visible", rect, "width", rect.width);
    }
    if (rect.height < 0) {
      this.addError("NEGATIVE_HEIGHT", "Rectangle height cannot be negative", rect, "height", rect.height);
    } else if (rect.height === 0) {
      this.addWarning("ZERO_HEIGHT", "Rectangle with zero height will not be visible", rect, "height", rect.height);
    }
    if (rect.width > 1e4 || rect.height > 1e4) {
      this.addWarning("LARGE_DIMENSIONS", "Very large rectangle dimensions may impact performance", rect, "width,height", { width: rect.width, height: rect.height });
    }
  }
  validatePosition(rect) {
    if (!Number.isFinite(rect.x) || !Number.isFinite(rect.y)) {
      this.addError("INVALID_POSITION", "Rectangle position coordinates must be finite numbers", rect, "x,y", { x: rect.x, y: rect.y });
    }
  }
  validateCornerRadius(rect) {
    if (rect.rx !== void 0) {
      if (rect.rx < 0) {
        this.addError("NEGATIVE_CORNER_RADIUS", "Corner radius rx cannot be negative", rect, "rx", rect.rx);
      } else if (rect.rx > rect.width / 2) {
        this.addWarning("EXCESSIVE_CORNER_RADIUS", "Corner radius rx is larger than half the width", rect, "rx", rect.rx);
      }
    }
    if (rect.ry !== void 0) {
      if (rect.ry < 0) {
        this.addError("NEGATIVE_CORNER_RADIUS", "Corner radius ry cannot be negative", rect, "ry", rect.ry);
      } else if (rect.ry > rect.height / 2) {
        this.addWarning("EXCESSIVE_CORNER_RADIUS", "Corner radius ry is larger than half the height", rect, "ry", rect.ry);
      }
    }
  }
  checkVisibility(rect) {
    const style = rect.style;
    if (style?.fill === "none" && (!style?.stroke || style.stroke === "none")) {
      this.addWarning("INVISIBLE_ELEMENT", "Rectangle has no fill or stroke and will not be visible", rect);
    }
  }
  getResult() {
    return {
      valid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      suggestions: this.suggestions
    };
  }
};
var LineValidator = class extends BaseElementValidator {
  validate(element, _context) {
    this.reset();
    if (element.type !== "line") {
      this.addError("WRONG_ELEMENT_TYPE", `Expected line element, got ${element.type}`, element);
      return this.getResult();
    }
    const line = element;
    this.validateCommonProperties(line);
    this.validateCoordinates(line);
    this.checkLineLength(line);
    this.checkVisibility(line);
    return this.getResult();
  }
  validateCoordinates(line) {
    const coords = [line.x1, line.y1, line.x2, line.y2];
    for (const [index, coord] of coords.entries()) {
      if (!Number.isFinite(coord)) {
        const coordName = ["x1", "y1", "x2", "y2"][index];
        this.addError("INVALID_COORDINATE", `Line coordinate ${coordName} must be a finite number`, line, coordName, coord);
      }
    }
  }
  checkLineLength(line) {
    const length = Math.sqrt(Math.pow(line.x2 - line.x1, 2) + Math.pow(line.y2 - line.y1, 2));
    if (length === 0) {
      this.addWarning("ZERO_LENGTH_LINE", "Line has zero length and will not be visible", line);
    } else if (length > 1e4) {
      this.addWarning("VERY_LONG_LINE", "Very long line may impact performance", line);
    }
  }
  checkVisibility(line) {
    const style = line.style;
    if (!style?.stroke || style.stroke === "none") {
      this.addWarning("INVISIBLE_LINE", "Line has no stroke and will not be visible", line);
    }
  }
  getResult() {
    return {
      valid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      suggestions: this.suggestions
    };
  }
};
var PathValidator = class extends BaseElementValidator {
  validate(element, _context) {
    this.reset();
    if (element.type !== "path") {
      this.addError("WRONG_ELEMENT_TYPE", `Expected path element, got ${element.type}`, element);
      return this.getResult();
    }
    const path = element;
    this.validateCommonProperties(path);
    this.validatePathData(path);
    this.checkComplexity(path);
    this.checkVisibility(path);
    return this.getResult();
  }
  validatePathData(path) {
    if (!path.d || path.d.trim() === "") {
      this.addError("EMPTY_PATH_DATA", "Path data (d attribute) cannot be empty", path, "d", path.d);
      return;
    }
    const pathCommands = /^[MmLlHhVvCcSsQqTtAaZz\d\s,.-]+$/;
    if (!pathCommands.test(path.d)) {
      this.addError("INVALID_PATH_DATA", "Path data contains invalid characters", path, "d", path.d);
    }
    if (!this.hasValidPathStructure(path.d)) {
      this.addWarning("QUESTIONABLE_PATH_STRUCTURE", "Path data structure may be malformed", path, "d", path.d);
    }
  }
  hasValidPathStructure(pathData) {
    const trimmed = pathData.trim();
    return /^[Mm]/.test(trimmed);
  }
  checkComplexity(path) {
    if (path.d.length > 1e4) {
      this.addWarning("COMPLEX_PATH", "Very long path data may impact performance", path, "d");
      this.addSuggestion("OPTIMIZE_PATH", "Path is very complex", "Consider simplifying the path or breaking it into smaller segments", path, "d");
    }
    const commandCount = (path.d.match(/[MmLlHhVvCcSsQqTtAaZz]/g) || []).length;
    if (commandCount > 1e3) {
      this.addWarning("HIGH_COMMAND_COUNT", "Path has many commands and may impact performance", path, "d");
    }
  }
  checkVisibility(path) {
    const style = path.style;
    if (style?.fill === "none" && (!style?.stroke || style.stroke === "none")) {
      this.addWarning("INVISIBLE_ELEMENT", "Path has no fill or stroke and will not be visible", path);
    }
  }
  getResult() {
    return {
      valid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      suggestions: this.suggestions
    };
  }
};
var TextValidator = class extends BaseElementValidator {
  validate(element, _context) {
    this.reset();
    if (element.type !== "text") {
      this.addError("WRONG_ELEMENT_TYPE", `Expected text element, got ${element.type}`, element);
      return this.getResult();
    }
    const text = element;
    this.validateCommonProperties(text);
    this.validateContent(text);
    this.validatePosition(text);
    this.validateTextStyle(text);
    this.checkAccessibility(text);
    return this.getResult();
  }
  validateContent(text) {
    if (!text.content || text.content.trim() === "") {
      this.addWarning("EMPTY_TEXT_CONTENT", "Text element has no content", text, "content", text.content);
    }
    if (text.content && text.content.length > 1e4) {
      this.addWarning("VERY_LONG_TEXT", "Very long text content may impact performance", text, "content");
    }
  }
  validatePosition(text) {
    if (!Number.isFinite(text.x) || !Number.isFinite(text.y)) {
      this.addError("INVALID_POSITION", "Text position coordinates must be finite numbers", text, "x,y", { x: text.x, y: text.y });
    }
  }
  validateTextStyle(text) {
    const style = text.style;
    if (!style)
      return;
    if (style.fontSize !== void 0 && style.fontSize <= 0) {
      this.addError("INVALID_FONT_SIZE", "Font size must be positive", text, "style.fontSize", style.fontSize);
    }
    if (style.fontSize !== void 0 && style.fontSize > 1e3) {
      this.addWarning("VERY_LARGE_FONT", "Very large font size may impact layout", text, "style.fontSize", style.fontSize);
    }
  }
  checkAccessibility(text) {
    const style = text.style;
    if (style?.fill && style.fill === style?.stroke) {
      this.addWarning("LOW_CONTRAST", "Text fill and stroke colors are the same, may reduce readability", text);
    }
    if (style?.fontSize && style.fontSize < 8) {
      this.addSuggestion("ACCESSIBILITY_IMPROVEMENT", "Very small text may be hard to read", "Consider increasing font size for better accessibility", text, "style.fontSize");
    }
  }
  getResult() {
    return {
      valid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      suggestions: this.suggestions
    };
  }
};
var GroupValidator = class extends BaseElementValidator {
  validate(element, context) {
    this.reset();
    if (element.type !== "group") {
      this.addError("WRONG_ELEMENT_TYPE", `Expected group element, got ${element.type}`, element);
      return this.getResult();
    }
    const group = element;
    this.validateCommonProperties(group);
    this.validateChildren(group, context);
    this.checkNesting(group, context);
    return this.getResult();
  }
  validateChildren(group, _context) {
    if (!group.children || group.children.length === 0) {
      this.addWarning("EMPTY_GROUP", "Group element has no children", group, "children");
    }
    if (group.children && group.children.length > 1e3) {
      this.addWarning("LARGE_GROUP", "Group has many children and may impact performance", group, "children");
    }
  }
  checkNesting(group, context) {
    if (context?.parentElement?.type === "group") {
      const nestingDepth = 1;
      if (nestingDepth > 10) {
        this.addWarning("DEEP_NESTING", "Deep group nesting may impact performance", group);
      }
    }
  }
  getResult() {
    return {
      valid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      suggestions: this.suggestions
    };
  }
};
var ElementValidatorFactory = class {
  static validators = /* @__PURE__ */ new Map([
    ["circle", new CircleValidator()],
    ["rect", new RectValidator()],
    ["line", new LineValidator()],
    ["path", new PathValidator()],
    ["text", new TextValidator()],
    ["group", new GroupValidator()]
  ]);
  static getValidator(elementType) {
    return this.validators.get(elementType) || null;
  }
  static validateElement(element, context) {
    const validator = this.getValidator(element.type);
    if (!validator) {
      return {
        valid: false,
        errors: [{
          code: "UNKNOWN_ELEMENT_TYPE",
          message: `Unknown element type: ${element.type}`,
          element,
          severity: "error"
        }],
        warnings: [],
        suggestions: []
      };
    }
    return validator.validate(element, context);
  }
  static getSupportedElementTypes() {
    return Array.from(this.validators.keys());
  }
};

// src/core/validation/DocumentValidator.ts
var DocumentValidator = class {
  options;
  constructor(options = {}) {
    this.options = {
      checkAccessibility: true,
      checkPerformance: true,
      checkCompliance: true,
      targetCompliance: "svg20",
      maxElements: 1e4,
      maxNestingDepth: 20,
      allowUnknownElements: false,
      ...options
    };
  }
  /**
   * Validate an entire SVG document
   */
  async validateDocument(document) {
    const errors = [];
    const warnings = [];
    const suggestions = [];
    const elementResults = /* @__PURE__ */ new Map();
    this.validateDocumentStructure(document, errors, warnings);
    const context = this.buildValidationContext(document);
    this.validateViewBox(document.viewBox, errors, warnings);
    document.elements.forEach((element, index) => {
      const elementContext = {
        elementIndex: index,
        siblingElements: document.elements,
        documentIds: context.documentIds,
        referencedIds: context.referencedIds
      };
      const result = ElementValidatorFactory.validateElement(element, elementContext);
      elementResults.set(index, result);
      errors.push(...result.errors);
      warnings.push(...result.warnings);
      suggestions.push(...result.suggestions);
    });
    this.validateCrossElementReferences(document, context, errors, warnings);
    this.validateIdUniqueness(context, errors);
    const documentStats = this.generateDocumentStats(document, context);
    const compliance = this.options.checkCompliance ? await this.generateComplianceReport(document, this.options.targetCompliance) : this.createEmptyComplianceReport();
    const accessibility = this.options.checkAccessibility ? this.generateAccessibilityReport(document) : this.createEmptyAccessibilityReport();
    const performance = this.options.checkPerformance ? this.generatePerformanceReport(document, documentStats) : this.createEmptyPerformanceReport();
    return {
      valid: errors.length === 0,
      errors,
      warnings,
      suggestions,
      elementResults,
      documentStats,
      compliance,
      accessibility,
      performance
    };
  }
  validateDocumentStructure(document, errors, warnings) {
    if (!document.viewBox) {
      errors.push({
        code: "MISSING_VIEWBOX",
        message: "Document must have a viewBox",
        severity: "error"
      });
    }
    if (!document.elements || document.elements.length === 0) {
      warnings.push({
        code: "EMPTY_DOCUMENT",
        message: "Document has no elements",
        severity: "warning"
      });
    }
    if (document.elements && document.elements.length > this.options.maxElements) {
      errors.push({
        code: "TOO_MANY_ELEMENTS",
        message: `Document exceeds maximum element limit of ${this.options.maxElements}`,
        severity: "error",
        value: document.elements.length
      });
    }
    if (!document.title && !document.description) {
      warnings.push({
        code: "MISSING_ACCESSIBILITY_METADATA",
        message: "Document should have a title or description for accessibility",
        severity: "warning"
      });
    }
  }
  buildValidationContext(document) {
    const documentIds = /* @__PURE__ */ new Set();
    const referencedIds = /* @__PURE__ */ new Set();
    const collectIds = (element) => {
      if (element.id) {
        documentIds.add(element.id);
      }
      if (element.clipPath) {
        const id = this.extractIdFromUrl(element.clipPath);
        if (id)
          referencedIds.add(id);
      }
      if (element.mask) {
        const id = this.extractIdFromUrl(element.mask);
        if (id)
          referencedIds.add(id);
      }
      if (element.type === "group") {
        element.children.forEach(collectIds);
      }
    };
    document.elements.forEach(collectIds);
    return { documentIds, referencedIds };
  }
  extractIdFromUrl(url) {
    const match = url.match(/url\(#([^)]+)\)/);
    return match?.[1] ?? null;
  }
  validateViewBox(viewBox, errors, warnings) {
    if (viewBox.width <= 0) {
      errors.push({
        code: "INVALID_VIEWBOX_WIDTH",
        message: "ViewBox width must be positive",
        severity: "error",
        property: "viewBox.width",
        value: viewBox.width
      });
    }
    if (viewBox.height <= 0) {
      errors.push({
        code: "INVALID_VIEWBOX_HEIGHT",
        message: "ViewBox height must be positive",
        severity: "error",
        property: "viewBox.height",
        value: viewBox.height
      });
    }
    if (viewBox.width > 1e5 || viewBox.height > 1e5) {
      warnings.push({
        code: "VERY_LARGE_VIEWBOX",
        message: "Very large viewBox dimensions may impact performance",
        severity: "warning",
        property: "viewBox",
        value: viewBox
      });
    }
    const aspectRatio = viewBox.width / viewBox.height;
    if (aspectRatio > 100 || aspectRatio < 0.01) {
      warnings.push({
        code: "EXTREME_ASPECT_RATIO",
        message: "Extreme aspect ratio may cause rendering issues",
        severity: "warning",
        property: "viewBox",
        value: aspectRatio
      });
    }
  }
  validateCrossElementReferences(_document, context, errors, warnings) {
    for (const referencedId of context.referencedIds) {
      if (!context.documentIds.has(referencedId)) {
        errors.push({
          code: "MISSING_REFERENCE",
          message: `Referenced ID '${referencedId}' not found in document`,
          severity: "error",
          value: referencedId
        });
      }
    }
    for (const documentId of context.documentIds) {
      if (!context.referencedIds.has(documentId)) {
        warnings.push({
          code: "UNREFERENCED_ID",
          message: `ID '${documentId}' is defined but never referenced`,
          severity: "warning",
          value: documentId
        });
      }
    }
  }
  validateIdUniqueness(context, errors) {
    const seenIds = /* @__PURE__ */ new Set();
    const duplicates = /* @__PURE__ */ new Set();
    for (const id of context.documentIds) {
      if (seenIds.has(id)) {
        duplicates.add(id);
      } else {
        seenIds.add(id);
      }
    }
    for (const duplicateId of duplicates) {
      errors.push({
        code: "DUPLICATE_ID",
        message: `Duplicate ID found: '${duplicateId}'`,
        severity: "error",
        value: duplicateId
      });
    }
  }
  generateDocumentStats(document, context) {
    const elementTypes = /* @__PURE__ */ new Map();
    let maxNestingDepth = 0;
    const analyzeElement = (element, depth = 0) => {
      maxNestingDepth = Math.max(maxNestingDepth, depth);
      const count = elementTypes.get(element.type) || 0;
      elementTypes.set(element.type, count + 1);
      if (element.type === "group") {
        element.children.forEach((child) => analyzeElement(child, depth + 1));
      }
    };
    document.elements.forEach((element) => analyzeElement(element));
    const duplicateIds = [];
    const unreferencedIds = [];
    const missingReferences = [];
    for (const id of context.documentIds) {
      if (!context.referencedIds.has(id)) {
        unreferencedIds.push(id);
      }
    }
    for (const id of context.referencedIds) {
      if (!context.documentIds.has(id)) {
        missingReferences.push(id);
      }
    }
    const estimatedBytes = JSON.stringify(document).length;
    let complexity;
    if (document.elements.length < 10 && maxNestingDepth < 3) {
      complexity = "low";
    } else if (document.elements.length < 100 && maxNestingDepth < 6) {
      complexity = "medium";
    } else if (document.elements.length < 1e3 && maxNestingDepth < 10) {
      complexity = "high";
    } else {
      complexity = "extreme";
    }
    return {
      totalElements: document.elements.length,
      elementTypes,
      maxNestingDepth,
      totalIds: context.documentIds.size,
      duplicateIds,
      unreferencedIds,
      missingReferences,
      documentSize: {
        estimatedBytes,
        complexity
      }
    };
  }
  async generateComplianceReport(document, standard) {
    const violations = [];
    const recommendations = [];
    if (standard === "svg20") {
      if (!document.viewBox) {
        violations.push({
          rule: "SVG2.0-VIEWBOX-REQUIRED",
          description: "ViewBox is recommended for SVG 2.0 documents",
          elements: [],
          severity: "warning"
        });
      }
      if (document.elements.some((el) => el.type === "group" && (!el.children || el.children.length === 0))) {
        violations.push({
          rule: "SVG2.0-EMPTY-GROUPS",
          description: "Empty group elements should be avoided",
          elements: document.elements.filter((el) => el.type === "group" && (!el.children || el.children.length === 0)),
          severity: "warning"
        });
      }
      recommendations.push("Consider adding accessibility metadata (title, description)");
      recommendations.push("Use semantic grouping with meaningful IDs");
    }
    return {
      standard: "SVG",
      version: standard,
      compliant: violations.filter((v) => v.severity === "error").length === 0,
      violations,
      recommendations
    };
  }
  generateAccessibilityReport(document) {
    let score = 100;
    const colorContrastIssues = [];
    const textSizeIssues = [];
    const recommendations = [];
    const hasTitle = !!document.title;
    const hasDescription = !!document.description;
    if (!hasTitle) {
      score -= 20;
      recommendations.push("Add a title for screen readers");
    }
    if (!hasDescription) {
      score -= 15;
      recommendations.push("Add a description for better accessibility");
    }
    const hasAriaLabels = document.elements.some(
      (el) => el.style && "aria-label" in el.style
    );
    if (!hasAriaLabels) {
      score -= 10;
      recommendations.push("Consider adding aria-label attributes to important elements");
    }
    const textElements = document.elements.filter((el) => el.type === "text");
    textElements.forEach((textEl) => {
      const fontSize = textEl.style?.fontSize || 16;
      if (fontSize < 12) {
        textSizeIssues.push({
          element: textEl,
          fontSize,
          recommended: 12
        });
        score -= 5;
      }
    });
    if (textSizeIssues.length > 0) {
      recommendations.push("Increase font sizes for better readability");
    }
    return {
      score: Math.max(0, score),
      hasTitle,
      hasDescription,
      hasAriaLabels,
      colorContrastIssues,
      textSizeIssues,
      recommendations
    };
  }
  generatePerformanceReport(document, stats) {
    let score = 100;
    const issues = [];
    const optimizations = [];
    let renderComplexity = 0;
    document.elements.forEach((element) => {
      switch (element.type) {
        case "circle":
        case "rect":
        case "line":
          renderComplexity += 1;
          break;
        case "path":
          renderComplexity += 3;
          break;
        case "text":
          renderComplexity += 2;
          break;
        case "group":
          renderComplexity += 0.5;
          break;
      }
    });
    if (stats.totalElements > 1e3) {
      issues.push({
        type: "complexity",
        description: "Document has many elements",
        impact: "high"
      });
      score -= 30;
      optimizations.push("Consider grouping similar elements or using patterns");
    }
    if (stats.maxNestingDepth > 10) {
      issues.push({
        type: "nesting",
        description: "Deep element nesting detected",
        impact: "medium"
      });
      score -= 15;
      optimizations.push("Flatten deeply nested structures where possible");
    }
    if (stats.documentSize.estimatedBytes > 1e6) {
      issues.push({
        type: "size",
        description: "Document is very large",
        impact: "high"
      });
      score -= 25;
      optimizations.push("Consider optimizing path data and removing unused elements");
    }
    const memoryEstimate = Math.max(1, stats.documentSize.estimatedBytes / 1024);
    return {
      score: Math.max(0, score),
      renderComplexity,
      memoryEstimate,
      issues,
      optimizations
    };
  }
  createEmptyComplianceReport() {
    return {
      standard: "N/A",
      version: "N/A",
      compliant: true,
      violations: [],
      recommendations: []
    };
  }
  createEmptyAccessibilityReport() {
    return {
      score: 0,
      hasTitle: false,
      hasDescription: false,
      hasAriaLabels: false,
      colorContrastIssues: [],
      textSizeIssues: [],
      recommendations: []
    };
  }
  createEmptyPerformanceReport() {
    return {
      score: 0,
      renderComplexity: 0,
      memoryEstimate: 0,
      issues: [],
      optimizations: []
    };
  }
};

// src/core/validation/ValidationFactory.ts
var ValidationFactory = class {
  static presetConfigs = {
    strict: {
      checkAccessibility: true,
      checkPerformance: true,
      checkCompliance: true,
      targetCompliance: "svg20",
      maxElements: 5e3,
      maxNestingDepth: 15,
      allowUnknownElements: false
    },
    standard: {
      checkAccessibility: true,
      checkPerformance: true,
      checkCompliance: true,
      targetCompliance: "svg20",
      maxElements: 1e4,
      maxNestingDepth: 20,
      allowUnknownElements: true
    },
    minimal: {
      checkAccessibility: false,
      checkPerformance: false,
      checkCompliance: false,
      maxElements: 5e4,
      maxNestingDepth: 50,
      allowUnknownElements: true
    },
    performance: {
      checkAccessibility: false,
      checkPerformance: true,
      checkCompliance: false,
      maxElements: 1e3,
      maxNestingDepth: 10,
      allowUnknownElements: true
    },
    accessibility: {
      checkAccessibility: true,
      checkPerformance: false,
      checkCompliance: true,
      targetCompliance: "svg20",
      maxElements: 5e4,
      maxNestingDepth: 50,
      allowUnknownElements: true
    },
    custom: {
      // Default values - will be overridden by user config
      checkAccessibility: true,
      checkPerformance: true,
      checkCompliance: true,
      targetCompliance: "svg20",
      maxElements: 1e4,
      maxNestingDepth: 20,
      allowUnknownElements: true
    }
  };
  /**
   * Create a document validator with preset configuration
   */
  static createDocumentValidator(preset = "standard") {
    const options = { ...this.presetConfigs[preset] };
    return new DocumentValidator(options);
  }
  /**
   * Create a document validator with custom options
   */
  static createCustomDocumentValidator(options) {
    return new DocumentValidator(options);
  }
  /**
   * Validate a single SVG element
   */
  static validateElement(element, context) {
    return ElementValidatorFactory.validateElement(element, context);
  }
  /**
   * Run a complete validation suite on an SVG document
   */
  static async validateDocument(document, config = {}) {
    const {
      preset = "standard",
      elementValidation = true,
      documentValidation = true,
      documentOptions
    } = config;
    const baseOptions = preset === "custom" ? {} : this.presetConfigs[preset];
    const finalOptions = { ...baseOptions, ...documentOptions };
    const recommendations = [];
    const quickFixes = [];
    let elementResults;
    let documentResult;
    if (elementValidation) {
      elementResults = /* @__PURE__ */ new Map();
      document.elements.forEach((element, index) => {
        const context = {
          elementIndex: index,
          siblingElements: document.elements,
          documentIds: /* @__PURE__ */ new Set(),
          referencedIds: /* @__PURE__ */ new Set()
        };
        const result2 = ElementValidatorFactory.validateElement(element, context);
        elementResults.set(index, result2);
        result2.suggestions.forEach((suggestion) => {
          const quickFix = {
            type: "modify",
            description: suggestion.message,
            priority: this.getSuggestionPriority(suggestion.code),
            automated: this.isAutomatable(suggestion.code)
          };
          if (suggestion.property !== void 0)
            quickFix.property = suggestion.property;
          if (suggestion.suggestedValue !== void 0)
            quickFix.suggestedValue = suggestion.suggestedValue;
          quickFixes.push(quickFix);
        });
      });
    }
    if (documentValidation) {
      const validator = new DocumentValidator(finalOptions);
      documentResult = await validator.validateDocument(document);
      if (documentResult.accessibility.recommendations) {
        recommendations.push(...documentResult.accessibility.recommendations);
      }
      if (documentResult.performance.optimizations) {
        recommendations.push(...documentResult.performance.optimizations);
      }
      if (documentResult.compliance.recommendations) {
        recommendations.push(...documentResult.compliance.recommendations);
      }
      documentResult.warnings.forEach((warning) => {
        quickFixes.push({
          type: "modify",
          description: warning.message,
          priority: "medium",
          automated: false
        });
      });
    }
    const overall = this.calculateOverallResults(elementResults, documentResult, recommendations);
    const result = {
      overall,
      recommendations: Array.from(new Set(recommendations)),
      // Remove duplicates
      quickFixes
    };
    if (elementResults !== void 0)
      result.elementResults = elementResults;
    if (documentResult !== void 0)
      result.documentResult = documentResult;
    return result;
  }
  /**
   * Quick validation for performance-critical scenarios
   */
  static quickValidate(document) {
    const criticalIssues = [];
    if (!document.viewBox) {
      criticalIssues.push("Missing viewBox");
    }
    if (!document.elements || document.elements.length === 0) {
      criticalIssues.push("No elements in document");
    }
    if (document.viewBox) {
      if (document.viewBox.width <= 0 || document.viewBox.height <= 0) {
        criticalIssues.push("Invalid viewBox dimensions");
      }
    }
    let invalidElements = 0;
    document.elements?.forEach((element) => {
      if (!element.type) {
        invalidElements++;
      }
    });
    if (invalidElements > 0) {
      criticalIssues.push(`${invalidElements} elements missing type information`);
    }
    return {
      valid: criticalIssues.length === 0,
      criticalIssues,
      elementCount: document.elements?.length || 0
    };
  }
  /**
   * Validate and suggest automatic fixes
   */
  static async validateWithAutoFix(document, preset = "standard") {
    const validationResult = await this.validateDocument(document, { preset });
    const appliedFixes = [];
    let autoFixedDocument;
    const automatableFixes = validationResult.quickFixes.filter((fix) => fix.automated);
    if (automatableFixes.length > 0) {
      autoFixedDocument = { ...document };
      for (const fix of automatableFixes) {
        try {
          this.applyFix(autoFixedDocument, fix);
          appliedFixes.push(fix.description);
        } catch (error) {
          console.warn(`Failed to apply auto-fix: ${fix.description}`, error);
        }
      }
    }
    const result = {
      validationResult,
      appliedFixes
    };
    if (autoFixedDocument !== void 0)
      result.autoFixedDocument = autoFixedDocument;
    return result;
  }
  static calculateOverallResults(elementResults, documentResult, _recommendations) {
    let score = 100;
    let totalErrors = 0;
    let totalWarnings = 0;
    if (elementResults) {
      for (const result of elementResults.values()) {
        totalErrors += result.errors.length;
        totalWarnings += result.warnings.length;
        score -= result.errors.length * 10;
        score -= result.warnings.length * 2;
      }
    }
    if (documentResult) {
      totalErrors += documentResult.errors.length;
      totalWarnings += documentResult.warnings.length;
      score -= documentResult.errors.length * 15;
      score -= documentResult.warnings.length * 3;
      if (documentResult.accessibility.score < 100) {
        score -= (100 - documentResult.accessibility.score) * 0.2;
      }
      if (documentResult.performance.score < 100) {
        score -= (100 - documentResult.performance.score) * 0.1;
      }
    }
    score = Math.max(0, Math.min(100, score));
    let summary = "";
    if (totalErrors === 0 && totalWarnings === 0) {
      summary = "Document is valid with no issues detected";
    } else if (totalErrors === 0) {
      summary = `Document is valid with ${totalWarnings} warning(s)`;
    } else {
      summary = `Document has ${totalErrors} error(s) and ${totalWarnings} warning(s)`;
    }
    return {
      valid: totalErrors === 0,
      score: Math.round(score),
      summary
    };
  }
  static getSuggestionPriority(code) {
    const highPriority = ["MISSING_REQUIRED_ATTRIBUTE", "INVALID_DIMENSION", "NEGATIVE_DIMENSION"];
    const lowPriority = ["STYLE_OPTIMIZATION", "PERFORMANCE_SUGGESTION"];
    if (highPriority.some((hp) => code.includes(hp)))
      return "high";
    if (lowPriority.some((lp) => code.includes(lp)))
      return "low";
    return "medium";
  }
  static isAutomatable(code) {
    const automatable = [
      "MISSING_TITLE",
      "MISSING_DESCRIPTION",
      "EMPTY_ATTRIBUTE",
      "REDUNDANT_ATTRIBUTE"
    ];
    return automatable.some((auto) => code.includes(auto));
  }
  static applyFix(document, fix) {
    switch (fix.description) {
      case "Add a title for screen readers":
        if (!document.title) {
          document.title = "SVG Document";
        }
        break;
      case "Add a description for better accessibility":
        if (!document.description) {
          document.description = "An SVG graphic";
        }
        break;
    }
  }
};

// src/core/SvgDocumentProcessor.ts
var SvgDocumentProcessor = class {
  renderer;
  constructor() {
    this.renderer = new SvgRenderer();
  }
  async processDocument(spec) {
    const startTime = Date.now();
    const errors = [];
    const warnings = [];
    try {
      const document = {
        viewBox: spec.viewBox,
        elements: spec.elements,
        ...spec.width !== void 0 && { width: spec.width },
        ...spec.height !== void 0 && { height: spec.height },
        ...spec.title && { title: spec.title },
        ...spec.description && { description: spec.description }
      };
      if (spec.validate !== false) {
        const validationPreset = typeof spec.validate === "string" ? spec.validate : "standard";
        const validation = await this.validateDocument(document, validationPreset);
        errors.push(...validation.errors);
        warnings.push(...validation.warnings);
        if (!validation.valid) {
          throw new SvgValidationError("Document validation failed", { errors, warnings });
        }
      }
      const svg = await this.renderer.render(document);
      let metadata;
      if (spec.generateMetadata !== false) {
        metadata = await this.generateMetadata(document);
      } else {
        metadata = {
          complexity: document.elements.length < 10 ? "low" : document.elements.length < 100 ? "medium" : "high",
          features: [...new Set(document.elements.map((el) => el.type))],
          accessibility: {
            hasTitle: !!document.title,
            hasDescription: !!document.description
          },
          compliance: "svg20"
        };
      }
      const processingTime = Date.now() - startTime;
      return { document, svg, warnings, errors, metadata, processingTime };
    } catch (error) {
      logger.error("Document processing failed", { error, spec });
      throw error;
    }
  }
  async validateDocument(document, preset = "standard") {
    try {
      const validationResult = await ValidationFactory.validateDocument(document, { preset });
      const errors = validationResult.documentResult?.errors.map((e) => e.message) || [];
      const warnings = validationResult.documentResult?.warnings.map((w) => w.message) || [];
      if (validationResult.elementResults) {
        for (const elementResult of validationResult.elementResults.values()) {
          errors.push(...elementResult.errors.map((e) => e.message));
          warnings.push(...elementResult.warnings.map((w) => w.message));
        }
      }
      return {
        valid: validationResult.overall.valid,
        errors,
        warnings,
        validationResult
      };
    } catch (error) {
      logger.error("Validation failed", { error, document });
      return {
        valid: false,
        errors: ["Validation system error: " + error.message],
        warnings: []
      };
    }
  }
  async generateMetadata(document) {
    try {
      const validationResult = await ValidationFactory.validateDocument(document, {
        preset: "performance",
        documentValidation: true,
        elementValidation: false
      });
      const stats = validationResult.documentResult?.documentStats;
      const accessibility = validationResult.documentResult?.accessibility;
      return {
        complexity: stats?.documentSize.complexity || "low",
        features: Array.from(stats?.elementTypes.keys() || []),
        accessibility: {
          hasTitle: accessibility?.hasTitle || !!document.title,
          hasDescription: accessibility?.hasDescription || !!document.description
        },
        compliance: validationResult.documentResult?.compliance.compliant ? "svg20" : "non-compliant"
      };
    } catch (error) {
      logger.warn("Failed to generate enhanced metadata, using basic metadata", { error });
      return {
        complexity: document.elements.length < 10 ? "low" : document.elements.length < 100 ? "medium" : "high",
        features: [...new Set(document.elements.map((el) => el.type))],
        accessibility: {
          hasTitle: !!document.title,
          hasDescription: !!document.description
        },
        compliance: "svg20"
      };
    }
  }
  getProcessingStats() {
    return {
      totalDocuments: 0,
      totalProcessingTime: 0,
      averageProcessingTime: 0
    };
  }
};

// src/core/shapes/BasicShapeGenerator.ts
var BasicShapeGenerator = class {
  /**
   * Create a circle element
   */
  static createCircle(options) {
    if (options.r <= 0) {
      throw new Error("Circle radius must be positive");
    }
    return {
      type: "circle",
      cx: options.cx,
      cy: options.cy,
      r: options.r,
      ...options.fill && { fill: options.fill },
      ...options.stroke && { stroke: options.stroke },
      ...options.strokeWidth && { "stroke-width": options.strokeWidth },
      ...options.opacity && { opacity: options.opacity },
      ...options.id && { id: options.id },
      ...options.className && { class: options.className }
    };
  }
  /**
   * Create a rectangle element
   */
  static createRect(options) {
    if (options.width <= 0 || options.height <= 0) {
      throw new Error("Rectangle width and height must be positive");
    }
    return {
      type: "rect",
      x: options.x,
      y: options.y,
      width: options.width,
      height: options.height,
      ...options.rx && { rx: options.rx },
      ...options.ry && { ry: options.ry },
      ...options.fill && { fill: options.fill },
      ...options.stroke && { stroke: options.stroke },
      ...options.strokeWidth && { "stroke-width": options.strokeWidth },
      ...options.opacity && { opacity: options.opacity },
      ...options.id && { id: options.id },
      ...options.className && { class: options.className }
    };
  }
  /**
   * Create a line element
   */
  static createLine(options) {
    return {
      type: "line",
      x1: options.x1,
      y1: options.y1,
      x2: options.x2,
      y2: options.y2,
      ...options.stroke && { stroke: options.stroke },
      ...options.strokeWidth && { "stroke-width": options.strokeWidth },
      ...options.opacity && { opacity: options.opacity },
      ...options.id && { id: options.id },
      ...options.className && { class: options.className }
    };
  }
  /**
   * Create a text element
   */
  static createText(options) {
    if (!options.content.trim()) {
      throw new Error("Text content cannot be empty");
    }
    return {
      type: "text",
      x: options.x,
      y: options.y,
      content: options.content,
      ...options.fontSize && { "font-size": options.fontSize },
      ...options.fontFamily && { "font-family": options.fontFamily },
      ...options.textAnchor && { "text-anchor": options.textAnchor },
      ...options.fill && { fill: options.fill },
      ...options.stroke && { stroke: options.stroke },
      ...options.strokeWidth && { "stroke-width": options.strokeWidth },
      ...options.opacity && { opacity: options.opacity },
      ...options.id && { id: options.id },
      ...options.className && { class: options.className }
    };
  }
  /**
   * Create a group element
   */
  static createGroup(options) {
    if (!options.children || options.children.length === 0) {
      throw new Error("Group must contain at least one child element");
    }
    return {
      type: "group",
      children: options.children,
      ...options.transform && { transform: options.transform },
      ...options.fill && { fill: options.fill },
      ...options.stroke && { stroke: options.stroke },
      ...options.strokeWidth && { "stroke-width": options.strokeWidth },
      ...options.opacity && { opacity: options.opacity },
      ...options.id && { id: options.id },
      ...options.className && { class: options.className }
    };
  }
  /**
   * Create a path element from commands
   */
  static createPath(options) {
    if (!options.commands || options.commands.length === 0) {
      throw new Error("Path must contain at least one command");
    }
    const d = this.pathCommandsToString(options.commands);
    return {
      type: "path",
      d,
      ...options.fill && { fill: options.fill },
      ...options.stroke && { stroke: options.stroke },
      ...options.strokeWidth && { "stroke-width": options.strokeWidth },
      ...options.opacity && { opacity: options.opacity },
      ...options.id && { id: options.id },
      ...options.className && { class: options.className }
    };
  }
  // Preset shape generators for common patterns
  /**
   * Create a circle at origin with default styling
   */
  static createDefaultCircle(radius) {
    return this.createCircle({
      cx: 0,
      cy: 0,
      r: radius,
      fill: "none",
      stroke: "black",
      strokeWidth: 1
    });
  }
  /**
   * Create a rectangle at origin with default styling
   */
  static createDefaultRect(width, height) {
    return this.createRect({
      x: 0,
      y: 0,
      width,
      height,
      fill: "none",
      stroke: "black",
      strokeWidth: 1
    });
  }
  /**
   * Create a horizontal line
   */
  static createHorizontalLine(x1, x2, y) {
    return this.createLine({
      x1,
      y1: y,
      x2,
      y2: y,
      stroke: "black",
      strokeWidth: 1
    });
  }
  /**
   * Create a vertical line
   */
  static createVerticalLine(x, y1, y2) {
    return this.createLine({
      x1: x,
      y1,
      x2: x,
      y2,
      stroke: "black",
      strokeWidth: 1
    });
  }
  /**
   * Create a square (special case of rectangle)
   */
  static createSquare(x, y, size, options) {
    return this.createRect({
      x,
      y,
      width: size,
      height: size,
      fill: "none",
      stroke: "black",
      strokeWidth: 1,
      ...options
    });
  }
  /**
   * Create an ellipse using path commands
   */
  static createEllipse(cx, cy, rx, ry, options) {
    const commands = [
      { type: "M", x: cx - rx, y: cy },
      { type: "A", rx, ry, rotation: 0, largeArc: false, sweep: false, x: cx + rx, y: cy },
      { type: "A", rx, ry, rotation: 0, largeArc: false, sweep: false, x: cx - rx, y: cy },
      { type: "Z" }
    ];
    return this.createPath({
      commands,
      fill: "none",
      stroke: "black",
      strokeWidth: 1,
      ...options
    });
  }
  /**
   * Create a polygon using path commands
   */
  static createPolygon(points, options) {
    if (points.length < 3) {
      throw new Error("Polygon must have at least 3 points");
    }
    const firstPoint = points[0];
    if (!firstPoint) {
      throw new Error("Polygon must have valid points");
    }
    const commands = [
      { type: "M", x: firstPoint.x, y: firstPoint.y },
      ...points.slice(1).map((point) => ({ type: "L", x: point.x, y: point.y })),
      { type: "Z" }
    ];
    return this.createPath({
      commands,
      fill: "none",
      stroke: "black",
      strokeWidth: 1,
      ...options
    });
  }
  /**
   * Create a regular polygon (e.g., triangle, pentagon, hexagon)
   */
  static createRegularPolygon(cx, cy, radius, sides, options) {
    if (sides < 3) {
      throw new Error("Polygon must have at least 3 sides");
    }
    const points = [];
    const angleStep = 2 * Math.PI / sides;
    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep - Math.PI / 2;
      points.push({
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle)
      });
    }
    return this.createPolygon(points, options);
  }
  /**
   * Create a star shape
   */
  static createStar(cx, cy, outerRadius, innerRadius, points, options) {
    if (points < 3) {
      throw new Error("Star must have at least 3 points");
    }
    const starPoints = [];
    const angleStep = Math.PI / points;
    for (let i = 0; i < points * 2; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      starPoints.push({
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle)
      });
    }
    return this.createPolygon(starPoints, options);
  }
  // Helper methods
  /**
   * Convert path commands to SVG path string
   */
  static pathCommandsToString(commands) {
    return commands.map((cmd) => {
      switch (cmd.type) {
        case "M":
          return `M ${cmd.x} ${cmd.y}`;
        case "L":
          return `L ${cmd.x} ${cmd.y}`;
        case "C":
          return `C ${cmd.x1} ${cmd.y1} ${cmd.x2} ${cmd.y2} ${cmd.x} ${cmd.y}`;
        case "Q":
          return `Q ${cmd.x1} ${cmd.y1} ${cmd.x} ${cmd.y}`;
        case "A":
          return `A ${cmd.rx} ${cmd.ry} ${cmd.rotation} ${cmd.largeArc ? 1 : 0} ${cmd.sweep ? 1 : 0} ${cmd.x} ${cmd.y}`;
        case "Z":
          return "Z";
        default:
          throw new Error(`Unknown path command type: ${cmd.type}`);
      }
    }).join(" ");
  }
  /**
   * Calculate bounding box for a set of points
   */
  static calculateBoundingBox(points) {
    if (points.length === 0) {
      return { x: 0, y: 0, width: 0, height: 0 };
    }
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }
};

// src/core/shapes/ShapeCollections.ts
var ShapeCollections = class {
  /**
   * Create basic geometric shapes collection
   */
  static createGeometricShapes(options) {
    const shapes = [
      // Circle
      BasicShapeGenerator.createCircle({
        cx: 50,
        cy: 50,
        r: 30,
        fill: "none",
        stroke: "black",
        strokeWidth: 2,
        ...options
      }),
      // Rectangle
      BasicShapeGenerator.createRect({
        x: 120,
        y: 20,
        width: 60,
        height: 60,
        fill: "none",
        stroke: "black",
        strokeWidth: 2,
        ...options
      }),
      // Triangle
      BasicShapeGenerator.createRegularPolygon(250, 50, 30, 3, {
        fill: "none",
        stroke: "black",
        strokeWidth: 2,
        ...options
      }),
      // Pentagon
      BasicShapeGenerator.createRegularPolygon(350, 50, 30, 5, {
        fill: "none",
        stroke: "black",
        strokeWidth: 2,
        ...options
      }),
      // Hexagon
      BasicShapeGenerator.createRegularPolygon(450, 50, 30, 6, {
        fill: "none",
        stroke: "black",
        strokeWidth: 2,
        ...options
      })
    ];
    return {
      name: "Geometric Shapes",
      description: "Basic geometric shapes including circle, rectangle, and regular polygons",
      shapes,
      boundingBox: { x: 20, y: 20, width: 460, height: 60 }
    };
  }
  /**
   * Create flowchart elements collection
   */
  static createFlowchartElements(options) {
    const shapes = [
      // Start/End (Rounded Rectangle)
      BasicShapeGenerator.createRect({
        x: 20,
        y: 20,
        width: 100,
        height: 40,
        rx: 20,
        ry: 20,
        fill: "lightblue",
        stroke: "navy",
        strokeWidth: 2,
        ...options
      }),
      // Process (Rectangle)
      BasicShapeGenerator.createRect({
        x: 150,
        y: 20,
        width: 100,
        height: 40,
        fill: "lightgreen",
        stroke: "darkgreen",
        strokeWidth: 2,
        ...options
      }),
      // Decision (Diamond)
      BasicShapeGenerator.createRegularPolygon(340, 40, 30, 4, {
        fill: "lightyellow",
        stroke: "orange",
        strokeWidth: 2,
        ...options
      }),
      // Document (Rectangle with wave bottom)
      BasicShapeGenerator.createRect({
        x: 400,
        y: 20,
        width: 80,
        height: 40,
        fill: "lightcoral",
        stroke: "darkred",
        strokeWidth: 2,
        ...options
      }),
      // Arrow (pointing right)
      BasicShapeGenerator.createPolygon([
        { x: 520, y: 20 },
        { x: 580, y: 20 },
        { x: 600, y: 40 },
        { x: 580, y: 60 },
        { x: 520, y: 60 },
        { x: 540, y: 40 }
      ], {
        fill: "lightgray",
        stroke: "black",
        strokeWidth: 2,
        ...options
      })
    ];
    return {
      name: "Flowchart Elements",
      description: "Common flowchart symbols including start/end, process, decision, and connector shapes",
      shapes,
      boundingBox: { x: 20, y: 20, width: 580, height: 40 }
    };
  }
  /**
   * Create arrow collection
   */
  static createArrows(options) {
    const shapes = [
      // Right arrow
      BasicShapeGenerator.createPolygon([
        { x: 20, y: 30 },
        { x: 60, y: 30 },
        { x: 60, y: 20 },
        { x: 80, y: 40 },
        { x: 60, y: 60 },
        { x: 60, y: 50 },
        { x: 20, y: 50 }
      ], {
        fill: "black",
        ...options
      }),
      // Left arrow
      BasicShapeGenerator.createPolygon([
        { x: 120, y: 30 },
        { x: 160, y: 30 },
        { x: 160, y: 20 },
        { x: 180, y: 40 },
        { x: 160, y: 60 },
        { x: 160, y: 50 },
        { x: 120, y: 50 },
        { x: 100, y: 40 }
      ], {
        fill: "black",
        ...options
      }),
      // Up arrow
      BasicShapeGenerator.createPolygon([
        { x: 230, y: 60 },
        { x: 230, y: 30 },
        { x: 220, y: 30 },
        { x: 240, y: 10 },
        { x: 260, y: 30 },
        { x: 250, y: 30 },
        { x: 250, y: 60 }
      ], {
        fill: "black",
        ...options
      }),
      // Down arrow
      BasicShapeGenerator.createPolygon([
        { x: 300, y: 20 },
        { x: 300, y: 50 },
        { x: 290, y: 50 },
        { x: 310, y: 70 },
        { x: 330, y: 50 },
        { x: 320, y: 50 },
        { x: 320, y: 20 }
      ], {
        fill: "black",
        ...options
      })
    ];
    return {
      name: "Arrows",
      description: "Directional arrows pointing up, down, left, and right",
      shapes,
      boundingBox: { x: 20, y: 10, width: 310, height: 60 }
    };
  }
  /**
   * Create star collection
   */
  static createStars(options) {
    const shapes = [
      // 5-point star
      BasicShapeGenerator.createStar(50, 50, 30, 15, 5, {
        fill: "gold",
        stroke: "orange",
        strokeWidth: 2,
        ...options
      }),
      // 6-point star
      BasicShapeGenerator.createStar(150, 50, 30, 15, 6, {
        fill: "silver",
        stroke: "gray",
        strokeWidth: 2,
        ...options
      }),
      // 8-point star
      BasicShapeGenerator.createStar(250, 50, 30, 15, 8, {
        fill: "lightblue",
        stroke: "blue",
        strokeWidth: 2,
        ...options
      })
    ];
    return {
      name: "Stars",
      description: "Star shapes with different numbers of points",
      shapes,
      boundingBox: { x: 20, y: 20, width: 260, height: 60 }
    };
  }
  /**
   * Create basic UI elements collection
   */
  static createUIElements(options) {
    const shapes = [
      // Button
      BasicShapeGenerator.createRect({
        x: 20,
        y: 20,
        width: 80,
        height: 30,
        rx: 5,
        ry: 5,
        fill: "lightblue",
        stroke: "blue",
        strokeWidth: 1,
        ...options
      }),
      // Text field
      BasicShapeGenerator.createRect({
        x: 120,
        y: 20,
        width: 120,
        height: 30,
        fill: "white",
        stroke: "gray",
        strokeWidth: 1,
        ...options
      }),
      // Checkbox (unchecked)
      BasicShapeGenerator.createRect({
        x: 260,
        y: 25,
        width: 20,
        height: 20,
        fill: "white",
        stroke: "black",
        strokeWidth: 1,
        ...options
      }),
      // Radio button (unchecked)
      BasicShapeGenerator.createCircle({
        cx: 310,
        cy: 35,
        r: 10,
        fill: "white",
        stroke: "black",
        strokeWidth: 1,
        ...options
      }),
      // Progress bar background
      BasicShapeGenerator.createRect({
        x: 340,
        y: 30,
        width: 100,
        height: 10,
        rx: 5,
        ry: 5,
        fill: "lightgray",
        stroke: "gray",
        strokeWidth: 1,
        ...options
      }),
      // Progress bar fill
      BasicShapeGenerator.createRect({
        x: 342,
        y: 32,
        width: 60,
        height: 6,
        rx: 3,
        ry: 3,
        fill: "blue",
        ...options
      })
    ];
    return {
      name: "UI Elements",
      description: "Basic user interface elements like buttons, text fields, and form controls",
      shapes,
      boundingBox: { x: 20, y: 20, width: 420, height: 30 }
    };
  }
  /**
   * Create grid pattern
   */
  static createGrid(startX, startY, cellWidth, cellHeight, rows, cols, options) {
    const shapes = [];
    for (let i = 0; i <= rows; i++) {
      const y = startY + i * cellHeight;
      shapes.push(BasicShapeGenerator.createLine({
        x1: startX,
        y1: y,
        x2: startX + cols * cellWidth,
        y2: y,
        stroke: "lightgray",
        strokeWidth: 1,
        ...options
      }));
    }
    for (let j = 0; j <= cols; j++) {
      const x = startX + j * cellWidth;
      shapes.push(BasicShapeGenerator.createLine({
        x1: x,
        y1: startY,
        x2: x,
        y2: startY + rows * cellHeight,
        stroke: "lightgray",
        strokeWidth: 1,
        ...options
      }));
    }
    return {
      name: "Grid",
      description: `${rows}x${cols} grid pattern`,
      shapes,
      boundingBox: {
        x: startX,
        y: startY,
        width: cols * cellWidth,
        height: rows * cellHeight
      }
    };
  }
  /**
   * Create coordinate system (axes)
   */
  static createCoordinateSystem(centerX, centerY, width, height, options) {
    const shapes = [
      // X-axis
      BasicShapeGenerator.createLine({
        x1: centerX - width / 2,
        y1: centerY,
        x2: centerX + width / 2,
        y2: centerY,
        stroke: "black",
        strokeWidth: 2,
        ...options
      }),
      // Y-axis
      BasicShapeGenerator.createLine({
        x1: centerX,
        y1: centerY - height / 2,
        x2: centerX,
        y2: centerY + height / 2,
        stroke: "black",
        strokeWidth: 2,
        ...options
      }),
      // X-axis arrow
      BasicShapeGenerator.createPolygon([
        { x: centerX + width / 2, y: centerY },
        { x: centerX + width / 2 - 10, y: centerY - 5 },
        { x: centerX + width / 2 - 10, y: centerY + 5 }
      ], {
        fill: "black",
        ...options
      }),
      // Y-axis arrow
      BasicShapeGenerator.createPolygon([
        { x: centerX, y: centerY - height / 2 },
        { x: centerX - 5, y: centerY - height / 2 + 10 },
        { x: centerX + 5, y: centerY - height / 2 + 10 }
      ], {
        fill: "black",
        ...options
      })
    ];
    return {
      name: "Coordinate System",
      description: "X-Y coordinate system with axes and arrows",
      shapes,
      boundingBox: {
        x: centerX - width / 2,
        y: centerY - height / 2,
        width,
        height
      }
    };
  }
  /**
   * Get all available collections
   */
  static getAllCollections() {
    return [
      "geometricShapes",
      "flowchartElements",
      "arrows",
      "stars",
      "uiElements"
    ];
  }
  /**
   * Get collection by name
   */
  static getCollection(name, options) {
    switch (name.toLowerCase()) {
      case "geometric":
      case "geometricshapes":
        return this.createGeometricShapes(options);
      case "flowchart":
      case "flowchartelements":
        return this.createFlowchartElements(options);
      case "arrows":
        return this.createArrows(options);
      case "stars":
        return this.createStars(options);
      case "ui":
      case "uielements":
        return this.createUIElements(options);
      default:
        return null;
    }
  }
};

// src/server/SvgMcpServer.ts
var SvgMcpServer = class extends FastMCP {
  svgRenderer;
  documentProcessor;
  config;
  constructor(config) {
    super({
      name: config.name,
      version: config.version
    });
    this.config = {
      ...config,
      description: config.description || "SVG MCP Server",
      maxSvgSize: config.maxSvgSize || 1e4,
      enableDebug: config.enableDebug || false
    };
    this.svgRenderer = new SvgRenderer();
    this.documentProcessor = new SvgDocumentProcessor();
    if (this.config.enableDebug) {
      logger.setLogLevel("debug");
    }
    this.setupTools();
    this.setupResources();
  }
  setupTools() {
    this.addTool({
      name: "generate_svg",
      description: "Generate an SVG document from a specification",
      parameters: external_exports.object({
        document: external_exports.object({
          viewBox: external_exports.object({
            x: external_exports.number(),
            y: external_exports.number(),
            width: external_exports.number().min(0),
            height: external_exports.number().min(0)
          }),
          elements: external_exports.array(external_exports.any()),
          width: external_exports.number().min(0).optional(),
          height: external_exports.number().min(0).optional(),
          title: external_exports.string().optional(),
          description: external_exports.string().optional(),
          style: external_exports.string().optional()
        }),
        optimize: external_exports.boolean().default(true),
        validate: external_exports.boolean().default(true)
      }),
      execute: async (args) => {
        const { document, optimize = true, validate = true } = args;
        try {
          logger.info("Processing SVG document request", {
            elementCount: document.elements?.length,
            optimize,
            validate
          });
          const spec = {
            viewBox: document.viewBox,
            elements: document.elements || [],
            ...document.width !== void 0 && { width: document.width },
            ...document.height !== void 0 && { height: document.height },
            ...document.title && { title: document.title },
            ...document.description && { description: document.description },
            ...document.style && { style: document.style },
            optimize,
            validate,
            generateMetadata: true
          };
          const result = await this.documentProcessor.processDocument(spec);
          if (result.svg.length > this.config.maxSvgSize) {
            throw new SvgValidationError(
              `Generated SVG exceeds maximum size limit of ${this.config.maxSvgSize} characters`,
              [`SVG size: ${result.svg.length}, limit: ${this.config.maxSvgSize}`]
            );
          }
          logger.info("SVG document processed successfully", {
            size: result.svg.length,
            elementCount: result.document.elements.length,
            processingTime: result.processingTime,
            warnings: result.warnings.length,
            errors: result.errors.length
          });
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                svg: result.svg,
                document: result.document,
                metadata: result.metadata,
                processing: {
                  time: result.processingTime,
                  warnings: result.warnings,
                  errors: result.errors,
                  generated: (/* @__PURE__ */ new Date()).toISOString()
                },
                stats: {
                  size: result.svg.length,
                  elementCount: result.document.elements.length,
                  complexity: result.metadata.complexity,
                  features: result.metadata.features
                }
              }, null, 2)
            }]
          };
        } catch (error) {
          logger.error("Failed to generate SVG", error);
          if (error instanceof SvgValidationError) {
            throw error;
          }
          throw new Error(`SVG generation failed: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
    });
    this.addTool({
      name: "validate_svg_document",
      description: "Validate an SVG document specification",
      parameters: external_exports.object({
        document: external_exports.object({
          viewBox: external_exports.object({
            x: external_exports.number(),
            y: external_exports.number(),
            width: external_exports.number().min(0),
            height: external_exports.number().min(0)
          }),
          elements: external_exports.array(external_exports.any())
        })
      }),
      execute: async (args) => {
        const { document } = args;
        try {
          logger.info("Validating SVG document", {
            elementCount: document.elements?.length
          });
          const spec = {
            viewBox: document.viewBox,
            elements: document.elements || [],
            validate: true,
            generateMetadata: true
          };
          const result = await this.documentProcessor.processDocument(spec);
          const validationResult = {
            valid: result.errors.length === 0,
            errors: result.errors,
            warnings: result.warnings,
            metadata: result.metadata,
            processingTime: result.processingTime,
            compliance: result.metadata.compliance,
            accessibility: result.metadata.accessibility,
            features: result.metadata.features,
            complexity: result.metadata.complexity
          };
          logger.info("SVG document validation completed", {
            valid: validationResult.valid,
            errors: validationResult.errors.length,
            warnings: validationResult.warnings.length
          });
          return {
            content: [{
              type: "text",
              text: JSON.stringify(validationResult, null, 2)
            }]
          };
        } catch (error) {
          logger.error("SVG document validation failed", error);
          throw error;
        }
      }
    });
    this.addTool({
      name: "create_shape",
      description: "Create individual SVG shapes using the shape generator",
      parameters: external_exports.object({
        type: external_exports.enum(["circle", "rect", "line", "text", "group", "path", "ellipse", "polygon", "star"]).describe("Type of shape to create"),
        options: external_exports.any().describe("Shape-specific options object"),
        includeDocument: external_exports.boolean().default(false).describe("Whether to wrap the shape in a complete SVG document")
      }),
      execute: async (args) => {
        const { type, options, includeDocument } = args;
        try {
          logger.info("Creating shape", { type, includeDocument });
          let shape;
          switch (type) {
            case "circle":
              shape = BasicShapeGenerator.createCircle(options);
              break;
            case "rect":
              shape = BasicShapeGenerator.createRect(options);
              break;
            case "line":
              shape = BasicShapeGenerator.createLine(options);
              break;
            case "text":
              shape = BasicShapeGenerator.createText(options);
              break;
            case "group":
              shape = BasicShapeGenerator.createGroup(options);
              break;
            case "path":
              shape = BasicShapeGenerator.createPath(options);
              break;
            case "ellipse":
              if (!options.cx || !options.cy || !options.rx || !options.ry) {
                throw new Error("Ellipse requires cx, cy, rx, and ry parameters");
              }
              shape = BasicShapeGenerator.createEllipse(options.cx, options.cy, options.rx, options.ry, options);
              break;
            case "polygon":
              if (!options.points || !Array.isArray(options.points)) {
                throw new Error("Polygon requires points array parameter");
              }
              shape = BasicShapeGenerator.createPolygon(options.points, options);
              break;
            case "star":
              if (!options.cx || !options.cy || !options.outerRadius || !options.innerRadius || !options.points) {
                throw new Error("Star requires cx, cy, outerRadius, innerRadius, and points parameters");
              }
              shape = BasicShapeGenerator.createStar(options.cx, options.cy, options.outerRadius, options.innerRadius, options.points, options);
              break;
            default:
              throw new Error(`Unknown shape type: ${type}`);
          }
          let result = {
            shape,
            svg: null,
            document: null
          };
          if (includeDocument) {
            const boundingBox = this.calculateShapeBoundingBox(shape);
            const padding = 10;
            const spec = {
              viewBox: {
                x: boundingBox.x - padding,
                y: boundingBox.y - padding,
                width: boundingBox.width + 2 * padding,
                height: boundingBox.height + 2 * padding
              },
              elements: [shape],
              title: `${type.charAt(0).toUpperCase() + type.slice(1)} Shape`,
              description: `Generated ${type} shape`
            };
            const processResult = await this.documentProcessor.processDocument(spec);
            result.svg = processResult.svg;
            result.document = processResult.document;
          }
          logger.info("Shape created successfully", { type, shapeType: shape.type });
          return {
            content: [{
              type: "text",
              text: JSON.stringify(result, null, 2)
            }]
          };
        } catch (error) {
          logger.error("Shape creation failed", { error, type, options });
          throw new Error(`Shape creation failed: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
    });
    this.addTool({
      name: "create_shape_collection",
      description: "Create pre-defined collections of shapes for common use cases",
      parameters: external_exports.object({
        collection: external_exports.enum(["geometric", "flowchart", "arrows", "stars", "ui"]).describe("Type of shape collection to create"),
        options: external_exports.any().optional().describe("Optional styling options to apply to all shapes"),
        includeDocument: external_exports.boolean().default(true).describe("Whether to wrap the collection in a complete SVG document")
      }),
      execute: async (args) => {
        const { collection, options, includeDocument } = args;
        try {
          logger.info("Creating shape collection", { collection, includeDocument });
          const shapeCollection = ShapeCollections.getCollection(collection, options);
          if (!shapeCollection) {
            throw new Error(`Unknown collection type: ${collection}`);
          }
          let result = {
            collection: shapeCollection,
            svg: null,
            document: null
          };
          if (includeDocument) {
            const spec = {
              viewBox: {
                x: shapeCollection.boundingBox.x - 10,
                y: shapeCollection.boundingBox.y - 10,
                width: shapeCollection.boundingBox.width + 20,
                height: shapeCollection.boundingBox.height + 20
              },
              elements: shapeCollection.shapes,
              title: shapeCollection.name,
              description: shapeCollection.description
            };
            const processResult = await this.documentProcessor.processDocument(spec);
            result.svg = processResult.svg;
            result.document = processResult.document;
          }
          logger.info("Shape collection created successfully", {
            collection,
            shapeCount: shapeCollection.shapes.length
          });
          return {
            content: [{
              type: "text",
              text: JSON.stringify(result, null, 2)
            }]
          };
        } catch (error) {
          logger.error("Shape collection creation failed", { error, collection, options });
          throw new Error(`Shape collection creation failed: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }
    });
    this.addTool({
      name: "health_check",
      description: "Check the health and status of the SVG MCP server",
      execute: async () => {
        const health = {
          status: "healthy",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          version: this.config.version,
          config: {
            maxSvgSize: this.config.maxSvgSize,
            debugEnabled: this.config.enableDebug
          },
          renderer: {
            status: "operational",
            capabilities: this.svgRenderer.getCapabilities()
          },
          processor: {
            status: "operational",
            statistics: this.documentProcessor.getProcessingStats()
          }
        };
        logger.debug("Health check performed", health);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(health, null, 2)
          }]
        };
      }
    });
    this.addTool({
      name: "validate_svg",
      description: "Validate an SVG document with comprehensive checks",
      parameters: external_exports.object({
        document: external_exports.object({
          viewBox: external_exports.object({
            x: external_exports.number(),
            y: external_exports.number(),
            width: external_exports.number().min(0),
            height: external_exports.number().min(0)
          }),
          elements: external_exports.array(external_exports.any()),
          title: external_exports.string().optional(),
          description: external_exports.string().optional()
        }),
        preset: external_exports.enum(["strict", "standard", "minimal", "performance", "accessibility"]).default("standard"),
        includeRecommendations: external_exports.boolean().default(true),
        includeQuickFixes: external_exports.boolean().default(true)
      }),
      execute: async (args) => {
        const { document, preset, includeRecommendations, includeQuickFixes } = args;
        try {
          logger.info("Validating SVG document", { preset, elementCount: document.elements?.length });
          const svgDocument = {
            viewBox: document.viewBox,
            elements: document.elements || [],
            ...document.title && { title: document.title },
            ...document.description && { description: document.description }
          };
          const validationResult = await ValidationFactory.validateDocument(svgDocument, { preset });
          const response = {
            valid: validationResult.overall.valid,
            score: validationResult.overall.score,
            summary: validationResult.overall.summary,
            errors: validationResult.documentResult?.errors || [],
            warnings: validationResult.documentResult?.warnings || []
          };
          if (includeRecommendations) {
            response.recommendations = validationResult.recommendations;
          }
          if (includeQuickFixes) {
            response.quickFixes = validationResult.quickFixes;
          }
          if (validationResult.documentResult) {
            response.reports = {
              accessibility: validationResult.documentResult.accessibility,
              performance: validationResult.documentResult.performance,
              compliance: validationResult.documentResult.compliance,
              documentStats: validationResult.documentResult.documentStats
            };
          }
          logger.debug("Validation completed", {
            valid: response.valid,
            score: response.score,
            errorCount: response.errors.length,
            warningCount: response.warnings.length
          });
          return {
            content: [{
              type: "text",
              text: JSON.stringify(response, null, 2)
            }]
          };
        } catch (error) {
          logger.error("SVG validation failed", { error, document });
          throw error;
        }
      }
    });
    this.addTool({
      name: "quick_validate_svg",
      description: "Quick validation for basic structure and critical errors",
      parameters: external_exports.object({
        document: external_exports.object({
          viewBox: external_exports.object({
            x: external_exports.number(),
            y: external_exports.number(),
            width: external_exports.number().min(0),
            height: external_exports.number().min(0)
          }),
          elements: external_exports.array(external_exports.any())
        })
      }),
      execute: async (args) => {
        const { document } = args;
        try {
          const result = ValidationFactory.quickValidate(document);
          logger.debug("Quick validation completed", result);
          return {
            content: [{
              type: "text",
              text: JSON.stringify(result, null, 2)
            }]
          };
        } catch (error) {
          logger.error("Quick validation failed", { error, document });
          throw error;
        }
      }
    });
    this.addTool({
      name: "validate_and_fix_svg",
      description: "Validate SVG document and apply automatic fixes where possible",
      parameters: external_exports.object({
        document: external_exports.object({
          viewBox: external_exports.object({
            x: external_exports.number(),
            y: external_exports.number(),
            width: external_exports.number().min(0),
            height: external_exports.number().min(0)
          }),
          elements: external_exports.array(external_exports.any()),
          title: external_exports.string().optional(),
          description: external_exports.string().optional()
        }),
        preset: external_exports.enum(["strict", "standard", "minimal", "performance", "accessibility"]).default("standard")
      }),
      execute: async (args) => {
        const { document, preset } = args;
        try {
          logger.info("Validating SVG document with auto-fix", { preset, elementCount: document.elements?.length });
          const svgDocument = {
            viewBox: document.viewBox,
            elements: document.elements || [],
            ...document.title && { title: document.title },
            ...document.description && { description: document.description }
          };
          const result = await ValidationFactory.validateWithAutoFix(svgDocument, preset);
          const response = {
            original: {
              valid: result.validationResult.overall.valid,
              score: result.validationResult.overall.score,
              summary: result.validationResult.overall.summary
            },
            autoFixApplied: !!result.autoFixedDocument,
            appliedFixes: result.appliedFixes,
            fixedDocument: result.autoFixedDocument
          };
          if (result.autoFixedDocument) {
            const fixedValidation = await ValidationFactory.validateDocument(result.autoFixedDocument, { preset });
            response.fixedValidation = {
              valid: fixedValidation.overall.valid,
              score: fixedValidation.overall.score,
              summary: fixedValidation.overall.summary
            };
          }
          logger.debug("Validation with auto-fix completed", {
            fixesApplied: result.appliedFixes.length,
            originalScore: response.original.score,
            fixedScore: response.fixedValidation?.score
          });
          return {
            content: [{
              type: "text",
              text: JSON.stringify(response, null, 2)
            }]
          };
        } catch (error) {
          logger.error("SVG validation with auto-fix failed", { error, document });
          throw error;
        }
      }
    });
  }
  setupResources() {
    this.addResource({
      uri: "server://info",
      name: "Server Information",
      description: "Information about the SVG MCP server",
      mimeType: "application/json",
      load: async () => {
        const info = {
          name: this.config.name,
          version: this.config.version,
          description: this.config.description,
          capabilities: {
            svgGeneration: true,
            documentProcessing: true,
            validation: true,
            optimization: true,
            accessibility: true,
            rfc7996Compliance: true,
            metadataGeneration: true,
            transforms: ["scale", "translate", "normalize", "accessibility"]
          },
          limits: {
            maxSvgSize: this.config.maxSvgSize
          },
          supportedElements: this.svgRenderer.getSupportedElements(),
          processor: {
            statistics: this.documentProcessor.getProcessingStats(),
            features: [
              "document_validation",
              "element_relationship_analysis",
              "compliance_checking",
              "optimization",
              "metadata_generation",
              "accessibility_enhancement"
            ]
          }
        };
        logger.debug("Server info requested", info);
        return {
          text: JSON.stringify(info, null, 2),
          mimeType: "application/json",
          uri: "server://info"
        };
      }
    });
    this.addResource({
      uri: "schema://svg-document",
      name: "SVG Document Schema",
      description: "JSON schema for SVG document structure",
      mimeType: "application/json",
      load: async () => {
        const schema = {
          $schema: "http://json-schema.org/draft-07/schema#",
          title: "SVG Document",
          description: "Schema for SVG document specification",
          type: "object",
          required: ["viewBox", "elements"],
          properties: {
            viewBox: {
              type: "object",
              required: ["x", "y", "width", "height"],
              properties: {
                x: { type: "number" },
                y: { type: "number" },
                width: { type: "number", minimum: 0 },
                height: { type: "number", minimum: 0 }
              }
            },
            elements: {
              type: "array",
              items: { $ref: "#/definitions/SvgElement" }
            }
            // Additional properties would be defined here
          },
          definitions: {
            SvgElement: {
              oneOf: [
                { $ref: "#/definitions/CircleElement" },
                { $ref: "#/definitions/RectElement" },
                { $ref: "#/definitions/LineElement" },
                { $ref: "#/definitions/PathElement" },
                { $ref: "#/definitions/TextElement" },
                { $ref: "#/definitions/GroupElement" }
              ]
            }
            // Element definitions would be expanded here
          }
        };
        return {
          text: JSON.stringify(schema, null, 2),
          mimeType: "application/json",
          uri: "schema://svg-document"
        };
      }
    });
  }
  /**
   * Calculate bounding box for a shape element
   */
  calculateShapeBoundingBox(shape) {
    switch (shape.type) {
      case "circle":
        return {
          x: shape.cx - shape.r,
          y: shape.cy - shape.r,
          width: shape.r * 2,
          height: shape.r * 2
        };
      case "rect":
        return {
          x: shape.x,
          y: shape.y,
          width: shape.width,
          height: shape.height
        };
      case "line":
        return {
          x: Math.min(shape.x1, shape.x2),
          y: Math.min(shape.y1, shape.y2),
          width: Math.abs(shape.x2 - shape.x1),
          height: Math.abs(shape.y2 - shape.y1)
        };
      case "text":
        const fontSize = shape["font-size"] || 16;
        const textLength = shape.content.length;
        return {
          x: shape.x,
          y: shape.y - fontSize,
          width: textLength * fontSize * 0.6,
          // Rough estimate
          height: fontSize
        };
      default:
        return { x: 0, y: 0, width: 100, height: 100 };
    }
  }
  async start() {
    logger.info("Starting SVG MCP Server", {
      name: this.config.name,
      version: this.config.version
    });
    await super.start();
    logger.info("SVG MCP Server started successfully");
  }
  async stop() {
    logger.info("Stopping SVG MCP Server");
    logger.info("SVG MCP Server stopped");
  }
};

// src/index.ts
async function main() {
  try {
    logger.info("Starting SVG MCP Server...");
    const server = new SvgMcpServer({
      name: "svg-rfc-mcp-server",
      version: "1.0.0",
      description: "RFC 7996 compliant SVG generator MCP server"
    });
    await server.start();
    logger.info("SVG MCP Server started successfully");
    process.on("SIGINT", async () => {
      logger.info("Received SIGINT, shutting down gracefully...");
      await server.stop();
      process.exit(0);
    });
    process.on("SIGTERM", async () => {
      logger.info("Received SIGTERM, shutting down gracefully...");
      await server.stop();
      process.exit(0);
    });
  } catch (error) {
    logger.error("Failed to start SVG MCP Server:", error);
    process.exit(1);
  }
}
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    logger.error("Unhandled error in main:", error);
    process.exit(1);
  });
}
