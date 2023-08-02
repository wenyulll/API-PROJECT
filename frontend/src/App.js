// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import SpotDetails from "./components/SpotDetails";
import UpdateSpotForm from "./components/UpdateSpotFormModal";
import CurrentUserSpots from "./components/CurrentUserSpots";

// import CurrentUserReviews from "./components/CurrentUserReview";
// import CurrentUserBookings from "./components/Booking/CurrentUserBooking";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        {/* <Route exact path={"/"}>
          <Spots />
        </Route> */}
        <Route exact path={"/"}>
          <Spots />
        </Route>
        <Route exact path={"/spots/:spotId"}>
          <SpotDetails />
        </Route>
        <Route exact path="/spots/current">
          <CurrentUserSpots />
        </Route>
        <Route path="/spots">
          <Spots />
        </Route>
      </Switch>}
    </>
  );
}

export default App;

// get all spots /spots/:id  

// create a spot /spots/new

// post a review /spots/:id

// manage spots /spots/current

// update spot /spots/:id/edit

// delete a spot is on /spots/current

// delete a review /spots/:id

// manage reviews /reviews/current