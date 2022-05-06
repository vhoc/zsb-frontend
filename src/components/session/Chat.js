import React from 'react';

export default function Chat(props) {

    return (
        <div className='d-flex justify-content-start p-4'>
            <pre>
                {props.text}
            </pre>
        </div>
    );
}