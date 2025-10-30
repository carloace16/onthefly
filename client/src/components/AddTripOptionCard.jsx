import { useParams } from "react-router-dom";
import "./Card.css";

const AddTripOptionCard = (props) => {
  const { destination_id } = useParams();

  const addToTrip = async (event) => {
    event.preventDefault();

    // --- THIS IS THE CODE FROM STEP 6 ---
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // props.id is the trip_id, destination_id is from the URL
      body: JSON.stringify({
        trip_id: props.id,
        destination_id: parseInt(destination_id),
      }),
    };

    // Use the correct API route we built
    fetch("/api/trips_destinations", options);
    window.location.href = "/";
    // ------------------------------------
  };

  return (
    <div className="Card" style={{ backgroundImage: `url(${props.img_url})` }}>
      <div className="card-info">
        <h2 className="title">{props.title}</h2>
        <p className="description">{props.description}</p>
        {/* Updated button text for clarity */}
        <button className="addToTrip" onClick={addToTrip}>
          + Add
        </button>
      </div>
    </div>
  );
};

export default AddTripOptionCard;
