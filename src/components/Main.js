import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/system";

const Row = styled(Box)({
  border: "1px solid",
  borderRadius: 4,
  padding: 3,
  margin: "7px 5px",
  backgroundColor: "#A0BFE0",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#4A55A2",
    color: "white",
  },
});

const Main = () => {
  const [data, setData] = useState([]);
  const [getCountry, setCountry] = useState();
  const [getCities, setCities] = useState();

  const fetchAllData = () => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then(async (res) => {
        const response = await res?.data;
        setData(response);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const country = [...new Set(data.map((item) => item.country))].sort();

  const currentCountry = (e) => {
    let states = data.filter(
      (state) => state?.country === e?.target?.innerHTML
    );
    states = [...new Set(states.map((item) => item?.subcountry))].sort();
    setCountry(states);
  };

  const currentState = (e) => {
    let cities = data.filter(
      (city) => city?.subcountry === e?.target?.innerHTML
    );
    cities = [...new Set(cities.map((item) => item?.name))].sort();
    setCities(cities);
  };

  return (
    <>
      <Container sx={{ backgroundColor: "#3fff0042" }}>
        <Grid container>
          {/* --------------------------------------------Countries */}
          <Grid item xs={12} md={4}>
            <h2>Countries</h2>
            <div>
              {Array.isArray(country) &&
                country.map((items) => (
                  <Row onClick={(e) => currentCountry(e)} key={items}>
                    {items}
                  </Row>
                ))}
            </div>
          </Grid>
          {/* -----------------------------------------------States */}
          <Grid item xs={12} md={4}>
            <h2>State</h2>
            <div>
              {Array.isArray(getCountry) &&
                getCountry.map((items) => (
                  <Row onClick={(e) => currentState(e)} key={items}>
                    {items}
                  </Row>
                ))}
            </div>
          </Grid>
          {/* -----------------------------------------------Cities */}
          <Grid item xs={12} md={4}>
            <h2>Cities</h2>
            <div>
              {Array.isArray(getCities) &&
                getCities.map((items) => <Row key={items}>{items}</Row>)}
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Main;
