import { useState, useEffect } from 'react';
import loading from './loading.svg';
import './plan-information.css';
import mockdata from "./mockdata.json";


function PlanInformation({ apiUrl = ".", isTestMode = false }) {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {

    (isTestMode ? Promise.resolve(mockdata) : fetch(`${apiUrl}/get-all-plans`).then(res => res.json()))
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [apiUrl, isTestMode]);

  if (error) {
    return (
      <div>
        {error.message}
      </div>
    );
  }

  if (isLoaded) {
    return (
    <div className="PlanInformation">
      <header className="Plan-header">
        <h1 className="main-header js-main-header" style={{ textAlign: "center", marginTop: "8vh", marginBottom: "8vh" }}>
          Pick Your Plan
        </h1>
      </header>
      <section className="flex-container" style={{ display: "flex", flexFlow: "row wrap", maxWidth: "1170px", minWidth: "700px", width: "100%", margin: "auto", fontSize: "1.6em" }}>
        <div className="description flex-child" style={{ textAlign: "left", flexGrow: .5 }}>
          <div>Plan</div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div>General</div>
          <br />
          <div>Specialist</div>
          <br />
          <div>Physiotherapy</div>
          <br />
        </div>
        {items.map((item, i) => {
          return (
            <div key={item.plan_id} className={`fade-in flex-child ${i > 1 ? "item-xs" : ""}`} style={{ animationDelay: `${1 + i * 0.3}s`, textAlign: "center", flexGrow: 1, minWidth: "255px" }}>
              <div>{item.plan_name}</div>
              <br />
              <div className="type" style={{ border: "1px solid black", borderRadius: "5px", marginRight: "15px", marginLeft: "15px" }} >{item.plan_type}</div>
              <br />
              <div className="plan-price" >{`HKD ${item.price} / month`}</div>
              <br />
              <hr />
              <div style={{ minHeight: "1.5em" }}>{item.is_general === 1 ? "\u2713" : "\u2716"}</div>
              <hr />
              <div style={{ minHeight: "1.5em" }}>{item.is_specialist === 1 ? "\u2713" : "\u2716"}</div>
              <hr />
              <div style={{ minHeight: "1.5em" }}>{item.is_physiotherapy === 1 ? "\u2713" : "\u2716"}</div>
              <br />
            </div>
          );
        })}
      </section>
    </div>
    );
  }

  return (
    <div>
      <p>Loading...</p>
      <img src={loading} alt="loading..." className="Plan-loading"/>
    </div>
  );
}

export default PlanInformation;
