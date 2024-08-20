import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const DashboardCards = () => {
  const [dataCounts, setDataCounts] = useState({
    assetMaintenance: 0,
    skillMatrix: 0,
    documentedInformation: 0,
    calibrationSchedule: 0,
    ncOutput: 0,
  });
  const { data: session } = useSession();

  useEffect(() => {
    // Fetch data counts for each form
    const fetchDataCounts = async () => {
      try {
        const department = session?.user?.department;
        const responses = await Promise.all([
          fetch(`/api/asset-maintenance/count?department=${department}`),
          fetch(`/api/skill-matrix/count?department=${department}`),
          fetch(`/api/documented-information/count?department=${department}`),
          fetch(`/api/calibration-schedule/count?department=${department}`),
          fetch(`/api/nc-output/count?department=${department}`),
        ]);

        const [
          assetMaintenanceData,
          skillMatrixData,
          documentedInformationData,
          calibrationScheduleData,
          ncOutputData,
        ] = await Promise.all(responses.map((res) => res.json()));

        setDataCounts({
          assetMaintenance: assetMaintenanceData.count,
          skillMatrix: skillMatrixData.count,
          documentedInformation: documentedInformationData.count,
          calibrationSchedule: calibrationScheduleData.count,
          ncOutput: ncOutputData.count,
        });
      } catch (error) {
        console.error("Error fetching data counts:", error);
      }
    };

    if (session?.user?.department) {
      fetchDataCounts();
    }
  }, [session]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card">
        <h3 className="card-title">Asset Maintenance</h3>
        <p className="card-count">{dataCounts.assetMaintenance} entries</p>
      </div>
      <div className="card">
        <h3 className="card-title">Skill Matrix</h3>
        <p className="card-count">{dataCounts.skillMatrix} entries</p>
      </div>
      <div className="card">
        <h3 className="card-title">Documented Information</h3>
        <p className="card-count">{dataCounts.documentedInformation} entries</p>
      </div>
      <div className="card">
        <h3 className="card-title">Calibration Schedule</h3>
        <p className="card-count">{dataCounts.calibrationSchedule} entries</p>
      </div>
      <div className="card">
        <h3 className="card-title">NC Output</h3>
        <p className="card-count">{dataCounts.ncOutput} entries</p>
      </div>
    </div>
  );
};

export default DashboardCards;