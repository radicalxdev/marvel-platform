import { createSlice } from '@reduxjs/toolkit';

import fetchTools from '../thunks/tools';

// const RESPONSE_TEST = {
//   title: 'Grade 10 Math Questions',
//   questions: [
//     {
//       question: 'What is the result of 2 + 2?',
//       choices: ['3', '4', '5', '6'],
//       answer: '4',
//       explanation: 'Adding 2 to 2 gives us 4.',
//     },
//     {
//       question: 'Which of the following is the largest prime number?',
//       choices: ['11', '13', '17', '19'],
//       answer: '17',
//       explanation: '17 is the largest prime number in this set.',
//     },
//     {
//       question: 'What is the result of 10 divided by 2?',
//       choices: ['5', '2', '1', '0'],
//       answer: '5',
//       explanation: 'Dividing 10 by 2 gives us 5.',
//     },
//     {
//       question: 'What is the remainder when 15 is divided by 7?',
//       choices: ['1', '2', '3', '4'],
//       answer: '2',
//       explanation: 'The remainder when 15 is divided by 7 is 2.',
//     },
//     {
//       question: 'What is the value of 2 raised to the power of 3?',
//       choices: ['8', '9', '10', '11'],
//       answer: '8',
//       explanation: '2 raised to the power of 3 is 8.',
//     },
//   ],
// };

// const RESPONSE_TEST2 = [
//   {
//     concept: 'Rag: Retrieval Augmented Generation',
//     definition:
//       'Process by which large language models call on Vector databases to provide relevant and most updated information.',
//   },
//   {
//     concept: 'Retrieval-Augmented Generation (RAG)',
//     definition:
//       'A process where large language models (LLMs) utilize vector databases to retrieve relevant information and sources to answer a specific question or fulfill a specific task, combining the expertise of the LLM in generating text with the librarian-like knowledge of the vector database to provide accurate and comprehensive results.',
//   },
//   {
//     concept: 'Retrieval-Augmented Generation (RAG)',
//     definition:
//       'Retrieval-Augmented Generation (RAG) is a process where large language models (LLMs) use vector databases to retrieve key sources of data and information to answer a specific question. This is similar to how a journalist might consult a librarian to find relevant books for an article.',
//   },
//   {
//     concept: 'AI-powered Question Answering System',
//     definition:
//       'A system that utilizes artificial intelligence to understand and respond to user queries by retrieving and processing relevant data, updating information as needed, and generating accurate and up-to-date answers. This system leverages embedding technology to incorporate pertinent information into prompts and large language models to produce outputs based on sourced data.',
//   },
//   {
//     concept: 'Data Governance and Management',
//     definition:
//       'The process of ensuring data is accurate, complete, consistent, and compliant by implementing policies, procedures, and technologies. Data Governance focuses on oversight and accountability, while Data Management focuses on operational processes and controls.',
//   },
//   {
//     concept: 'Vector Embeddings in Large Language Models',
//     definition:
//       'Vector embeddings are data representations that capture the semantic relationships between words, sentences, and other data points. In large language models, vector embeddings are used to provide context and relevance to prompts, enhancing the accuracy and performance of the model\u0027s output.',
//   },
//   {
//     concept: 'Data governance for AI use cases',
//     definition:
//       'Data governance is the process of managing and controlling data access, usage, quality, and security. It is essential for ensuring that AI models are trained on accurate and reliable data, and that they produce accurate and reliable results. This is especially important for businesses that use AI to make decisions or to automate tasks, as inaccurate data can lead to poor decisions and costly mistakes.',
//   },
// ];

const toolsState = {
  data: null,
  loading: true,
  error: null,
};

const communicator = {
  prompt: null,
  response: null,
  communicatorLoading: false,
  formOpen: true,
};

const initialState = {
  ...toolsState,
  ...communicator,
};

const tools = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    reset: () => initialState,
    resetCommunicator: (state) => ({ ...state, ...communicator }),
    setCommunicatorLoading: (state, action) => {
      state.communicatorLoading = action.payload;
    },
    setPrompt: (state, action) => {
      state.prompt = action.payload;
    },
    setFormOpen: (state, action) => {
      state.formOpen = action.payload;
    },
    setResponse: (state, action) => {
      state.response = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTools.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTools.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchTools.rejected, (state) => {
        state.error = 'Could not get tools';
        state.loading = false;
      });
  },
});

export const {
  reset,
  setCommunicatorLoading,
  setPrompt,
  setResponse,
  setFormOpen,
  resetCommunicator,
} = tools.actions;

export default tools.reducer;
