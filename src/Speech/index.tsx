import { useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./index.css";
import { Button } from "antd";

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
  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    console.log(transcript);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };
  return (
    <div className="microphone-wrapper">
      {transcript && <div className="microphone-result-text">{transcript}</div>}
      <Button ref={microphoneRef} onClick={handleListing}>
        {isListening ? "Listening......" : "Click to start Listening"}
      </Button>
      <Button onClick={stopHandle} disabled={isListening ? false : true}>
        Stop
      </Button>
      <Button onClick={handleReset} disabled={transcript ? false : true}>
        Reset
      </Button>
    </div>
  );
}
