import React, { useState } from "react";
import { CircularIndeterminate } from "../loadinganimation";
import { Auth, db, storage } from '../firebase-config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { collection, addDoc } from 'firebase/firestore';
import {useAuthState} from "react-firebase-hooks/auth"
import name  from "../name.png";

//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
const API_TOKEN = "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";

const ImageGenerationForm = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [prompt, setPrompt] = useState("")
  const [imageFile, setImageFile] = useState(null);

  const [user] = useAuthState(Auth)
  const postRef = collection(db, "posts")

  const uploadImage = async () =>{
    if(imageFile !== null){
      const imageRef = ref(storage, `images/${imageFile.name + v4()}`)
      uploadBytes(imageRef, imageFile)
      .then(()=>{
        getDownloadURL(imageRef)
        .then((url)=>{
          if(prompt !== ""){
            addDoc(postRef, {
              prompt: prompt,
              image: url,
              user: user.displayName,
              logo: user.photoURL,
            })
            .then(res=>alert("posted"))
            .catch(err=>console.log(err))
          }
        })
      })
      .catch(err=>console.log(err))
    }

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
    setPrompt(input)
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );


    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setImageFile(new File([blob], "art.png", { type: "image/png" }));
    setLoading(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = output;
    link.download = "art.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (<div className="imageGen">
    <div className="gen">
        <h1 className="font-extrabold text-[#fff] text-[32px]">Show your creativity!</h1>
        <p className="mt-2 text-[#fff] text-[14px] max-w-[500px]">Browse through a collection of imaginative and visually stunning images generated by OpenAI</p>
      </div>
    <form className="generate-form mt-2 text-[#000]" onSubmit={handleSubmit}>
      <input type="text" name="input" placeholder="Type you think..." />
      <button type="submit" className="button">Generate</button>
    </form>

    {loading && <div className="loading"><p><CircularIndeterminate/></p></div>}
    {!loading && output && (
      <div className="result-image">
        <img src={output} alt="art"  />
        <div className="action">
            <button className="But1" onClick={handleDownload}>Download</button>
            {user && <button className="But2" onClick={uploadImage}>Share</button>}
        </div>
      </div>
    )}
    </div>

  );

};

export default ImageGenerationForm;
