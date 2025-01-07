export type Email = {
  to: string;
  subject: string;
  body: string;

  theirName: string;
  company: string;
};

export function generateColdContact(
  yourName: string,
  theirName: string,
  theirEmail: string,
  theirCompany: string,
): Email | null {
  if (!(yourName && theirName && theirEmail && theirCompany)) {
    return null;
  }

  yourName = yourName.trim();
  theirName = theirName.trim();
  theirEmail = theirEmail.trim();
  theirCompany = theirCompany.trim();
  const subject = `Hack at UCI x ${theirCompany} Partnership 2024-2025`;

  const body = `Hello ${theirName},

My name is ${yourName} and I’m currently a Corporate Organizer for Hack at UCI, the largest collegiate STEM organization at UC Irvine and in Orange County. Established in 2013, our organization hosts hackathons, technical workshops, career panels, and other events that have brought in over 800 attendees in total each year. For hackathons, we organize Orange County’s biggest annual hackathon, IrvineHacks (previously known as HackUCI) with an expected 400+ attendees, as well as ZotHacks, a beginner-friendly hackathon with an expected 150 attendees. IrvineHacks will be taking place on January 24-26th and ZotHacks will be taking place in Fall 2025.

We’re always searching for ways to grow the club and plan the best events possible. Over the years, we’ve partnered with dozens of companies to build connections for our hackers and provide additional resources for both our events and our partner companies’ recruitment processes. This year, we’re reaching out to ${theirCompany} because we’re interested in having you as a sponsor!

I would love the opportunity to discuss how ${theirCompany} can meet some of the best developers at our events and have a lasting impact on our hacker community. We can definitely hop onto a quick 20 minute call to discuss our sponsorship deck and any questions you may have!

Best,

${yourName}
Corporate Organizer | Hack at UCI
`;

  return {
    to: theirEmail,
    subject,
    body,

    theirName: theirName,
    company: theirCompany,
  };
}

export function generateMailTo(email: Email): string {
  return encodeURI(
    `mailto:${email.to}?subject=${email.subject}&body=${email.body}`,
  );
}
