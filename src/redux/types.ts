import { ThunkAction } from "redux-thunk";

// States
interface Image {
  dimensions: {
    width: number;
    height: number;
  };
  src: string;
}

export type ImageSize = "xs" | "s" | "m" | "l" | "xl";

export interface Artwork {
  categoryId: number;
  involvedPersons: Array<{ name: string }>;
  titles: Array<{ title: string }>;
  objectId: number;
  dating: {
    dated: string;
    begin: number;
    end: number;
  };
  owner: string;
  images: {
    sizes: {
      xs: Image;
      s: Image;
      m: Image;
      l: Image;
      xl: Image;
    };
  };
  locations: Array<{term: string}>;
}

export type Period = [number, number];

export interface Categories {
  [key: number]: {
    id: number;
    label: string;
    mainColor: string;
    displayed?: boolean;
  };
}

export interface RootState {
  period: Period;
  categories: Categories;
  artworks: Array<Artwork>;
  artworksToView: Array<Artwork>;
  artworkToView: Artwork | null;
  lineHeight: number;
  openViewer: boolean;
  textToSearch: string;
}

// Actions
interface SyncAction {
  type: string;
  [key: string]: any;
}
export type AsyncAction = ThunkAction<void, RootState, null, SyncAction>;

interface SetPeriodAction extends SyncAction {
  period: Period;
}

interface SetArtworksAction extends SyncAction {
  artworks: Array<Artwork>;
}

interface SetCategoryDisplayAction extends SyncAction {
  id: number;
  displayed: boolean;
}

interface SetLineHeightAction extends SyncAction {
  lineHeight: number;
}

interface SetArtworksToViewAction extends SyncAction {
  artwork: Artwork;
}

interface SetTextToSearchAction extends SyncAction {
  text: string;
}

export type Action =
  | SetPeriodAction
  | SetArtworksAction
  | SetCategoryDisplayAction
  | SetLineHeightAction
  | SetArtworksToViewAction
  | SetTextToSearchAction
  | SyncAction;
