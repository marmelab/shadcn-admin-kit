import type { SeedThread } from "./seed";

const connectly = {
  name: "Connectly",
  email: "notifications@connectly.example.com",
};
const acmeCloud = {
  name: "Acme Cloud",
  email: "billing@acmecloud.example.com",
};
const adminBuilders = {
  name: "Admin Builders Forum",
  email: "digest@adminbuilders.example.com",
};
const postersGalore = {
  name: "Posters Galore",
  email: "orders@postersgalore.example.com",
};
const freshMarket = {
  name: "Fresh Market",
  email: "hello@freshmarket.example.com",
};
const bookNook = { name: "Book Nook", email: "orders@booknook.example.com" };
const stayaway = { name: "Stayaway", email: "bookings@stayaway.example.com" };

export const categoryThreads: SeedThread[] = [
  // Social
  {
    subject: "Emma Johnson wants to connect",
    contact: connectly,
    folder: "inbox",
    category: "social",
    read: false,
    messages: [
      {
        author: "contact",
        hoursAgo: 1,
        message:
          "Hi Alicia,\n\nEmma Johnson, Product Designer at Northwind, would like to join your professional network.\n\nAccept the invitation to stay in touch.",
      },
    ],
  },
  {
    subject: "Liam Wilson tagged you in a photo",
    contact: { name: "Photogram", email: "no-reply@photogram.example.com" },
    folder: "inbox",
    category: "social",
    read: false,
    messages: [
      {
        author: "contact",
        hoursAgo: 8,
        message:
          "Liam Wilson tagged you in a photo from the team offsite.\n\nOpen Photogram to see it and leave a comment.",
      },
    ],
  },
  {
    subject: "You appeared in 12 searches this week",
    contact: connectly,
    folder: "inbox",
    category: "social",
    messages: [
      {
        author: "contact",
        hoursAgo: 30,
        message:
          "Your profile appeared in 12 searches this week. Recruiters and hiring managers were among the people who looked for you.",
      },
    ],
  },
  {
    subject: "Olivia Davis and 3 others liked your post",
    contact: { name: "Chirp", email: "digest@chirp.example.com" },
    folder: "inbox",
    category: "social",
    messages: [
      {
        author: "contact",
        hoursAgo: 55,
        message:
          "Olivia Davis, Noah Martinez and 2 others liked your post about the product launch.",
      },
    ],
  },
  {
    subject: "New event: React Paris meetup",
    contact: { name: "Meetly", email: "events@meetly.example.com" },
    folder: "inbox",
    category: "social",
    read: false,
    messages: [
      {
        author: "contact",
        hoursAgo: 90,
        message:
          'A new event was posted in the React Paris group: "Building admin apps with shadcn/ui", next Thursday at 7pm.',
      },
    ],
  },
  // Updates
  {
    subject: "Your invoice for this month",
    contact: acmeCloud,
    folder: "inbox",
    category: "updates",
    messages: [
      {
        author: "contact",
        hoursAgo: 3,
        message:
          "Hi Alicia,\n\nYour invoice is available. Amount due: $49.00. It will be charged to your card ending in 4242 on the 1st.",
      },
    ],
  },
  {
    subject: "Scheduled maintenance on Sunday",
    contact: acmeCloud,
    folder: "inbox",
    category: "updates",
    read: false,
    messages: [
      {
        author: "contact",
        hoursAgo: 12,
        message:
          "We will perform a scheduled maintenance on Sunday from 2am to 4am UTC. Your services may be briefly unavailable during this window.",
      },
    ],
  },
  {
    subject: "New sign-in to your account",
    contact: { name: "Security", email: "security@example.com" },
    folder: "inbox",
    category: "updates",
    read: false,
    messages: [
      {
        author: "contact",
        hoursAgo: 40,
        message:
          "We noticed a new sign-in to your account from Chrome on macOS. If this was you, you can ignore this email. Otherwise, please reset your password.",
      },
    ],
  },
  {
    subject: "Reminder: Quarterly review tomorrow at 10am",
    contact: { name: "Calendar", email: "calendar@example.com" },
    folder: "inbox",
    category: "updates",
    messages: [
      {
        author: "contact",
        hoursAgo: 80,
        message:
          'This is a reminder for your event "Quarterly review" tomorrow from 10am to 11am in room B.',
      },
    ],
  },
  {
    subject: "[shadcn-admin-kit] New release v2.0",
    contact: { name: "CodeHub", email: "noreply@codehub.example.com" },
    folder: "inbox",
    category: "updates",
    messages: [
      {
        author: "contact",
        hoursAgo: 130,
        message:
          "A new release is available: v2.0. Read the changelog to see what changed.",
      },
    ],
  },
  // Forums
  {
    subject: "Re: Best trails around the lake",
    contact: {
      name: "Hiking Club Forum",
      email: "forum@hikingclub.example.com",
    },
    folder: "inbox",
    category: "forums",
    read: false,
    messages: [
      {
        author: "contact",
        hoursAgo: 6,
        message:
          'Samuel Turner replied to your topic: "The north loop is my favorite, especially in autumn. Bring water, there\'s no fountain on the way."',
      },
    ],
  },
  {
    subject: "Weekly digest: 5 new topics",
    contact: adminBuilders,
    folder: "inbox",
    category: "forums",
    messages: [
      {
        author: "contact",
        hoursAgo: 22,
        message:
          "Here are this week's most popular topics: custom layouts, optimistic updates, i18n tips, data providers for GraphQL, and dark mode theming.",
      },
    ],
  },
  {
    subject: "Your question has an accepted answer",
    contact: adminBuilders,
    folder: "inbox",
    category: "forums",
    messages: [
      {
        author: "contact",
        hoursAgo: 60,
        message:
          'Your question "How to keep list filters in the URL?" has an accepted answer. Thanks for contributing to the community!',
      },
    ],
  },
  {
    subject: "Re: Which lens for landscapes?",
    contact: { name: "Photography Forum", email: "forum@shutter.example.com" },
    folder: "inbox",
    category: "forums",
    read: false,
    messages: [
      {
        author: "contact",
        hoursAgo: 110,
        message:
          'Mia Harris replied: "A 16-35mm is a great start. Stop down to f/8 and you\'ll be happy with the sharpness."',
      },
    ],
  },
  {
    subject: "New reply to: Sourdough starter tips",
    contact: { name: "Cooking Forum", email: "forum@cookbook.example.com" },
    folder: "inbox",
    category: "forums",
    messages: [
      {
        author: "contact",
        hoursAgo: 180,
        message:
          'Chloe Hall replied: "Feed it twice a day for a week and keep it at room temperature. Patience is the secret!"',
      },
    ],
  },
  // Shopping
  {
    subject: "Your order #1024 has shipped",
    contact: postersGalore,
    folder: "inbox",
    category: "shopping",
    messages: [
      {
        author: "contact",
        hoursAgo: 4,
        message:
          "Good news! Your order #1024 (2 posters) has shipped and should arrive within 3 business days.",
      },
    ],
  },
  {
    subject: "Rate your recent purchase",
    contact: postersGalore,
    folder: "inbox",
    category: "shopping",
    read: false,
    messages: [
      {
        author: "contact",
        hoursAgo: 36,
        message:
          'How do you like the "Mountain Sunrise" poster? Leave a review and help other customers choose.',
      },
    ],
  },
  {
    subject: "Your delivery is scheduled for tomorrow",
    contact: freshMarket,
    folder: "inbox",
    category: "shopping",
    messages: [
      {
        author: "contact",
        hoursAgo: 72,
        message:
          "Your grocery delivery is scheduled for tomorrow between 6pm and 8pm. You can still edit your order until midnight.",
      },
    ],
  },
  {
    subject: "Order confirmation",
    contact: bookNook,
    folder: "inbox",
    category: "shopping",
    messages: [
      {
        author: "contact",
        hoursAgo: 140,
        message:
          'Thank you for your order! "The Pragmatic Programmer" will be shipped within 24 hours.',
      },
    ],
  },
  {
    subject: "Your booking is confirmed",
    contact: stayaway,
    folder: "inbox",
    category: "shopping",
    read: false,
    messages: [
      {
        author: "contact",
        hoursAgo: 210,
        message:
          "Your stay at Seaside Hotel is confirmed for 3 nights. Check-in from 3pm.",
      },
    ],
  },
  // Promotions
  {
    subject: "Summer sale: 30% off all posters",
    contact: postersGalore,
    folder: "inbox",
    category: "promotions",
    read: false,
    messages: [
      {
        author: "contact",
        hoursAgo: 9,
        message:
          "Our summer sale starts today! Enjoy 30% off all posters until Sunday with code SUMMER30.",
      },
    ],
  },
  {
    subject: "Free delivery this weekend",
    contact: freshMarket,
    folder: "inbox",
    category: "promotions",
    messages: [
      {
        author: "contact",
        hoursAgo: 28,
        message:
          "Order before Sunday and get free delivery on all orders over $30.",
      },
    ],
  },
  {
    subject: "Books we think you'll love",
    contact: bookNook,
    folder: "inbox",
    category: "promotions",
    messages: [
      {
        author: "contact",
        hoursAgo: 65,
        message:
          "Based on your recent purchases, here are 5 books we think you'll love.",
      },
    ],
  },
  {
    subject: "Last minute deals for your next trip",
    contact: stayaway,
    folder: "inbox",
    category: "promotions",
    read: false,
    messages: [
      {
        author: "contact",
        hoursAgo: 100,
        message:
          "Find last minute deals up to 40% off in Lisbon, Barcelona and Rome.",
      },
    ],
  },
  {
    subject: "Upgrade to Pro and save 20%",
    contact: acmeCloud,
    folder: "inbox",
    category: "promotions",
    messages: [
      {
        author: "contact",
        hoursAgo: 160,
        message:
          "Get more storage, priority support and advanced analytics. Upgrade to Pro this month and save 20%.",
      },
    ],
  },
];
