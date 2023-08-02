// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/Spots/SpotsIndex";
import SpotShow from "./components/Spots/SpotsShow";
import CreateSpotForm from "./components/Spots/CreateSpotForm";


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
        <Route exact path='/'>
          <SpotsIndex />
        </Route>
        <Route path='/spots/new'>
          <CreateSpotForm />
        </Route>
        <Route exact path='/spots/:spotId'>
          <SpotShow />
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