
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
                    <b><a onClick={toggleIsTruncated} className="text-green-700 cursor-pointer hover:text-green-500">
                        {isTruncated ? ' Read More...' : ' Read Less...'}
                    </a>
                    </b>
                )}
            </p>
        </div>
    );
}

export default ReadMore;
