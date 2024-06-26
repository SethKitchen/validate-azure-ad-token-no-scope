import { JwtPayload } from 'jsonwebtoken';

import { IValidationOptions } from '..';

export function validateTokenClaims(
  tokenPayload: JwtPayload,
  { applicationId, audience, tenantId }: IValidationOptions,
): void {
  // tenantId
  if (!tokenPayload.tid) {
    throw new Error('The token\'s payload does not contain "tid" property');
  }

  const isValidTenantId = tokenPayload.tid === tenantId;

  if (!isValidTenantId) {
    throw new Error("The token's payload contains different tenantId");
  }

  // applicationId
  if (!tokenPayload.appid) {
    throw new Error('The token\'s payload does not contain "appid" property');
  }

  const isValidApplicationId = tokenPayload.appid === applicationId;

  if (!isValidApplicationId) {
    throw new Error("The token's payload contains different applicationId");
  }

  // audience
  if (!tokenPayload.aud) {
    throw new Error('The token\'s payload does not contain "aud" property');
  }

  const isValidAudience = tokenPayload.aud === audience;

  if (!isValidAudience) {
    throw new Error("The token's payload contains different audience");
  }

  // security token service
  if (!tokenPayload.iss) {
    throw new Error('The token\'s payload does not contain "iss" property');
  }

  const isValidSecurityTokenService = tokenPayload.iss.includes('sts') && tokenPayload.iss.includes(tenantId);

  if (!isValidSecurityTokenService) {
    throw new Error("The token's payload contains different security token service");
  }

  // expiration
  if (!tokenPayload.exp) {
    throw new Error('The token\'s payload does not contain "exp" property');
  }

  if (typeof tokenPayload.exp !== 'number') {
    throw new Error("The token's payload expiration is not a number value");
  }

  const isValidExpiration = tokenPayload.exp > Math.floor(Date.now() / 1000);

  if (!isValidExpiration) {
    throw new Error("The token's payload contains different expiration");
  }
}
