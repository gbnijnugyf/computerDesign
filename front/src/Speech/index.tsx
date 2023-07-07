import { useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./index.css";
import { Button } from "antd";

let speech: any;
if (window.webkitSpeechRecognition) {
  // eslint-disable-next-line
  const SpeechRecognition = webkitSpeechRecognition;
  speech = new SpeechRecognition();
  speech.continuous = true;
} else {
  speech = null;
}
export function Speech1() {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");
  const listen = () => {
    setIsListening(!isListening);
    if (isListening) {
      speech.stop();
      console.log(text)
    } else {
      speech.start();
    }
  };

  useEffect(() => {
    //handle if the browser does not support the Speech API
    if (!speech) {
      return;
    }
    speech.onresult = (event: { results: string | any[]; }) => {
      setText(event.results[event.results.length - 1][0].transcript);
    };
  }, []);

  return (
    <>
      <div className="app">
        <h2>Book Voice Search</h2>
        <h3>Click the Mic and say an author's name</h3>
        <div>
          <Button
            onClick={listen}
          >点我</Button>
        </div>
        <p>{text}</p>
      </div>
    </>
  );
}

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
