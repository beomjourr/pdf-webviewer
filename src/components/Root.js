import { useSelector } from "react-redux";
import Loading from "./common/Loading";
import ToolBar from "./common/ToolBar";
import PDFContainer from "./contents/PDFContainer";

function Root() {
  const isGlobalLoading = useSelector((state) => state.global.isGlobalLoading);

  return (
    <div className='root-container'>
      <ToolBar />
      <PDFContainer />
      {isGlobalLoading && <Loading />}
    </div>
  );
}

export default Root;
