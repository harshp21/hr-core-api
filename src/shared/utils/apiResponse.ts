export const apiResponse = <T>(data: T, message = 'success') => {
  return {
    success: true,
    message,
    data,
  };
};
