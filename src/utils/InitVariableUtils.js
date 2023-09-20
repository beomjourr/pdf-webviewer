import * as global from "./Global"

export const getInitVariables = () => {
  console.log("getInitVariables()")
  if(global.initVariables){
    return global.initVariables;
  }

  let initVariables;  
  try{
    initVariables = JSON.parse(window['Android'].getInitVariables());
    global.setInitVariables(initVariables);
    setTimeout(function() {
      console.log("dispatch loadCompleteInitVaiables")
      document.dispatchEvent(new CustomEvent('loadCompleteInitVaiables'));
    }, 500)    
    return initVariables;

  }catch(e){
    console.log("window['Android'].getInitVariables() 실패 ");
    initVariables = {
      useTinyTan : "Y",
      parentCert : "Y",
      schoolingMenuYn :"Y",
      loginTime : (new Date()).getTime(),
      device : "N",
      isTeacherMode : "N",
      apiUrl: "https://dev-api.home-learn.com",
      examUrl: "https://dev-exam.home-learn.com",
      schoolingApiUrl: "https://dev-api.schooling.co.kr",
      homelearnUrl:"https://dev-stu.home-learn.com",
      homevatarUrl:"https://dev-homevatar.home-learn.com",
      admin: 1,
      productLevelCode: "01",
      isLittleHomelearnUser: "N",
      // 여기부터 PDF 데이터
      s_page: 6,
      e_page: 12,
      order_nm: '1단원',
      study_course_nm: '지도가 본 우리 지역',
     }
     
      
  }
  return initVariables;
};
