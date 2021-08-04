import '../css/Factors.css';
import { useState, useEffect } from "react";
import Select from "react-select";
import { FactorsTable } from "./Components/MaterialUiTable"
import { FetchData, FetchDataFactors } from "./Components/FetchData"
import BarChart from "./Components/BarChart"
function Factors() {
    //Initialise hooks
    const url = "http://131.181.190.87:3000/";
    const [data, setData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [Countries, setCountries] = useState([]);
    const [country, setCountry] = useState([]);
    const [year, selectYear] = useState({ value: 2020, label: 2020 });
    const [page, setPage] = useState(0);
    const options = [
        { value: 2020, label: "2020" },
        { value: 2019, label: "2019" },
        { value: 2018, label: "2018" },
        { value: 2017, label: "2017" },
        { value: 2016, label: "2016" },
        { value: 2015, label: "2015" }
    ];

    //Fetches countries from Server or Local storage.
    function fetchCountries() {
        let localData = localStorage.getItem("countries");
        if (localData === null || localData === undefined) {
            FetchData(url + "countries")
                .then((data) => {
                    localStorage.setItem("countries", JSON.stringify(data));
                    populateCountrySelect(data);
                });
        } else {
            populateCountrySelect(JSON.parse(localData));
        }
    }

    //populate select box with countries
    function populateCountrySelect(data) {
        let OptionsAcc = [];
        data.forEach((country) => {
            OptionsAcc.push({ value: country, label: country })
        })
        let GrouppedAcc = [];
        var i = 0;
        //Group data alphabetically
        for (i = 0; i < 26; i++) {
            GrouppedAcc.push({
                options: OptionsAcc.filter((country) => country.value.startsWith((i + 10).toString(36).toUpperCase())),
                label: (i + 10).toString(36)
            })
        }
        setCountries(GrouppedAcc);
    }

    //When the component mounts
    useEffect(() => {
        fetchCountries();
        const token = localStorage.getItem("token");
        const headers = {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };
        //get Factor data from server or local storage.
        let localData = localStorage.getItem("Factors" + year.value);
        if (localData === null || localData === undefined) {
            FetchDataFactors(url + "Factors/" + year.value, headers)
                .then((response) => {
                    if (response.error) {
                        window.location.href = '/Home';
                        alert(response.message)
                    } else {
                        setDisplayData(response);
                        localStorage.setItem("Factors" + year.value, JSON.stringify(response));
                    }
                }).catch((error) => {
                    console.error('Error:', error);
                    window.location.href = '/Home';
                });
        } else {
            setDisplayData(JSON.parse(localData));
        }
    }, []);

    //When the year or country changes
    useEffect(() => {
        const token = localStorage.getItem("token");
        const headers = {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };

        let localData = localStorage.getItem("Factors" + year.value);
        if (localData === null || localData === undefined) {
            FetchDataFactors(url + "Factors/" + year.value, headers)
                .then((response) => {
                    if (response.error) {
                        window.location.href = '/Home';
                        alert(response.message)
                    } else {
                        setData([]);
                        setData(response);
                        localStorage.setItem("Factors" + year.value, JSON.stringify(response));
                    }
                }).catch((error) => {
                    console.error('Error:', error);
                    window.location.href = '/Home';
                });
        } else {
            setData([]);
            setData(JSON.parse(localData));
        }
        filterByCountry();
    }, [year]);

    useEffect(() => {
        filterByCountry();
    }, [country]);

    //client side filtering by country
    function filterByCountry() {
        let dataAcc = [];
        if (country.length > 0) {
            country.forEach((country) => {
                let filterData = data.filter(data => data.country === country.value)[0]
                if (filterData === null || filterData === undefined) {
                    alert("No data for " + country.value + " in the year " + year.value)
                } else {
                    dataAcc.push(filterData);
                }
            });
        } else {
            dataAcc = data;
        }
        DisplayData(dataAcc);
    }

    //Display data
    function DisplayData(data) {
        if (data.length > 0) {
            setDisplayData([]);
            setDisplayData(data);
        }
    }

    //when a selection is made
    const onchangeYear = (item) => {
        selectYear(item);
    };
    const onchangeCountry = (item) => {
        if (item.length < 6) {
            setCountry(item);
            if (item.length === 5) {
                //remove countries
                setCountries([]);
            } else if (Countries.length < 1) {
                //re-populate countries
                fetchCountries();
            }
        }
    };

    return (
        <div className="Factors">
            <div className="Factors-Select" >
                <Select
                    className="year-select"
                    defaultValue={year.value}
                    value={year}
                    onChange={onchangeYear}
                    options={options}

                />
                <Select
                    className="country-select"
                    Value={country}
                    isMulti
                    onChange={onchangeCountry}
                    options={Countries}
                    placeholder="(Max 5) Select multiple countries.."
                    isValidNewOption={false}
                />
            </div>
            <FactorsTable data={displayData} page={page} setPage={setPage} />
            <BarChart data={displayData} page={page} setPage={setPage} />
        </div>
    );
}

export default Factors;
