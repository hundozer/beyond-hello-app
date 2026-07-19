export type AppScreenId = 'profile' | 'explore' | 'challenge' | 'invite' | 'match';

export interface AppScreenData {
  id: AppScreenId;
  title: string;
  subtitle: string;
}

export interface SignupData {
  id: string;
  name: string;
  email: string;
  ageRange: string;
  gender: string;
  lookingFor: string;
  city: string;
  timestamp: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  tag: string;
  difficulty: 'Easy' | 'Medium' | 'Adventurous';
  timeNeeded: string;
  participants: number;
  iconName: string;
  colorClass: string;
  bgGradient: string;
  steps: string[];
}

export interface StepJourney {
  number: number;
  title: string;
  description: string;
  screenId: AppScreenId;
  accentText: string;
}

export interface FeatureCard {
  title: string;
  description: string;
  iconName: string;
  color: string;
}

export interface PragueSpot {
  name: string;
  category: string;
  description: string;
  popularFor: string;
  imageAlt: string;
}
