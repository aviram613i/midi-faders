import React, { useState } from "react";
import Button from "@mui/material/Button";
import { WebMidi } from "webmidi";

const Main = () => {
  // const [midiDevices, setMidiDevices] = useState("initial string");
  // const [isAccessSuccess, setIsAccessSuccess] = useState("");
  const [text, setText] = useState("initial string");
  const [midiOutputs, setMidiOutputs] = useState("initial string");

  // const onSucessCallBack = (midiAccess) => {
  //   setIsAccessSuccess("Success");
  //   setMidiDevices(JSON.stringify(midiAccess.outputs.values().next().value));
  // };
  // const onErrorCallback = (err) => {
  //   setIsAccessSuccess(`Error: ${err.code}`);
  // };
  const buttonOnClick = () => {
    // navigator.requestMIDIAccess().then(onSucessCallBack, onErrorCallback);
    WebMidi.enable()
      .then(() => {
        setMidiOutputs(WebMidi.outputs[1].name);
        // setText(`Devices: ${WebMidi.outputs[0]}`);
        // setText(`Devices: ${WebMidi.outputs[0]}, played note`);
      })
      .catch((err) => {
        setText(`Error: ${err}`);
      });
  };

  // const findMidiDevices = () => {
  //   setIsAccessSuccess(WebMidi.enabled);
  //   setMidiDevices(JSON.stringify(WebMidi.outputs));
  // };

  return (
    <div>
      <Button variant="contained" onClick={buttonOnClick}>
        Find midi devices
      </Button>
      <p>Outputs: {midiOutputs}</p>
      <Button
        onClick={() => {
          WebMidi.outputs[1].playNote("C3", { duration: 2000 });
          WebMidi.outputs[1].sendControlChange("modulationwheelcoarse", 60);
        }}
      >
        Play note
      </Button>
    </div>
  );
};

export default Main;
