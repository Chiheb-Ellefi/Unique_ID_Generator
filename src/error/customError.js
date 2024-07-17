class CustomError extends Error {
  constructor(message, status) {
    this.message = message;
  }
}
export default CustomError;
