import React from 'react';

function MultipleChoiceButton({ option, selected, onSelect, className }) {
    return (
        <button
            onClick={onSelect}
            className={`answer-button ${selected ? 'selected' : ''} ${className}`}
        >
            {option}
        </button>
    );
}

export default MultipleChoiceButton;
