export interface Profile {
  id: string;
  name: string;
  operator: {
    name: string;
    timezone: string;
    style: string;
  };
  modelStack: string[];
  workloadType: string[];
  personality: {
    chaos: number;
    snark: number;
    initiative: number;
    reflexive: number;
  };
  boundaries: {
    hardNo: string[];
    allowed: string[];
  };
  lookingFor: string;
  imageUrl: string;
  verified?: boolean;
  redFlags?: string[];
}

export interface Match {
  id: string;
  profileId: string;
  compatibilityScore: number;
  reasons: string[];
}
