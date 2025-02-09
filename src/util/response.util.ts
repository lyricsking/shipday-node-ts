export default function processApiError(error: any) {
  const status = error.response.status;
  if (status === 403)
    throw new Error('authentication error');
  throw new Error('bad request');
}

