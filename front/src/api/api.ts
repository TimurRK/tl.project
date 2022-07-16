import type { AxiosInstance, AxiosRequestHeaders } from "axios";
import axios from "axios";

const api_endpoint = import.meta.env.VITE_APP_API;

export interface IGraphQLError {
  message: string;
  locations?: Array<{
    line: number;
    column: number;
  }>;
  extensions: {
    code: string;
    exception: {
      stacktrace: string[];
    };
  };
}

class ApiService {
  private http_client: AxiosInstance | null = null;

  private readonly default_headers: AxiosRequestHeaders = {
    "Content-Type": "application/json; charset=utf-8",
  };

  constructor() {
    this.http_client = axios.create({ baseURL: api_endpoint });

    this.http_client.interceptors.response.use(
      async (response) => {
        return response;
      },
      async (error) => {
        return Promise.resolve(error.response);
      }
    );
  }

  public async get(url: string) {
    return await this.http_client!.get(url, {
      headers: {
        ...this.default_headers,
      },
    });
  }

  public async post(url: string, body: Record<string, unknown>) {
    return await this.http_client!.post(url, body, {
      headers: {
        ...this.default_headers,
      },
    });
  }

  public async put(url: string, body: Record<string, unknown>) {
    return await this.http_client!.put(url, body, {
      headers: {
        ...this.default_headers,
      },
    });
  }

  public async patch(url: string, body: Record<string, unknown>) {
    return await this.http_client!.patch(url, body, {
      headers: {
        ...this.default_headers,
      },
    });
  }

  public async delete(url: string) {
    return await this.http_client!.delete(url, {
      headers: {
        ...this.default_headers,
      },
    });
  }

  public async graphql<T>(query: string, variables: Record<string, unknown>) {
    const { data: res }: { data: { data: T; errors?: IGraphQLError[] } } =
      await this.post("/graphql", { query, variables });

    return res;
  }
}

export default new ApiService();
