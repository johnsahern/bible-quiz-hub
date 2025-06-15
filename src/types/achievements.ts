
export interface Achievement {
  id: string;
  achievement_type: string;
  achievement_name: string;
  description: string | null;
  earned_at: string;
}

export interface AchievementDefinition {
  type: string;
  name: string;
  description: string;
  icon: string;
  checkCondition: (data: AchievementCheckData) => boolean;
}

export interface AchievementCheckData {
  user: any;
  profile: any;
  quizResult?: any;
  quizHistory?: any[];
  multiplayerResult?: any;
  responseTime?: number;
}
