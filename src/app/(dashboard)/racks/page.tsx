import { RackPage } from "@/features/racks/rack-page";
import { getRacks } from "@/features/racks/rack-queries";
import type { RackQueryParams } from "@/features/racks/rack-types";

type PageProps = { searchParams: Promise<RackQueryParams> };

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const result = await getRacks(params);
  return <RackPage {...result} />;
}
