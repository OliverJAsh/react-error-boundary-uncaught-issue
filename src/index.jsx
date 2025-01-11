import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

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

setTimeout(() => {
    ReactDOM.createRoot(rootEl).render(<App />);
}, 100);
