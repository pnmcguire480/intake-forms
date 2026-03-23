import { redirect } from "next/navigation";

export default function Page() {
  redirect("/q/wizard?type=restaurant");
}
