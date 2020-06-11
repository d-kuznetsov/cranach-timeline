import { CURRENT_LINK, PERIOD, ARTWORKS, CATEGORY } from "./actions";
import { CATEGORIES, PERIOD_MIN_VALUE, PERIOD_MAX_VALUE } from "../constants";

function updateArtworks(artworks, period, categories) {
  const [periodStart, periodEnd] = period;
  return artworks.filter((item) => {
    return (
      categories[item.categoryId].displayed &&
      item.dating.begin > periodStart &&
      item.dating.end < periodEnd
    );
  });
}

function updateCategories(categories, id, displayed) {
  const category = {
    ...categories[id],
    displayed,
  };
  return {
    ...categories,
    [id]: category,
  };
}

const initialCategories = {};
Object.keys(CATEGORIES).forEach((id) => {
  initialCategories[id] = {
    ...CATEGORIES[id],
    displayed: true,
  };
});

const initialState = {
  link: "",
  period: [PERIOD_MIN_VALUE, PERIOD_MAX_VALUE],
  categories: initialCategories,
  artworks: [],
  artworksToView: [],
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CURRENT_LINK:
      return {
        ...state,
        link: action.link,
      };
    case PERIOD:
      return {
        ...state,
        period: action.period,
        artworksToView: updateArtworks(state.artworks, action.period, state.categories),
      };
    case ARTWORKS:
      return {
        ...state,
        artworks: action.artworks,
        artworksToView: updateArtworks(action.artworks, state.period, state.categories),
      };
    case CATEGORY:
      return {
        ...state,
        categories: updateCategories(state.categories, action.id, action.displayed),
        artworksToView: updateArtworks(
          state.artworks,
          state.period,
          updateCategories(state.categories, action.id, action.displayed)
        ),
      };
    default:
      return state;
  }
}
