// app/gyms/members/[id]/page.tsx

import MemberClient from "./member-client";

async function getMemberData(id: string) {
  return {
    id,
    name: "Ahmed Ben Ali",
    tier: "Premium",
    joinDate: "2023-09-15",
    lastVisit: "2024-03-20",
    checkIns: [
      new Date(2024, 2, 15),
      new Date(2024, 2, 17),
      new Date(2024, 2, 20),
      new Date(2024, 2, 22),
    ],
    tags: ["Prefers morning", "Yoga enthusiast", "Protein supplements"],
    notes: "Preparing for marathon in June. Focus on cardio training.",
    phone: "+216 55 123 456",
  };
}

export default async function MemberProfile({
  params,
}: {
  params: { id: string };
}) {
  const memberData = await getMemberData(params.id);

  return <MemberClient memberData={memberData} />;
}
