import { CoreResponse } from 'src/shared/core/CoreResponse';

export interface CreateDriverLicenseVerificationUseCaseResponse extends CoreResponse {
  errorMessage?: string;
  errors?: string[];
}
