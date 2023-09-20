
// import { setAndroidListener } from "./AndroidUtils";
import React from 'react';

// 앱에서 발신한 평가리포트 이동 이벤트 데이터
export var receivedEventData;
export const setReceivedEventData = (data) => {
  receivedEventData = data;
}

export const init = () =>{
  // setAndroidListener();
  covertParameterToInitVariables();
}
//----------------------------------------------------------------------------
export const isDevServer = (() => { return (window.location.host.indexOf("local") > -1 || window.location.host.indexOf("dev") > -1)})();
export const GradeType = {
  HIGH : "high",
  LOW : "low"
}
export const getGradeType = (grade) =>{
  switch(grade){
    case 1: 
    case 2: 
      return GradeType.LOW;
    default :
      return GradeType.HIGH;
  }
}
export const DeviceTypes = {
  N : "HL105",
  AI : "HL106",
  ZTE : "ISE-T100C"
}
export const isDeviceTypes={
  N : false,
  AI : false,
  ZTE: true
}
export const getDeviceTypes = () => {
  let deviceType = DeviceTypes.ZTE;
  const agent = navigator.userAgent;
  for(let z in DeviceTypes){
    if(agent.indexOf(DeviceTypes[z]) > -1){
      deviceType = DeviceTypes[z];
      isDeviceTypes[z] =true;
      break;
    }else{
      isDeviceTypes[z] =false;
    }
  }
  //console.log("setDeviceTypes",deviceType)
  initVariables.model = deviceType
  return deviceType
}
//----------------------------------------------------------------------------
export var isTouchScreen = (() =>{
  if(('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
    return true
  } else {
    return false
  }
})();
export var Event = {
  START:isTouchScreen? "touchstart" : "mousedown",
  MOVE:isTouchScreen? "touchmove" : "mousemove",
  END:isTouchScreen? "touchend" : "mouseup"
}
//----------------------------------------------------------------------------

export const getColorTitle = (name,coloredWords,colorClass) => {
  let newName = name;
  let arr;
  coloredWords.map((coloredWord,idx) =>
    newName = newName.replace(coloredWord,"____" + coloredWord + "____")
  )
  arr = newName.split("____");
  coloredWords.map((coloredWord,idx) =>
    arr[arr.indexOf(coloredWord)] = <span className={colorClass} key={idx}>{coloredWord}</span> 
  )
  return arr;
}

export const printVersion = (() =>{
  var pckg = require('../../package.json');
    if (pckg) {
      window.appVersion = pckg.version
      console.log("!!!!!!!!!! AppVersion !!!!!!!!!!", pckg.version);
    }
})();


export const covertParameterToInitVariables = () => {
  let items = window.location.search.substr(1).split("&");
  items.map(param => (
    setInitVariablesAttr(param)
  ))
}
const setInitVariablesAttr = (param) => {
  let tmp = param.split("=");
  initVariables[tmp[0]] = decodeURIComponent(tmp[1]);
}

export const setGlobalVariables = () =>{
  setScreenHeight(window.innerHeight)
}

export var initVariables; 

export const setInitVariables = (obj) =>{
  console.log("Global.setInitVariables()")
  initVariables = obj;
  device = obj.device || "N" 
}

export var stateHardKeyBoard // 키보드 상태
export const setStateHardKeyBoard = (n) =>{
  stateHardKeyBoard = n;
}
export var stateSoftKeyBoard=2 // 키보드 상태  on(1) off(2) 
export const setStateSoftKeyBoard = (n) =>{
  stateSoftKeyBoard = n;
}

export var screenHeight = 752;// S형은 800으로..
export const setScreenHeight = (n) =>{
  screenHeight = n;
}
export var contentHeight = 752;
export const setContentHeight = (n) =>{
  contentHeight = n;
}

export var device ;

export var isAndroid;
export const setIsAndroid = (bool) =>{
  isAndroid =bool;
}

export var resumeEvents;
export const mountResumeEvent = (key, obj) =>{
  if (!resumeEvents) {
    resumeEvents = {}
  }
  resumeEvents[key] = obj
}
export const unmountResumeEvent = (key) =>{
  if (key && resumeEvents && resumeEvents[key]) {
    delete resumeEvents[key];
  } else {
    resumeEvents = null;
  }
}
export const runResumeEvent = () =>{
  if (resumeEvents) {
    Object.keys(resumeEvents).map(key => (
      resumeEvents[key]()
    ))
  }
}

export var pasuseEvents;
export const mountPauseEvent = (key, obj) =>{
  if (!pasuseEvents) {
    pasuseEvents = {}
  }
  pasuseEvents[key] = obj
}
export const unmountPauseEvent = (key) =>{
  if (key && pasuseEvents && pasuseEvents[key]) {
    delete pasuseEvents[key]
  } else {
    pasuseEvents = null
  }
}
export const runPasuseEvent = () =>{
  if (pasuseEvents) {
    Object.keys(pasuseEvents).map(key => (
      pasuseEvents[key]()
    ))
  }
}

export var softkeyBoardType = "RESIZE";

export var screenAdjustUtility;
export const initScreenAdjustUtility = (obj) =>{
  screenAdjustUtility = obj
  screenAdjustUtility.adjustingType = softkeyBoardType
}

export var softKeyBoardUtility;
export const initSoftKeyBoardUtility = (obj) =>{
  softKeyBoardUtility = obj

}

let timeoutIdForNoPointerEvents=null;
export const setNoPointerEventsForSeconds=(e => {
  //console.log("##### set NoPointerEventsForSeconds #####")
  document.body.classList.add("no-pointer-events");

  if(timeoutIdForNoPointerEvents){clearTimeout(timeoutIdForNoPointerEvents)}
  timeoutIdForNoPointerEvents = setTimeout(()=>{
    //console.log("##### remove NoPointerEventsForSeconds #####")
    document.body.classList.remove("no-pointer-events");
  },1000)
})
