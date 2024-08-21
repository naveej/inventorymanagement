import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { BookText } from "lucide-react";

const DashboardCards = () => {
  const [dataCounts, setDataCounts] = useState({
    assetMaintenance: 0,
    documentedInformation: 0,
    calibrationSchedule: 0,
    ncOutput: 0,
  });
  const { data: session } = useSession();

  useEffect(() => {
    // Fetch data counts for each form
    const fetchDataCounts = async () => {
      try {
        const department = session?.user?.departmentName;
        const responses = await Promise.all([
          fetch(
            `/api/get/getDepartment/assetMaintenance?departmentName=${department}`
          ),
          fetch(
            `/api/get/getDepartment/documentedInformation?departmentName=${department}`
          ),
          fetch(
            `/api/get/getDepartment/caliberation_Schedule?departmentName=${department}`
          ),
          fetch(`/api/get/getDepartment/ncOutput?departmentName=${department}`),
        ]);

        const [
          assetMaintenanceData,
          documentedInformationData,
          calibrationScheduleData,
          ncOutputData,
        ] = await Promise.all(responses.map((res) => res.json()));

        setDataCounts({
          assetMaintenance: assetMaintenanceData.count,
          documentedInformation: documentedInformationData.count,
          calibrationSchedule: calibrationScheduleData.count,
          ncOutput: ncOutputData.count,
        });
      } catch (error) {
        console.error("Error fetching data counts:", error);
      }
    };

    if (session?.user?.departmentName) {
      fetchDataCounts();
    }
  }, [session]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="stats shadow flex justify-between w-full max-w-4xl p-4 items-center gap-4">
        <div className="stat flex flex-col items-center justify-center">
          <div className="stat-figure text-secondary">
            <BookText size={32} className="text-black dark:text-white" />
          </div>
          <div className="stat-title">Asset Maintenance</div>
          <div className="stat-value">
            {dataCounts.assetMaintenance} entries
          </div>
        </div>

        <div className="stat flex flex-col items-center justify-center">
          <div className="stat-figure text-secondary">
            <BookText size={32} className="text-black dark:text-white" />
          </div>
          <div className="stat-title">Documented Information</div>
          <div className="stat-value">
            {dataCounts.documentedInformation} entries
          </div>
        </div>

        <div className="stat flex flex-col items-center justify-center">
          <div className="stat-figure text-secondary">
            <BookText size={32} className="text-black dark:text-white" />
          </div>
          <div className="stat-title">Calibration Schedule</div>
          <div className="stat-value">
            {dataCounts.calibrationSchedule} entries
          </div>
        </div>

        <div className="stat flex flex-col items-center justify-center">
          <div className="stat-figure text-secondary">
            <BookText size={32} className="text-black dark:text-white" />
          </div>
          <div className="stat-title">NC Output</div>
          <div className="stat-value">{dataCounts.ncOutput} entries</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
