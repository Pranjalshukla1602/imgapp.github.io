import React, { useEffect, useState } from "react";
import { storage, firestore } from "../../firebase_conf";
import { Card, Grid, Container, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { collection, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../Components/MemoryCard/MemoryCard.css";
import { ImLocation } from "react-icons/im";
import { MdDateRange } from "react-icons/md";
import { Link } from "react-router-dom";
import image from './image11.jpg';

const ImageCards = () => {
  const [formdata, setFormdata] = useState([]);
  const [notedata, setNotedate] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of cards per page

  useEffect(() => {
    setLoading(true);
    const DisplayData = onSnapshot(
      collection(firestore, "NotesData"),
      (snapshot) => {
        let CardList = [];
        snapshot.docs.forEach((doc) => {
          CardList.push({ id: doc.id, ...doc.data() });
        });
        setFormdata(CardList);
        setLoading(false);
        console.log("Fetched data:", CardList); // Log fetched data
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      DisplayData();
    };
  }, []);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = formdata.slice(indexOfFirstItem, indexOfLastItem);
  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(formdata.length / itemsPerPage);

  return (
    // card components to fetch the data from database

    <Container>
      <Card.Group>
        <Grid columns="three" stackable>
          {currentItems.map((cardItem) => (
              <Grid.Column key={cardItem.id}>
              <Link to={`/details/${cardItem.id}`}>
                <Card style={{
                        borderRadius: "12px",
                      }}>
                  <Card.Content>
                    <Image
                      src={cardItem.image}
                      size="medium"
                      style={{
                        height: "150px",
                        Width: "150px",
                        borderRadius: "10px",
                      }}
                    />
                    <Card.Header
                      style={{
                        marginTop: "5px",
                      }}
                    >
                      {cardItem.Title}
                      <br />
                    </Card.Header>
                    <Card.Meta
                      style={{
                        marginTop: "7px",
                      }}
                    >
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
                </Link>
              </Grid.Column>
            ))}
        </Grid>
      </Card.Group>
      <div style={{ textAlign: 'center', marginTop: '60px',marginBottom: '10px' }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{
              margin: '0 5px',
              padding: '12px 20px',
              backgroundColor: currentPage === index + 1 ? '#2CB7AB' : '#EEE',
              color: currentPage === index + 1 ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </Container>
  );
};

export default ImageCards;


