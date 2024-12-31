import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { blogslisting } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { linkapi } from '../services/authService';
const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [apiData, setApiData] = useState([]);
  const isReadOnly = false; // Modify this based on your use case
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authToken');

    if (!isAuthenticated) {
      navigate('/');
    }
  
    // Retain data if already set
    if (!selectedOption && !apiData.length) {
      const savedOption = sessionStorage.getItem('selectedOption');
      const savedData = sessionStorage.getItem('apiData');
  
      if (savedOption) {
        setSelectedOption(savedOption);
        setApiData(savedData ? JSON.parse(savedData) : []);
      }
    }
  }, [navigate, selectedOption, apiData]);
  

  const handleAddNew = () => {
    navigate('/blogfield', { state: { selectedOption, apiData } });
  };

  const handleLogout = () => {
    // Handle logout logic here (e.g., clearing auth tokens)
    const isAuthenticated = localStorage.getItem('authToken');
    console.log("is",isAuthenticated)
    localStorage.removeItem('authToken');

    navigate("/");
  };

  const handleEdit = async (postId) => {
            localStorage.setItem("updatedetails",JSON.stringify(postId))
    try {
            debugger;
              const result = await linkapi(postId.BlogURL); // Await the API result
              const parser = new DOMParser();
              const doc = parser.parseFromString(result.data, "text/html");
              const preTag = doc.querySelector("pre");
    
              if (preTag) {
                const jsonString = preTag.textContent;
                localStorage.setItem("blogdetails",jsonString)
              }
            } catch (error) {
              console.error("Error while fetching API:", error);
              
            }
    navigate("/blogs/reactapps/edits"); // Navigate to the editor page with the postId { state: { postId } }
  };

  const handleOptionChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue) {
      try {
        const response = await blogslisting(selectedValue);
        const filtered = response.data.filter((user) => user.website === selectedValue);
        setApiData(filtered); // Set the fetched data in state
        sessionStorage.setItem('apiData', filtered);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      setApiData([]); // Reset the data if no option is selected
      sessionStorage.removeItem('apiData');
    }
  };

  return (
    <div>
      {/* Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #ddd',
          marginBottom: '20px',
        }}
      >
        <Form.Group controlId="status" style={{ marginBottom: 0 }}>
        <Form.Label>Website URL</Form.Label>
          <Form.Select
            defaultValue=""
            onChange={handleOptionChange}
            value={selectedOption}
            disabled={isReadOnly}
            required
            style={{
              width: '250px',
              height: '38px',
              fontSize: '14px',
            }}
          >
            <option value="">Select Website URL</option>
            {['gmart.in', 'encriss.com', 'automation.gmart.in', 'network.gmart.in', 'devices.encriss.com','testing.in'].map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <div>
          <Button variant="success" onClick={handleAddNew} style={{ marginRight: '10px' }}>
            Add New
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Table to display fetched data */}
      <Table
        striped
        bordered
        hover
        size="sm"
        style={{
          width: '100%',
          margin: '20px 0',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr>
            <th style={{
                backgroundColor: "#f2f2f2",
                color: "#333",
                fontWeight: "bold",
                padding: "12px",
                textAlign: "left",
                border: "1px solid #ddd",
              }}>URL Name</th>
            <th style={{
                backgroundColor: "#f2f2f2",
                color: "#333",
                fontWeight: "bold",
                padding: "12px",
                textAlign: "left",
                border: "1px solid #ddd",
              }}>Title</th>
            <th style={{
                backgroundColor: "#f2f2f2",
                color: "#333",
                fontWeight: "bold",
                padding: "12px",
                textAlign: "left",
                border: "1px solid #ddd",
              }}>Cover Image</th>
            <th style={{
                backgroundColor: "#f2f2f2",
                color: "#333",
                fontWeight: "bold",
                padding: "12px",
                textAlign: "left",
                border: "1px solid #ddd",
              }}>Publishing Status</th>
            <th style={{
                backgroundColor: "#f2f2f2",
                color: "#333",
                fontWeight: "bold",
                padding: "12px",
                textAlign: "left",
                border: "1px solid #ddd",
              }}>Blog Category</th>
            <th style={{
                backgroundColor: "#f2f2f2",
                color: "#333",
                fontWeight: "bold",
                padding: "12px",
                textAlign: "left",
                border: "1px solid #ddd",
              }}>Created At</th>
            <th style={{
                backgroundColor: "#f2f2f2",
                color: "#333",
                fontWeight: "bold",
                padding: "12px",
                textAlign: "left",
                border: "1px solid #ddd",
              }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {apiData.length > 0 ? (
            apiData.map((post, index) => (
              <tr key={index}>
                <td>{post.website}</td>
                <td>
                  <a href={post.BlogURL} target="_blank" rel="noopener noreferrer">
                    {post.BlogTitle}
                  </a>
                </td>
                <td>
                  <img src={post.coverImage} alt={post.title} width="100" />
                </td>
                <td>{post.PublishingStatus}</td>
                <td>{post.BlogCategory}</td>
                <td>{new Date(post.created_at).toLocaleDateString("en-GB")}</td>
                <td>
                  <Button variant="primary" onClick={() => handleEdit(post)}>
                    Edit
                  </Button>
                  {post.PublishingStatus === "published" ? (
                    <Button variant="warning">Unpublish</Button>
                  ) : (
                    <Button variant="success">Publish</Button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Dashboard;
