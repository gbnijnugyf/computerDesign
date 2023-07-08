import { useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./index.css";
import { Button, message } from "antd";
import { Service } from "../../service";

export function Speech() {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef: any = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  function handleListing() {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  function stopHandle() {
    setIsListening(false);
    console.log(transcript);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  function handleReset() {
    stopHandle();
    resetTranscript();
  };
  function submitText(){
    Service.postSpeechText(transcript).then((res)=>{
      console.log(res)
      message.success("发送数据处理请求成功！");
    }).catch(()=>{
      message.error("发送数据处理请求失败，请重试！");
    })

  }


  return (
    <div className="microphone-wrapper">
      {transcript && <div className="microphone-result-text">{transcript}</div>}
      <Button ref={microphoneRef} onClick={handleListing}>
        {isListening ? "倾听中......" : "点击开始倾听"}
      </Button>
      <Button onClick={stopHandle} disabled={isListening ? false : true}>
        暂停
      </Button>
      <Button onClick={handleReset} disabled={transcript ? false : true}>
        重置
      </Button>
      <Button onClick={submitText} disabled={transcript ? false : true}>
        处理数据
      </Button>
    </div>
  );
}
