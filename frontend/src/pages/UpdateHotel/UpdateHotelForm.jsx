import { Link } from "react-router-dom";

export function UpdateRestaurantForm({
  data,
  handelSubmit,
  handelChange,
  handelAddressChange,
}) {
  const { name, description, type, rating, images } = data;
  const { street, city, country } = data.address;
  return (
    <article className="dashboard__body__content">
      <form onSubmit={handelSubmit}>
        <div className="row">
          <div className="col-md-4">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <br />
            <input
              className="update-hotel-input"
              type="text"
              name="name"
              id="name"
              required
              placeholder="Name"
              value={name}
              onChange={handelChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="type">
              Type
            </label>
            <br />
            <input
              className="update-hotel-input"
              type="text"
              name="type"
              id="type"
              required
              placeholder="Type"
              value={type}
              onChange={handelChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="update-hotel-input">
              Rating
            </label>
            <br />
            <select
              className="update-hotel-input"
              name="rating"
              id="rating"
              value={rating}
              onChange={handelChange}
            >
              <option value="Tourist">1 Star</option>
              <option value="Standard">2 Stars</option>
              <option value="Comfort">3 Stars</option>
              <option value="First Class">4 Stars</option>
              <option value="Luxury">5 Stars</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <label className="form-label" htmlFor="street">
              Street
            </label>
            <br />
            <input
              className="update-hotel-input"
              type="text"
              name="street"
              id="street"
              required
              placeholder="Street"
              value={street}
              onChange={handelAddressChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="city">
              City
            </label>
            <br />
            <input
              className="update-hotel-input"
              type="text"
              name="city"
              id="city"
              required
              placeholder="City"
              value={city}
              onChange={handelAddressChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="country">
              Country
            </label>
            <br />
            <input
              className="update-hotel-input"
              type="text"
              name="country"
              id="country"
              required
              placeholder="Country"
              value={country}
              onChange={handelAddressChange}
            />
          </div>
        </div>

        <div className="mb-3">
          {images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:5000/uploads/${image}`}
              alt=""
            />
          ))}
        </div>
        <Link to={`http://localhost:5000/${images[1]}`}>image</Link>
        <img src={`http://localhost:5000/${images[1]}`} alt="nothing" />
        <div className="mb-3">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <br />
          <textarea
            className="update-hotel-input"
            name="description"
            id="description"
            placeholder="Description"
            value={description}
            onChange={handelChange}
          ></textarea>
        </div>
        <input type="submit" value="Add" />
      </form>
    </article>
  );
}

export default UpdateRestaurantForm;
