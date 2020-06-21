import { CURRENT_LINK, PERIOD, ARTWORKS, CATEGORY, LINE_HEIGHT, ARTWORK_TO_VIEW } from "./actions";
import { CATEGORIES } from "../constants";

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

export const initialState = {
  link: "/",
  period: [1480, 1580],
  categories: initialCategories,
  artworks: [],
  artworksToView: [],
  lineHeight: 8,
  openViewer: false,
  artworkToView: null,
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
    case LINE_HEIGHT:
      return {
        ...state,
        lineHeight: action.lineHeight,
      };
    case ARTWORK_TO_VIEW:
      return {
        ...state,
        artworkToView: action.artwork,
        openViewer: !!action.artwork,
      };
    default:
      return state;
  }
}
