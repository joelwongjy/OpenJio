export type BearerToken = string;

export enum BearerTokenType {
  AccessToken,
}

type Payload<BearerTokenType> = {
  tokenType: BearerTokenType;
};

type TokenLifespan = {
  iat: number;
  exp: number;
};

export type AccessTokenPayload = Payload<BearerTokenType.AccessToken> & {
  userId: number;
};
export type AccessTokenSignedPayload = AccessTokenPayload & TokenLifespan;

// Type checkers

export function isBearerToken(token: string | undefined): token is BearerToken {
  if (!token) {
    return false;
  }
  const words = token.split(" ");
  return words[0] === "Bearer" && !!words[1];
}

function isPayload<T>(
  payload: any,
  tokenType: BearerTokenType
): payload is Payload<T> {
  return (
    payload.tokenType in BearerTokenType && payload.tokenType === tokenType
  );
}

function hasTokenLifespan(payload: any): boolean {
  return typeof payload.iat === "number" && typeof payload.exp === "number";
}

export function isAccessTokenPayload(
  payload: any
): payload is AccessTokenPayload {
  return (
    typeof payload.userId === "number" &&
    isPayload(payload, BearerTokenType.AccessToken)
  );
}

export function isAccessTokenSignedPayload(
  payload: any
): payload is AccessTokenSignedPayload {
  return isAccessTokenPayload(payload) && hasTokenLifespan(payload);
}
