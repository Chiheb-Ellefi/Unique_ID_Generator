import CustomError from "./customError.js";
import StatusCodes from "http-status-codes";
class LimitReachedError extends CustomError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.TOO_MANY_REQUESTS;
  }
}
export default LimitReachedError;
