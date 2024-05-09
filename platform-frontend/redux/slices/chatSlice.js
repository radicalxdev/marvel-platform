import { createSlice } from '@reduxjs/toolkit';

import { MESSAGE_ROLE, MESSAGE_TYPES } from '@/constants/bots';

import fetchUserChatSessions from '../thunks/fetchUserChatSessions';

const initialState = {
  input: '',
  error: null,
  emaChat: {},
  sessions: {},
  typing: false,
  chatUser: null,
  more: false,
  openSettingsChat: false,
  fullyScrolled: true,
  infoChatOpened: false,
  started: false,
  loading: false,
  sessionLoaded: false,
  historyLoaded: false,
  streamingDone: false,
  streaming: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    resetChat: (state, _) => ({
      ...initialState,
      sessions: state.sessions,
    }),
    // eslint-disable-next-line no-unused-vars
    resetExplainMyAnswer: (state, _) => {
      state.emaChat = {
        ...state.emaChat,
        messages: [],
        questionId: '',
        choice: '',
        level: '',
      };
      state.input = '';
    },
    setInput: (state, action) => {
      state.input = action.payload;
    },
    setChatUser: (state, action) => {
      state.chatUser = action.payload;
    },
    setMore: (state, action) => {
      const { role } = action.payload;
      if (role === 'toggle') state.more = !state.more;
      if (role === 'shutdown') state.more = false;
    },
    openInfoChat: (state) => {
      state.infoChatOpened = true;
      state.more = false;
    },
    closeInfoChat: (state) => {
      state.infoChatOpened = false;
    },
    closeSettingsChat: (state) => {
      state.openSettingsChat = false;
    },
    setMessages: (state, action) => {
      const { role, response, challengeId, level } = action.payload;

      if (role === MESSAGE_ROLE.HUMAN) {
        const message = {
          role,
          type: MESSAGE_TYPES.TEXT,
          payload: {
            text: state.input,
          },
        };

        return {
          ...state,
          sessions: {
            ...state.sessions,
            [challengeId]: {
              ...state.sessions?.[challengeId],
              [level]: {
                ...state.sessions?.[challengeId]?.[level],
                messages: [
                  ...(state.sessions[challengeId]?.[level]?.messages || []),
                  message,
                ],
              },
            },
          },
          input: '',
        };
      }

      return {
        ...state,
        sessions: {
          ...state.sessions,
          [challengeId]: {
            ...state.sessions?.[challengeId],
            [level]: {
              ...state.sessions?.[challengeId]?.[level],
              messages: [
                ...(state.sessions?.[challengeId]?.[level]?.messages || []),
                response,
              ],
            },
          },
        },
        input: '',
      };
    },
    setSessionLoaded: (state, action) => {
      state.sessionLoaded = action.payload;
    },
    setHistoryLoaded: (state, action) => {
      state.historyLoaded = action.payload;
    },
    setChatSession: (state, action) => {
      const session = action.payload;

      const updatedSessions = {
        ...state.sessions,
        [session.challengeId]: {
          ...state.sessions?.[session.challengeId],
          [session.level]: session,
        },
      };

      state.sessions = updatedSessions;
    },
    setTyping: (state, action) => {
      state.typing = action.payload;
    },
    setFullyScrolled: (state, action) => {
      state.fullyScrolled = action.payload;
    },
    setStreamingDone: (state, action) => {
      state.streamingDone = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setChatStarted: (state, action) => {
      state.started = action.payload;
    },
    setSelectedOption: (state, action) => {
      const { selectedOption, questionId } = action.payload;
      state.emaChat = {
        ...state.emaChat,
        questionId,
        choice: selectedOption,
      };
    },
    setStreaming: (state, action) => {
      state.streaming = action.payload;
    },
    setExerciseId: (state, action) => {
      state.exerciseId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserChatSessions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserChatSessions.fulfilled, (state, action) => {
        const { data: sessions } = action.payload;

        const chatSessions = {};

        sessions.forEach((session) => {
          chatSessions[session.challengeId] = {
            ...chatSessions[session.challengeId],
            [session.level]: session,
          };
        });

        state.sessions = chatSessions;
        state.historyLoaded = true;
        state.loading = false;
      })
      .addCase(fetchUserChatSessions.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setInput,
  setMessages,
  setChatUser,
  setMore,
  setSessionLoaded,
  setChatSession,
  openInfoChat,
  closeSettingsChat,
  closeInfoChat,
  setTyping,
  setBotFeature,
  setFullyScrolled,
  resetChat,
  setExerciseId,
  setError,
  setChatStarted,
  setStreamingDone,
  setSelectedOption,
  setEMAMessages,
  resetExplainMyAnswer,
  setStreaming,
  setHistoryLoaded,
} = chatSlice.actions;

export default chatSlice.reducer;
