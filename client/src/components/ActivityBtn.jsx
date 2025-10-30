import { useState } from "react";
import "./ActivityBtn.css";

const ActivityBtn = (props) => {
  const [num_votes, setNumVotes] = useState(props.num_votes);

  const updateCount = () => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      // Note: We send the *new* vote count
      body: JSON.stringify({ num_votes: num_votes + 1 }),
    };

    // Send the update to the server
    fetch("/api/activities/" + props.id, options);

    // Update the state locally to show the change immediately
    setNumVotes((num_votes) => num_votes + 1);
  };

  return (
    <button className="activityBtn" id={props.id} onClick={updateCount}>
      {/* This line is now fixed */}
      {props.activity} <br /> {"△ " + num_votes + " Upvotes"}
    </button>
  );
};

export default ActivityBtn;
