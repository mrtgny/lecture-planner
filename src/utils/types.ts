export interface Callback<T = unknown, K = unknown | Promise<unknown>> {
  (param?: T): K;
}
