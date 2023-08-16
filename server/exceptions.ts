class InternalException extends Error {
  message: string;
  code: number;
  meta: object;
  constructor(message: string, code: number = 500, meta: object = {}) {
    super();
    this.message = message;
    this.code = code;
    this.meta = meta;
  }
}

class ConvertorException extends InternalException {}

class UserException extends InternalException {
  constructor(message: string, code: number = 400, meta: object = {}) {
    super(message, code, meta);
  }
}

export { InternalException, ConvertorException, UserException };
