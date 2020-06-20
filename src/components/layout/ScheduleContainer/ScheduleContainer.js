import React, { useEffect, useState, useContext } from "react";
import SimpleSchedule from "../SimpleSchedule/SimpleSchedule";
import axios from "axios";
import AuthContext from "../../../context/auth/authContext";
import { useAuth0 } from "../../../react-auth0-spa";
import moment from "moment";

const ScheduleContainer = () => {
  const { getTokenSilently } = useAuth0();
  const { loadingProfile, profile } = useContext(AuthContext);
  const [schedule, setSchedule] = useState(initialScheduleState);

  useEffect(() => {
    const getFormattedScheduleItems = async () => {
      try {
        const token = await getTokenSilently();
        const lineItems = await getRelevantScheduleItems(profile, token);
        setSchedule({ ...schedule, lineItems, loading: false });
      } catch (err) {
        console.error(err);
      }
    };

    if (!loadingProfile && profile) {
      if (schedule.lineItems === null) {
        getFormattedScheduleItems();
      }
    }
    //eslint-disable-next-line
  }, [loadingProfile, profile]);

  return (
    <div className="text-left">
      {schedule?.lineItems !== null ? (
        <SimpleSchedule lineItems={schedule.lineItems} />
      ) : (
        <div className="div text-center">
          <div className="spinner-border text-center" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleContainer;

// ==== INITIAL STATE ==== //
const initialScheduleState = {
  loading: true,
  lineItems: null
};

// ==== HELPERS ==== //
const getRelevantScheduleItems = async (person, token) => {
  // const currentDay = "monday"; //* Hard code day
  const currentDay = moment().format("dddd").toLowerCase();
  const opts = { headers: { Authorization: `Bearer ${token}` } };

  const regionalResponse = await axios.get(
    `${process.env.REACT_APP_PORTAL_API_BASE_URL}/schedule-items?region[in]=${person.regions}&days[in]=${currentDay}`,
    opts
  );
  const hostResponse = await axios.get(
    `${process.env.REACT_APP_PORTAL_API_BASE_URL}/schedule-items?hosts[in]=${person._id}&days[in]=${currentDay}`,
    opts
  );
  const participantResponse = await axios.get(
    `${process.env.REACT_APP_PORTAL_API_BASE_URL}/schedule-items?participants[in]=${person._id}&days[in]=${currentDay}`,
    opts
  );

  const regionalScheduleItems = (regionalResponse.data?.data || [])
    .filter(scheduleItem => scheduleItem.participants?.length === 0)
    .filter(
      scheduleItem =>
        scheduleItem.hosts?.filter(host => host._id === person._id).length === 0
    );

  const todaysScheduleItems = [
    ...regionalScheduleItems,
    ...hostResponse.data.data,
    ...participantResponse.data.data
  ];
  return todaysScheduleItems;
};
