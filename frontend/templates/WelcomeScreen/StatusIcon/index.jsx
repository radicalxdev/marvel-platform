import IconDoing from '@/assets/svg/IconProcessDoing.svg';
import IconDone from '@/assets/svg/IconProcessDone.svg';
import IconUndo from '@/assets/svg/IconProcessUndo.svg';

const statusComMap = ({ status }) => {
  if (status === 'done') {
    return <IconDone />;
  }
  if (status === 'doing') {
    return <IconDoing />;
  }
  return <IconUndo />;
};

export default statusComMap;
