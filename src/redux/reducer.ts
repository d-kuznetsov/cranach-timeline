import {
  CURRENT_LINK,
  PERIOD,
  ARTWORKS,
  CATEGORY,
  LINE_HEIGHT,
  ARTWORK_TO_VIEW,
  TEXT_TO_SEARCH,
} from "./actions";
import { CATEGORIES, PERIOD_MIN_VALUE, PERIOD_MAX_VALUE } from "../constants";
import { RootState, Artwork, Categories, Period, Action } from "./types";

function updateArtworks(
  artworks: Array<Artwork>,
  period: Period,
  categories: Categories,
  textToSearch: string = ""
): Array<Artwork> {
  const [periodStart, periodEnd] = period;
  return artworks.filter((item) => {
    return (
      categories[item.categoryId].displayed &&
      item.dating.begin >= periodStart &&
      item.dating.end <= periodEnd &&
      hasTextToSearch(item, textToSearch)
    );
  });
}

function updateCategories(categories: Categories, id: number, displayed: boolean): Categories {
  const category = {
    ...categories[id],
    displayed,
  };
  return {
    ...categories,
    [id]: category,
  };
}

function hasTextToSearch(item: Artwork, text: string) {
  // ToDo
  return JSON.stringify(item).toLowerCase().search(text.toLowerCase()) >= 0;
}

const initialCategories: Categories = {};
Object.keys(CATEGORIES).forEach((id) => {
  initialCategories[+id] = {
    ...CATEGORIES[+id],
    displayed: true,
  };
});

export const initialState: RootState = {
  link: "/",
  period: [PERIOD_MIN_VALUE, PERIOD_MAX_VALUE],
  categories: initialCategories,
  artworks: [],
  artworksToView: [],
  lineHeight: 8,
  openViewer: false,
  artworkToView: null,
  textToSearch: "",
};
export default function reducer(state: RootState = initialState, action: Action): RootState {
  switch (action.type) {
    case CURRENT_LINK:
      // ToDo
      if (action.link === "/timeline" && state.textToSearch) {
        return {
          ...state,
          link: action.link,
          textToSearch: "",
          artworksToView: updateArtworks(state.artworks, state.period, state.categories, ""),
        };
      }
      return {
        ...state,
        link: action.link,
      };
    case PERIOD:
      return {
        ...state,
        period: action.period,
        artworksToView: updateArtworks(
          state.artworks,
          action.period,
          state.categories,
          state.textToSearch
        ),
      };
    case ARTWORKS:
      return {
        ...state,
        artworks: action.artworks,
        artworksToView: updateArtworks(
          action.artworks,
          state.period,
          state.categories,
          state.textToSearch
        ),
      };
    case CATEGORY:
      return {
        ...state,
        categories: updateCategories(state.categories, action.id, action.displayed),
        artworksToView: updateArtworks(
          state.artworks,
          state.period,
          updateCategories(state.categories, action.id, action.displayed),
          state.textToSearch
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
    case TEXT_TO_SEARCH:
      return {
        ...state,
        textToSearch: action.text,
        artworksToView: updateArtworks(state.artworks, state.period, state.categories, action.text),
      };
    default:
      return state;
  }
}
