import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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
      <div className="stats shadow flex justify-between w-full max-w-4xl p-4 items-center">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Asset Maintenance</div>
          <div className="stat-value">
            {dataCounts.assetMaintenance} entries
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Documented Information</div>
          <div className="stat-value">
            {dataCounts.documentedInformation} entries
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Calibration Schedule</div>
          <div className="stat-value">
            {dataCounts.calibrationSchedule} entries
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">NC Output</div>
          <div className="stat-value">{dataCounts.ncOutput} entries</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
