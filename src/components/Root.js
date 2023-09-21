import { useDispatch, useSelector } from "react-redux";
import Loading from "./common/Loading";
import ToolBar from "./common/ToolBar";
import PDFContainer from "./contents/PDFContainer";
import { useEffect } from "react";
import { updateIsGlobalLoading } from "../features/globalSlice";

function Root() {
  const dispatch = useDispatch();
  const isGlobalLoading = useSelector((state) => state.global.isGlobalLoading);
  const isTwoPageView = useSelector((state) => state.global.isTwoPageView);

  useEffect(() => {
    if (isTwoPageView) {
      dispatch(updateIsGlobalLoading(true));
    }
  }, [isTwoPageView])

  return (
    <div className='root-container'>
      <ToolBar />
      <PDFContainer />
      {isGlobalLoading && <Loading />}
    </div>
  );
}

export default Root;
