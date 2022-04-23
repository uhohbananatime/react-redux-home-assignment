import React, { useState } from 'react';
import { arrayMove, SortableContainer, SortableElement, } from 'react-sortable-hoc';
import { ITEMS } from './data';

import './App.css';

// Reusable array headings for mobile purposes
const headings = ['Worker ID', 'Worker Name', 'Overtime', 'Manual Hours', 'Hours', 'Total Hours', 'Status']

const SortableItem = SortableElement(({ value }) => (
    <tr>
        <td scope="row" data-label={headings[0]} className="td-id">{value.id}</td>
        <td data-label={headings[1]} className="td-worker-name">{value.workerName}</td>
        <td data-label={headings[2]}>{value.extraHours}</td>
        <td data-label={headings[3]}>{value.manualHours}</td>
        <td data-label={headings[4]}>{value.hours}</td>
        <td data-label={headings[5]}>{value.totalHours}</td>
        <td data-label={headings[6]} class={`text-${value.status ?? 'red'}`}>[icon]</td>
    </tr>
));

const SortableList = SortableContainer(({ items }) => {
    return (
        <table>
            <thead>
                {headings.map((heading, i) => (
                    <th key={`th-${i}`} scope="col">{heading}</th>
                ))}
            </thead>
            <tbody>
                {items.map((value, index) => (
                    <SortableItem
                        key={`item-${value.workerName}`}
                        index={index}
                        value={value}
                    />
                ))}
            </tbody>
            
        </table>
    );
});

function SortableComponent() {
    const [data, setData] = useState(ITEMS);

    let onSortEnd = ({ oldIndex, newIndex }) => {
        setData(() => arrayMove(data, oldIndex, newIndex));
    };

    return (
        <div className="table-container">
            <SortableList items={data} onSortEnd={onSortEnd} />
        </div>
    );
}

export default SortableComponent;
