import {useState} from 'react';
import {createRoot} from 'react-dom/client';

import {nodejs_component} from '../../component/build/component_index';

const {List} = nodejs_component;


function App() {
    const [columns, setColumns] = useState([JSON.parse(reactInitData)]);
    const [filtered, setFiltered] = useState([reactInitFiltered]);
    const [sorted, setSorted] = useState([reactInitSorted]);
    return <List
        columns={columns}
        filter={(filterType) => {
            fetch(`./data?sorted=${sorted}&filtered=${filterType}`)
                .then(res => res.json())
                .then(json => {
                    setColumns(json);
                    setFiltered(filterType);
                })
        }}
        sort={(sortType) => {
            fetch(`./data?sorted=${sortType}&filtered=${filtered}`)
                .then(res => res.json())
                .then(json => {
                    setColumns(json);
                    setSorted(sortType);
                })
        }}
    />;
}

const {render} = createRoot(document.getElementById('react-app'));
render(<App/>);