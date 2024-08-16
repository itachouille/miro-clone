import { useMutation } from "convex/react";
import { useState } from "react";

export default function useApiMutation(mutationFunction: any) {
  const [pending, setPending] = useState<boolean>(false);

  const apiMutation = useMutation(mutationFunction);

  const mutate = (payload: any) => {
    setPending(true);
    return apiMutation(payload)
      .finally(() => setPending(false))
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  };

  return {
    mutate,
    pending,
  };
}
