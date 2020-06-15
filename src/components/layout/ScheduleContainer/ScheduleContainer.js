import React, { useEffect, useState, Fragment, useContext } from "react";
import Schedule from "../Schedule/Schedule";
import CycleSpinner from "../../spinners/CycleSpinner/CycleSpinner";
import axios from "axios";
import AuthContext from "../../../context/auth/authContext";
import moment from "moment";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

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
const formatScheduleItems = scheduleItems => {
  /**
   *  createdAt: "2020-06-11T07:42:12.488Z"
      days: (2) ["monday", "thursday"]
      endTime: {hour: 10, minute: 30}
      hosts: (2) ["2dc4fc8194f68a3cbc7c69a3", "2dc4fc8194f68a3cbc7c69a4"]
      links: [{…}]
      name: "Truth, Lies, and Logic (morning class)"
      participants: (2) ["2dc4fc8194f68a3cbc7c69a1", "2dc4fc8194f68a3cbc7c69a2"]
      region: "6dc4fc8194f68a3cbc7c69a2"
      startTime: {hour: 9, minute: 35}
      updatedAt: "2020-06-11T07:42:12.488Z"
      __v: 0
      _id: "4dc4fc8194f68a3cbc7c69a2"

  /**
   * [
      "9:35am - 10:30am",
      "Truth, Lies, and Logic (morning class)",
      "Halimeda and Darien",
      null,
      <a href="#!">Join!</a>
    ]
    */

  const formattedScheduleItems = scheduleItems.map((scheduleItem, index) => {
    const { startTime, endTime, name, hosts, links } = scheduleItem;

    const formattedTime = `${moment(startTime).format("h:mma")}-${moment(
      endTime
    ).format("h:mma")}`;
    const hostNames = hosts.map(host => host.firstName).join(", ");
    const openLearningLinks = links
      .filter(link => link.type === "open-learning")
      .map((link, index) => (
        <a key={`ol-${index}`} href={link.url}>
          {link.text || "Join!"}
        </a>
      ));
    const adobeConnectLinks = links
      .filter(link => link.type === "adobe-connect")
      .map((link, index) => (
        <a key={`ac-${index}`} href={link.url}>
          {link.text || "Join!"}
        </a>
      ));

    return [
      formattedTime,
      name,
      hostNames,
      openLearningLinks,
      adobeConnectLinks
    ];
  });

  return formattedScheduleItems;
};

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
