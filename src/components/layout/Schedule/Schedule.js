import React, { Fragment } from "react";
import ScheduleLineItem from "../ScheduleLineItem2/ScheduleLineItem";

import moment from "moment";
// eslint-disable-next-line

const Schedule = ({ lineItems }) => {
  return (
    <Fragment>
      <h5>
        TODAY <strong>{moment().format("dddd, DD MMMM yyy")}</strong>
      </h5>
      {lineItems?.length > 0 ? (
        lineItems
          .sort(sortByStartTime)
          .map((lineItem, index) => (
            <ScheduleLineItem key={index} lineItem={lineItem} />
          ))
      ) : (
        <p>Nothing on your schedule.. for now.</p>
      )}
    </Fragment>
  );
};

export default Schedule;

const sortByStartTime = (a, b) => {
  const aTime = `${a.startTime.hour}${a.startTime.minute}`;
  const bTime = `${b.startTime.hour}${b.startTime.minute}`;
  return bTime - aTime;
};
