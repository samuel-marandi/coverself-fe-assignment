import React from 'react';
import IssuesList from './features/IssueList';
import './App.css';
import { SampleComponent } from './components/SampleComponent';

const App: React.FC = () => {
    return (
        <div className="App">
            <IssuesList />
            <SampleComponent />
        </div>
    );
};

export default App;
