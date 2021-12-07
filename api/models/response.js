export class BaseResponse {
  constructor(isSuccess, message = "") {
    this.success = isSuccess;
    this.message = message;
  }
}

export class Response extends BaseResponse {
  constructor(isSuccess, data = null, message = "") {
    super(isSuccess, message);
    this.data = data;
  }
}
