export interface ApiResponse<T = string> {
  data: T;
  message: string;
  statusCode: number;
}

function customMessage(
  statusCode: number,
  message: string,
  data: string = '',
): ApiResponse<string> {
  return {
    statusCode: statusCode,
    message,
    data: data,
  };
}
export default customMessage;
