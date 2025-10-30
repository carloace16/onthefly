import { useState } from "react";
import "./CreateTrip.css";

const CreateTrip = () => {
  // Renamed 'post' to 'trip' to match lab instructions
  const [trip, setTrip] = useState({
    title: "",
    description: "",
    img_url: "",
    num_days: 0,
    start_date: "",
    end_date: "",
    total_cost: 0.0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTrip((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // Renamed 'createPost' to 'createTrip'
  const createTrip = (event) => {
    event.preventDefault();

    // --- This is the code from Step 2 ---
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trip), // Use 'trip' state variable
    };

    fetch("/api/trips", options);
    window.location.href = "/";
    // ------------------------------------
  };

  return (
    <div>
      <center>
        <h3> Create New Trip</h3>
      </center>
      {/* Changed to onSubmit on the <form> tag */}
      <form onSubmit={createTrip}>
        <label>Title</label> <br />
        {/* Updated to use 'trip' state */}
        <input
          type="text"
          id="title"
          name="title"
          value={trip.title}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Description</label>
        <br />
        <textarea
          rows="5"
          cols="50"
          id="description"
          name="description"
          value={trip.description}
          onChange={handleChange}
        ></textarea>
        <br />
        <label>Image URL </label>
        <br />
        <input
          type="text"
          id="img_url"
          name="img_url"
          value={trip.img_url}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Number of Days</label>
        <br />
        <input
          type="number"
          id="num_days"
          name="num_days"
          value={trip.num_days}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Start Date </label>
        <br />
        <input
          type="text"
          id="start_date"
          name="start_date"
          value={trip.start_date}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>End Date </label>
        <br />
        <input
          type="text"
          id="end_date"
          name="end_date"
          value={trip.end_date}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Total Cost</label>
        <br />
        <input
          type="text"
          id="total_cost"
          name="total_cost"
          value={trip.total_cost}
          onChange={handleChange}
        />
        <br />
        <br />
        {/* Removed onClick from here */}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreateTrip;
