import { useState } from "react";
// Corrected import to 'react-router-dom'
import { useParams } from "react-router-dom";
import "./CreateDestination.css";

const CreateDestination = () => {
  const [destination, setDestination] = useState({
    destination: "",
    description: "",
    city: "",
    country: "",
    img_url: "",
    flag_img_url: "",
  });
  const { trip_id } = useParams();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDestination((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // --- THIS IS THE MAIN SUBMIT HANDLER, FILLED IN ---
  const createDestination = async (event) => {
    event.preventDefault();

    // 1. First, create the new destination by calling our helper
    const newDestination = await addDestination();

    // 2. Check if it was created successfully and has an ID
    if (newDestination && newDestination.id) {
      // 3. If yes, link it to the current trip
      await createTripDestinationLink(newDestination.id);
      // 4. Go back to the homepage
      window.location.href = "/";
    } else {
      alert(
        "Failed to create destination. Please check the console and try again."
      );
    }
  };

  // --- HELPER FUNCTION 1: Creates the destination ---
  const addDestination = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(destination),
    };

    try {
      // Use the correct API route we built
      const response = await fetch("/api/destinations", options);
      const data = await response.json();
      return data; // This returns the new destination object (e.g., {id: 5, ...})
    } catch (error) {
      console.error("Error adding destination:", error);
      return null;
    }
  };

  // --- HELPER FUNCTION 2: Links destination to the trip ---
  const createTripDestinationLink = async (destination_id) => {
    const linkData = {
      trip_id: parseInt(trip_id),
      destination_id: destination_id,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(linkData),
    };

    try {
      // Use the correct API route we built
      const response = await fetch("/api/trips_destinations", options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error linking trip to destination:", error);
      return null;
    }
  };

  return (
    <div>
      <center>
        <h3>Add Destination</h3>
      </center>
      {/* Switched from onClick to onSubmit */}
      <form onSubmit={createDestination}>
        <label>Destination</label> <br />
        <input
          type="text"
          id="destination"
          name="destination"
          value={destination.destination}
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
          value={destination.description}
          onChange={handleChange}
        ></textarea>
        <br />
        <label>City </label>
        <br />
        <input
          type="text"
          id="city"
          name="city"
          value={destination.city}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Country</label>
        <br />
        <input
          type="text"
          id="country"
          name="country"
          value={destination.country}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Image URL </label>
        <br />
        <input
          type="text"
          id="img_url"
          name="img_url"
          value={destination.img_url}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Flag Image URL</label>
        <br />
        <input
          type="text"
          id="flag_img_url"
          name="flag_img_url"
          value={destination.flag_img_url}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Trip ID</label>
        <br />
        <input
          type="text"
          id="trip_id_display"
          name="trip_id_display"
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

export default CreateDestination;
