import React from 'react';

class NotefulError extends React.Component{
    state = {
        hasError: false
    };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render(){
        if (this.state.hasError) {
            return (
                <h2>Could not display due to error.</h2>
            );
        }
    return this.props.children;
    }
}

export default NotefulError;