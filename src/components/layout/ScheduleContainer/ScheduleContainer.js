import React, { useEffect, useState, useContext } from "react";
import SimpleSchedule from "../SimpleSchedule/SimpleSchedule";
import axios from "axios";
import ProfileContext from "../../../context/profile/profileContext";
import { useAuth0 } from "../../../react-auth0-spa";
import moment from "moment";

import { getGlobalConfig } from "../../../utils/config";

const ScheduleContainer = () => {
  const { getTokenSilently } = useAuth0();
  const { loadingProfile, profile } = useContext(ProfileContext);
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
      {schedule?.lineItems === null ? (
        <div className="div text-center">
          <div className="spinner-border text-center" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <SimpleSchedule lineItems={schedule.lineItems} />
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
  try {
    let currentDay;
    if (getGlobalConfig().useDemoDateTimeForSchedule) {
      currentDay = "monday"; //* Hard code day
    } else {
      currentDay = moment().format("dddd").toLowerCase();
    }
    const opts = { headers: { Authorization: `Bearer ${token}` } };
    const { apiBaseUrl } = getGlobalConfig()

    const regionalResponse = await axios.get(
      `${apiBaseUrl}/schedule-items?region[in]=${person.regions}&days[in]=${currentDay}`,
      opts
    );
    const hostResponse = await axios.get(
      `${apiBaseUrl}/schedule-items?hosts[in]=${person._id}&days[in]=${currentDay}`,
      opts
    );
    const participantResponse = await axios.get(
      `${apiBaseUrl}/schedule-items?participants[in]=${person._id}&days[in]=${currentDay}`,
      opts
    );

    const regionalScheduleItems = (regionalResponse.data?.data || [])
      .filter(scheduleItem => scheduleItem.participants?.length === 0)
      .filter(
        scheduleItem =>
          scheduleItem.hosts?.filter(host => host._id === person._id).length ===
          0
      );

    const todaysScheduleItems = [
      ...regionalScheduleItems,
      ...hostResponse.data.data,
      ...participantResponse.data.data
    ];
    return todaysScheduleItems;
  } catch (err) {
    console.error(err);
    return [];
  }
};
