import type { Metadata } from "next";
import ChatWindow from "../../components/ChatWindow";

export const metadata: Metadata = {
  title: "AgentSupport — Chat",
  description: "AI-powered customer support",
};

export default function AppPage() {
  return <ChatWindow />;
}
