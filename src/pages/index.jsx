import Layout from "../components/Layout";
import { RangeSliderContainer as RangeSlider } from "../components/RangeSlider";
import { TimelineContainer as Timeline } from "../components/TimeLine";
import { CategoryContainer as Categories } from "../components/Categories";
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
        <Categories />
        <Timeline />
        <RangeSlider />
      </div>
    </Layout>
  );
}
