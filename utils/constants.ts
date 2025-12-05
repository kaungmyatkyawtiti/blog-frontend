export interface Post {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

export const dummyPosts: Post[] = [
  {
    id: 1,
    author: "Alice",
    content: "Hello, World! Just setting up my new environment 🌍",
    timestamp: "2 mins ago"
  },
  {
    id: 2,
    author: "Bob",
    content: "React is fun, but have you tried combining it with Tailwind? The developer experience is insane! 🚀",
    timestamp: "15 mins ago"
  },
  {
    id: 3,
    author: "Chris",
    content: "Yay, interesting updates coming to the platform soon.",
    timestamp: "1 hour ago"
  },
  {
    id: 4,
    author: "Alice",
    content: "Hello, World! 🌍 Finally finished setting up my new environment. Fresh configs, clean terminal, updated packages, and a bunch of quality-of-life tools. It always feels good when everything is fast, organized, and ready for code. Time to dive back into building!",
    timestamp: "2 mins ago"
  },

];

export interface MockComment {
  id: number;
  user: {
    username: string;
    image: string | null;
  };
  content: string;
  created: Date;
}

export const mockComments: MockComment[] = [
  {
    id: 1,
    user: { username: "Alice", image: "/logo.jpg" },
    content: "New comment",
    created: new Date('2025-05-04T12:00:00Z'),
  },
  {
    id: 2,
    user: { username: "Alice", image: "/logo.jpg" },
    content: "More comment",
    created: new Date('2025-05-04T13:00:00Z'),
  },
  {
    id: 3,
    user: { username: "Alice", image: "/logo.jpg" },
    content: "Test comment",
    created: new Date('2025-05-04T14:00:00Z'),
  },
];
