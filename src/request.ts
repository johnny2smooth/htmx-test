const requests: Record<string, { completion: string; pending: boolean }> = {};

export const getRequest = (requestId: string) => {
  return requests[requestId];
};

export const startRequest = async (prompt: string) => {
  const requestId = Math.random().toString(36).substring(2, 15);
  requests[requestId] = {
    completion: "",
    pending: true,
  };
  const interval = setInterval(() => {
    requests[requestId].completion += prompt + " ";
    if (requests[requestId].completion.length >= 500) {
      clearInterval(interval);
      requests[requestId].pending = !requests[requestId].pending;
    }
  }, 100);
  return requestId;
};
