import { memo } from 'react';

import ReactMarkdown from 'react-markdown';

const MemoizedMarkdown = memo(
  ReactMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

export default MemoizedMarkdown;
