import { useRouter } from "next/router";
import { useAuth } from "context/AuthContext";
const withoutAuth = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const { user, loading } = useAuth();

      if (loading) return null;
      if (user) {
        Router.replace("/");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withoutAuth;
