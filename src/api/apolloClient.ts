import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Observable,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import axios from "axios";

const httpLink = createHttpLink({
  uri: "https://testplatform-server.onrender.com",
  credentials: "include",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers

  const token = localStorage.getItem("token");
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));
  return forward(operation);
});

const GetNewAccessToken = async () => {
  const res = await axios.get("https://testplatform-server.onrender.com/refresh_token", {
    withCredentials: true,
  });
  console.log(res);
  if (res.data && res.data.code === 403) {
    localStorage.removeItem("token");
    return "";
  }
  localStorage.setItem("token", res.data.accessToken);
  return res.data.accessToken;
};

export const logoutLink = onError(({ graphQLErrors, operation, forward }) => {
  if (
    graphQLErrors &&
    graphQLErrors[0]?.extensions?.code === "UNAUTHENTICATED"
  ) {
    console.log(graphQLErrors)
    return new Observable((observer) => {
      (async () => {
        try {
          const newToken = await GetNewAccessToken();
          if (!newToken) {
            return;
          }
          // Modify the operation context with a new token
          const oldHeaders = operation.getContext().headers;

          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: `Bearer ${newToken}`,
            },
          });

          const subscriber = {
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          };

          // Retry last failed request
          forward(operation).subscribe(subscriber);
        } catch (error) {
          observer.error(error);
        }
      })();
    });
  }
});

const client = new ApolloClient({
  link: from([logoutLink, authMiddleware, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getExams: {
            keyArgs: false,
            merge(existing, incoming) {
              return {
                ...incoming,
                paginatedExams: [
                  ...(existing?.paginatedExams || []),
                  ...incoming.paginatedExams,
                ],
              };
            },
          },
        },
      },
    },
  }),
});
export default client;
