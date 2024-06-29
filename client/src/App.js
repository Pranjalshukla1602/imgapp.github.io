import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import InputMemory from "./Pages/InputMemory/InputMemory";
import ImageCards from "./Components/MemoryCard/ImageCards";
import DetailedPage from "./Components/Detailed/DetailedPage";
import { firestore } from "./firebase_conf";
import { collection, onSnapshot } from "firebase/firestore";

function App() {
  const [formdata, setFormdata] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, "NotesData"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFormdata(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/inputMemory" element={<InputMemory />} />
        <Route path="/" element={<ImageCards formdata={formdata} />} />
        <Route path="/details/:id" element={<DetailedPage formdata={formdata} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
