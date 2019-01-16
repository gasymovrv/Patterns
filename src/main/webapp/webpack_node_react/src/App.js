import React, {Component} from 'react';
import LifecycleExample from './LifecycleExample';
import PureCompExample from './PureCompExample';
import ErrorBoundary from './ErrorBoundary';
import ErrorExample from './ErrorExample';
import RenderCallbackExample, {Loading, Profile} from './RenderCallbackExample';
import HooksExample from './HooksExample';
import NewLifecycleExample from './NewLifecycleExample';

export default class App extends Component {
    render() {
        return (
            <div className="app">
                <div>

                    {/*<LifecycleExample/>*/}

                    {/*<PureCompExample/>*/}

                    {/*<ErrorBoundary>*/}
                        {/*<ErrorExample/>*/}
                    {/*</ErrorBoundary>*/}

                    {/*<RenderCallbackExample username='tylermcginnis33'>*/}
                        {/*{(user) => user === null*/}
                            {/*? <Loading />*/}
                            {/*: <Profile user={user} />}*/}

                    {/*</RenderCallbackExample>*/}

                    {/*<HooksExample/>*/}

                    <NewLifecycleExample/>

                </div>
            </div>
        );
    }
}
