import React from "react";
import ScheduleLineItem from "../ScheduleLineItem/ScheduleLineItem";

// eslint-disable-next-line
import styles from "./Schedule.module.css";

const Schedule = ({ lineItems }) => {
  return (
    <table>
      <caption>
        Updated two hours ago - <a href="#!">refresh</a>
      </caption>
      <thead>
        <tr>
          <th>Time</th>
          <th>What's going on?</th>
          <th>Staff</th>
          <th>OpenLearning</th>
          <th>Adobe Connect</th>
        </tr>
      </thead>
      <tbody>
        {lineItems?.length > 0 ? (
          lineItems.map((lineItem, index) => (
            <ScheduleLineItem key={index} content={lineItem} />
          ))
        ) : (
          <p>Nothing on your schedule.. for now.</p>
        )}
      </tbody>
    </table>
  );
};

export default Schedule;
