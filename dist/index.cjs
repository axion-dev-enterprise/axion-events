function createTraceMetadata(input = {}) {
  return {
    traceId: input.traceId ?? `trace_${Date.now().toString(36)}`,
    correlationId: input.correlationId ?? null,
    actor: input.actor ?? "system"
  };
}

function createEventEnvelope(name, payload, input = {}) {
  return {
    id: input.id ?? `${name}_${Date.now().toString(36)}`,
    name,
    source: input.source ?? "unknown",
    version: input.version ?? "1",
    timestamp: input.timestamp ?? new Date().toISOString(),
    metadata: createTraceMetadata(input.metadata),
    payload
  };
}

function createErrorEvent(error, input = {}) {
  return createEventEnvelope(input.name ?? "error.raised", {
    message: error?.message ?? "Unknown error",
    code: error?.code ?? "UNHANDLED_ERROR",
    status: error?.status ?? 500,
    details: error?.details ?? null
  }, input);
}

function redactSecrets(payload, keys = ["password", "token", "secret", "authorization"]) {
  if (!payload || typeof payload !== "object") {
    return payload;
  }

  const clone = Array.isArray(payload) ? [...payload] : { ...payload };
  for (const [key, value] of Object.entries(clone)) {
    if (keys.includes(String(key).toLowerCase())) {
      clone[key] = "[REDACTED]";
      continue;
    }
    if (value && typeof value === "object") {
      clone[key] = redactSecrets(value, keys);
    }
  }
  return clone;
}

module.exports = {
  createErrorEvent,
  createEventEnvelope,
  createTraceMetadata,
  redactSecrets
};
