import { DataTable } from "./_data-table/data-table";
import { TypographyH4 } from "@/components/ui/typography";
import { columns } from "./_data-table/columns";

export default async function Page() {
  // const data = await fetchDevices();
  const data = [
    {
      device_id: "TAB001",
      created_at: "2024-05-29T15:28:00.184119+00:00",
      serial_no: "S52Z80A1BCJ",
      type: "Tablet",
      model: "Galaxy Tab A7",
      brand: "Samsung",
      has_sim: false,
      contact_no: "",
      status: "Available",
      sponsor: "N/A",
    },
    {
      device_id: "TAB002",
      created_at: "2024-05-29T15:28:00.184119+00:00",
      serial_no: "S53B90E6XYJ",
      type: "Tablet",
      model: "Galaxy Tab S6",
      brand: "Samsung",
      has_sim: false,
      contact_no: "",
      status: "Available",
      sponsor: "N/A",
    },
    {
      device_id: "TAB003",
      created_at: "2024-05-29T15:28:00.184119+00:00",
      serial_no: "S51K70H8W1J",
      type: "Tablet",
      model: "Galaxy Tab 4",
      brand: "Samsung",
      has_sim: false,
      contact_no: "",
      status: "Available",
      sponsor: "N/A",
    },
    {
      device_id: "TAB004",
      created_at: "2024-05-29T15:28:00.184119+00:00",
      serial_no: "S52X50C3R7J",
      type: "Tablet",
      model: "Galaxy Tab S7",
      brand: "Samsung",
      has_sim: false,
      contact_no: "",
      status: "Available",
      sponsor: "N/A",
    },
    {
      device_id: "TAB005",
      created_at: "2024-05-29T15:28:00.184119+00:00",
      serial_no: "S53Q40G2NKJ",
      type: "Tablet",
      model: "Galaxy Tab S5e",
      brand: "Samsung",
      has_sim: false,
      contact_no: "",
      status: "Available",
      sponsor: "N/A",
    },
    {
      device_id: "TAB006",
      created_at: "2024-05-29T15:28:00.184119+00:00",
      serial_no: "S52L30F4D5J",
      type: "Tablet",
      model: "Galaxy Tab 3",
      brand: "Samsung",
      has_sim: false,
      contact_no: "",
      status: "Available",
      sponsor: "N/A",
    },
    {
      device_id: "TAB007",
      created_at: "2024-05-29T15:28:00.184119+00:00",
      serial_no: "S54M60K9T0J",
      type: "Tablet",
      model: "Galaxy Tab S8",
      brand: "Samsung",
      has_sim: false,
      contact_no: "",
      status: "Available",
      sponsor: "N/A",
    },
    {
      device_id: "TAB008",
      created_at: "2024-05-29T15:28:00.184119+00:00",
      serial_no: "S51P20J5V4J",
      type: "Tablet",
      model: "Galaxy Tab A8",
      brand: "Samsung",
      has_sim: false,
      contact_no: "",
      status: "Available",
      sponsor: "N/A",
    },
    {
      device_id: "TAB009",
      created_at: "2024-05-29T15:28:00.184119+00:00",
      serial_no: "S55R30X6Q2J",
      type: "Tablet",
      model: "Galaxy Tab 5",
      brand: "Samsung",
      has_sim: false,
      contact_no: "",
      status: "Available",
      sponsor: "N/A",
    },
    {
      device_id: "TAB010",
      created_at: "2024-05-29T15:28:00.184119+00:00",
      serial_no: "S56G80W1RJ",
      type: "Tablet",
      model: "Galaxy Tab 2",
      brand: "Samsung",
      has_sim: false,
      contact_no: "",
      status: "Available",
      sponsor: "N/A",
    },
  ];

  return (
    <section>
      {/* Devices */}
      <div className="devices-cont | rounded-lg border bg-background p-6 @container/data-table-wrapper">
        <div className="inner_cont |">
          <TypographyH4 className="mb-4 md:mb-5">Device Inventory</TypographyH4>

          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </section>
  );
}
