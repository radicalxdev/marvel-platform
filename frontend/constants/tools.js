const TOOLS_ID = {
  GEMINI_DYNAMO: '1',
  GEMINI_QUIZIFY: '0',
};

const ToolCardHandlers = {
  [TOOLS_ID.GEMINI_QUIZIFY]: (item) => {
    const topicInput = item.tool_data[0].inputs.find(
      (input) => input.name === 'topic'
    );
    const title = topicInput ? topicInput.value : 'N/A';
    const multipleChoiceList = item.messages?.data?.data;
    const backgroundImgURL =
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d';
    const logo =
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31';

    return {
      title,
      backgroundImgURL,
      logo,
      multipleChoiceList,
    };
  },
  [TOOLS_ID.GEMINI_DYNAMO]: (item) => {
    const youtubeUrlInput = item.tool_data[0].inputs.find(
      (input) => input.name === 'youtube_url'
    );
    const title = youtubeUrlInput ? youtubeUrlInput.value : 'N/A';
    const flashCards = item.messages?.data?.data;
    const backgroundImgURL =
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080';
    const logo =
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188';

    return {
      title,
      backgroundImgURL,
      logo,
      flashCards,
    };
  },
  default: () => ({
    title: 'Default Title',
    backgroundImgURL: null,
    logo: null,
    multipleChoiceList: null,
    flashCards: null,
  }),
};

export { TOOLS_ID, ToolCardHandlers };
