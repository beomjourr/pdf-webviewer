import ToolBar from "./common/ToolBar";
import PDFContainer from "./contents/PDFContainer";

function Root() {
  return (
    <div className='viewer-container'>
      <ToolBar />
      <PDFContainer />
    </div>
  );
}

export default Root;
