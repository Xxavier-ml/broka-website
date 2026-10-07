import { getHomeData } from "@/lib/api/home";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeSections } from "@/components/home/HomeSections";

// Marketplace content refreshes every minute rather than only at deploy time.
export const revalidate = 60;

/**
 * The homepage is now a conversion path: search and real products first,
 * then category discovery, buying confidence, and the next best action.
 * Marketplace cards remain view-only and route to the app for transactions.
 */
export default async function Home() {
  const data = await getHomeData();
  return (
    <>
      <HomeHero data={data} />
      <HomeSections data={data} />
    </>
  );
}
