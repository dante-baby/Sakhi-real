export enum UserRole {
  GUEST = 'GUEST',
  USER = 'USER',
  COUNSELOR = 'COUNSELOR'
}

export type AgeGroup = 'Under 18' | 'College Student';

export interface User {
  id: string;
  name: string;
  isAnonymous: boolean;
  role: UserRole;
  ageGroup?: AgeGroup;
  avatar?: string;
}

export interface Article {
  id: string;
  title: string;
  category: 'Mental Health' | 'Peer Pressure' | 'Family' | 'Abuse Awareness' | 'Self-Confidence' | 'Career Stress' | 'Safety';
  description: string;
  imageUrl: string;
  readTime: string;
  type: 'Article' | 'Video';
}

export interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
  isSystem?: boolean;
}

export interface ForumPost {
  id: string;
  authorAlias: string;
  avatarColor: string;
  title: string;
  content: string;
  replies: number;
  likes: number;
  timestamp: string;
  tags: string[];
}

export interface Helpline {
  name: string;
  number: string;
  description: string;
  available: string;
  category: 'Mental Health' | 'Child Safety' | 'Women & Youth' | 'Suicide Prevention';
}

export interface AssessmentQuestion {
  id: number;
  text: string;
  options: { label: string; score: number }[];
}

export interface DailyTask {
  id: string;
  title: string;
  completed: boolean;
  icon: string;
}

export interface Story {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
  videoUrl?: string;
}

export interface DailyPlanItem {
  id: string;
  title: string;
  time: string;
  type: 'mood' | 'activity' | 'journal' | 'rest';
  completed: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
}