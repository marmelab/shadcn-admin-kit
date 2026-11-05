import type { SeedThread } from "./seed";

export const folderThreads: SeedThread[] = [
  // Sent
  {
    subject: "Design review notes",
    contact: { name: "Emma Johnson", email: "emma.johnson@example.com" },
    folder: "sent",
    labels: ["work"],
    messages: [
      {
        author: "me",
        hoursAgo: 10,
        message:
          "Hi Emma,\n\nThanks for the design review today. Here are my notes: the dashboard feels much clearer, but the mobile navigation still needs work.\n\nBest, Alicia",
      },
    ],
  },
  {
    subject: "Lunch on Thursday?",
    contact: { name: "Liam Wilson", email: "liam.wilson@example.com" },
    folder: "sent",
    labels: ["personal"],
    messages: [
      {
        author: "contact",
        hoursAgo: 22,
        message: "Hey Alicia, are you free for lunch this week?\n\nLiam",
      },
      {
        author: "me",
        hoursAgo: 18,
        message: "Hi Liam, Thursday works for me. The usual place at noon?",
      },
    ],
  },
  {
    subject: "Contract renewal",
    contact: { name: "Noah Martinez", email: "noah.martinez@example.com" },
    folder: "sent",
    labels: ["work", "important"],
    messages: [
      {
        author: "me",
        hoursAgo: 48,
        message:
          "Hi Noah,\n\nPlease find attached the renewal proposal for next year. The pricing stays the same, and we added the premium support option you asked for.\n\nBest regards, Alicia",
      },
    ],
  },
  {
    subject: "Slides for the workshop",
    contact: {
      name: "Isabella Jackson",
      email: "isabella.jackson@example.com",
    },
    folder: "sent",
    messages: [
      {
        author: "me",
        hoursAgo: 120,
        message:
          "Hi Isabella,\n\nHere are the slides for Friday's workshop. Feel free to reuse them with your team.\n\nAlicia",
      },
    ],
  },
  // Drafts
  {
    subject: "Offsite planning",
    contact: { name: "Ethan Wilson", email: "ethan.wilson@example.com" },
    folder: "drafts",
    messages: [
      {
        author: "me",
        hoursAgo: 15,
        message:
          "Hi Ethan,\n\nI started a list of possible venues for the offsite:\n\n- The lake house\n- The mountain lodge\n\nStill need to",
      },
    ],
  },
  {
    subject: "Quarterly report",
    contact: { name: "Mia Clark", email: "mia.clark@example.com" },
    folder: "drafts",
    labels: ["work"],
    messages: [
      {
        author: "me",
        hoursAgo: 60,
        message:
          "Hi Mia,\n\nHere is a first draft of the quarterly report. The numbers for September are still",
      },
    ],
  },
  {
    subject: "Re: Internship",
    contact: { name: "Lucas Brown", email: "lucas.brown@example.com" },
    folder: "drafts",
    messages: [
      {
        author: "me",
        hoursAgo: 200,
        message:
          "Hi Lucas,\n\nThank you for your application. We would be happy to",
      },
    ],
  },
  // Junk
  {
    subject: "Congratulations! You have won",
    contact: {
      name: "Prize Department",
      email: "winner@lucky-prize.example.com",
    },
    folder: "junk",
    read: false,
    messages: [
      {
        author: "contact",
        hoursAgo: 7,
        message:
          "You have been selected as the winner of our monthly draw! Click here to claim your prize before it expires.",
      },
    ],
  },
  {
    subject: "Double your savings in 7 days",
    contact: { name: "Crypto Boost", email: "invest@crypto-boost.example.com" },
    folder: "junk",
    read: false,
    messages: [
      {
        author: "contact",
        hoursAgo: 33,
        message:
          "Our exclusive investment program guarantees to double your savings in just 7 days. Limited spots available!",
      },
    ],
  },
  {
    subject: "90% off luxury watches",
    contact: {
      name: "Mega Discounts",
      email: "promo@megadiscount.example.com",
    },
    folder: "junk",
    messages: [
      {
        author: "contact",
        hoursAgo: 85,
        message: "Luxury watches at 90% off, today only. Don't miss out!",
      },
    ],
  },
  {
    subject: "Your account will be suspended",
    contact: {
      name: "Account Team",
      email: "support@secure-acc0unt.example.com",
    },
    folder: "junk",
    read: false,
    messages: [
      {
        author: "contact",
        hoursAgo: 150,
        message:
          "We detected unusual activity on your account. Confirm your details within 24 hours to avoid suspension.",
      },
    ],
  },
  // Trash
  {
    subject: "Garage sale this Saturday",
    contact: { name: "Sophia Smith", email: "sophia.smith@example.com" },
    folder: "trash",
    messages: [
      {
        author: "contact",
        hoursAgo: 45,
        message:
          "Hi neighbors, we're having a garage sale this Saturday from 9am. Come by for books, toys and furniture!",
      },
    ],
  },
  {
    subject: "Your trial is ending",
    contact: { name: "Acme Cloud", email: "billing@acmecloud.example.com" },
    folder: "trash",
    messages: [
      {
        author: "contact",
        hoursAgo: 95,
        message:
          "Your free trial ends in 3 days. Add a payment method to keep your projects running.",
      },
    ],
  },
  {
    subject: "Out of office",
    contact: { name: "Lucas Brown", email: "lucas.brown@example.com" },
    folder: "trash",
    messages: [
      {
        author: "contact",
        hoursAgo: 190,
        message:
          "I'm out of the office until Monday with limited access to email.",
      },
    ],
  },
  // Archive
  {
    subject: "Kickoff meeting notes",
    contact: { name: "William Smith", email: "williamsmith@example.com" },
    folder: "archive",
    labels: ["meeting", "work"],
    messages: [
      {
        author: "contact",
        hoursAgo: 400,
        message:
          "Hi Alicia,\n\nHere are the notes from the kickoff meeting. Next steps: finalize the scope by Friday and share the planning with the team.\n\nBest regards, William",
      },
      {
        author: "me",
        hoursAgo: 390,
        message: "Thanks William, I'll send the planning on Monday.",
      },
    ],
  },
  {
    subject: "Welcome to the team!",
    contact: { name: "Emma Johnson", email: "emma.johnson@example.com" },
    folder: "archive",
    labels: ["work"],
    messages: [
      {
        author: "contact",
        hoursAgo: 500,
        message:
          "Hi Alicia,\n\nThank you for the warm welcome! I'm excited to join the team and can't wait to start working on the new dashboard.\n\nEmma",
      },
    ],
  },
  {
    subject: "Your order has been delivered",
    contact: { name: "Book Nook", email: "orders@booknook.example.com" },
    folder: "archive",
    category: "shopping",
    messages: [
      {
        author: "contact",
        hoursAgo: 600,
        message: "Your order has been delivered. Enjoy your reading!",
      },
    ],
  },
  {
    subject: "Photos from the trip",
    contact: { name: "Olivia Wilson", email: "oliviawilson@example.com" },
    folder: "archive",
    labels: ["personal", "travel"],
    messages: [
      {
        author: "contact",
        hoursAgo: 700,
        message:
          "Here are the photos from our trip! The sunset on the last day was amazing.\n\nOlivia",
      },
    ],
  },
];
