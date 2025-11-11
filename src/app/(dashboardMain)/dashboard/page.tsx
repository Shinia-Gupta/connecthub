import { auth } from "@/src/auth";
import ClientUserInfo from "./UserSession";

export default async function UserInfo() {
  const session = await auth();

  return <ClientUserInfo session={session} />;
}
