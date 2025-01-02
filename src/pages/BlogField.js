import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function BlogField() {
  const [tags, setTags] = useState([]); // Store all tags
  const [inputValue, setInputValue] = useState(""); // Store input value
  const [website, setField1] = useState(""); // Input for first column
  const [BlogCategory, setField2] = useState(""); // Input for second column
  const [publisher_name, setField3] = useState(""); // Input for third column
  const [PublishingStatus, setStatus] = useState(""); // Store Published/Unpublished status
  const navigate = useNavigate();

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue(""); // Clear input after adding tag
    }
  };

  const handleField1Change = (e) => setField1(e.target.value);
  const handleField2Change = (e) => setField2(e.target.value);
  const handleField3Change = (e) => setField3(e.target.value);

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove)); // Remove tag by index
  };

  const handleSubmit = () => {
    if (
      !website ||
      !BlogCategory ||
      !publisher_name ||
      tags.length === 0 ||
      !PublishingStatus
    ) {
      alert("All fields are mandatory, including tags and status.");
      return;
    }

    const data = {
      tags,
      website,
      BlogCategory,
      publisher_name,
      PublishingStatus,
    };

    localStorage.setItem("blogData", JSON.stringify(data));
    navigate("/blogs/reactapp/edit");
  };

  return (
    <div className="container mt-5">
      <h2><span style={{ color: "red" }}>*</span>Add Tags and Inputs</h2>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Type and press Enter to add a tag"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div className="mt-3">
  {tags.map((tag, index) => (
    <span
      key={index}
      className="badge mx-1"
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "10px",
        borderRadius: "20px",
        backgroundColor: "#add8e6", // Light blue background
        color: "black",
        fontWeight: "bold",
      }}
    >
      {tag}
      <button
        type="button"
        className="btn btn-sm btn-light ml-2"
        style={{ borderRadius: "50%", padding: "0 8px" }}
        onClick={() => handleRemoveTag(index)}
      >
        &times;
      </button>
    </span>
  ))}
</div>


      <div className="col mt-4">
        <div className="col-md-4">
          <h6><span style={{ color: "red" }}>*</span>Enter Website Name</h6>
          <input
            type="text"
            className="form-control"
            placeholder="Field 1"
            value={website}
            onChange={handleField1Change}
          />
        </div>
        <br />
        <div className="col-md-4">
          <h6><span style={{ color: "red" }}>*</span>Enter Blog Category</h6>
          <input
            type="text"
            className="form-control"
            placeholder="Field 2"
            value={BlogCategory}
            onChange={handleField2Change}
          />
        </div>
        <br />
        <div className="col-md-4">
          <h6><span style={{ color: "red" }}>*</span>Enter Publisher name</h6>
          <input
            type="text"
            className="form-control"
            placeholder="Field 3"
            value={publisher_name}
            onChange={handleField3Change}
          />
        </div>
      </div>

      <div className="mt-4">
        <h6><span style={{ color: "red" }}>*</span>Status</h6>
        <button
          className={`btn ${
            PublishingStatus === "Published"
              ? "btn-success"
              : "btn-outline-success"
          }`}
          style={{ marginRight: "15px" }} // Gap between buttons
          onClick={() => setStatus("Published")}
        >
          Published
        </button>
        <button
          className={`btn ${
            PublishingStatus === "Unpublished"
              ? "btn-danger"
              : "btn-outline-danger"
          }`}
          onClick={() => setStatus("Unpublished")}
        >
          Draft
        </button>
      </div>

      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Submit Data
      </button>
    </div>
  );
}

export default BlogField;
