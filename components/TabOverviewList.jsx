import OverviewCard from "./OverviewCard";

export default async function TabOverviewList() {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 @[465px]:grid-cols-2 @[1024px]:grid-cols-4 md:gap-5">
      <OverviewCard title="Assigned" num={0} denom={0} />
      <OverviewCard title="To Be Assigned" num={0} denom={0} />
      <OverviewCard title="Available" num={0} denom={0} />
      <OverviewCard title="Under Maintenance" num={0} denom={0} />
    </div>
  );
}
