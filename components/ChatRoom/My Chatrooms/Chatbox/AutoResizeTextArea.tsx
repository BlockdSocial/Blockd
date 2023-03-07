import React, { ChangeEventHandler } from 'react';

interface Props {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

const AutoResizeTextarea: React.FC<Props> = ({ value, onChange }) => {
  return (
    <textarea
      className="flex items-center justify-center resize-none w-full p-1 text-gray-700 border rounded-md focus:outline-none focus:shadow-outline-blue focus:border-orange-300"
      value={value}
      onChange={onChange}
      placeholder="Send a message"
    />
  );
};

export default AutoResizeTextarea;