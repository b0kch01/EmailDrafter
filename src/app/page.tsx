"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateColdContact, generateMailTo } from "@/lib/template";
import { useState } from "react";

export default function Home() {
  const [yourName, setYourName] = useState("");
  const [contacts, setContacts] = useState("");

  let contactObjects: string[][] = [];

  if (contacts) {
    contactObjects = contacts
      .trim()
      .split("\n")
      .map((l) => l.split("\t"))
      .map((l) => [l[0], l[2], l[4]]);
  }

  return (
    <div className="p-8 flex flex-col gap-4">
      <Input
        value={yourName}
        placeholder={"Your name"}
        onChange={(e) => setYourName(e.target.value)}
      />
      <Textarea
        value={contacts}
        onChange={(e) => setContacts(e.target.value)}
        placeholder="Paste your contact sheet here."
      />

      <div className="flex-col flex gap-2">
        {contactObjects.map((c, i) => {
          const [company, fName, email] = c;
          const emailObj = generateColdContact(yourName, fName, email, company);

          return (
            <a className="underline" key={i} href={generateMailTo(emailObj)}>
              Email {fName} - {email}
            </a>
          );
        })}
      </div>
    </div>
  );
}
