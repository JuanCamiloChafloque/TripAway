import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { createTour, updateTourById } from "../../actions/tourActions";

const AddEditTour = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const { userTours, error, loading } = useSelector((state) => state.tours);
  const { user } = useSelector((state) => state.auth);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [tags, setTags] = useState([]);

  const categoryOption = [
    "Sea",
    "Beach",
    "City",
    "Jungle",
    "Temple",
    "Hill",
    "Historic",
  ];

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  useEffect(() => {
    if (id) {
      const singleTour = userTours.find((tour) => tour._id === id);
      setTitle(singleTour.title);
      setDescription(singleTour.description);
      setImageFile(singleTour.imageFile);
      setTags(singleTour.tags);
      setCategory(singleTour.category);
    }
  }, [userTours, id]);

  const handleAddTag = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDeleteTag = (tag) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags([...newTags]);
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setTags([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && tags && category) {
      const newTour = {
        title: title,
        description: description,
        imageFile: imageFile,
        tags: tags,
        category: category,
        name: user?.user?.name,
      };

      if (!id) {
        dispatch(createTour(newTour, navigate, toast));
      } else {
        dispatch(updateTourById(id, newTour, navigate, toast));
      }

      handleClear();
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5>{id ? "Update Tour" : "Add Tour"}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <div className="col-md-12">
              <input
                className="form-control"
                placeholder="Enter Title"
                type="text"
                value={title}
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <textarea
                className="form-control"
                placeholder="Enter Description"
                style={{ height: "200px" }}
                type="text"
                value={description}
                name="description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <select
                className="category-dropdown"
                value={category}
                name="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Please Select a Category</option>
                {categoryOption.map((option, idx) => (
                  <option value={option || ""} key={idx}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-12">
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter Tag"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
            </div>
            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setImageFile(base64)}
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                {id ? "Update" : "Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditTour;
