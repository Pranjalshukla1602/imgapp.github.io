import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Container, Image, Button } from "semantic-ui-react";
import { MdDateRange } from "react-icons/md";
import { ImLocation } from "react-icons/im";
import "./detailed.css";

const DetailedPage = ({ formdata }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cardItem = formdata.find((item) => (item.id).trim() === id.trim());

  console.log("Detailed data:", cardItem); // Log the detailed data

  if (!cardItem) {
    return <div>Item not found. Please check the URL or go back to the gallery.</div>;
  }
  console.log("Params ID:", id.trim());
  console.log("Formdata:", formdata);
  return (
    <Container>
      <Button onClick={() => navigate(-1)} className="image1" style={{ marginTop: "20px",marginBottom:"40px",padding:"15px" }}>
        Back to Gallery
      </Button>
      <Card centered >
        <Image src={cardItem.image} className="image"
        style={{
                        borderRadius: "10px",
                      }}/>
        <Card.Content>
          <Card.Header>{cardItem.Title}</Card.Header>
          <Card.Meta>
            <span className="date">
              <MdDateRange /> {cardItem.Date}
            </span>
            <br />
            <span className="location">
              <ImLocation /> {cardItem.Location}
            </span>
          </Card.Meta>
          <Card.Description>{cardItem.Caption}</Card.Description>
        </Card.Content>
      </Card>
      <div style={{height:"100px"}}></div>
    </Container>
  );
};

export default DetailedPage;
