import * as global from "./Global"

export const getInitVariables = () => {
  console.log("getInitVariables()")
  if(global.initVariables){
    return global.initVariables;
  }

  let initVariables;  
  try{
    // initVariables = JSON.parse(window['Android'].getInitVariables());
    // global.setInitVariables(initVariables);
    // setTimeout(function() {
    //   console.log("dispatch loadCompleteInitVaiables")
    //   document.dispatchEvent(new CustomEvent('loadCompleteInitVaiables'));
    // }, 500)    
    // return initVariables;

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
      file_url: 'https://xcdn.home-learn.com/data/origin_img/2022/07/14/220714104721310.pdf',
      subjLessonNo: 28217,
      dictionaryNo: 28918,
      token: 'V0201d4eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqcnFqYXduMDMxODMiLCJ2IjoyLCJ1c2VySWQiOjIwODQ3MDAsInN0dWRlbnRObyI6MTAyNzg5OSwibG9naW5BcyI6ZmFsc2UsImlhdCI6MTY5NTM2MTc5NCwiZXhwIjoxNjk1NTM0NTk0fQ.2UylWh3irBbL4bQgyxwsXatLgblyL4QnGat2Ea-2GvwVdh6dY31-gnGCy5SSchw4MImJulu-OSDf6i7XP9unaw',
     }
      global.setInitVariables(initVariables);


  }catch(e){
    // console.log("window['Android'].getInitVariables() 실패 ");
    // initVariables = {
    //   useTinyTan : "Y",
    //   parentCert : "Y",
    //   schoolingMenuYn :"Y",
    //   loginTime : (new Date()).getTime(),
    //   device : "N",
    //   isTeacherMode : "N",
    //   apiUrl: "https://dev-api.home-learn.com",
    //   examUrl: "https://dev-exam.home-learn.com",
    //   schoolingApiUrl: "https://dev-api.schooling.co.kr",
    //   homelearnUrl:"https://dev-stu.home-learn.com",
    //   homevatarUrl:"https://dev-homevatar.home-learn.com",
    //   admin: 1,
    //   productLevelCode: "01",
    //   isLittleHomelearnUser: "N",
    //   // 여기부터 PDF 데이터
    //   s_page: 6,
    //   e_page: 12,
    //   order_nm: '1단원',
    //   study_course_nm: '지도가 본 우리 지역',
    //  }
     
      
  }
  return initVariables;
};
