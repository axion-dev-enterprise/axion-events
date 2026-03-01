export declare function createTraceMetadata(input?: Record<string, unknown>): {
  traceId: string;
  correlationId: unknown;
  actor: unknown;
};
export declare function createEventEnvelope(name: string, payload: unknown, input?: Record<string, unknown>): {
  id: unknown;
  name: string;
  source: unknown;
  version: unknown;
  timestamp: unknown;
  metadata: {
    traceId: string;
    correlationId: unknown;
    actor: unknown;
  };
  payload: unknown;
};
export declare function createErrorEvent(error: Record<string, unknown>, input?: Record<string, unknown>): {
  id: unknown;
  name: string;
  source: unknown;
  version: unknown;
  timestamp: unknown;
  metadata: {
    traceId: string;
    correlationId: unknown;
    actor: unknown;
  };
  payload: unknown;
};
export declare function redactSecrets(payload: unknown, keys?: string[]): unknown;
