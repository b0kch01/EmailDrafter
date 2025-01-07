"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Email, generateColdContact, generateMailTo } from "@/lib/template";
import { MailPlus, PencilLine } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [yourName, setYourName] = useState("");
  const [contacts, setContacts] = useState("");

  let contactObjects: Email[] = [];

  if (contacts) {
    contactObjects = contacts
      .trim()
      .split("\n")
      .map((l) => l.split("\t"))
      .map((l) => [l[0], l[2], l[4]])
      .map((c) => {
        const [company, fName, email] = c;
        return generateColdContact(yourName, fName, email, company);
      })
      .filter((o) => o !== null);
  }

  return (
    <div className="p-8 flex flex-col gap-4 mx-auto max-w-[700px]">
      <h1 className="font-medium text-2xl">Email Drafter</h1>

      <div className="grid w-full items-center gap-1.5">
        <Label className="font-medium" htmlFor="name">
          Your Name
        </Label>
        <Input
          id="name"
          value={yourName}
          placeholder={"Bob Bobson"}
          onChange={(e) => setYourName(e.target.value)}
        />
      </div>
      <div className="grid w-full items-center gap-1.5 mb-6">
        <Label className="font-medium" htmlFor="sheet">
          Contacts Data
        </Label>
        <Textarea
          id="sheet"
          value={contacts}
          rows={2}
          onChange={(e) => setContacts(e.target.value)}
          placeholder="Paste your contact sheet here."
        />
      </div>

      {contactObjects.length > 0 ? (
        <div className="flex-col flex gap-2 p-2">
          <div className="flex items-center gap-3 font-medium border-b pb-2 mb-1">
            <span className="overflow-hidden w-[100px] text-sm">
              Email Drafts
            </span>
            <Checkbox id="terms" className="pointer-events-none opacity-0" />
            <span className="text-sm w-[200px] hidden sm:block">Email</span>
            <span className="text-sm w-[120px]">Company</span>
            <span className="text-sm">First Name</span>
          </div>

          {contactObjects.map((email: Email, i) => (
            <div className="flex items-center gap-3 flex-wrap" key={i}>
              <Checkbox id="terms" />
              <a
                href={generateMailTo(email)}
                target="_blank"
                className="inline-flex overflow-hidden w-[100px] items-center gap-1.5 justify-center text-xs bg-black text-white px-2 py-1 rounded-full hover:opacity-80"
              >
                <MailPlus width={12} height={15} /> Open Draft
              </a>
              <span className="text-sm w-[200px] overflow-hidden hidden sm:block">
                {email.to}
              </span>
              <span className="text-sm w-[120px] overflow-hidden">
                {email.company}
              </span>
              <span className="text-sm">{email.theirName}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center text-muted-foreground justify-center border text-center text-sm border-dashed rounded-md p-8">
          <PencilLine height={14} />
          Email drafts will appear here.
        </div>
      )}
    </div>
  );
}
