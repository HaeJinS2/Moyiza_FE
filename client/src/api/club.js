import axios from "axios";

const getClub = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/club`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getClubDetail = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/club/${Number(id)}`
    );
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export { getClub, getClubDetail };
