import Layout from "../components/Layout";
import RangeSlider from "../components/RangeSlider";
import TimeLine from "../components/TimeLine";
import Cat from "../components/Categories";
import { loadArtworks } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
export default function Home() {
  const artworks = useSelector((state) => state.artworksToView);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadArtworks());
  }, [0]);

  return (
    <Layout>
      <div>
        <Cat />
        <TimeLine />
        <RangeSlider />
      </div>
    </Layout>
  );
}
