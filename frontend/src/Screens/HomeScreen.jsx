import ViewCustomers from "../components/ViewCustomers";

import ViewMeters from "../components/ViewMeters";
import ViewReadings from "../components/ViewReadings";
import EditMeter from "../components/EditMeter";

import AddMeter from "../components/AddMeter";

const HomeScreen = () => {
  return (
    <div>
      <ViewMeters />
      <EditMeter />
      <AddMeter />

      <ViewCustomers />

      <ViewReadings />
    </div>
  );
};

export default HomeScreen;
