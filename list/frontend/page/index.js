import {useState} from 'react';
import {createRoot} from 'react-dom/client';

import {List} from '../../component/build/component_index';

function App() {
    const [columns, setColumns] = useState(reactInitData);
    const [filtered, setFiltered] = useState(reactInitFiltered);
    const [sorted, setSorted] = useState(reactInitSorted);
    return <List
        columns={columns}
        filter={(filterType) => {
            fetch(`./data?sorted=${sorted}&filtered=${filterType}`)
                .then(res => res.json())
                .then(json => {
                    setColumns(json);
                    setFiltered(filterType);
                });
        }}
        sort={(sortType) => {
            fetch(`./data?sorted=${sortType}&filtered=${filtered}`)
                .then(res => res.json())
                .then(json => {
                    setColumns(json);
                    setSorted(sortType);
                });
        }}
    />;
}

const root = createRoot(document.getElementById('react-app'));

root.render(<App/>);