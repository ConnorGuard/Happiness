import '../css/App.css';
import { useState, useEffect } from "react";
import Select from "react-select";
import { FetchData } from "./Components/FetchData"
import { RankTable } from "./Components/MaterialUiTable"
import LineChart from "./Components/LineChart"

function Search() {
  const url = "http://131.181.190.87:3000/";
  const [rankdata, setRankData] = useState([]);
  const [Countries, setCountries] = useState([]);
  const [country, setCountry] = useState({ value: "Australia", label: "Australia" });
  //When the component mounts
  useEffect(() => {
    let localData = localStorage.getItem("Search" + country.value);
    localData = localStorage.getItem("countries");
    //populate country select
    if (localData === null || localData === undefined) {
      FetchData(url + "countries")
        .then((data) => {
          localStorage.setItem("countries", JSON.stringify(data));
          populateCountrySelect(data);
        });
    } else {
      populateCountrySelect(JSON.parse(localData));
    
    }

  }, []);

  function populateCountrySelect(data) {
    let OptionsAcc = [];
    data.forEach((country) => {
      OptionsAcc.push({ value: country, label: country })
    })
    let GrouppedAcc = [];
    var i = 0;
    for (i = 0; i < 26; i++) {
      GrouppedAcc.push({
        options: OptionsAcc.filter((country) => country.value.startsWith((i + 10).toString(36).toUpperCase())),
        label: (i + 10).toString(36)
      })
    }
    setCountries(GrouppedAcc);
  }


  //When the country changes
  useEffect(() => {
    //Get data locally or from server
    let localData = localStorage.getItem("Search" + country.value);
    if (localData === null || localData === undefined) {
      FetchData(url + "rankings/?country=" + country.value)
        .then((data) => {
          localStorage.setItem("Search" + country.value, JSON.stringify(data));
          setRankData([]);
          setRankData(data);
        });
    } else {
      setRankData(JSON.parse(localData));
    }
  }, [country]);


  //when a selection is made
  const onchangeSelect = (item) => {
    setCountry(item);
  };

  return (
    <div className="Search">
      <div className="Search-Select">
        <Select
          defaultValue={country}
          value={country}
          onChange={onchangeSelect}
          options={Countries}
        />
      </div>
      <RankTable data={rankdata} />
      <LineChart data={rankdata} />
    </div>
  );
}

export default Search;