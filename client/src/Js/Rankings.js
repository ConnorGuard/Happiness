import '../css/App.css';
import { useState, useEffect } from "react";
import Select from "react-select";
import {RankTable} from "./Components/MaterialUiTable"
import {FetchData} from "./Components/FetchData"

//Displays the Rankings table and select by year combo box
function Rankings() {
    const url = "http://131.181.190.87:3000/rankings";
    const [data, setData] = useState([]);
    const [year, selectYear] = useState({value:2020,label:2020});
    const [page, setPage] = useState(0);

    const options = [
        { value: 2020, label: "2020" },
        { value: 2019, label: "2019" },
        { value: 2018, label: "2018" },
        { value: 2017, label: "2017" },
        { value: 2016, label: "2016" },
        { value: 2015, label: "2015" }
    ];

    //When the year changes
    useEffect(() => {
        let localData = localStorage.getItem("Rankings" + year.value);

        if (localData === null || localData === undefined) {
            FetchData(url + "?year=" + year.value)
            .then((data) => {
                localStorage.setItem("Rankings" + year.value, JSON.stringify(data));
                setData([]);
                setData(data);
            })
        }else{
            setData([]);
            setData(JSON.parse(localData));
        }
    }, [year]);

    //when a selection is made
    const onchangeSelect = (item) => {
        selectYear(item);
    };


    return (
        <div className="Rankings">
        
            <div className="Rankings-Select" >
                <Select
                    defaultValue={year.value}
                    value={year}
                    onChange={onchangeSelect}
                    options={options}
                />
            </div>
    
            <RankTable data={data}  page={page} setPage={setPage}/>
        </div>
    );
}



export default Rankings;