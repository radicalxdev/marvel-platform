import IconDoing from '@/assets/svg/IconProcessDoing';
import IconDone from '@/assets/svg/IconProcessDone';
import IconUndo from '@/assets/svg/IconProcessUndo';

const statusComMap = (props) => {
  const { status } = props;
  if (status === 'done') {
    return <IconDone {...props} />;
  }
  if (status === 'doing') {
    return <IconDoing {...props} />;
  }
  return <IconUndo {...props} />;
};

export default statusComMap;
