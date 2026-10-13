import { redirect } from "next/navigation";

export default function ListingDetailPreviewRedirect() {
  redirect("/app-preview?screen=listing");
}
