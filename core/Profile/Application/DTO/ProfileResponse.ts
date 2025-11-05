import { Profile } from '../../Domain/Profile';

export class ProfileResponse {
  static generate(profile: Profile) {
    return {
      id: profile.id ?? '',
      name: profile.name,
      totalConfidence: profile.totalConfidence,
    };
  }
}
