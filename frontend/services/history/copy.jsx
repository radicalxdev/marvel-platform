export const copyToClipboard = (data, panelData) => {
  const label =
    data?.toolId === '0' ? 'Questions and Options' : 'Concepts and Definitions';
  const textToCopy = `
  Title: ${data?.title || 'Default Title'}
  
  Content: ${data?.content || 'Default Content'}
  
  ${label}:
  ${panelData
    .map((item, i) =>
      data?.toolId === '0'
        ? `${i + 1}. ${item.question}\n${item.choices
            ?.map((choice) => `   ${choice.key}. ${choice.value}`)
            .join('\n')}`
        : `${i + 1}. ${item.concept} - ${item.definition}`
    )
    .join('\n\n')}
  `;

  navigator.clipboard.writeText(textToCopy);
};
