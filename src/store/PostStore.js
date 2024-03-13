import { makeAutoObservable } from 'mobx';
import { Tone, Length, Style } from '../utils/ContentBlocks';

class PostStore {
  tone = '';
  length = '';
  style = '';
  prompt = '';
  response = '';
  imageDescription = '';
  image = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTone(tone) {
    this.tone = tone;
  }

  setLength(length) {
    this.length = length;
  }

  setStyle(style) {
    this.style = style;
  }

  setPrompt(prompt) {
    this.prompt = prompt;
  }

  setResponse(response) {
    this.response = response;
  }

  setImageDescription(description) {
    this.imageDescription = description;
    console.log('Image description set to:', description);
  }

  setImage(image) {
    this.image = image;
  }

  gatherPostData() {
    this.fetchIdeas();
  }

  fetchIdeas() {
    const toneDescription = Tone[this.tone] || '';
    const lengthDescription = Length[this.length] || '';
    const styleDescription = Style[this.style] || '';

    const promptText = `${this.prompt}\n\nTone: ${toneDescription}\nLength: ${lengthDescription}\nStyle: ${styleDescription}`;

    fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-instruct',
        prompt: promptText,
        max_tokens: 100,
        temperature: 0.7,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setResponse(data.choices[0].text.trim());
        this.fetchImageRecommendation(data.choices[0].text.trim());
      })
      .catch((error) => console.error('Error fetching ideas:', error));
  }

  fetchImageRecommendation(postText) {
    const promptTextForImage = `Based on the following post text, suggest a suitable image description: "${postText}"`;

    fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-instruct',
        prompt: promptTextForImage,
        max_tokens: 50,
        temperature: 0.7,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setImageDescription(data.choices[0].text.trim());
      })
      .catch((error) =>
        console.error('Error fetching image recommendation:', error)
      );
  }
}

export const postStore = new PostStore();
