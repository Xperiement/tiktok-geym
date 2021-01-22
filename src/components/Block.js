import React from 'react'
import PropTypes from 'prop-types';

const Block = ({typeA, onc}) => {
    return (
        <div onClick={onc} className ={`block ${typeA === true ? "sideA" : typeA === false ? "sideB" : ""}`}>
            {typeA === true ? 'x' : typeA === false ? 'O' : ''}
        </div>
    )
}

Block.propTypes = {
    typeA : PropTypes.string,
    onc : PropTypes.func
}

export default Block
