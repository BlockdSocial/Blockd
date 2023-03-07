import React, { ChangeEventHandler } from 'react';

interface Props {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

const AutoResizeTextarea: React.FC<Props> = ({ value, onChange }) => {
  return (
    <textarea
      className="flex items-center justify-center resize-none w-full px-1 py-2 text-gray-700 dark:text-white border bg-gray-200 dark:bg-lightgray rounded-md focus:outline-none focus:shadow-outline-blue focus:border-orange-300"
      value={value}
      onChange={onChange}
      placeholder="Send a message"
      rows={1}
      id="myTextArea"
    />
  );
};

export default AutoResizeTextarea;