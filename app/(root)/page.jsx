import DataTableWrapper from "@/components/data-table/DataTableWrapper";
import TabOverviewList from "@/components/TabOverviewList";
import { TypographyH4 } from "@/components/ui/typography";
import { DataTable } from "./_data-table/data-table";
import { columns } from "./_data-table/columns";

export default async function Home() {
  // const data = await fetchRecentLogs();
  // console.log(JSON.stringify(data, null, 2));
  const data = [
    {
      log_id: 1,
      device_id: "TAB001",
      assignment_id: 101,
      assignee: "Alex Johnson",
      status: "Assigned",
      area_coordinator: "HQ",
      timestamp: "2024-05-29T18:23:58.311142+00:00",
    },
    {
      log_id: 2,
      device_id: "TAB002",
      assignment_id: 102,
      assignee: "Maria Williams",
      status: "Assigned",
      area_coordinator: "HQ",
      timestamp: "2024-05-29T18:23:58.311142+00:00",
    },
    {
      log_id: 3,
      device_id: "TAB003",
      assignment_id: 103,
      assignee: "John Doe",
      status: "Assigned",
      area_coordinator: "HQ",
      timestamp: "2024-05-29T18:23:58.311142+00:00",
    },
    {
      log_id: 4,
      device_id: "TAB004",
      assignment_id: 104,
      assignee: "Emma Thompson",
      status: "Assigned",
      area_coordinator: "HQ",
      timestamp: "2024-05-29T18:23:58.311142+00:00",
    },
    {
      log_id: 5,
      device_id: "TAB005",
      assignment_id: 105,
      assignee: "David Brown",
      status: "Assigned",
      area_coordinator: "HQ",
      timestamp: "2024-05-29T18:23:58.311142+00:00",
    },
    {
      log_id: 6,
      device_id: "TAB006",
      assignment_id: 106,
      assignee: "Sophia Davis",
      status: "Assigned",
      area_coordinator: "HQ",
      timestamp: "2024-05-29T18:23:58.311142+00:00",
    },
    {
      log_id: 7,
      device_id: "TAB007",
      assignment_id: 107,
      assignee: "Oliver Garcia",
      status: "Assigned",
      area_coordinator: "HQ",
      timestamp: "2024-05-29T18:23:58.311142+00:00",
    },
    {
      log_id: 8,
      device_id: "TAB008",
      assignment_id: 108,
      assignee: "Ava Martinez",
      status: "Assigned",
      area_coordinator: "HQ",
      timestamp: "2024-05-29T18:23:58.311142+00:00",
    },
    {
      log_id: 9,
      device_id: "TAB009",
      assignment_id: 109,
      assignee: "William Taylor",
      status: "Assigned",
      area_coordinator: "HQ",
      timestamp: "2024-05-29T18:23:58.311142+00:00",
    },
    {
      log_id: 10,
      device_id: "TAB010",
      assignment_id: 110,
      assignee: "Isabella Moore",
      status: "Assigned",
      area_coordinator: "HQ",
      timestamp: "2024-05-29T18:23:58.311142+00:00",
    },
  ];

  return (
    // Dashboard
    <section>
      {/* Tablet Overview */}
      <div className="tab_overview | @container">
        <TypographyH4 className="mb-4 md:mb-5">Tablet Overview</TypographyH4>

        {/* Tablet Overview List */}
        <TabOverviewList />
      </div>

      {/* Recent Logs Data Table*/}
      <DataTableWrapper>
        <TypographyH4 className="mb-4 md:mb-5">Recent Logs</TypographyH4>

        <DataTable data={data} columns={columns} />
      </DataTableWrapper>
    </section>
  );
}
