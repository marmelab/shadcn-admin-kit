import type { SeedThread } from "./seed";

export const inboxThreads: SeedThread[] = [
  {
    subject: "Meeting Tomorrow",
    contact: { name: "William Smith", email: "williamsmith@example.com" },
    folder: "inbox",
    labels: ["meeting", "work", "important"],
    messages: [
      {
        author: "contact",
        hoursAgo: 2,
        message:
          "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
      },
    ],
  },
  {
    subject: "Re: Project Update",
    contact: { name: "Alice Smith", email: "alicesmith@example.com" },
    folder: "inbox",
    labels: ["work", "important"],
    messages: [
      {
        author: "me",
        hoursAgo: 29,
        message:
          "Hi Alice,\n\nPlease find attached the project update for this quarter. We closed the first two milestones and the beta is now in the hands of our pilot customers.\n\nLet me know what you think.\n\nBest, Alicia",
      },
      {
        author: "contact",
        hoursAgo: 5,
        message:
          "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.\n\nI have a few minor suggestions that I'll include in the attached document.\n\nLet's discuss these during our next meeting. Keep up the excellent work!\n\nBest regards, Alice",
      },
    ],
  },
  {
    subject: "Weekend Plans",
    contact: { name: "Bob Johnson", email: "bobjohnson@example.com" },
    folder: "inbox",
    labels: ["personal"],
    messages: [
      {
        author: "contact",
        hoursAgo: 20,
        message:
          "Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun.\n\nIf you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature.\n\nLooking forward to your response!\n\nBest, Bob",
      },
    ],
  },
  {
    subject: "Re: Question about Budget",
    contact: { name: "Emily Davis", email: "emilydavis@example.com" },
    folder: "inbox",
    labels: ["work", "budget"],
    read: false,
    messages: [
      {
        author: "me",
        hoursAgo: 50,
        message:
          "Hi Emily,\n\nHere is the budget for the upcoming project, broken down by team and by quarter. Feel free to reach out if anything looks off.\n\nThanks, Alicia",
      },
      {
        author: "contact",
        hoursAgo: 26,
        message:
          "I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation of resources.\n\nI've reviewed the budget report and identified a few areas where we might be able to optimize our spending without compromising the project's quality.\n\nI've attached a detailed analysis for your reference. Let's discuss this further in our next meeting.\n\nThanks, Emily",
      },
    ],
  },
  {
    subject: "Important Announcement",
    contact: { name: "Michael Wilson", email: "michaelwilson@example.com" },
    folder: "inbox",
    labels: ["meeting", "work", "important"],
    read: false,
    starred: true,
    messages: [
      {
        author: "contact",
        hoursAgo: 30,
        message:
          "I have an important announcement to make during our team meeting. It pertains to a strategic shift in our approach to the upcoming product launch. We've received valuable feedback from our beta testers, and I believe it's time to make some adjustments to better meet our customers' needs.\n\nThis change is crucial to our success, and I look forward to discussing it with the team. Please be prepared to share your insights during the meeting.\n\nRegards, Michael",
      },
    ],
  },
  {
    subject: "Re: Feedback on Proposal",
    contact: { name: "Sarah Brown", email: "sarahbrown@example.com" },
    folder: "inbox",
    labels: ["work"],
    messages: [
      {
        author: "me",
        hoursAgo: 70,
        message:
          "Hi Sarah,\n\nI went through the proposal and it looks promising. My main concerns are the timeline for phase two and the staffing of the support team.\n\nCould you send me a revised version?\n\nBest, Alicia",
      },
      {
        author: "contact",
        hoursAgo: 44,
        message:
          "Thank you for your feedback on the proposal. It looks great! I'm pleased to hear that you found it promising. The team worked diligently to address all the key points you raised, and I believe we now have a strong foundation for the project.\n\nI've attached the revised proposal for your review.\n\nPlease let me know if you have any further comments or suggestions. Looking forward to your response.\n\nBest regards, Sarah",
      },
    ],
  },
  {
    subject: "New Project Idea",
    contact: { name: "David Lee", email: "davidlee@example.com" },
    folder: "inbox",
    labels: ["meeting", "work", "important"],
    read: false,
    messages: [
      {
        author: "contact",
        hoursAgo: 50,
        message:
          "I have an exciting new project idea to discuss with you. It involves expanding our services to target a niche market that has shown considerable growth in recent months.\n\nI've prepared a detailed proposal outlining the potential benefits and the strategy for execution.\n\nThis project has the potential to significantly impact our business positively. Let's set up a meeting to dive into the details and determine if it aligns with our current goals.\n\nBest regards, David",
      },
    ],
  },
  {
    subject: "Vacation Plans",
    contact: { name: "Olivia Wilson", email: "oliviawilson@example.com" },
    folder: "inbox",
    labels: ["personal"],
    messages: [
      {
        author: "contact",
        hoursAgo: 70,
        message:
          "Let's plan our vacation for next month. What do you think? I've been thinking of visiting a tropical paradise, and I've put together some destination options.\n\nI believe it's time for us to unwind and recharge. Please take a look at the options and let me know your preferences.\n\nWe can start making arrangements to ensure a smooth and enjoyable trip.\n\nExcited to hear your thoughts! Olivia",
      },
    ],
  },
  {
    subject: "Re: Conference Registration",
    contact: { name: "James Martin", email: "jamesmartin@example.com" },
    folder: "inbox",
    labels: ["work", "conference"],
    messages: [
      {
        author: "me",
        hoursAgo: 100,
        message:
          "Hi James,\n\nCould you take care of the registration for next month's conference? The early bird rate ends on Friday.\n\nThanks, Alicia",
      },
      {
        author: "contact",
        hoursAgo: 75,
        message:
          "I've completed the registration for the conference next month. The event promises to be a great networking opportunity, and I'm looking forward to attending the various sessions and connecting with industry experts.\n\nI've also attached the conference schedule for your reference.\n\nIf there are any specific topics or sessions you'd like me to explore, please let me know. It's an exciting event, and I'll make the most of it.\n\nBest regards, James",
      },
    ],
  },
  {
    subject: "Team Dinner",
    contact: { name: "Sophia White", email: "sophiawhite@example.com" },
    folder: "inbox",
    labels: ["meeting", "work"],
    read: false,
    messages: [
      {
        author: "contact",
        hoursAgo: 96,
        message:
          "Let's have a team dinner next week to celebrate our success. We've achieved some significant milestones, and it's time to acknowledge our hard work and dedication.\n\nI've made reservations at a lovely restaurant, and I'm sure it'll be an enjoyable evening.\n\nPlease confirm your availability and any dietary preferences. Looking forward to a fun and memorable dinner with the team!\n\nBest, Sophia",
      },
    ],
  },
  {
    subject: "Feedback Request",
    contact: { name: "Daniel Johnson", email: "danieljohnson@example.com" },
    folder: "inbox",
    labels: ["work"],
    read: false,
    messages: [
      {
        author: "contact",
        hoursAgo: 120,
        message:
          "I'd like your feedback on the latest project deliverables. We've made significant progress, and I value your input to ensure we're on the right track.\n\nI've attached the deliverables for your review, and I'm particularly interested in any areas where you think we can further enhance the quality or efficiency.\n\nYour feedback is invaluable, and I appreciate your time and expertise. Let's work together to make this project a success.\n\nRegards, Daniel",
      },
    ],
  },
  {
    subject: "Re: Meeting Agenda",
    contact: { name: "Ava Taylor", email: "avataylor@example.com" },
    folder: "inbox",
    labels: ["meeting", "work"],
    messages: [
      {
        author: "me",
        hoursAgo: 175,
        message:
          "Hi Ava,\n\nCould you prepare the agenda for next week's meeting? We need to cover the roadmap, the hiring plan and the budget review.\n\nThanks, Alicia",
      },
      {
        author: "contact",
        hoursAgo: 150,
        message:
          "Here's the agenda for our meeting next week. I've included all the topics we need to cover, as well as time allocations for each.\n\nIf you have any additional items to discuss or any specific points to address, please let me know, and we can integrate them into the agenda.\n\nIt's essential that our meeting is productive and addresses all relevant matters.\n\nLooking forward to our meeting! Ava",
      },
    ],
  },
  {
    subject: "Product Launch Update",
    contact: { name: "William Anderson", email: "williamanderson@example.com" },
    folder: "inbox",
    labels: ["meeting", "work", "important"],
    read: false,
    starred: true,
    messages: [
      {
        author: "contact",
        hoursAgo: 170,
        message:
          "The product launch is on track. I'll provide an update during our call. We've made substantial progress in the development and marketing of our new product.\n\nI'm excited to share the latest updates with you during our upcoming call. It's crucial that we coordinate our efforts to ensure a successful launch. Please come prepared with any questions or insights you may have.\n\nLet's make this product launch a resounding success!\n\nBest regards, William",
      },
    ],
  },
  {
    subject: "Re: Travel Itinerary",
    contact: { name: "Mia Harris", email: "miaharris@example.com" },
    folder: "inbox",
    labels: ["personal", "travel"],
    messages: [
      {
        author: "me",
        hoursAgo: 230,
        message:
          "Hi Mia,\n\nI've booked the flights and the hotel for our trip. The full itinerary is attached, let me know if the schedule works for you.\n\nCheers, Alicia",
      },
      {
        author: "contact",
        hoursAgo: 200,
        message:
          "I've received the travel itinerary. It looks great! Thank you for your prompt assistance in arranging the details. I've reviewed the schedule and the accommodations, and everything seems to be in order. I'm looking forward to the trip, and I'm confident it'll be a smooth and enjoyable experience.\n\nIf there are any specific activities or attractions you recommend at our destination, please feel free to share your suggestions.\n\nExcited for the trip! Mia",
      },
    ],
  },
  {
    subject: "Team Building Event",
    contact: { name: "Ethan Clark", email: "ethanclark@example.com" },
    folder: "inbox",
    labels: ["meeting", "work"],
    read: false,
    muted: true,
    messages: [
      {
        author: "contact",
        hoursAgo: 240,
        message:
          "Let's plan a team-building event for our department. Team cohesion and morale are vital to our success, and I believe a well-organized team-building event can be incredibly beneficial. I've done some research and have a few ideas for fun and engaging activities.\n\nPlease let me know your thoughts and availability. We want this event to be both enjoyable and productive.\n\nTogether, we'll strengthen our team and boost our performance.\n\nRegards, Ethan",
      },
    ],
  },
  {
    subject: "Re: Budget Approval",
    contact: { name: "Chloe Hall", email: "chloehall@example.com" },
    folder: "inbox",
    labels: ["work", "budget"],
    messages: [
      {
        author: "me",
        hoursAgo: 330,
        message:
          "Hi Chloe,\n\nDo you have any news from the finance department about the budget proposal? The team is ready to start as soon as we get the green light.\n\nBest, Alicia",
      },
      {
        author: "contact",
        hoursAgo: 300,
        message:
          "The budget has been approved. We can proceed with the project. I'm delighted to inform you that our budget proposal has received the green light from the finance department. This is a significant milestone, and it means we can move forward with the project as planned.\n\nI've attached the finalized budget for your reference. Let's ensure that we stay on track and deliver the project on time and within budget.\n\nIt's an exciting time for us! Chloe",
      },
    ],
  },
  {
    subject: "Weekend Hike",
    contact: { name: "Samuel Turner", email: "samuelturner@example.com" },
    folder: "inbox",
    labels: ["personal"],
    read: false,
    messages: [
      {
        author: "contact",
        hoursAgo: 360,
        message:
          "Who's up for a weekend hike in the mountains? I've been craving some outdoor adventure, and a hike in the mountains sounds like the perfect escape. If you're up for the challenge, we can explore some scenic trails and enjoy the beauty of nature.\n\nI've done some research and have a few routes in mind.\n\nLet me know if you're interested, and we can plan the details.\n\nIt's sure to be a memorable experience! Samuel",
      },
    ],
  },
];
