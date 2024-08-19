import MainAppLayout from '@/layouts/MainAppLayout';
import Chat from '@/templates/Chat';

const MarvelChat = () => {
  return <Chat />;
};

MarvelChat.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default MarvelChat;
