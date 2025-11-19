export class ServiceError extends Error {
  constructor(type, message, details = {}) {
    super(message);
    this.name = "ServiceError";
    this.type = type;
    this.details = details;
  }
}