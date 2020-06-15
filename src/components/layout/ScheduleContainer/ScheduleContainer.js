import React, { useEffect, useState, useContext } from "react";
import Schedule from "../Schedule/Schedule";
import axios from "axios";
import AuthContext from "../../../context/auth/authContext";

const ScheduleContainer = () => {
  const { loadingProfile, profile } = useContext(AuthContext);
  const [schedule, setSchedule] = useState(initialScheduleState);

  useEffect(() => {
    const getFormattedScheduleItems = async () => {
      try {
        const lineItems = await getRelevantScheduleItems(profile);
        setSchedule({ ...schedule, lineItems });
      } catch (err) {
        console.error(err);
      }
    };

    if (!loadingProfile && profile) {
      if (schedule.lineItems.length === 0) {
        getFormattedScheduleItems();
      }
    }
    //eslint-disable-next-line
  }, [loadingProfile, profile]);
  return (
    <div className="text-left">
      {schedule?.lineItems?.length > 0 ? (
        <Schedule lineItems={schedule.lineItems} />
      ) : (
        <div className="div text-center">
          <div className="spinner-border text-center" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        // TODO: Handle failure to load data
      )}
    </div>
  );
};

export default ScheduleContainer;

// ==== INITIAL STATE ==== //
const initialScheduleState = {
  loading: true,
  // formattedScheduleItems: []
  lineItems: []
};

// ==== HELPERS ==== //
const getRelevantScheduleItems = async person => {
  // const currentDay = moment().format("dddd");
  const currentDay = "monday";

  const hostResponse = await axios.get(
    `${process.env.REACT_APP_PORTAL_API_BASE_URL}/schedule-items?hosts[in]=${person._id}&days[in]=${currentDay}`
  );
  const participantResponse = await axios.get(
    `${process.env.REACT_APP_PORTAL_API_BASE_URL}/schedule-items?participants[in]=${person._id}&days[in]=${currentDay}`
  );

  const todaysScheduleItems = [
    ...hostResponse.data.data,
    ...participantResponse.data.data
  ];

  return todaysScheduleItems;
};
