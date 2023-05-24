import "./App.css";
import { useEffect, useState } from "react";
const axios = require("axios").default;

function App() {
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const translate = () => {
    // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
// curl -X 'POST' \
//   'https://libretranslate.com/translate' \
//   -H 'accept: application/json' \
//   -H 'Content-Type: application/x-www-form-urlencoded' \
//   -d 'q=gg&source=en&target=es&format=text&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    // const params = new URLSearchParams();
    // params.append("q", input);
    // params.append("source", from);
    // params.append("target", to);
    // params.append("format", 'text');
    // params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

    // axios
    //   .post("https://libretranslate.com/translate", params, {
    //     headers: {
    //       accept: "application/json",
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //   })
   let url = "https://libretranslate.com/translate";
   let headers = {
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };
  let data = {
    q: input,
    source: from,
    target: to,
    format: "text",
    api_key: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  };
    axios.post(url, headers=headers, data=data)
    
    .then((res) => {
      console.log(res.data);
      setOutput(res.data.translatedText);
    });
  };

  useEffect(() => {
    axios
      .get("https://libretranslate.com/languages", {
        headers: { accept: "application/json" },
      })
      .then((res) => {
        console.log("hhhh");
        console.log(res.data);
        setOptions(res.data);
      });
  }, []);

  //  curl -X GET "https://libretranslate.de/languages" -H  "accept: application/json"

  return (
    <div className="App">
      <div>
        From ({from}) :
        <select onChange={(e) => setFrom(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
        To ({to}) :
        <select onChange={(e) => setTo(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          cols="50"
          rows="8"
          onInput={(e) => setInput(e.target.value)}
        ></textarea>
      </div>
      <div>
        <textarea cols="50" rows="8" value={output}></textarea>
      </div>
      <div>
        <button onClick={(e) => translate()}>Translate</button>
      </div>
    </div>
  );
}

export default App;
