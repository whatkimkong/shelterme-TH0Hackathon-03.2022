import axios from "axios";

// URLS are only Backend URLS

class RecipeService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_HOST}/recipes`,
      withCredentials: true,
    });
  }

  getCategoryList = (category) => {
    return this.service.get(`/categorylist/${category}`);
  };

  createHowdiy = ({
    category,
    descriptiveName,
    ingredients,
    preparation,
    productImg,
    isGiftable,
    gallery,
    timeOfPreparation,
    costRating,
    difficultyRating,
  }) => {
    return this.service.post("/create", {
      category,
      descriptiveName,
      ingredients,
      preparation,
      productImg,
      isGiftable,
      gallery,
      timeOfPreparation,
      costRating,
      difficultyRating,
    });
  };

}

const recipeService = new RecipeService();
export default recipeService;

/* 
DIDNT NEED:
deleteHowdiy = (id) => return this.service.delete(`/delete/${id}`)
*/
