// ================================================================
// This page holds response classes
// ================================================================ 

//define base response
export class BaseResponse {
  constructor(isSuccess, message = "") {
    this.success = isSuccess;
    this.message = message;
  }
}

//define response with data
export class Response extends BaseResponse {
  constructor(isSuccess, data = null, message = "") {
    super(isSuccess, message);
    this.data = data;
  }
}
