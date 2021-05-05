import { Dimmer, Loader } from 'semantic-ui-react';

const Spinner = () => {
    return (
        <Dimmer active>
            <Loader size="huge" content={"Preparing Chat..."} />
        </Dimmer>
    );
}

export default Spinner;