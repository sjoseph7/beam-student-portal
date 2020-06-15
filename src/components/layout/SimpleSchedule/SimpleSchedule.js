import React, { Fragment } from "react";
import SimpleScheduleLineItem from "../SimpleScheduleLineItem/SimpleScheduleLineItem";

import moment from "moment";
// eslint-disable-next-line

const SimpleSchedule = ({ lineItems }) => {
  return (
    <Fragment>
      <h5>
        TODAY <strong>{moment().format("dddd, DD MMMM yyy")}</strong>
      </h5>
      {lineItems?.length > 0 ? (
        lineItems
          .sort(sortByStartTime)
          .map((lineItem, index) => (
            <SimpleScheduleLineItem key={index} lineItem={lineItem} />
          ))
      ) : (
        <p>Nothing on your schedule.. for now.</p>
      )}
    </Fragment>
  );
};

export default SimpleSchedule;

const sortByStartTime = (a, b) => {
  const aTime = a.startTime.hour * 100 + a.startTime.minute;
  const bTime = b.startTime.hour * 100 + b.startTime.minute;
  return aTime - bTime;
};
