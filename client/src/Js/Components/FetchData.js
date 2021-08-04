import '../../css/App.css';

//HTTP Requests
export const FetchData = async (url) => {
    return (fetch(url)
        .then((response) => response.json())
    )
};

export const FetchDataFactors = async (url,headers) => {
    return (fetch(url,{headers})
        .then((response) => response.json())
    )
};
