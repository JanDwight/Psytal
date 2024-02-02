
import React, { useState } from 'react';

function ReadMore({ children, maxCharacterCount = 200 }) {
    const text = children;
    const [isTruncated, setIsTruncated] = useState(true);
    const resultString = isTruncated ? text.slice(0, maxCharacterCount) : text;

    function toggleIsTruncated() {
        setIsTruncated(!isTruncated);
    }

    return (
        <div>
            <p>
                {resultString}
                {text.length > maxCharacterCount && (
                    <a onClick={toggleIsTruncated} className="text-blue-500 cursor-pointer underline hover:text-red-500">
                        {isTruncated ? ' Read More' : ' Read Less'}
                    </a>
                )}
            </p>
        </div>
    );
}

export default ReadMore;
