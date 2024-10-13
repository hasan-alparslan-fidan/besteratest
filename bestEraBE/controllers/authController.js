const { default: axios } = require("axios");

const getCharacters = async (req, res) => {
  const query = `
  query AllPeople{ 
    allPeople { 
      totalCount
      people  { 
        eyeColor
        name 
        gender 
      } 
    } 
  }
`;

  const response = await axios.post(
    "https://swapi-graphql.netlify.app/.netlify/functions/index",
    { query },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  res.send({ status: "success", data : response.data.data.allPeople.people });

  // res.send({ status: "success", message: "test passed successfully" });
};

module.exports = { getCharacters };
