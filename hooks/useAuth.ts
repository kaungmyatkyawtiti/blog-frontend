import { useBoundStore } from "@/lib/hooks/useBoundStore";

export default function useAuth() {
  const authToken = useBoundStore(state => state.accessToken);
  return !!authToken;
}
