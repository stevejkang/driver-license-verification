export interface CreateDriverLicenseVerificationUseCaseRequest {
  driverName: string;
  driverBirthday: string;
  licenseNumber: string;
  serialNumber?: string;
}
