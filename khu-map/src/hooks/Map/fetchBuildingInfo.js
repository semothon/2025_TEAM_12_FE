import axios from 'axios';

export default async function fetchBuildingInfo(buildingID) {
    try {
        axios.get(`http://localhost:8080/building`, { params: { "buildingID": buildingID } })
            .then(
                (response) => {
                    if (response.status != 200) {
                        throw new Error("Error fetching building info: " + response.statusText);
                    } else {
                        return response.data;
                    }
                }
            )
    }
    catch (error) {
        console.error("Error fetching building info:", error);
        return null;
    }
}