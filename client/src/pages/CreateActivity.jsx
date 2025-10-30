import { useState } from "react";
// Corrected import to 'react-router-dom'
import { useParams } from "react-router-dom";
import "./CreateActivity.css";

const CreateActivity = () => {
  const [activity, setActivity] = useState({ activity: "" });
  const { trip_id } = useParams();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setActivity((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // --- THIS IS THE UPDATED FUNCTION FROM STEP 8 ---
  const createActivity = async (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Corrected body: stringify the 'activity' object
      body: JSON.stringify(activity),
    };

    // Use the correct API route we built
    fetch("/api/activities/" + trip_id, options);
    // Redirect back to the trip details page
    window.location.href = "/trip/get/" + trip_id;
  };

  return (
    <div>
      <center>
        <h3>Add Activity</h3>
      </center>
      {/* Switched from onClick to onSubmit */}
      <form onSubmit={createActivity}>
        <label>Activity</label> <br />
        <input
          type="text"
          id="activity"
          name="activity"
          value={activity.activity}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Trip ID</label>
        <br />
        <input
          type="number"
          id="trip_id"
          name="trip_id"
          value={trip_id}
          readOnly
        />
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreateActivity;
