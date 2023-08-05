// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/Spots/SpotsIndex";
import SpotShow from "./components/Spots/SpotsShow";
import CreateSpotForm from "./components/Spots/CreateSpotForm";
import ManageSpots from "./components/Spots/ManageSpotsIndex"
import UpdateSpotForm from "./components/Spots/UpdateSpotForm";

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
        <Route path='/spots/current'>
          <ManageSpots />
        </Route>
        <Route exact path='/spots/:spotId/edit'>
          <UpdateSpotForm />
        </Route>
        <Route exact path='/spots/:spotId'>
          <SpotShow />
        </Route>

      </Switch>}
    </>
  );
}

export default App;

