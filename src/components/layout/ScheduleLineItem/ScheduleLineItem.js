import React, { Fragment } from "react";

const ScheduleLineItem = ({ content }) => {
  return (
    <Fragment>
      {content?.length >= 0 && (
        <tr>
          {content.map((item, index) => (
            <td key={`sli-${index}`}>{item || "--"}</td>
          ))}
        </tr>
      )}
    </Fragment>
  );
};

export default ScheduleLineItem;
