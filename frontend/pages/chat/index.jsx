import MainAppLayout from '@/layouts/MainAppLayout';
import Chat from '@/templates/Chat';

const KaiChat = () => {
  return <Chat />;
};

KaiChat.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default KaiChat;
