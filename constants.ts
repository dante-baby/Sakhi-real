import { Article, ForumPost, Helpline, AssessmentQuestion, DailyTask, Story, DailyPlanItem, Achievement } from './types';

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Navigating Career Anxiety',
    category: 'Career Stress',
    description: 'Feeling lost about the future? Here is how to handle the pressure of choosing a path.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read',
    type: 'Article'
  },
  {
    id: '2',
    title: 'Dealing with Peer Pressure',
    category: 'Peer Pressure',
    description: 'How to stay true to yourself when friends are pushing you in a different direction.',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
    type: 'Article'
  },
  {
    id: '3',
    title: 'Building Real Confidence',
    category: 'Self-Confidence',
    description: 'Confidence is not about being loud. It is about being comfortable in your own skin.',
    imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800',
    readTime: '6 min video',
    type: 'Video'
  },
  {
    id: '4',
    title: 'Understanding Family Conflict',
    category: 'Family',
    description: 'Why arguments happen and how to communicate effectively with parents.',
    imageUrl: 'https://images.unsplash.com/photo-1591123120675-6f7f4a548139?auto=format&fit=crop&q=80&w=800',
    readTime: '7 min read',
    type: 'Article'
  },
  {
    id: '5',
    title: 'Exam Stress: A Survival Guide',
    category: 'Mental Health',
    description: 'Practical tips to manage anxiety during exam season.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read',
    type: 'Article'
  },
  {
    id: '6',
    title: 'Recognizing Abuse',
    category: 'Abuse Awareness',
    description: 'Understanding physical, emotional, and digital abuse signs.',
    imageUrl: 'https://images.unsplash.com/photo-1501635237365-b1cb748a2873?auto=format&fit=crop&q=80&w=800',
    readTime: '8 min read',
    type: 'Article'
  }
];

export const MOCK_FORUM_POSTS: ForumPost[] = [
  {
    id: '1',
    authorAlias: 'FutureSeeker',
    avatarColor: 'bg-indigo-500',
    title: 'College applications are stressing me out',
    content: 'I feel like my whole life depends on these next few months. How do you guys deal with the fear of rejection?',
    replies: 15,
    likes: 42,
    timestamp: '1 hour ago',
    tags: ['Exams', 'Anxiety']
  },
  {
    id: '2',
    authorAlias: 'BlueSky',
    avatarColor: 'bg-sky-500',
    title: 'Feeling lonely at university',
    content: 'I moved to a new city for college and I am finding it really hard to make real friends. Everyone seems so busy.',
    replies: 8,
    likes: 23,
    timestamp: '3 hours ago',
    tags: ['Relationships', 'Mental Health']
  },
  {
    id: '3',
    authorAlias: 'AnonymousUser',
    avatarColor: 'bg-slate-500',
    title: 'Parents don\'t understand my career choice',
    content: 'They want me to be an engineer, but I want to pursue arts. It is causing so many fights at home.',
    replies: 25,
    likes: 89,
    timestamp: '1 day ago',
    tags: ['Family', 'Career']
  }
];

export const HELPLINES: Helpline[] = [
  {
    name: '24/7 Support Line',
    number: '1-800-HOPE-123',
    description: 'Confidential crisis support whenever you need it.',
    available: '24/7',
    category: 'Mental Health'
  },
  {
    name: 'Student Wellness Connect',
    number: '1-888-STU-HELP',
    description: 'Academic and social stress counseling.',
    available: 'Mon-Sun',
    category: 'Mental Health'
  },
  {
    name: 'Safe Haven Youth',
    number: '1-800-SAFE-GIRL',
    description: 'Protection and guidance for physical safety.',
    available: '24/7',
    category: 'Child Safety'
  },
  {
    name: 'Women & Youth Care',
    number: '1-800-CARE-NOW',
    description: 'Support for women and young girls facing difficulties.',
    available: '24/7',
    category: 'Women & Youth'
  },
  {
    name: 'Lifeline',
    number: '988',
    description: 'Immediate support for emotional distress.',
    available: '24/7',
    category: 'Suicide Prevention'
  }
];

export const AVATAR_COLORS = [
  'bg-slate-500', 'bg-zinc-500', 'bg-red-500', 'bg-orange-500', 
  'bg-amber-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500', 
  'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-sky-500', 
  'bg-blue-500', 'bg-indigo-500', 'bg-violet-500', 'bg-purple-500', 
  'bg-fuchsia-500', 'bg-pink-500', 'bg-rose-500'
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    text: "How often have you felt overwhelmed or stressed in the past week?",
    options: [
      { label: "Never", score: 0 },
      { label: "Sometimes", score: 1 },
      { label: "Often", score: 2 },
      { label: "Constantly", score: 3 }
    ]
  },
  {
    id: 2,
    text: "Do you find it difficult to sleep or relax?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "A little", score: 1 },
      { label: "Quite a bit", score: 2 },
      { label: "Very much", score: 3 }
    ]
  },
  {
    id: 3,
    text: "How would you describe your current mood?",
    options: [
      { label: "Happy/Stable", score: 0 },
      { label: "A bit low", score: 1 },
      { label: "Sad/Anxious", score: 2 },
      { label: "Very low/Hopeless", score: 3 }
    ]
  },
  {
    id: 4,
    text: "Do you feel you have someone to talk to about your problems?",
    options: [
      { label: "Yes, many people", score: 0 },
      { label: "One or two", score: 1 },
      { label: "Not really", score: 2 },
      { label: "No one", score: 3 }
    ]
  }
];

export const GUIDED_QUESTIONS = [
  "What is one thing that made you smile today, no matter how small?",
  "If you could say one thing to your stress right now, what would it be?",
  "What is a goal you want to achieve this week?",
  "Write down three things you are grateful for."
];

export const INITIAL_DAILY_TASKS: DailyTask[] = [
  { id: '1', title: 'Write down how you feel', completed: false, icon: 'PenTool' },
  { id: '2', title: 'Take 5 deep breaths', completed: false, icon: 'Wind' },
  { id: '3', title: 'Drink a glass of water', completed: false, icon: 'Droplet' },
  { id: '4', title: 'List 3 things you are grateful for', completed: false, icon: 'Heart' },
];

export const MOCK_STORIES: Story[] = [
  { id: '1', title: 'Overcoming Fear', thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', author: 'Maya' },
  { id: '2', title: 'My Anxiety Journey', thumbnail: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200', author: 'Alex' },
  { id: '3', title: 'Finding Balance', thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', author: 'Sarah' },
  { id: '4', title: 'Self-Love Tips', thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200', author: 'Priya' },
  { id: '5', title: 'Exam Success', thumbnail: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=200', author: 'Sam' },
];

export const MOCK_WELLNESS_PLAN: DailyPlanItem[] = [
  { id: '1', title: 'Morning Check-in', time: '8:00 AM', type: 'mood', completed: true },
  { id: '2', title: 'Breathing Exercise', time: '12:00 PM', type: 'activity', completed: false },
  { id: '3', title: 'Gratitude Journal', time: '8:00 PM', type: 'journal', completed: false },
  { id: '4', title: 'Digital Detox', time: '10:00 PM', type: 'rest', completed: false },
];

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: '1', title: '3 Day Streak', icon: 'Flame', unlocked: true },
  { id: '2', title: 'First Share', icon: 'Share2', unlocked: false },
  { id: '3', title: 'Zen Master', icon: 'Wind', unlocked: false },
];