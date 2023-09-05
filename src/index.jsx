import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

window.addEventListener('error', (event) => {
    console.log('window.addEventListener error', event);
});

class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        console.log('getDerivedStateFromError', { error });

        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('componentDidCatch', { error, errorInfo });
    }

    render() {
        return this.state.hasError === false && this.props.children;
    }
}

const Boom = () => {
    console.log('Boom');

    throw new Error('Error inside React render');

    return null;
};

const App = () => {
    console.log('App render');

    return (
        <ErrorBoundary>
            <Boom />
        </ErrorBoundary>
    );
};

const rootEl = document.getElementById('root');

ReactDOM.createRoot(rootEl).render(<App />);

setTimeout(() => {
    throw new Error('Error outside of React render');
}, 5000);
